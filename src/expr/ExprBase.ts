
import { ExprRenderer } from './ExprRenderer'
import { OneOrMany, isNotNull, emptySet } from '../utils/prelude'
import { TPNode, Token, position, nodePosition } from '../parsing/parser'
import { Expr } from './Expr'
import { freeVars } from './freeVars'

export type LiteralValue = string | number | boolean
export type Binding = [string, Expr]

export class ExprBase {
  static exprRenderer = new ExprRenderer()

  toString (): string {
    return ExprBase.exprRenderer.sExpr(this as never)
  }

  toText (): string {
    return ExprBase.exprRenderer.sExprLn(this as never)
  }

  /** Link to the source code */
  source?: OneOrMany<TPNode | Token | null>

  setSource (source: OneOrMany<TPNode | Token | null>): this {
    this.source = source
    return this
  }

  debugInfo (): string {
    return debugInfo(this)
  }

  location (): string {
    return location(this)
  }

  freeVars (): Set<String> {
    return freeVars(this as any, emptySet())
  }
}

function debugInfo (data: { source?: OneOrMany<TPNode | Token | null> }): string {
  const type: string = Object.getPrototypeOf(data).constructor.name

  return type + location(data)
}

function location (data: { source?: OneOrMany<TPNode | Token | null> }): string {
  const source = data.source
  if (source == null) {
    return '@unknown location'
  } else if (!Array.isArray(source)) {
    return `@${sourcePosition(source)}`
  } else {
    return `@${source.filter(isNotNull).map(sourcePosition).join('|')}`
  }
}

function isToken (t: any): t is Token {
  return t.text !== undefined && t.line !== undefined && t.column !== undefined // TODO: should check real Antlr4 token type
}

export function sourcePosition (source: TPNode | Token): string {
  if (isToken(source)) {
    return position(source)
  } else {
    return nodePosition(source)
  }
}
