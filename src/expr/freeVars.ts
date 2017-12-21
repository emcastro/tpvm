import { Expr, Var, Literal, eVar, eApply, eIfElse, eLambda, eLet, eLiteral } from './Expr'
import { emptyList, assertNever, emptySet, singleton, setExtends } from '../utils/prelude'
import { XList } from '../utils/XList'
import { flapmap, flatmap, fasteach, fastmap } from '../utils/fastArray'

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
      return setExtends(
        setExtends(
          freeVars(expr.ifClause, bindings),
          freeVars(expr.thenClause, bindings)),
        freeVars(expr.elseClause, bindings))
    }

    case eApply.typ: {
      return setExtends(
        freeVars(expr.operator, bindings), 
        fastmap(expr.operands, o => freeVars(o, bindings)).reduce(setExtends)
      )
    }

    case eLet.typ:
    case eLambda.typ:
      throw new Error('ooo')

    default:
      return assertNever(expr)
  }
}
