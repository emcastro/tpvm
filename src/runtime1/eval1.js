// @flow

/* xeslint-disable */

import { eVar, eLiteral, eLet, eLambda, eIfElse, eApply } from '../Expr'
import type { Expr, Var, Literal, Let, Lambda, IfElse, Apply, LiteralValue } from '../Expr' // eslint-disable-line

import { primitives } from './primitive1'

export type Value = LiteralValue | Closure | Array<Value> // eslint-disable-line
type Frame = Map<string, Value | Promise<Value>>

export class Env { // export for building root env
  frame: Frame
  parent: ?Env

  constructor (frame: Frame, parent?: Env) {
    this.frame = frame
    this.parent = parent
  }

  lookup (varId: string): Value | Promise<Value> {
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

  constructor (code: Lambda, defEnv: Env) {
    this.lambda = code
    this.defEnv = defEnv
  }
}

class EvalError extends Error {
}

class PrimitiveError extends EvalError {

}

// export function now<T, Q> (value: T | Promise<T>, f: (T | Promise<T>) => Q) : Q | Promise<Q> {
//   if (value instanceof Promise) {
//     return value.then(f)
//   }
//   return f(value)
// }

function now (value, f) {
  if (value instanceof Promise) {
    return value.then(f)
  }
  return f(value)
}

/**
 * Simple strict evaluation
 */
export default function eval1 (expr: Expr, env: Env): Value | Promise<Value> {
  console.log('+++', expr.toString())

  switch (expr.typ) {
    case eVar.typ:
      return env.lookup(expr.varId)

    case eLiteral.typ:
      return expr.value

    case eLet.typ: {
      const entries = expr.defs.entries()
      const newEnv: Env = new Env(new Map(), env)
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

            for (let i = 0; i < ops.length; i++) {
              frame.set(params[i], eval1(ops[i], env))
            }
            const newEnv: Env = new Env(frame, op.defEnv)

            return eval1(op.lambda.body, newEnv)
          }

          // $TypingTrick
          if (typeof op === 'symbol') {
            /*:: if (!(op instanceof Symbol)) throw op */
            const opSymbol = op
            const f = primitives[opSymbol]
            if (f == null) {
              // $TypingTrick keyFor cannot be null
              throw new Error(`Primitive ${Symbol.keyFor(op)} not defined. Args: ${ops.map(e => e.toString())}`)
            }
            if (f.length !== ops.length) {
              if (f.varArgs) {
                throw new EvalError(`Argument count ${ops.length} differs from parameter count ${f.length}`)
              }
            }
            try {
              // inlined Array.map
              const args = []
              for (let i = 0; i < ops.length; i++) {
                args.push(eval1(ops[i], env))
              }
              return f.apply(null, args)
            } catch (e) {
              throw new PrimitiveError(e)
            }
          }

          if (typeof op === 'string') {
            if (ops.length !== 1) {
              throw new EvalError(`Char access of String can only have 1 argument, was ${ops.length}`)
            }
            return now(eval1(ops[0], env), (index) => {
              if (typeof index !== 'number') {
                throw new EvalError(`Char access must be a number`)
              }
              return op.charCodeAt(index)
            })
          }

          return 'FALLBACK'
        } catch (e) {
          if (e instanceof EvalError) throw e
          throw new EvalError(e)
        }
      })
  }
}
