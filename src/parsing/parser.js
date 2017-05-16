// @flow

import antlr4 from 'antlr4'
import { TPGrammarParser } from '../generated/TPGrammarParser'
import { TPGrammarLexer } from '../generated/TPGrammarLexer'
import _ from 'lodash'

export type Token = {
  text: string,
  column: number,
  line: number,
  tokenIndex: number,
  type: number,
  source: [{ literalNames: Array<string>, symbolicNames: Array<string> }, {}]
}

export type Node = {
  symbol: ?Token,
  parser: { ruleNames: Array<string> },
  ruleIndex: number,
  start: Token,
  stop: Token,
  children: ?Array<Node>
}

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
  const ruleCategory = _.lowerFirst(ruleClass.slice(0, ruleClass.length - 7)) // 7 = "Context".length

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
  const start = parser.start()
  return start
}
