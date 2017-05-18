// @flow

import antlr4 from 'antlr4'
import { TPGrammarParser } from '../generated/TPGrammarParser'
import { TPGrammarLexer } from '../generated/TPGrammarLexer'
import _ from 'lodash'

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

export type Token = {
  text: string,
  column: number,
  line: number,
  tokenIndex: number,
  type: number,
  source: [{ literalNames: string[], symbolicNames: string[] }, {}]
}

export type Node = {
  symbol: ?Token,
  parser: { ruleNames: string[] },
  ruleIndex: number,
  start: Token,
  stop: Token,
  children: ?Node[]
}

/* eslint-disable */

// Typed version of Node for TPGrammar
type A<T> = () => T

type LetLike = Node & {
  definition: A<Definition[]>,
  expr: A<Expr>
}

type N<n> = Node & { contextName: n }
type TopLevel = LetLike & N<'topLevel'> 

type Expr = Simple | Call | UnOp | BinOp | UserOp
type Simple = N<'simple'> & { simpleExpr: A<SimpleExpr> }
type Call = N<'call'> & { expr: A<Expr>, apply: A<?Apply>, attr: A<?Attr> }
type UnOp= N<'unOp'> & { expr: A<Expr> }
type BinOp= N<'binOp'> & { expr: A<Expr[]> }
type UserOpExpr= N<'userOpExpr'> & { expr: A<Expr[]>, userOp: A<UserOp> }

type SimpleExpr = Node & { contextName: 'simpleExpr' } // transparent node

type Definition = Node & { contextName: 'definition' } // transparent node
type ValueDefinition = N<'valueDefinition'> & { typedVar: A<TypedVar>, expr: A<Expr> }
type FunctionDefinition = N<'functionDefintion'> & { functionId: A<FunctionId>, typedParams: A<?TypedParams>}
type TupleDefinition = N<'tupleDefinition'> & { typedVars : A<TypedVars>, expr: A<Expr> }

type TypedVar = N<'typedVar'> & { varId: A<VarId>, typeAnnotation: A<TypeAnnotation> }
type TypedParam = N<'typedParam'> & { varId: A<ParamId>, typeAnnotation: A<TypeAnnotation> }

type TOKEN<n> = N<n> & { /* accesseur à déterminer */ }

type Attr = TOKEN<'attr'>
type Method = TOKEN<'method'>
type UserOp = TOKEN<'userOp'>
type VarId = TOKEN<'varId'>
type FunctionId = TOKEN<'functionId'>
type ParamId = TOKEN<'paramId'>

type Apply = N<'apply'> & { args: A<?Args> }

type Arg = N<'args'> & { expr: A<Expr> }

type TypeAnnotation = N<'typeAnnotation'>

type LiteralExpr = TOKEN<'literalExpr'>

type IfElseExpr = N<'ifElseExpr'> & { expr: A<Expr[]> }
type LambdaExpr = N<'lambdaExpr'> & { typedParams: A<?TypedParams>, expr: A<Expr> }
type ShortLambdaExpr = N<'shortLambdaExpr'> & { paramId: A<ParamId>, expr: A<Expr> }

type VarExpr = TOKEN<'varExpr'>

type LetExpr = LetLike & { contextName: 'letExpr' } 

type Args = N<'arg'> & { args: A<Arg> }
type TypedParams = N<'typedParams'> & { args: A<TypedParam> }
type TypedVars = N<'typedArg'> & { args: A<TypedVars> }



export type TPNode = (TopLevel | LetExpr | ValueDefinition)

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

export function nodeName (node: Node) {
  // $TypingTrick
  const ruleClass: string = node.__proto__.constructor.name // eslint-disable-line
  const ruleCategory = node.contextName

  const ruleName = node.parser.ruleNames[node.ruleIndex]
  return ruleName === ruleCategory ? ruleName : ruleCategory + ':' + ruleName
}

export function dump (node: Node, tab: ?string): string {
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

export function parse (input: string): Node {
  const chars = new antlr4.InputStream(input)
  const lexer = new TPGrammarLexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)
  const parser = new TPGrammarParser(tokens)
  parser.buildParseTrees = true
  const start = parser.topLevel()
  return start
}
