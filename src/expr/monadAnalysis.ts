/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expr, Var, Literal, eVar, eApply, eIfElse, eLambda, eLet, eLiteral } from './Expr'
import { emptyList, assertNever, emptySet, singleton, extendSet, $$$ } from '../utils/prelude'
import { XList } from '../utils/XList'
import { flapmap, fasteach, fastmap } from '../utils/fastArray'

export function monadAnalysis (expr: Expr): Set<string> {
  switch (expr.typ) {
    case eLiteral.typ:
    case eVar.typ:
    case eIfElse.typ:
    case eApply.typ:
    case eLambda.typ:
    case eLet.typ:
      return $$$()
    default:
      return assertNever(expr)
  }
}
