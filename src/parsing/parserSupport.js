// @flow

// import type { TerminalNode } from 'antlr4'

export type Token = {
  text: string,
  column: number,
  line: number,
  tokenIndex: number,
  type: number,
  source: [{ literalNames: Array<string>, symbolicNames: Array<string> }, {}]
}

export type Terminal = {
  symbol: Token
}

export type Node = {
  parser: { ruleNames: Array<string> },
  ruleIndex: number,
  start: Token,
  stop: Token,
  children: Array<Terminal | Node>
}

export function tokenName (token: Token) {
  const symbolic = token.source[0].symbolicNames[token.type]
  if (symbolic != null) return symbolic
  const litral = token.source[0].literalNames[token.type]
  if (litral != null) return litral
  return token.text + '#' + token.type
}

export function nodeName (node: Node) {
  return node.parser.ruleNames[node.ruleIndex]
}
