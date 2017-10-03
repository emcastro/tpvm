
import {
  eVar, eLiteral, eLet, eLambda, eIfElse, eApply,
  Expr, Var, Literal, Let, Lambda, IfElse, Apply, LiteralValue
} from '../expr/Expr'

import { primitives, Strictness, StrictnessInfo } from './primitive1'
import { OneOrMany, XError } from '../utils/prelude'
import { fastmap } from '../utils/fastArray'
import { then, Promise, isPromise, callPrimitive } from './optimisticPromise'
import * as _ from 'lodash'

export type Value = LiteralValue | Closure | ValueArray | Function
interface ValueArray extends Array<Value> { } // Pseudo interface to avoid cyclic type

type Frame = Map<string, Value | Promise<Value>>

export class Env { // export for building root env
  frame: Frame
  parent?: Env

  constructor (frame: Frame, parent?: Env) {
    this.frame = frame
    this.parent = parent
  }

  lookup (varId: string): Value | Promise<Value> {
    // There should not be undefined variable at this level
    const value = this.frame.get(varId)
    if (value !== undefined) { // we don't intend to use undefined as a value
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

  expression?: Expr

  constructor (msg?: string, expression?: Expr, cause?: Error) {
    super(msg || (expression && `${expression.debugInfo()} : ` + _.truncate(`${expression}`, { length: 250 })))
    this.expression = expression
    this.cause = cause
  }

  shownStack () {
    if (this.expression === undefined || this.stack === undefined) {
      return this.stack
    } else {
      return this.stack.slice(0, this.stack.indexOf('\n'))
    }
  }

}

class PrimitiveError extends EvalError { }

const stats = new Map<Expr, number>()

// process.on('exit', () => {
//   console.log('=================')

//   const entries = []
//   for (let e of stats.entries()) {
//     entries.push(e)
//   }

//   const s = _.groupBy(entries, ([expr, count]) => count)

//   const sE = Object.entries(s).reverse()

//   sE.forEach(([count, items]) => {
//     items.forEach(i =>
//       console.log(count, items.length, i[0].toText())
//     )
//   })
// })

/**
 * Simple strict evaluation
 */
export default function eval1 (expr: Expr, env: Env): Value | Promise<Value> {
  try {
    // console.log('+++', debugInfo(expr))
    stats.set(expr, (stats.get(expr) || 0) + 1)

    switch (expr.typ) {
      case eVar.typ:
        return env.lookup(expr.varId)

      case eLiteral.typ:
        const l = expr.value
        if (typeof l === 'symbol') {
          const x = primitives[l]
          if (x === undefined) {
            throw new Error(`Undefined primitive #${Symbol.keyFor(l)}`)
          }
          return x
        } else {
          return l
        }

      case eLet.typ: {
        const entries = expr.defs.entries()
        const newEnv: Env = new Env(new Map(), env)
        for (const [k, subExpr] of entries) {
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
        return then(eval1(expr.ifClause, env), b => {
          if (typeof b === 'boolean') {
            if (b) {
              return eval1(ifExpr.thenClause, env)
            } else {
              return eval1(ifExpr.elseClause, env)
            }
          } else {
            throw new EvalError(`Illegal value in if: ${b} - ${expr}`)
          }
        })

      default:
      case eApply.typ:
        const applyExpr = expr
        return then(eval1(expr.operator, env), (op) => {
          const ops = applyExpr.operands
          try {
            if (op instanceof Closure) {
              const frame = new Map()
              const params = op.lambda.params
              if (params.length !== ops.length) {
                throw new EvalError(`Call argument count ${ops.length} differs from closure parameter count ${params.length}`)
              }

              for (let i = 0; i < ops.length; i++) {
                frame.set(params[i], eval1(ops[i], env))
              }
              const newEnv: Env = new Env(frame, op.defEnv)

              return eval1(op.lambda.body, newEnv)

            } else {
              // Special case: primitive, array or object access

              // Parameter evaluation
              const args = []  // inlined Array.map
              for (let i = 0; i < ops.length; i++) {
                args.push(eval1(ops[i], env))
              }

              // Primitive function (from Literal)
              if (typeof op === 'function') {
                if (op.length !== args.length) {
                  if (! (op as any).varArgs) {
                    throw new EvalError(`Argument count ${args.length} differs from parameter count ${op.length} of primitive`)
                  }
                }
                try {
                  return callPrimitive(op, args, 0) // ATTENTION: in-place modification of args

                } catch (e) {
                  console.error(expr.debugInfo())
                  throw new PrimitiveError(e)
                }
              } else {
                // Other cases: array or object

                if (args.length === 1) {
                  // Array-like access or method
                  return then(args[0], (arg1) => {
                    if (typeof arg1 === 'number') {
                      // Array access
                      if (Array.isArray(op)) {
                        return op[arg1]
                      }
                    }
                    if (typeof arg1 === 'string') {
                      // Method call
                      const generic: any = op
                      if (generic[arg1] !== undefined) {
                        return generic[arg1]
                      }
                    }
                    throw new EvalError('No method or special application available')
                  })
                }

                throw new EvalError('No method or special application available')
              }
            }
          } catch (e) {
            if (e instanceof EvalError && e.expression === expr) throw e
            throw new EvalError(undefined, expr, e)
          }
        })
    }
  } catch (e) {
    if (e instanceof EvalError && e.expression === expr) throw e
    throw new EvalError(undefined, expr, e)
  }
}
