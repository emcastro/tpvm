// @flow

/* eslint-disable */

import type { Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue } from '../expr/Expr' // eslint-disable-line
import type { TPNode } from '../parsing/parser'

import { parser, nodeName, tokenName, tokenPosition, parse, ParseError } from '../parsing/parser' // eslint-disable-line
import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from '../expr/Expr'

import { fastmap } from '../utils/fastArray'
import { notnull, switchMap2 } from '../utils/prelude'

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

import type { 
  LetExpr, TopLevel, Simple, VarExpr, LiteralExpr,
    BinOp, UnOp, UserOpExpr
} from './parser'


const toCoreSwitchMap = switchMap2({
  letExpr(expr: LetExpr | TopLevel, env: Env) {
    const defs = expr.definition()
    if (defs.length !== 0) {
      throw new Error('Pas fini')
    }
    return toCore(expr.expr(), env)
  },

  simple(expr: Simple, env: Env) { // includes parenthesis expressions
    return toCore(expr.simpleExpr().loneChild(), env)
  },

  varExpr(expr: VarExpr, env: Env) {
    const varExpr = eVar(expr.token().text)
    varExpr.source = [expr]
    return varExpr
  },

  literalExpr(expr: LiteralExpr, env: Env) {
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
        throw new ParseError('Invalid literal', expr)
    }
  },

  binOp(expr: BinOp, env: Env) {
    const opToken = expr.tokenAt(1)
    const varExpr = eVar(notnull(binOpFunctionName.get(opToken.type)))
    varExpr.source = [opToken]
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  userOpExpr(expr: UserOpExpr, env: Env) {
    const opToken = expr.userOp()
    const varExpr = eVar(opToken.token().text)
    varExpr.source = [opToken]
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  unOp(expr: UnOp, env: Env) {
    const opToken = expr.tokenAt(0)
    const varExpr = eVar(notnull(unOpFunctionName.get(opToken.type)))
    varExpr.source = [opToken]
    return eApply(varExpr, [toCore(expr.expr(), env)])
  }

})

toCoreSwitchMap.set('topLevel', notnull(toCoreSwitchMap.get('letExpr')))

function toCore(expr: TPNode, env: Env): Expr {
  const toCoreExpr : any = toCoreSwitchMap.get(expr.contextName)
  if (toCoreExpr == null) throw new Error('À coder : ' + expr.contextName)
  const core = toCoreExpr(expr, env)
  core.source = [expr]  // TODO: arbitrer par rapport à ExprBase.setSource
  return core
}

function toCoreMap(expr: $ReadOnlyArray<TPNode>, env: Env): Expr[] {
  return fastmap(expr, e => toCore(e, env))
}

const emptyEnv = new Map()

try {
  const tree: any = parse(`
  {plus(a,b)}
  `)
  const core = toCore(tree, emptyEnv)

  console.log(core.toText())
} catch (e) {
  console.log(e)
}
