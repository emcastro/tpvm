import { Expr, Var, Literal, eVar, eApply, eIfElse, eLambda, eLet, eLiteral } from './Expr'
import { emptyList, assertNever, emptySet, singleton, extendSet } from '../utils/prelude'
import { XList } from '../utils/XList'
import { flapmap, fasteach, fastmap } from '../utils/fastArray'

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
      return extendSet(
        freeVars(expr.operator, bindings),
        fastmap(expr.operands, o => freeVars(o, bindings)).reduce(extendSet)
      )
    }

    case eLambda.typ:
      const newBindings = extendSet(bindings, new Set(expr.params))
      return freeVars(expr.body, newBindings)

    case eLet.typ:
      throw new Error('ooo')

    default:
      return assertNever(expr)
  }
}
