// @flow

/* eslint-disable */

import type { Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue } from '../expr/Expr' // eslint-disable-line
import type { TPNode } from '../parsing/parser'

import { parser, nodeName, tokenName, tokenPosition, parse } from '../parsing/parser' // eslint-disable-line

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

export function toCore(expr: TPNode, env: Env): Expr {
  switch (expr.contextName) {
    // let-like
    case 'topLevel':
    case 'letExpr':
      const defs = expr.definition()
      if (defs.length !== 0) {
        throw new Error("Pas fini")
      }
      return toCore(expr.expr(), env)

    case 'simple':
      return toCore(expr.simpleExpr(), env)

    case 'simpleExpr':
      const child = expr.loneChild()
      if (child == null) throw new TypeError('Unexpected child')
      return toCore(child, env)

    case 'literalExpr':
      return eLiteral(42) // TODO: !!!!
  }

  throw new Error('À coder: ' + expr.contextName)
}

const emptyEnv = new Map()

try {
  const tree: any = parse(`
  (1)
  `)
  const core = toCore(tree, emptyEnv)

  console.log(core.toText())
} catch (e) {
  console.log(e)
}
