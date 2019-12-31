import SExprRenderer from '../utils/SExprRenderer'
import { Expr, eVar, eLiteral, eApply, eIfElse, eLet, eLambda, Apply, IfElse, Let, Lambda, Binding } from './Expr'
import { iteratorToArray, anything } from '../utils/prelude'

// Debugging print support
function subExprs (expr: Apply | IfElse | Let | Lambda): Array<Expr | Binding> {
  switch (expr.typ) {
    case eApply.typ:
      return [expr.operator, ...expr.operands]

    case eIfElse.typ:
      return [expr.ifClause, expr.thenClause, expr.elseClause]

    case eLet.typ:
      const elements = iteratorToArray(expr.defs.values())
      elements.push(expr.body)
      return elements

    default:
      // case eLambda.typ:
      return [expr.body]
  }
}

export class ExprRenderer extends SExprRenderer<Expr | Binding, anything> {
  splitNode (node: Expr | Binding): string | [string, Array<Expr | Binding>] {
    if (Array.isArray(node)) {
      const [v, e] = node
      return [`$${v} :`, [e]]
    } else {
      switch (node.typ) {
        case eVar.typ:
          return '$' + node.varId

        case eLiteral.typ:
          const v = node.value
          if (typeof v === 'symbol') {
            return Symbol.keyFor(v) as string
          } else if (Array.isArray(v)) {
            return `[${String(v)}]:array`
          } else {
            return `${String(v)}:${typeof v}`
          }

        case eApply.typ:
          return ['Apply', subExprs(node)]

        case eIfElse.typ:
          return ['If', subExprs(node)]

        case eLet.typ:
          const elements: Array<Expr | Binding> = iteratorToArray(node.defs.entries())
          elements.push(node.body)
          return ['Let', elements]

        case eLambda.typ:
          return [`Lambda (${node.params.map(p => '$' + p).join(' ')})`, subExprs(node)]

        default:
          console.error('Unexpected node', node)
          //  throw new Error(node);
          return '#error'
      }
    }
  }

  escape (o: anything): string {
    if (typeof o === 'string' && o.startsWith('$')) {
      const s = JSON.stringify(o)
      return s.slice(1, s.length - 1)
    } else {
      return super.escape.call(this, o)
    }
  }
}
