
import {
  Expr,
  eApply, eVar, eLet, eLiteral, eLambda, eIfElse
} from '../expr/Expr'

import {
  TPNode, Token, parser, tokenName, position, ParseError, Expr as PExpr,
  Args, TypedParams, TypedVars, Arg, TypedParam, TypedVar,
  LetExpr, TopLevel, Simple, VarExpr, LiteralExpr,
  BinOp, UnOp, UserOp, Call, ValueDefinition, TupleDefinition, FunctionDefinition,
  IfElseExpr, Apply as PApply, ShortLambdaExpr, MethodDefinition
} from './parser'

import { flapmap, safeNewMap } from '../utils/fastArray'
import { memo, MayBe, emptyList, assertNever } from '../utils/prelude'
import { eStrict } from '../generated/genExpr'

const METHOD_PREFIX = '_'

class ReferenceError extends Error {
}

class VarMapping {
  constructor (public storage: Map<string, string>, public autodef: boolean) { }

  resolve (token: Token): string {
    const id = token.text
    const r = this.storage.get(id)
    if (r === undefined) {
      if (this.autodef) {
        return id
      } else {
        throw new ReferenceError(`Undefined var ${id} @${position(token)}`)
      }
    }
    return r
  }

  resolveIfDefined (prefix: string, token: Token): MayBe<string> {
    const id = prefix + (token.text)
    return this.storage.get(id)
  }

  resolveSpecial (token: Token, mapping: Map<number, string>): string {
    const id = mapping.get(token.type)
    if (id === undefined) throw Error(`Unexpected token type: ${tokenName(token)}`)
    const r = this.storage.get(id)
    if (r === undefined) {
      if (this.autodef) {
        return id
      } else {
        throw new ReferenceError(`Undefined var ${id}(${token.text}) @${position(token)}`)
      }
    } return r
  }

  private static varCounter = 0

  extends (ids: Token[]): VarMapping {
    const newMap = new Map(this.storage)

    const added = new Set()
    ids.forEach(id => {
      if (added.has(id.text)) {
        throw new ReferenceError(`Duplicate var ${id.text} @${position(id)}`)
      }
      added.add(id.text)
      newMap.set(id.text, `${id.text}_${++VarMapping.varCounter}`)
    })

    return new VarMapping(newMap, this.autodef)
  }
}

class FreshToken {
  text: string
  column!: number
  line!: number
  tokenIndex!: number
  type!: number
  source!: [{ literalNames: Array<string | null>, symbolicNames: Array<string | null> }, {}]

  constructor (token: Token) {
    Object.assign(this, token)
    this.text = `fv${FreshToken.counter++}`
  }

  static counter = 0
}

type Env = VarMapping

const binOpFunctionName = safeNewMap([
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

const unOpFunctionName = safeNewMap([
  [parser.NOT, '__not__'],
  [parser.PLUS, '__unary_plus__'],
  [parser.MINUS, '__unary_minus__']
])

type AnyDefinition = ValueDefinition | TupleDefinition | FunctionDefinition

function extractValueId (def: ValueDefinition): Token {
  return def.typedVar().varId().token()
}

function extractTupleIds (def: TupleDefinition): Token[] {
  return typedVarList(def.typedVars()).map(tv => tv.varId().token())
}

function extractFunctionId (def: FunctionDefinition | MethodDefinition): Token {
  return def.functionId().token()
}

// const toCoreSwitchMap = switchMap2<Expr, Env, Expr>({
const toCoreSwitchMap: { [name: string]: (expr: any, env: Env) => Expr } = {

  letExpr: letExpr,
  topLevel: letExpr,

  simple (expr: Simple, env: Env): Expr { // includes parenthesis expressions
    return toCore(expr.simpleExpr().loneChild(), env)
  },

  varExpr (expr: VarExpr, env: Env): Expr {
    return eVar(env.resolve(expr.token())).setSource(expr)
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

  ifElseExpr (expr: IfElseExpr, env: Env): Expr {
    const exprs = expr.expr()
    return eIfElse(eStrict(toCore(exprs[0], env)), toCore(exprs[1], env), toCore(exprs[2], env))
  },

  binOp (expr: BinOp, env: Env): Expr {
    const opToken = expr.tokenAt(1)
    const varExpr = eVar(env.resolveSpecial(opToken, binOpFunctionName)).setSource(opToken)
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  userOp (expr: UserOp, env: Env): Expr {
    const opToken = expr.userOpId()
    const varExpr = eVar(env.resolve(opToken.token())).setSource(opToken)
    return eApply(varExpr, toCoreMap(expr.expr(), env))
  },

  unOp (expr: UnOp, env: Env): Expr {
    const opToken = expr.tokenAt(0)
    const varExpr = eVar(env.resolveSpecial(opToken, unOpFunctionName)).setSource(opToken)
    return eApply(varExpr, [toCore(expr.expr(), env)])
  },

  call (expr: Call, env: Env): Expr {
    const apply = expr.apply()
    const attr = expr.attr()

    const operator = toCore(expr.expr(), env)

    if (attr !== null) {
      const attrName = env.resolveIfDefined(METHOD_PREFIX, attr.token())

      if (attrName === undefined) {
        // no method-like function → call js method
        const attrLiteral = [eLiteral(attr.token().text).setSource(attr)]
        if (apply === null) { // expr.attr => expr('attr')
          return eApply(eStrict(operator), attrLiteral)
        } else { // expr.attr(apply) => expr('attr')(apply...)
          return eApply(eStrict(eApply(eStrict(operator), attrLiteral)), operands(apply, env))
        }
      } else {
        // method-like function found. Just call it.
        const attrVar = eVar(attrName).setSource(attr)
        if (apply === null) { // expr.attr => _attr(expr)
          return eApply(eStrict(attrVar), [operator])
        } else { // expr.attr(apply) => _attr(expr, apply...)
          const ops = operands(apply, env)
          ops.unshift(operator)
          return eApply(eStrict(attrVar), ops)
        }
      }
    } else { // expr(apply...)
      if (apply === null) throw new Error('Unexpected missing apply')
      return eApply(eStrict(operator), operands(apply, env))
    }
  },

  lambdaExpr: lambdaExpr,

  shortLambdaExpr (lambda: ShortLambdaExpr, env: Env): Expr {
    const param = lambda.paramId().token()
    const newEnv = env.extends([param])

    return eLambda([newEnv.resolve(param)], toCore(lambda.expr(), newEnv))
  }

}

function letExpr (expr: LetExpr | TopLevel, env: Env): Expr {
  const defs = expr.definition().map(d => d.loneChild())
  if (defs.length === 0) {
    return toCore(expr.expr(), env)
  } else {
    // Memoization of fresh var building, because each fresh var must be built only once
    const freshVar = memo((def: AnyDefinition) => new FreshToken(def.start))

    const ids = flapmap(defs, (def) => {
      switch (def.contextName) {
        case 'valueDefinition': return extractValueId(def)
        case 'functionDefinition': return extractFunctionId(def)
        case 'methodDefinition': {
          const token = extractFunctionId(def)
          return { ...token, text: `_${token.text}` }
        }
        case 'tupleDefinition': {
          const ids = extractTupleIds(def)
          ids.push(freshVar(def)) // One fresh var for each tuple definition
          return ids
        }
        default:
          assertNever(def)
      }
    })

    const newEnv = env.extends(ids)

    const bindings: Array<[string, Expr]> = flapmap(defs, (def): Array<[string, Expr]> => {
      switch (def.contextName) {
        case 'valueDefinition': {
          const id = extractValueId(def)
          return [[newEnv.resolve(id), toCore(def.expr(), newEnv)]]
        }

        case 'functionDefinition': {
          const id = extractFunctionId(def)
          return [[newEnv.resolve(id), lambdaExpr(def, newEnv).setSource([def.typedParams(), def.expr()])]]
        }

        case 'methodDefinition': {
          const id = extractFunctionId(def)
          return [[newEnv.resolve({ ...id, text: `_${id.text}` }), lambdaExpr2(def, newEnv).setSource([def.typedVar(), def.typedParams(), def.expr()])]]
        }

        case 'tupleDefinition':
          const ids = extractTupleIds(def)
          const fresh = freshVar(def)
          const freshId = newEnv.resolve(fresh)
          const mainBinding: [string, Expr] = [freshId, toCore(def.expr(), newEnv)]
          const mainVar = eVar(freshId).setSource(ids)
          const bindings = ids.map((id, idx): [string, Expr] => {
            return [newEnv.resolve(id), eApply(mainVar, [eLiteral(idx)])]
          })
          bindings.unshift(mainBinding)

          return bindings

        default:
          assertNever(def)
      }
    })

    return eLet(safeNewMap(bindings), toCore(expr.expr(), newEnv))
  }
}

function lambdaExpr (lambdaLike: { typedParams: () => (TypedParams | null), expr: () => PExpr }, env: Env): Expr {
  const params = typedParamList(lambdaLike.typedParams()).map(p => p.paramId().token())
  const newEnv = env.extends(params)

  return eLambda(params.map(p => newEnv.resolve(p)), toCore(lambdaLike.expr(), newEnv))
}

function lambdaExpr2 (lambdaLike: { typedVar: () => TypedVar, typedParams: () => (TypedParams | null), expr: () => PExpr }, env: Env): Expr {
  const thisToken = lambdaLike.typedVar().varId().token()
  const params = [thisToken, ...typedParamList(lambdaLike.typedParams()).map(p => p.paramId().token())]
  const newEnv = env.extends(params)

  return eLambda(params.map(p => newEnv.resolve(p)), toCore(lambdaLike.expr(), newEnv))
}

// Utils ↓↓↓↓

function argList (args: Args | null): Arg[] { return (args === null) ? emptyList<Arg>() : args.arg() }
function typedParamList (params: TypedParams | null): TypedParam[] { return (params === null) ? emptyList<TypedParam>() : params.typedParam() }
function typedVarList (vars: TypedVars | null): TypedVar[] { return (vars === null) ? emptyList<TypedVar>() : vars.typedVar() }

function operands (apply: PApply, env: Env): Expr[] {
  return argList(apply.args()).map(a => toCore(a.expr(), env))
}

function toCore (expr: TPNode, env: Env): Expr {
  //  const toCoreExpr = toCoreSwitchMap.get(expr.contextName)
  const toCoreExpr = toCoreSwitchMap[expr.contextName]
  if (toCoreExpr == null) throw new Error(`Unsupported corefication: ${expr.contextName}`) // tslint:disable-line
  return toCoreExpr(expr as any, env).setSource(expr)
}

function toCoreMap (exprs: TPNode[], env: Env): Expr[] {
  return exprs.map(e => toCore(e, env))
}

const parseIntAutoRE = /((0x)|(0b))?(.*)/

function parseIntAuto (text: string): number {
  const match = parseIntAutoRE.exec(text)
  if (match === null) throw new Error(`Mismatch with grammar on integers: ${text}`)
  if (match[2] !== undefined) {
    return parseInt(match[4], 16)
  }
  if (match[3] !== undefined) {
    return parseInt(match[4], 2)
  }
  return parseInt(match[4], 10)
}

export function core (source: TPNode, autodef: boolean = false): Expr {
  const emptyEnv = new VarMapping(new Map(), autodef)
  return toCore(source, emptyEnv)
}
