
import { InputStream, CommonTokenStream, ParserRuleContext, tree, error } from 'antlr4'
import TPGrammarParser from '../generated/TPGrammarParser'
import TPGrammarLexer from '../generated/TPGrammarLexer'
const TerminalNodeImpl = tree.TerminalNodeImpl

export { TPGrammarParser as parser }

declare module 'antlr4' {

  export const tree: {
    TerminalNodeImpl: any
  }

  export const error: {
    ErrorListener: any
  }

}

declare module 'antlr4/ParserRuleContext' {
  interface ParserRuleContext {
    loneChild: any
    children: any[]
    token(): Token
    tokenAt(idx: number): Token
  }
}

/**
 * Allow prototype patching of anything
 */
function prototype (a: { prototype: any }): any {
  return a.prototype
}

/**
 * Tests if the previous token and the new token are
 * on different lines.
 * @return false is on the same line
 */
prototype(TPGrammarParser).newline = function () {
  const newToken = this.getCurrentToken()
  const stream = this.getTokenStream()
  const prevToken = stream.get(newToken.tokenIndex - 1)
  const nl = prevToken.line !== newToken.line
  return nl
}

function annotateParserWithContextName (parser: any): void {
  const suffix = 'Context'

  for (const attrName in parser) {
    if (attrName.endsWith(suffix)) {
      const contextName = attrName[0].toLowerCase() + attrName.slice(1, attrName.length - suffix.length)
      parser[attrName].prototype.contextName = contextName
    }
  }
}

annotateParserWithContextName(TPGrammarParser)

// Improvement of Antlr4

prototype(ParserRuleContext).loneChild = function () {
  const c = this.children
  if (c == null || c.length !== 1) {
    let result: any
    this.children.forEach((e: any) => {
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

prototype(ParserRuleContext).token = function () {
  if (this.start !== this.stop) {
    throw new Error('Not a token node')
  }
  return this.start
}

prototype(ParserRuleContext).tokenAt = function (idx: number) {
  const terminal = this.children[idx]
  if (terminal.symbol == null) {
    throw new Error('Not a token node')
  }
  return terminal.symbol
}

// Antlr4 typing

// Only take what we need.
export interface Token {
  text: string
  column: number
  line: number
  tokenIndex: number
  type: number
  source: [{}, {}]
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

export interface TopLevel extends N<'topLevel'> { definition: A<Definition[]>, expr: A<Expr> }

export type Expr = Simple | Call | UnOp | BinOp | UserOp
export interface Simple extends N<'simple'> { simpleExpr: A<SimpleExpr> }
export interface Call extends N<'call'> { expr: A<Expr>, apply: NA<Apply>, attr: NA<Attr> }
export interface UnOp extends N<'unOp'> { expr: A<Expr> }
export interface BinOp extends N<'binOp'> { expr: A<Expr[]> }
export interface UserOp extends N<'userOp'> { expr: A<Expr[]>, userOpId: A<UserOpId> }

export interface SimpleExpr extends N<'simpleExpr'> {
  loneChild: A<LiteralExpr | Expr | VarExpr | IfElseExpr | ShortLambdaExpr | LambdaExpr | LetExpr>
} // transparent node

export interface Definition extends N<'definition'> {
  loneChild: A<ValueDefinition | TupleDefinition | FunctionDefinition>
} // transparent node

export interface ValueDefinition extends N<'valueDefinition'> { typedVar: A<TypedVar>, expr: A<Expr> }
export interface FunctionDefinition extends N<'functionDefinition'> { functionId: A<FunctionId>, typedParams: NA<TypedParams>, typeAnnotation: N<TypeAnnotation>, expr: A<Expr> }
export interface TupleDefinition extends N<'tupleDefinition'> { typedVars: NA<TypedVars>, expr: A<Expr> }

export interface TypedVar extends N<'typedVar'> { varId: A<VarId>, typeAnnotation: A<TypeAnnotation> }
export interface TypedParam extends N<'typedParam'> { paramId: A<ParamId>, typeAnnotation: A<TypeAnnotation> }

interface TOKEN<T> extends N<T> { token: () => Token }

export type Attr = TOKEN<'attr'>
export type UserOpId = TOKEN<'userOpId'>
export type VarId = TOKEN<'varId'>
export type FunctionId = TOKEN<'functionId'>
export type ParamId = TOKEN<'paramId'>

export interface Apply extends N<'apply'> { args: NA<Args> }

export interface Arg extends N<'arg'> { expr: A<Expr> }

export type TypeAnnotation = N<'typeAnnotation'>

export type LiteralExpr = TOKEN<'literalExpr'>

export interface IfElseExpr extends N<'ifElseExpr'> { expr: A<Expr[]> }
export interface LambdaExpr extends N<'lambdaExpr'> { typedParams: NA<TypedParams>, expr: A<Expr> }
export interface ShortLambdaExpr extends N<'shortLambdaExpr'> { paramId: A<ParamId>, expr: A<Expr> }

export type VarExpr = TOKEN<'varExpr'>

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

export function tokenName (token: Token): string {
  const symbolic = TPGrammarLexer.symbolicNames[token.type]
  if (symbolic !== null) return symbolic
  const literal = TPGrammarLexer.literalNames[token.type]
  if (literal !== null) return literal
  return `${token.text}#${token.type}`
}

export function position (token: { line: number, column: number, text: { length: number } }): string {
  return `${token.line}:${token.column + 1}-${token.column + 1 + token.text.length}`
}

export function nodeName (node: TPNode): string {
  const ruleCategory = node.contextName

  const ruleName = node.parser.ruleNames[node.ruleIndex]
  return ruleName === ruleCategory ? ruleName : `${ruleCategory}:${ruleName}`
}

export function nodePosition (node: TPNode): string {
  if (node.start.line === node.stop.line) {
    return `${node.start.line}:${node.start.column + 1}-${node.stop.column + 1 + node.stop.text.length}`
  }
  return `${node.start.line}:${node.start.column + 1}-${node.stop.line}:${node.stop.column + 1 + node.stop.text.length}`
}

export function dump (node: TPNode, tab?: string): string {
  const _tab = tab ?? ''
  const nextTab = _tab + '  '
  let line = `${_tab}${nodeName(node)}\n`

  if (node.children !== null) {
    for (const subNode of node.children) {
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
  const chars = new InputStream(input)
  const lexer = new TPGrammarLexer(chars)
  const tokens = new CommonTokenStream(lexer as any)
  const parser = new TPGrammarParser(tokens) as any
  parser.buildParseTrees = true

  const errorListener = new error.ErrorListener()
  errorListener.syntaxError = function (recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: Error) {
    errorListener.failed = true
  }
  parser.addErrorListener(errorListener)

  const start = parser.topLevel()

  if (errorListener.failed === true) {
    throw new Error('Parsing error occurred')
  }

  return start
}

export class ParseError extends Error {
  node: TPNode

  constructor (msg: string, node: TPNode) {
    super(`${msg} ${nodePosition(node)}`)
    this.node = node
  }
}
