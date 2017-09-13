
import {
  eVar, eLiteral, eApply, eIfElse, eLambda, eLet,
  Expr, Var, Literal, Apply, IfElse, Lambda, Let
} from '../generated/genExpr'

import { LiteralValue } from '../expr/ExprBase'

// import { SExprRenderer } from './SExprRenderer'
// import _ from 'lodash'

/*
const ExprRewriter = new TreeRewriter()
ExprRewriter.isRewritable = function (obj) {
  return obj.rewrite !== undefined // FIXME: should define more explicit marker?
}

ExprRewriter.rewrite = function (obj, newChildren) {
  return obj.rewrite(newChildren)
}

ExprRewriter.children = function (obj) {
  return obj.children()
}
*/

export { eVar, eLiteral, eApply, eIfElse, eLambda, eLet }
export { Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue }
