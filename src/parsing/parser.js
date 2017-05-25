// @flow

import antlr4 from 'antlr4'
import { TerminalNode, TerminalNodeImpl } from 'antlr4/tree/Tree' // eslint-disable-line
import { TPGrammarParser } from '../generated/TPGrammarParser'
import { TPGrammarLexer } from '../generated/TPGrammarLexer'
import _ from 'lodash'
import { fasteach } from '../utils/fastArray'

export { TPGrammarParser as parser }

function annotateParserWithContextName (parser: antlr4.Parser) {
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
    let result
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

antlr4.ParserRuleContext.prototype.tokenAt = function (idx) {
  const terminal = this.children[idx]
  if (terminal.symbol == null) {
    throw new Error('Not a token node')
  }
  return terminal.symbol
}

// Antlr4 typing

export type Token = {
  text: string,
  column: number,
  line: number,
  tokenIndex: number,
  type: number,
  source: [{ literalNames: string[], symbolicNames: string[] }, {}]
}

/* eslint-disable no-use-before-define */

type Node = {
  symbol: ?Token,
  parser: { ruleNames: string[] },
  ruleIndex: number,
  start: Token,
  stop: Token,
  children: ?TPNode[]
}

// Typeing assistance for Nodes for TPGrammar
type A<T> = () => (T)

type N<n> = Node & { contextName: n, tokenAt: number => Token }

export type TopLevel = N<'topLevel'> & { definition: A<Definition[]>, expr: A<Expr> }

export type Expr = Simple | Call | UnOp | BinOp | UserOpExpr
export type Simple = N<'simple'> & { simpleExpr: A<SimpleExpr> }
export type Call = N<'call'> & { expr: A<Expr>, apply: A<?Apply>, attr: A <?Attr> }
export type UnOp = N<'unOp'> & { expr: A<Expr> }
export type BinOp = N<'binOp'> & { expr: A<Expr[]> }
export type UserOpExpr = N<'userOpExpr'> & { expr: A<Expr[]>, userOp: A<UserOp> }

export type SimpleExpr = N<'simpleExpr'> & {
  loneChild: A<LiteralExpr | Expr | VarExpr | IfElseExpr | ShortLambdaExpr | LambdaExpr | LetExpr>,
} // transparent node

export type Definition = N<'definition'> & {
  loneChild: A<ValueDefinition | TupleDefinition | FunctionDefinition>
} // transparent node

export type ValueDefinition = N<'valueDefinition'> & { typedVar: A<TypedVar>, expr: A<Expr> }
export type FunctionDefinition = N<'functionDefintion'> & { functionId: A<FunctionId>, typedParams: A<?TypedParams>}
export type TupleDefinition = N<'tupleDefinition'> & { typedVars: A<TypedVars>, expr: A<Expr> }

export type TypedVar = N<'typedVar'> & { varId: A<VarId>, typeAnnotation: A<TypeAnnotation> }
export type TypedParam = N<'typedParam'> & { varId: A<ParamId>, typeAnnotation: A<TypeAnnotation> }

type TOKEN<n> = N<n> & { token: () => Token }

export type Attr = TOKEN<'attr'>
export type Method = TOKEN<'method'>
export type UserOp = TOKEN<'userOp'>
export type VarId = TOKEN<'varId'>
export type FunctionId = TOKEN<'functionId'>
export type ParamId = TOKEN<'paramId'>

export type Apply = N<'apply'> & { args: A<?Args> }

export type Arg = N<'args'> & { expr: A<Expr> }

export type TypeAnnotation = N<'typeAnnotation'>

export type LiteralExpr = TOKEN<'literalExpr'>

export type IfElseExpr = N<'ifElseExpr'> & { expr: A<Expr[]> }
export type LambdaExpr = N<'lambdaExpr'> & { typedParams: A<?TypedParams>, expr: A<Expr> }
export type ShortLambdaExpr = N<'shortLambdaExpr'> & { paramId: A<ParamId>, expr: A<Expr> }

export type VarExpr = TOKEN<'varExpr'>

export type LetExpr = N<'letExpr'> & { definition: A<Definition[]>, expr: A<Expr> }

export type Args = N<'arg'> & { args: A<Arg> }
export type TypedParams = N<'typedParams'> & { args: A<TypedParam> }
export type TypedVars = N<'typedArg'> & { args: A<TypedVars> }

export type TPNode = (
  TopLevel | LetExpr
  | Definition | ValueDefinition | FunctionDefinition | TupleDefinition
  | TypedVar | TypedVars | Arg | Args | TypedParams | TypedParam
  | Attr | Method | UserOp | VarId | FunctionId | ParamId
  | Apply | TypeAnnotation
  | IfElseExpr | LambdaExpr | ShortLambdaExpr
  | VarExpr | LiteralExpr | SimpleExpr | Expr
)

/* eslint-enable no-use-before-define */

// Information accessors

export function tokenName (token: Token) {
  const symbolic = token.source[0].symbolicNames[token.type]
  if (symbolic != null) return symbolic
  const literal = token.source[0].literalNames[token.type]
  if (literal != null) return literal
  return token.text + '#' + token.type
}

export function tokenPosition (token: Token) {
  return `${token.line}:${token.column + 1}`
}

export function nodeName (node: TPNode) {
  // $TypingTrick
  const ruleClass: string = node.__proto__.constructor.name // eslint-disable-line
  const ruleCategory = node.contextName

  const ruleName = node.parser.ruleNames[node.ruleIndex]
  return ruleName === ruleCategory ? ruleName : ruleCategory + ':' + ruleName
}

export function nodePosition (node: TPNode) {
  if (node.start.line === node.stop.line) {
    return `${node.start.line}:${node.start.column + 1}-${node.stop.column + 1}`
  }
  return `${node.start.line}:${node.start.column + 1}`
}

export function dump (node: TPNode, tab: ?string): string {
  const _tab = tab || ''
  const nextTab = _tab + '  '
  let line = _tab + nodeName(node) + '\n'

  if (node.children != null) {
    for (let subNode of node.children) {
      if (subNode.symbol != null) {
        const symbol = subNode.symbol
        line += nextTab + tokenName(symbol) + ' ' + symbol.text + '   @' + tokenPosition(symbol) + '\n'
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
  const start = parser.topLevel()
  return start
}

export class ParseError extends Error {
  node: TPNode

  constructor (msg: string, node: TPNode) {
    super(msg + ' ' + nodePosition(node))
  }
}
