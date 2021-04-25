import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse, Expr, Apply, Literal } from './expr/Expr'
import { parse } from './parsing/parser'
import { core } from './parsing/corefier'

import * as fs from 'fs'

import generate from '@babel/generator'
import template from '@babel/template'
import * as t from '@babel/types'
import { $$$, notnull } from './utils/prelude'

const source = fs.readFileSync('tp/test3.tp', 'utf-8')

console.log('Parsing')
const parsed = parse(source)
console.log('Running')
const cored = core(parsed)

// ///////////////////////////

function newTempVar (prefix = 't'): t.Identifier {
  return t.identifier(`__${prefix}_${newTempVar.counter++}`)
}
newTempVar.counter = 0

function compile (e: Expr): t.Node {
  switch (e.typ) {
    case eLiteral.typ:
      return compileLiteral(e)
    case eApply.typ:
      return compileApply(e)
    default:
      $$$()
  }
}

const compileApply_template = template(`
  const %%operator%% = %%operatorExpr%%;
  if (%%operator%% instanceof Promise) {
    %%result%% = %%operator%%.then(
      %%op%% => %%op%%(%%operandsExpr%%)
    )
  } else {
    %%result%% = %%operator%%(%%operandsExpr%%)
  }
`)

function compileApply (e: Apply): t.Node {
  return compile(e.operator)
}

function compileLiteral (e: Literal): t.Node {
  const l = e.value
  switch (typeof l) {
    case 'symbol':
      return t.identifier(notnull(Symbol.keyFor(l)))

    case 'number':
      return t.numericLiteral(l)
    case 'string':
      return t.stringLiteral(l)
    case 'boolean':
      return t.booleanLiteral(l)

    default:
      $$$()
  }
}

// ///////////////////////////

try {
  console.log(cored.toText())
  console.log(generate(compile(cored)).code)
} catch (e) {
  console.error('*Error')
  console.error(e.stack)
  process.exit()
}
