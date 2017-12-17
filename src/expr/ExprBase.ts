
import { ExprRenderer } from './ExprRenderer'
import { iteratorToArray, OneOrMany, isNotNull } from '../utils/prelude'
import * as _ from 'lodash'
import { TPNode, Token, position, nodePosition } from '../parsing/parser'
import { Expr } from './Expr'
import { fastmap } from '../utils/fastArray'

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

  debugInfo () {
    return debugInfo(this)
  }

  location () {
    return location(this)
  }
}

function debugInfo (data: { source?: OneOrMany<TPNode | Token | null> }) {
  const type = Object.getPrototypeOf(data).constructor.name

  return type + location(data)
}

function location (data: { source?: OneOrMany<TPNode | Token | null> }) {
  const source = data.source
  if (source == null) {
    return '@' + 'unknown location'
  } else if (!Array.isArray(source)) {
    return '@' + sourcePosition(source)
  } else {
    return '@' + fastmap(source.filter(isNotNull), sourcePosition).join('|')
  }
}

function isToken (t: any): t is Token {
  return t.text !== undefined && t.line !== undefined && t.column !== undefined // FIXME: should check real Antlr4 token type
}

export function sourcePosition (source: TPNode | Token) {
  if (isToken(source)) {
    return position(source)
  } else {
    return nodePosition(source)
  }
}
