// @flow

/* xeslint-disable */

import { eVar, eLiteral, eLet, eLambda, eIfElse, eApply, isSymbol } from './Expr'
// eslint-disable-next-line
import type { Expr, Var, Literal, Let, Lambda, IfElse, Apply } from './Expr'

import { callPrimitive } from './primitive'

type Frame = Map<string, mixed | Promise<mixed>>

export class Env {
  frame: Frame
  parent: ?Env

  constructor (frame: Frame, parent?: Env) {
    this.frame = frame
    this.parent = parent
  }

  lookup (varId: string): mixed | Promise<mixed> {
    // There should not be indefined variable at this level
    const value = this.frame.get(varId)
    if (value !== undefined) { // we don't intend to use undefined as a value
      return value
    } else {
      if (this.parent != null) {
        return this.parent.lookup(varId)
      } else {
        throw new Error('Undefined var ' + varId)
      }
    }
  }
}

class Closure {
  lambda: Lambda
  defEnv: Env

  constructor (code: Lambda, defEnv: Env) {
    this.lambda = code
    this.defEnv = defEnv
  }
}

class NotAFunction extends Error {
}

function now (value: mixed | Promise<mixed>, foo) {
  if (value == null) return foo(value)
  if (typeof value.then === 'function') {
    return value.then(foo)
  }
  return foo(value)
}

/**
 * Simple strict evaluation
 * @param {*} expr
 */
export default function eval1 (expr: Expr, env: Env): mixed | Promise<mixed> {
  switch (expr.typ) {
    case eVar.typ:
      return env.lookup(expr.varId)

    case eLiteral.typ:
      return expr.value

    case eLet.typ: {
      const entries = expr.defs.entries()
      const newEnv = new Env(new Map(), env)
      for (const [k : string, subExpr] of entries) {
        // Launch all computations
        newEnv.frame.set(k, eval1(subExpr, newEnv))   // TODO: simple - no letrec - fuzzy semantics
      }
      const result = eval1(expr.body, newEnv)
      return result
    }

    case eLambda.typ:
      return new Closure(expr, env)

    case eIfElse.typ: // eval if...
      const ifExpr = expr
      return now(eval1(expr.ifClause, env), b => {
        if (typeof b === 'boolean') {
          if (b) {
            return eval1(ifExpr.thenClause, env)
          } else {
            return eval1(ifExpr.elseClause, env)
          }
        } else {
          throw new Error('Illegal value in if: ' + String(b) + ' - ' + expr.toString())
        }
      })

    default:
    case eApply.typ:
      const applyExpr = expr
      return now(eval1(expr.operator, env), (op) => {
        if (isSymbol(op)) {
          const ops = applyExpr.operands

          const args = []
          for (let i = 0; i < ops.length; i++) {
            args.push(eval1(ops[i], env))
            i++
          }

          return callPrimitive((op: any), args)
        } else {
          try {
            // let's suppose it's a function
            const closure: Closure = (op: any)
            const frame = new Map()
            const params = closure.lambda.params
            const ops = applyExpr.operands

            for (let i = 0; i < ops.length; i++) {
              frame.set(params[i], eval1(ops[i], env))
              i++
            }
            const newEnv = new Env(frame, closure.defEnv)

            return eval1(closure.lambda.body, newEnv)
          } catch (e) {
            if (e instanceof NotAFunction) throw e
            throw new NotAFunction(e)
          }
        }
      })
  }
}
