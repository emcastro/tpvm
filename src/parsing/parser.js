// @flow

import antlr4 from 'antlr4'
import { TPGrammarParser } from '../generated/TPGrammarParser'
import { TPGrammarLexer } from '../generated/TPGrammarLexer'
// import { TPGrammarVisitor } from '../generated/TPGrammarVisitor'

// const input = 'true'
const chars = new antlr4.InputStream('a+b+2.0')
const lexer = new TPGrammarLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new TPGrammarParser(tokens)
parser.buildParseTrees = true
const tree = parser.start()
console.log(nodeName(tree))

type Token = {
  text: string,
  column: number,
  line: number,
  tokenIndex: number,
  type: number,
  source: [{ literalNames: Array<string>, symbolicNames: Array<string> }, {}]
}

type Node = {
  parser: { ruleNames: Array<string> },
  ruleIndex: number,
  start: Token,
  stop: Token
}

function tokenName (token: Token) {
  const symbolic = token.source[0].symbolicNames[token.type]
  if (symbolic != null) return symbolic
  const litral = token.source[0].literalNames[token.type]
  if (litral != null) return litral
  return token.text + '#' + token.type
}

function nodeName (node: Node) {
  return node.parser.ruleNames[node.ruleIndex]
}

class MyWalker extends antlr4.tree.ParseTreeListener {
  enterEveryRule (ctx: Node) {
    // console.log(ctx)
    console.log(nodeName(ctx))
    if (ctx.ruleIndex === TPGrammarParser.RULE_varExpr) {
      console.log('VAR')
    }
    console.log(ctx.start.text, tokenName(ctx.start))
    console.log(ctx.stop.text, tokenName(ctx.stop))
    console.log('===========')
  }
}

antlr4.tree.ParseTreeWalker.DEFAULT.walk(new MyWalker(), tree)
