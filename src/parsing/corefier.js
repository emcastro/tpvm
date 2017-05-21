// @flow

/* eslint-disable */

import type { Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue } from '../expr/Expr' // eslint-disable-line
import type { TPNode } from '../parsing/parser'

import { parser, nodeName, tokenName, tokenPosition, parse, ParseError } from '../parsing/parser' // eslint-disable-line
import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from '../expr/Expr'

type Env = Map<string, string>

function newEnv(env: Env, ids: string[]): Env {
  throw Error('à coder')
}

const binOpFunctionName = new Map([
  [parser.OR, '__or__'],
  [parser.AND, '__and__'],
  [parser.CONCAT, '__concat__'],
  [parser.MINUSMINUS, '__minusminus__'],
  [parser.PLUS, '__plus__'],
  [parser.MINUS, '__minus__'],
  [parser.MUL, '__minus__'],
  [parser.DIV, '__div__'],

  [parser.EQ, '__eq__'],
  [parser.LT, '__lt__'],
  [parser.LE, '__le__'],
  [parser.GT, '__gt__'],
  [parser.GE, '__ge__'],
  [parser.NEQ, '__neq__']
])

const unOpFunctionName = new Map([
  [parser.NOT, '__not__'],
  [parser.PLUS, '__unary_plus__'],
  [parser.MINUS, '__unary_minus__']
])

function toCore(expr: TPNode, env: Env): Expr {
  const core = _toCore(expr, env)
  core.source = [expr]  // TODO: arbitrer par rapport à ExprBase.setSource
  return core
}

function _toCore(expr: TPNode, env: Env): Expr {
  switch (expr.contextName) {
    // let-like
    case 'topLevel':
    case 'letExpr': {
      const defs = expr.definition()
      if (defs.length !== 0) {
        throw new Error("Pas fini")
      }
      return toCore(expr.expr(), env)
    }
    case 'simple': {
      return toCore(expr.simpleExpr(), env)
    }
    case 'simpleExpr': {
      return toCore(expr.loneChild(), env)
    }
    case 'literalExpr': {
      const token = expr.token()
      switch (token.type) {
        case parser.INTEGER:
          return eLiteral(parseInt(token.text))
        case parser.FLOAT:
          return eLiteral(parseFloat(token.text))

        case parser.BOOLEAN:
          return eLiteral(token.text === 'true')

        case parser.STRING:
          return eLiteral(JSON.parse(token.text))

        case parser.NATIVE:
          return eLiteral(Symbol.for(token.text.slice(1)))

        default:
          throw new ParseError("Invalid literal", expr)
      }
    }
  }

  throw new Error('À coder: ' + expr.contextName)
}

const emptyEnv = new Map()

try {
  const tree: any = parse(`
  (#true)
  `)
  const core = toCore(tree, emptyEnv)

  console.log(core.toText())
} catch (e) {
  console.log(e)
}
