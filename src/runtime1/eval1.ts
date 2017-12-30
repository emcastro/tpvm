import { done, tailCall, trampoline, Trampoline } from '../utils/trampoline'

import {
  eVar, eLiteral, eLet, eLambda, eIfElse, eApply,
  Expr, Lambda, LiteralValue, Apply
} from '../expr/Expr'

import { primitives } from './primitive1'
import { XError, assertNever, by, toString } from '../utils/prelude'
import { then, Promise, isPromise, callPrimitive } from './optimisticPromise'
import * as _ from 'lodash'

import { XList } from '../utils/XList'

import { Promise as BBPromise } from 'bluebird'
import { isSymbol } from 'util'
import { isLambda } from '../generated/genExpr'
import { Spy } from '../utils/spy'
import { MultiKeyMap, counter } from '../utils/maps'

export type Value = LiteralValue | Closure | ValueArray | ValueAppendList | Function

export type XValue = Value | Promise<Value>

interface ValueArray extends Array<XValue> { }
interface ValueAppendList extends XList<XValue> { }

type Frame = Map<string, XValue>

export class Env { // export for building root env

  constructor (public frame: Frame, public parent?: Env) { }

  lookup (varId: string): XValue {
    // There should not be undefined variable at this level
    const value = this.frame.get(varId)
    if (value !== undefined) { // we don't intend to use undefined as a value
      if (isSymbol(value)) {
        throw new Error(`Forward definition of ${varId}`)
      }
      return value
    } else {
      if (this.parent !== undefined) {
        return this.parent.lookup(varId)
      } else {
        throw new Error(`Undefined var ${varId}`)
      }
    }
  }
}

export class Closure {
  lambda: Lambda
  defEnv: Env

  constructor (code: Lambda, defEnv: Env) {
    this.lambda = code
    this.defEnv = defEnv
  }
}

class EvalError extends XError {

  constructor (msg?: string, expression?: Expr, cause?: Error) {
    const shortExpression = (expression && `${expression.location()} : ` + _.truncate(`${expression}`, { length: 250 }))

    let bigMsg
    if (shortExpression) {
      if (msg) bigMsg = `${shortExpression}\n${msg}`
      else bigMsg = shortExpression
    } else if (msg) bigMsg = msg

    const showSelfTrace = (expression === undefined || cause === undefined)

    super(bigMsg, cause, showSelfTrace)
  }

}

class PrimitiveError extends EvalError { }

const calledLambdaStats = counter<Lambda>(Map)
const callSiteStats = counter<Apply>(Map)
const callSiteTargetStats = counter<[Apply, any]>(MultiKeyMap)

process.on('exit', () => {
  const lambdas = [...calledLambdaStats]
  const callSites = [...callSiteStats]

  console.log('==Callsite stats==')
  callSites.sort(by(([_, count]) => -count)).forEach(([site, count]) => {
    console.log(`${count} -- ${site.debugInfo()}`)
  })

  console.log('==Lambda target stats==')

  lambdas.sort(by(([_, count]) => -count)).forEach(([expr, count]) => {
    console.log(`${count} - ${expr.debugInfo()}  ${expr.toString()}`)
  })

  console.log('==Freevars stats==')

  const lambdaFreeVars = lambdas.map(([expr]) => [expr, expr.freeVars()] as [Lambda, Set<string>])

  lambdaFreeVars.sort(by(([_, freeVars]) => freeVars.size)).forEach(([expr, freeVars]) => {
    console.log(`${freeVars.size} - ${expr.debugInfo()}  ${[...freeVars]}\n ${expr.toString()}`)
  })

  console.log('==Callsite-target stats==')

  const callSiteTargets = [...callSiteTargetStats]
  callSiteTargets.sort(by(([_, count]) => -count)).forEach(([[callSite, target], count]) => {
    console.log(`${target} <- ${callSite} -- ${count}`)
  })
})

/**
 * Composition rule for Promise monad and Trampoline monad.
 *
 * With:
 * ```
 * type PromiseMonad<T> = Direct<T> | Promise<T>
 * type Direct<T> = T  // making T explicitly part of the monad
 * ```
 * One can rewrite signature of `mixDone` as:
 * ```
 * (x: Direct<Trampoline<PromiseMonad<T>>> | Promise<Trampoline<PromiseMonad<T>>>) => Trampoline<PromiseMonad<T>
 * ```
 * Simplified as:
 * ```
 * (x: PromiseMonad<Trampoline<PromiseMonad<T>>>) => Trampoline<PromiseMonad<T>>
 * ```
 * I.e. we resolve the trampoline inside the inner promise, then enclose the resulting promise it into a trampoline.
 */
function mixDone<T> (optimisticPromise: Trampoline<T | Promise<T>> | Promise<Trampoline<T | Promise<T>>>): Trampoline<T | Promise<T>> {
  if (isPromise(optimisticPromise)) {
    return done(optimisticPromise.then(trampolineValue => {
      return trampoline(trampolineValue)
    }))
  } else {
    return optimisticPromise
  }
}

const awaitingComputation = Symbol('awaitingComputation')

/**
 * Simple strict evaluation
 */
export function eval1 (expr: Expr, env: Env): Trampoline<XValue> {
  switch (expr.typ) {
    case eVar.typ:
      return done(env.lookup(expr.varId))

    case eLiteral.typ:
      const l = expr.value
      if (typeof l === 'symbol') {
        const x = primitives[l]
        if (x === undefined) {
          throw new EvalError(`Undefined primitive #${Symbol.keyFor(l)}`, expr)
        }
        return done(x)
      } else {
        return done(l)
      }

    case eLet.typ: {
      const newEnv = new Env(new Map(), env)
      const frame = newEnv.frame
      for (const [k] of expr.defs.entries()) {
        frame.set(k, awaitingComputation as any)
      }
      for (const [k, subExpr] of expr.defs.entries()) {
        // Launch all computations in order. Later values are not available for earlier ones
        frame.set(k, pushingEval1(subExpr, newEnv))
      }
      return tailCall(() => eval1(expr.body, newEnv))
    }

    case eLambda.typ:
      return done(new Closure(expr, env))

    case eIfElse.typ: // eval if...
      const ifExpr = expr
      return mixDone(then(pushingEval1(expr.ifClause, env), (b: Value) => {
        if (typeof b === 'boolean') {
          if (b) {
            return tailCall(() => eval1(ifExpr.thenClause, env))
          } else {
            return tailCall(() => eval1(ifExpr.elseClause, env))
          }
        } else {
          throw new EvalError(`Illegal value in if: ${toString(b)}`, expr)
        }
      }))

    case eApply.typ:
      return apply(expr, env)

    default:
      return assertNever(expr)
  }
}

function applyClosure (op: Closure, ops: Expr[], env: Env, callSite: Apply) {

  calledLambdaStats.inc(op.lambda)
  callSiteStats.inc(callSite)

  const frame = new Map()
  const params = op.lambda.params
  if (params.length !== ops.length) {
    throw new EvalError(`Call argument count ${ops.length} differs from closure parameter count ${params.length}`, callSite)
  }

  for (let i = 0; i < ops.length; i++) {
    frame.set(params[i], pushingEval1(ops[i], env))
  }
  const newEnv: Env = new Env(frame, op.defEnv)

  return tailCall(() => eval1(op.lambda.body, newEnv))

}

function apply (expr: Apply, env: Env) {
  const applyExpr = expr
  return mixDone(then(pushingEval1(expr.operator, env), (op) => {
    const ops = applyExpr.operands
    if (op instanceof Closure) {
      callSiteTargetStats.inc([expr, op.lambda]) // TODO: traiter les différentes closure de même lambda (elles sont nombreuses)

      return applyClosure(op, ops, env, expr)
    } else {
      // Special case: primitive, array or object access

      // Parameter evaluation
      const args: XValue[] = []  // inlined Array.map
      for (let i = 0; i < ops.length; i++) {
        args.push(pushingEval1(ops[i], env))
      }

      // Primitive function (from Literal)
      if (typeof op === 'function') {
        callSiteTargetStats.inc([expr, op.name])

        if (op.length !== args.length) {
          if (!(op as any).varArgs) {
            throw new EvalError(`Argument count ${args.length} differs from parameter count ${op.length} of primitive`, expr)
          }
        }
        try {
          return done(callPrimitive(op, args, 0)) // ATTENTION: in-place modification of args
        } catch (e) {
          throw new PrimitiveError(undefined, expr, e)
        }
      } else {
        // Other cases: array or object

        if (args.length === 1) {
          // Array-like access or method
          return mixDone(then(args[0], (arg1) => {
            if (typeof arg1 === 'number') {
              callSiteTargetStats.inc([expr, '<list>'])
              if (op instanceof XList) {
                // AppendList access
                return done(op.get(arg1))
              } else if (Array.isArray(op)) {
                // Array access
                return done(op[arg1])
              }
            }
            if (typeof arg1 === 'string') {
              callSiteTargetStats.inc([expr, '<js-object>'])

              // Method call
              const generic: any = op
              if (generic[arg1] !== undefined) {
                return done(generic[arg1] as XValue)
              }
            }
            throw new EvalError(`No method or special application available: ${op} ${toString(arg1)}`, expr)
          }))
        }

        throw new EvalError('No method or special application available', expr)
      }
    }
  }))
}

/**
 * For cases when proper tail call is not available, push a diagnosis try-catch on the stack
 */
class PushingEval1 {

  // @Spy({
  //   name: 'Eval',
  //   in (expr) { return [expr.debugInfo()] },
  //   out (result) {
  //     let resultInfo = result
  //     if (resultInfo instanceof Closure) resultInfo = '<Closure>'
  //     if (resultInfo instanceof Function) resultInfo = '<Function>'
  //     if (resultInfo instanceof BBPromise) resultInfo = '<Promise>'
  //     if (resultInfo instanceof XList) resultInfo = resultInfo.toString()
  //     return resultInfo
  //   }
  // })
  static pushingEval1 (expr: Expr, env: Env): XValue {
    try {
      return trampoline(eval1(expr, env))
    } catch (e) {
      // if (e instanceof RangeError) throw e // fast-track
      throw new EvalError(undefined, expr, e)
    }
  }
}

export const pushingEval1 = PushingEval1.pushingEval1
