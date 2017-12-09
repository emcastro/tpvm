// import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from './expr/Expr'
import { parse } from 'tpvm/parsing/parser'
import { core } from 'tpvm/parsing/corefier'
import { pushingEval1, Env, XValue, Value } from 'tpvm/runtime1/eval1'

import * as fs from 'fs'
import { Trampoline, trampoline } from 'tpvm/utils/trampoline'
import { isPromise } from 'tpvm/runtime1/optimisticPromise'

const source = fs.readFileSync('tp/test.tp', 'utf-8')

console.log('Parsing')
const parsed = parse(source)
console.log('Running')
const cored = core(parsed)

try {
  const p: any = pushingEval1(cored, new Env(new Map()))

  if (p != null && p.then) { // Promise result
    p.then((v: any) => {
      console.log('!End', v.toString())
    }, (e: any) => {
      console.error('!Error')
      console.error(e.stack)
      process.exit()
    })
  } else { // Simple result
    console.log(':End', p.toString())
  }
} catch (e) {
  console.error('*Error')
  console.error(e.stack)
  process.exit()
}
