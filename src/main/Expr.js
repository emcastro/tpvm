// @flow

import { Var, Literal, Apply, IfElse, Lambda, Let } from './generated/Expr'
import type {Expr} from './generated/Expr'
import _ from 'lodash'

// Debugging print support
const _emptyChildren = []

export function subExprs (expr: Expr) : Array<Expr> {
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

export { Var, Literal, Apply, IfElse, Lambda, Let }
export type { Expr }
