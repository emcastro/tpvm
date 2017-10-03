// import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from './expr/Expr'
import { parse } from './parsing/parser'
import { core } from './parsing/corefier'
import eval1, { Env } from './runtime1/eval1'

import * as fs from 'fs'

const source = fs.readFileSync('tp/test.tp', 'utf-8')

console.log('Parsing')
const parsed = parse(source)
console.log('Running')
const cored = core(parsed)

// console.log(cored.toText())

try {
  const p: any = eval1(cored, new Env(new Map()))

  if (p != null && p.then) { // Promise result
    p.then((v: any) => {
      console.log('!End', v)
    }, (e: any) => {
      console.error('!Error', `${e}`)
    })
  } else { // Simple result
    console.log(':End', p)
  }
} catch (e) {
  console.error('*Error', `${e}`)
}
