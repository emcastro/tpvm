// @flow

/* eslint-disable */

import antlr4 from 'antlr4'
import { TerminalNode } from 'antlr4/tree/Tree'
import { TPGrammarParser } from '../generated/TPGrammarParser'
import { TPGrammarLexer } from '../generated/TPGrammarLexer'
import _ from 'lodash'
import type { Node, Token, Terminal } from './parserSupport'
import { nodeName, tokenName } from './parserSupport'

// const input = 'true'
const chars = new antlr4.InputStream('a+b+2.0')
const lexer = new TPGrammarLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new TPGrammarParser(tokens)
parser.buildParseTrees = true
const tree: Node = parser.start()

function dump(node: Node, tab: string): string {
  const nextTab = tab+'  '
  let line = tab + nodeName(node) + '\n'

  for (let subNode : any of node.children) {
    if (typeof subNode.symbol !== 'undefined') {
      line += nextTab + tokenName(subNode.symbol) + ' ' + subNode.symbol.text + '\n'
    }
    else {
      line += dump(subNode, nextTab)
    }
  }
  return line
}

function dumpSymbol(node: Terminal, tab: string): string {
  return tab + tokenName(node.symbol) + ' ' + node.symbol.text + '\n'
}

console.log(dump(tree, '+'))
