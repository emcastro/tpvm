import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from './expr/Expr'
import { parse } from './parsing/parser'
import { core } from './parsing/corefier'
import eval1, { Env } from './runtime1/eval1'

import * as fs from 'fs'

const source = fs.readFileSync('tp/test.tp', 'utf-8')

const parsed = parse(source)
const cored = core(parsed)

console.log(cored.toText())

const p = eval1(cored, new Env(new Map()))

// if (p instanceof Promise) {
//   p.then((v) => {
//     console.log('!End', v)
//   }).catch((e) => {
//     console.error('!Error', e)
//   })
// }
