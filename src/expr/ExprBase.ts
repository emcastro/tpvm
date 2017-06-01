
import { eVar, eLiteral, eApply, eIfElse, eLet, eLambda, Apply, IfElse, Let, Lambda, Expr, Var } from '../generated/genExpr'
import { SExprRenderer } from '../utils/SExprRenderer'
import { iteratorToArray } from '../utils/prelude'
import * as _ from 'lodash'
import { TPNode, Token } from '../parsing/parser'

export type LiteralValue = string | number | boolean
export type Binding = [string, Expr]

// Debugging print support
export function subExprs (expr: Apply | IfElse | Let | Lambda): (Expr | Binding)[] {
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

class ExprRenderer extends SExprRenderer<Expr | Binding, any> {
  splitNode (node: Expr | Binding): string | [string, (Expr | Binding)[]] {
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
            return '[' + String(v) + ']:array'
          } else {
            return String(v) + ':' + typeof v
          }

        case eApply.typ:
          return ['Apply', subExprs(node)]

        case eIfElse.typ:
          return ['If', subExprs(node)]

        case eLet.typ:
          let elements: (Expr | Binding)[] = iteratorToArray(node.defs.entries())
          elements.push(node.body)
          return ['Let', elements]

        case eLambda.typ:
          return [`Lambda (${_.join(_.map(node.params, p => '$' + p), ' ')})`, subExprs(node)]

        default:
          console.error('Unexpected node', node)
          //  throw new Error(node);
          return '#error'
      }
    }
  }

  escape (o: any): string {
    if (typeof o === 'string' && _.startsWith(o, '$')) {
      const s = JSON.stringify(o)
      return s.slice(1, s.length - 1)
    } else {
      return super.escape.call(this, o)
    }
  }
}

const exprRenderer = new ExprRenderer()

export class ExprBase {
  toString (): string {
    return exprRenderer.sExpr(this as never)
  }

  toText (): string {
    return exprRenderer.sExprLn(this as never)
  }

  /** Link to the source code */
  source: (TPNode | Token)[]

  // setSource (source: TPNode | TPNode[]): this{
  //   if (Array.isArray(source)) {
  //     this.source = source
  //   } else {
  //     this.source = [source]
  //   }
  //   return this
  // }
}
