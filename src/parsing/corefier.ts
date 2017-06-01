
import {
  Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue,
  eApply, eVar, eLet, eLiteral, eLambda, eIfElse
} from '../expr/Expr'

import { TPNode, Token, parser, nodeName, tokenName, tokenPosition, parse, ParseError } from '../parsing/parser'

import { fastmap, flapmap, fasteach, zip } from '../utils/fastArray'
import { notnull, switchMap2 } from '../utils/prelude'

class VarMapping {
  storage: Map<string, string>

  constructor (storage: Map<string, string>) {
    this.storage = storage
  }

  resolve (token: Token): string {
    const id = token.text
    const r = this.storage.get(id)
    if (r === undefined) {
      throw new Error('Undefined var ' + id + ' ' + tokenPosition(token))
    }
    return r
  }

  resolveSpecial (token: Token, mapping: Map<number, string>): string {
    const id = mapping.get(token.type)
    if (id === undefined) throw Error('Unexpected token type: ' + token.type)
    const r = this.storage.get(id)
    if (r === undefined) throw new Error('Undefined var ' + token.text + ' ' + tokenPosition(token))
    return r
  }

  private static varCounter = 0

  extends (ids: string[]): VarMapping {
    const newMap = new Map(this.storage)

    fasteach(ids, id => {
      newMap.set(id, `_${++VarMapping.varCounter}_${id}`)
    })

    return new VarMapping(newMap)
  }
}

type Env = VarMapping

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

import {
  LetExpr, TopLevel, Simple, VarExpr, LiteralExpr,
  BinOp, UnOp, UserOp, Call, Definition, ValueDefinition, TupleDefinition, FunctionDefinition
} from './parser'

function extractIds (def: ValueDefinition | TupleDefinition | FunctionDefinition): Token | Token[] {
  switch (def.contextName) {
    case 'valueDefinition':
      return def.typedVar().varId().token()
    case 'tupleDefinition':
      return fastmap(typedVarList(def.typedVars()), tv => tv.varId().token())
    // case 'functionDefinition':
    default:
      return def.functionId().token()
  }
}

const toCoreSwitchMap = switchMap2<Expr, Env, Expr>({

  letExpr (expr: LetExpr | TopLevel, env: Env): Expr {
    const defs = fastmap(expr.definition(), d => d.loneChild())
    if (defs.length === 0) {
      return toCore(expr.expr(), env)
    } else {

      const ids: Token[] = flapmap(defs, extractIds)

      const newEnv = env.extends(ids.map(i => i.text))

      const zipped = zip(ids, defs)

      throw new Error('BAD')
      // const bindings = fastmap(zipped, (id, def) => {
      //   switch (def.contextName) {
      //     case 'valueDefinition':
      //       return [newEnv.get(id), eVar('A999s')]
      //     case 'tupleDefinition':
      //     // case 'functionDefinition':
      //     default:
      //       throw new Error('À Faire')
      //   }
      // })

      // return eLet(new Map(bindings), toCore(expr.expr(), newEnv))
    }
  },

  simple (expr: Simple, env: Env): Expr { // includes parenthesis expressions
    return toCore(expr.simpleExpr().loneChild(), env)
  },

  varExpr (expr: VarExpr, env: Env): Expr {
    const varExpr = eVar(env.resolve(expr.token()))
    varExpr.source = [expr]
    return varExpr
  },

  literalExpr (expr: LiteralExpr, env: Env): Expr {
    const token = expr.token()
    switch (token.type) {
      case parser.INTEGER:
        return eLiteral(parseIntAuto(token.text))

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

  binOp (expr: BinOp, env: Env): Expr {
    const opToken = expr.tokenAt(1)
    const varExpr = eVar(env.resolveSpecial(opToken, binOpFunctionName))
    varExpr.source = [opToken]
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  userOp (expr: UserOp, env: Env): Expr {
    const opToken = expr.userOpId()
    const varExpr = eVar(env.resolve(opToken.token()))
    varExpr.source = [opToken]
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  unOp (expr: UnOp, env: Env): Expr {
    const opToken = expr.tokenAt(0)
    const varExpr = eVar(env.resolveSpecial(opToken, unOpFunctionName))
    varExpr.source = [opToken]
    return eApply(varExpr, [toCore(expr.expr(), env)])
  },

  call (expr: Call, env: Env): Expr {
    const operator = toCore(expr.expr(), env)

    const apply = expr.apply()
    if (apply !== null) {
      const operands = fastmap(argList(apply.args()), x => toCore(x.expr(), env))
      return eApply(operator, operands)
    }

    throw new Error('PAS FINI')
  }

})

toCoreSwitchMap.set('topLevel', notnull(toCoreSwitchMap.get('letExpr')))

import { Args, TypedParams, TypedVars } from './parser'

const emptyList: any[] = []

function argList (args: Args | null) { return (args === null) ? emptyList : args.arg() }
function typedParamList (params: TypedParams | null) { return (params === null) ? emptyList : params.typedParam() }
function typedVarList (vars: TypedVars | null) { return (vars === null) ? emptyList : vars.typedVar() }

function toCore (expr: TPNode, env: Env): Expr {
  const toCoreExpr: any = toCoreSwitchMap.get(expr.contextName)
  if (toCoreExpr == null) throw new Error('À coder : ' + expr.contextName)
  const core = toCoreExpr(expr, env)
  core.source = [expr]  // TODO: arbitrer par rapport à ExprBase.setSource
  return core
}

function toCoreMap (exprs: TPNode[], env: Env): Expr[] {
  return fastmap(exprs, e => toCore(e, env))
}

const parseIntAutoRE = /((0x)|(0b))?(.*)/

function parseIntAuto (text: string) {
  const match = parseIntAutoRE.exec(text)
  if (match === null) throw new Error('Mismatch with grammar on integers: ' + text)
  if (match[2] !== undefined) { // tslint:disable-line
    return parseInt(match[4], 16)
  }
  if (match[3] !== undefined) { // tslint:disable-line
    return parseInt(match[4], 2)
  }
  return parseInt(match[4], 10)
}

console.log('start')

const emptyEnv = new VarMapping(new Map())

const tree: any = parse(`
{
//  a=1
//  (b,c)=1
//  foo(x)=x+1
  2+2
}
`)
const core = toCore(tree, emptyEnv)

console.log(core.toText())
