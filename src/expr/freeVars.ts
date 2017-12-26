import { Expr, eVar, eApply, eIfElse, eLambda, eLet, eLiteral } from './Expr'
import { assertNever, emptySet, singleton, extendSet } from '../utils/prelude'
import { fastmap } from '../utils/fastArray'

export function freeVars (expr: Expr, bindings: Set<string>): Set<string> {
  switch (expr.typ) {
    case eLiteral.typ: {
      return emptySet()
    }

    case eVar.typ: {
      if (bindings.has(expr.varId)) {
        return emptySet()
      } else {
        return singleton(expr.varId)
      }
    }

    case eIfElse.typ: {
      return extendSet(
        extendSet(
          freeVars(expr.ifClause, bindings),
          freeVars(expr.thenClause, bindings)),
        freeVars(expr.elseClause, bindings))
    }

    case eApply.typ: {
      if (expr.operands.length !== 0) {
        return extendSet(
          freeVars(expr.operator, bindings),
          fastmap(expr.operands, o => freeVars(o, bindings)).reduce(extendSet)
        )
      } else {
        return freeVars(expr.operator, bindings)
      }
    }

    case eLambda.typ: {
      const newBindings = extendSet(bindings, new Set(expr.params))
      return freeVars(expr.body, newBindings)
    }

    case eLet.typ: {
      const newBindings = extendSet(bindings, new Set(expr.defs.keys()))

      return extendSet(
        fastmap(expr.defBodies, o => freeVars(o, newBindings)).reduce(extendSet),
        freeVars(expr.body, newBindings)
      )
    }

    default:
      return assertNever(expr)
  }
}
