
/* xeslint-disable */

import {
  eVar, eLiteral, eLet, eLambda, eIfElse, eApply,
  Expr, Var, Literal, Let, Lambda, IfElse, Apply, LiteralValue
} from '../expr/Expr' // eslint-disable-line

import { primitives } from './primitive1'

export type Value = LiteralValue | Closure | ValueArray | Function // eslint-disable-line
interface ValueArray extends Array<Value> { } // Pseudo interface to avoid cyclic type

type Frame = Map<string, Value | Promise<Value>>

export class Env { // export for building root env
  frame: Frame
  parent?: Env

  constructor(frame: Frame, parent?: Env) {
    this.frame = frame
    this.parent = parent
  }

  lookup(varId: string): Value | Promise<Value> {
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

export class Closure {
  lambda: Lambda
  defEnv: Env

  constructor(code: Lambda, defEnv: Env) {
    this.lambda = code
    this.defEnv = defEnv
  }
}

class EvalError extends Error {
}

class PrimitiveError extends EvalError {

}

function now<T, Q>(value: T | Promise<T>, f: (t: T | Promise<T>) => Q): Q | Promise<Q> {
  if (value instanceof Promise) {
    return value.then(f)
  }
  return f(value)
}

/**
 * Simple strict evaluation
 */
export default function eval1(expr: Expr, env: Env): Value | Promise<Value> {
  console.log('+++', expr.toString())

  switch (expr.typ) {
    case eVar.typ:
      return env.lookup(expr.varId)

    case eLiteral.typ:
      const l = expr.value
      if (typeof l === 'symbol') {
        const x = primitives[l]
        if (x == null) {
          throw new Error(`Undefined primitive ${Symbol.keyFor(l)}`)
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
      return now(eval1(expr.ifClause, env), b => {
        if (typeof b === 'boolean') {
          if (b) {
            return eval1(ifExpr.thenClause, env)
          } else {
            return eval1(ifExpr.elseClause, env)
          }
        } else {
          throw new EvalError('Illegal value in if: ' + String(b) + ' - ' + expr.toString())
        }
      })

    default:
    case eApply.typ:
      const applyExpr = expr
      return now(eval1(expr.operator, env), (op) => {
        const ops = applyExpr.operands
        try {
          if (op instanceof Closure) {
            const frame = new Map()
            const params = op.lambda.params
            if (params.length !== ops.length) {
              throw new EvalError(`Argument count ${ops.length} differs from parameter count ${params.length}`)
            }

            for (let i = 0; i < ops.length; i++) {
              frame.set(params[i], eval1(ops[i], env))
            }
            const newEnv: Env = new Env(frame, op.defEnv)

            return eval1(op.lambda.body, newEnv)
          }

          // Parameter evaluation
          const args = []  // inlined Array.map
          for (let i = 0; i < ops.length; i++) {
            args.push(eval1(ops[i], env))
          }

          // Primitive function (from Literal)
          if (typeof op === 'function') {
            if (op.length !== args.length) {
              if ((op as any).varArgs) {
                throw new EvalError(`Argument count ${args.length} differs from parameter count ${op.length} (P)`)
              }
            }
            try {
              return op.apply(null, args)
            } catch (e) {
              throw new PrimitiveError(e)
            }
          }

          if (args.length === 1) {
            // Array-like access or method
            return now(args[0], (arg1) => {
              if (typeof arg1 === 'number') {
                // Array access
                if (typeof op === 'string') {
                  return op.charCodeAt(arg1)
                }

                if (Array.isArray(op)) {
                  return op[arg1]
                }

                const generic: any = op
                return generic.get(arg1) // TODO: ou .apply ?
              }
              if (typeof arg1 === 'string') {
                // Method call
                const generic: any = op
                if (generic[arg1] === undefined) {
                  return generic.get(arg1) // TODO: ou .apply ?
                } else {
                  return generic[arg1]
                }
              }
              return 'ERROR 2'
            })
          }

          return 'ERROR 1'
        } catch (e) {
          if (e instanceof EvalError) throw e
          throw new EvalError(e)
        }
      })
  }
}