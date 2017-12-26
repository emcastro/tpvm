
const antlr4 = require('antlr4')
const { TerminalNodeImpl } = require('antlr4/tree/Tree')
const { TPGrammarParser } = require('../generated/TPGrammarParser')
const { TPGrammarLexer } = require('../generated/TPGrammarLexer')
const { ErrorListener } = require('antlr4/error/ErrorListener')
import * as _ from 'lodash'
import { fasteach } from '../utils/fastArray'

export { TPGrammarParser as parser }

/**
 * Tests if the previous token and the new token are
 * on different lines.
 * @return false is on the same line
 */
TPGrammarParser.prototype.newline = function () {
  const newToken = this.getCurrentToken()
  const stream = this.getTokenStream()
  const prevToken = stream.get(newToken.tokenIndex - 1)
  const nl = prevToken.line !== newToken.line
  return nl
}

function annotateParserWithContextName (parser: any) {
  const suffix = 'Context'

  for (let attrName in parser) {
    if (attrName.endsWith(suffix)) {
      const contextName = _.lowerFirst(attrName.slice(0, attrName.length - suffix.length))
      parser[attrName].prototype.contextName = contextName
    }
  }
}

annotateParserWithContextName(TPGrammarParser)

// Improvement of Antlr4

antlr4.ParserRuleContext.prototype.loneChild = function () {
  const c = this.children
  if (c == null || c.length !== 1) {
    let result: any
    fasteach(this.children, e => {
      // if (!(e instanceof TerminalNode)) {
      if (e.constructor !== TerminalNodeImpl) {
        if (result !== undefined) {
          throw new Error('Not a lone-child node: too many children')
        }
        result = e
      }
    })
    if (result === undefined) {
      throw new Error('Not a lone-child node: no children')
    }
    return result
  }
  return c[0]
}

antlr4.ParserRuleContext.prototype.token = function () {
  if (this.start !== this.stop) {
    throw new Error('Not a token node')
  }
  return this.start
}

antlr4.ParserRuleContext.prototype.tokenAt = function (idx: number) {
  const terminal = this.children[idx]
  if (terminal.symbol == null) {
    throw new Error('Not a token node')
  }
  return terminal.symbol
}

// Antlr4 typing

export interface Token {
  text: string
  column: number
  line: number
  tokenIndex: number
  type: number
  source: [{ literalNames: (string | null)[], symbolicNames: (string | null)[] }, {}]
}

export interface Node<N> {
  symbol?: Token // FIXME: analyze symbol field
  parser: { ruleNames: string[] }
  ruleIndex: number
  start: Token
  stop: Token
  children: TPNode[] | null
  contextName: N
  tokenAt: (n: number) => Token
}

// Typing assistance for Nodes for TPGrammar
type A<T> = () => (T)
type NA<T> = () => (T | null)

type N<T> = Node<T>

export interface TopLevel extends N<'topLevel'> { definition: A<Definition[]>; expr: A<Expr> }

export type Expr = Simple | Call | UnOp | BinOp | UserOp
export interface Simple extends N<'simple'> { simpleExpr: A<SimpleExpr> }
export interface Call extends N<'call'> { expr: A<Expr>; apply: NA<Apply>; attr: NA<Attr> }
export interface UnOp extends N<'unOp'> { expr: A<Expr> }
export interface BinOp extends N<'binOp'> { expr: A<Expr[]> }
export interface UserOp extends N<'userOp'> { expr: A<Expr[]>; userOpId: A<UserOpId> }

export interface SimpleExpr extends N<'simpleExpr'> {
  loneChild: A<LiteralExpr | Expr | VarExpr | IfElseExpr | ShortLambdaExpr | LambdaExpr | LetExpr>
} // transparent node

export interface Definition extends N<'definition'> {
  loneChild: A<ValueDefinition | TupleDefinition | FunctionDefinition>
} // transparent node

export interface ValueDefinition extends N<'valueDefinition'> { typedVar: A<TypedVar>; expr: A<Expr> }
export interface FunctionDefinition extends N<'functionDefinition'> { functionId: A<FunctionId>; typedParams: NA<TypedParams>; typeAnnotation: N<TypeAnnotation>; expr: A<Expr> }
export interface TupleDefinition extends N<'tupleDefinition'> { typedVars: NA<TypedVars>; expr: A<Expr> }

export interface TypedVar extends N<'typedVar'> { varId: A<VarId>; typeAnnotation: A<TypeAnnotation> }
export interface TypedParam extends N<'typedParam'> { paramId: A<ParamId>; typeAnnotation: A<TypeAnnotation> }

interface TOKEN<T> extends N<T> { token: () => Token }

export interface Attr extends TOKEN<'attr'> { }
export interface UserOpId extends TOKEN<'userOpId'> { }
export interface VarId extends TOKEN<'varId'> { }
export interface FunctionId extends TOKEN<'functionId'> { }
export interface ParamId extends TOKEN<'paramId'> { }

export interface Apply extends N<'apply'> { args: NA<Args> }

export interface Arg extends N<'arg'> { expr: A<Expr> }

export interface TypeAnnotation extends N<'typeAnnotation'> { }

export interface LiteralExpr extends TOKEN<'literalExpr'> { }

export interface IfElseExpr extends N<'ifElseExpr'> { expr: A<Expr[]> }
export interface LambdaExpr extends N<'lambdaExpr'> { typedParams: NA<TypedParams>, expr: A<Expr> }
export interface ShortLambdaExpr extends N<'shortLambdaExpr'> { paramId: A<ParamId>, expr: A<Expr> }

export interface VarExpr extends TOKEN<'varExpr'> { }

export interface LetExpr extends N<'letExpr'> { definition: A<Definition[]>, expr: A<Expr> }

export interface Args extends N<'args'> { arg: A<Arg[]> }
export interface TypedParams extends N<'typedParams'> { typedParam: A<TypedParam[]> }
export interface TypedVars extends N<'typedArg'> { typedVar: A<TypedVar[]> }

export type TPNode = (
  TopLevel | LetExpr
  | Definition | ValueDefinition | FunctionDefinition | TupleDefinition
  | TypedVar | TypedVars | Arg | Args | TypedParams | TypedParam
  | Attr | UserOpId | VarId | FunctionId | ParamId
  | Apply | TypeAnnotation
  | IfElseExpr | LambdaExpr | ShortLambdaExpr
  | VarExpr | LiteralExpr | SimpleExpr | Expr
)

// Information accessors

export function tokenName (token: Token) {
  const symbolic = token.source[0].symbolicNames[token.type]
  if (symbolic !== null) return symbolic
  const literal = token.source[0].literalNames[token.type]
  if (literal !== null) return literal
  return `${token.text}#${token.type}`
}

export function position (token: { line: number, column: number, text: { length: number } }) {
  return `${token.line}:${token.column + 1}-${token.column + 1 + token.text.length}`
}

export function nodeName (node: TPNode) {
  const ruleCategory = node.contextName

  const ruleName = node.parser.ruleNames[node.ruleIndex]
  return ruleName === ruleCategory ? ruleName : `${ruleCategory}:${ruleName}`
}

export function nodePosition (node: TPNode) {
  if (node.start.line === node.stop.line) {
    return `${node.start.line}:${node.start.column + 1}-${node.stop.column + 1 + node.stop.text.length}`
  }
  return `${node.start.line}:${node.start.column + 1}-${node.stop.line}:${node.stop.column + 1 + node.stop.text.length}`
}

export function dump (node: TPNode, tab?: string): string {
  const _tab = tab || ''
  const nextTab = _tab + '  '
  let line = `${_tab}${nodeName(node)}\n`

  if (node.children !== null) {
    for (let subNode of node.children) {
      if (subNode.symbol !== undefined) {
        const symbol = subNode.symbol
        line += `${nextTab}${tokenName(symbol)} ${symbol.text}   @${position(symbol)}\n`
      } else {
        line += dump(subNode, nextTab)
      }
    }
  }
  return line
}

export function parse (input: string): TPNode {
  const chars = new antlr4.InputStream(input)
  const lexer = new TPGrammarLexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)
  const parser = new TPGrammarParser(tokens)
  parser.buildParseTrees = true

  const errorListener = new ErrorListener()
  errorListener.syntaxError = function (recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: Error) {
    errorListener.failed = true
  }
  parser.addErrorListener(errorListener)

  const start = parser.topLevel()

  if (errorListener.failed) {
    throw new Error('Parsing error occurred')
  }

  return start
}

export class ParseError extends Error {
  node: TPNode

  constructor (msg: string, node: TPNode) {
    super(`${msg} ${nodePosition(node)}`)
  }
}
