// @flow

import { eVar, eLiteral, eApply, eIfElse, eLambda, eLet } from './generated/genExpr'
import type { Expr, Var, Literal, Apply, IfElse, Lambda, Let } from './generated/genExpr'
import { SExprRenderer } from './SExprRenderer'
import _ from 'lodash'

// Debugging print support
const _emptyChildren = []

export function subExprs (expr: Expr): Array<Expr> {
  switch (expr.typ) {
    case eVar.typ:
      return _emptyChildren

    case eApply.typ:
      return [expr.operator, ...expr.operands]

    case eIfElse.typ:
      return [expr.ifClause, expr.thenClause, expr.elseClause]

    case eLiteral.typ:
      return _emptyChildren

    case eLet.typ:
      const elements = _.toArray(expr.defs.values())
      elements.push(expr.body)
      return elements

    default:
      // case eLambda.typ:
      return [expr.body]
  }
}

//
function isSymbol (value: string | mixed): boolean {
  return (typeof value === 'string' && _.startsWith(value, '#'))
}

// eslint-disable-next-line
class ExprRenderer extends SExprRenderer<Expr> {
  splitNode (node: Expr): string | [string, Array<Expr>] {
    switch (node.typ) {
      case eVar.typ:
        return '$' + node.varId

      case eLiteral.typ:
        const v = node.value
        if (isSymbol(v)) { // isSymbol
          return 'v.toString()'
        } else {
          return "v + ':' + typeof v"
        }

      case eApply.typ:
        return ['Apply', subExprs(node)]

      case eIfElse.typ:
        return ['If', subExprs(node)]

      case eLet.typ:
        const elements = _.toArray(node.defs.entries())
        elements.push(node.body)

        return ['Let', elements]

      // case eArray.typ : {
      //   const [v, e] = node
      //   return [`$${v} :`, [e]]
      // }
      case eLambda.typ:
        return [`Lambda (${_.join(_.map(node.params, p => '$' + p), ' ')})`, subExprs(node)]

      default:
        console.error('Unexpected node', node)
        //  throw new Error(node);
        return '#error'
    }
  }

  escape (o: any): string {
    if (typeof o === 'string' && _.startsWith(o, '$')) {
      return escape(o)
    } else {
      return super.escape.call(this, o)
    }
  }
}

/*
const ExprRewriter = new TreeRewriter()
ExprRewriter.isRewritable = function (obj) {
  return obj.rewrite !== undefined // TODO: should define more explicit marker?
}

ExprRewriter.rewrite = function (obj, newChildren) {
  return obj.rewrite(newChildren)
}

ExprRewriter.children = function (obj) {
  return obj.children()
}
*/

export { eVar, eLiteral, eApply, eIfElse, eLambda, eLet }
export type { Expr, Var, Literal, Apply, IfElse, Lambda, Let }
