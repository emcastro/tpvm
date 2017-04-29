// @flow

import { Var, Literal, Apply, IfElse, Lambda, Let } from './generated/Expr'
import type { Expr } from './generated/Expr'
import { SExprRenderer } from './SExprRenderer'
import _ from 'lodash'

// Debugging print support
const _emptyChildren = []

export function subExprs (expr: Expr): Array<Expr> {
  if (expr instanceof Var) {
    return _emptyChildren
  }
  if (expr instanceof Apply) {
    return [expr.operator, ...expr.operands]
  }
  if (expr instanceof IfElse) {
    return [expr.ifClause, expr.thenClause, expr.elseClause]
  }
  if (expr instanceof Literal) {
    return _emptyChildren
  }
  if (expr instanceof Let) {
    const elements = _.toArray(expr.defs.values())
    elements.push(expr.body)
    return elements
  }
  /* if (expr instanceof Lambda) */
  return [expr.body]
}

//

function isSymbol (value: string | mixed): boolean {
  return (typeof value === 'string' && _.startsWith(value, '#'))
}

class ExprRenderer extends SExprRenderer<Expr> {
  splitNode (node): string | [string, Array<Expr>] {
    if (node instanceof Var) {
      return '$' + node.varId
    }
    if (node instanceof Literal) {
      const v = node.value
      if (isSymbol(v)) { // isSymbol
        return 'v.toString()'
      } else {
        return "v + ':' + typeof v"
      }
    }
    if (node instanceof Apply) {
      return ['Apply', subExprs(node)]
    }
    if (node instanceof IfElse) {
      return ['If', subExprs(node)]
    }

    if (node instanceof Let) {
      const elements = _.toArray(node.defs.entries())
      elements.push(node.body)

      return ['Let', elements]
    }
    if (node instanceof Array) {
      const [v, e] = node
      return [`$${v} :`, [e]]
    }
    if (node instanceof Lambda) {
      return [`Lambda (${_.join(_.map(node.params, p => '$' + p), ' ')})`, subExprs(node)]
    } else {
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

export { Var, Literal, Apply, IfElse, Lambda, Let }
export type { Expr }
