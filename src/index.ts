// import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse } from './expr/Expr'
import { parse } from './parsing/parser'
import { core } from './parsing/corefier'
import { pushingEval1, Env, XValue, Value } from './runtime1/eval1'

import * as fs from 'fs'
import { Trampoline, trampoline } from './utils/trampoline'
import { isPromise } from './runtime1/optimisticPromise'

const source = fs.readFileSync('tp/test.tp', 'utf-8')

console.log('Parsing')
const parsed = parse(source)
console.log('Running')
const cored = core(parsed)

// console.log(cored.toText())

// function mainLoop (p: XValue): void {
//   if (isPromise<Value>(p)) { // Promise result
//     p.then((v: any) => {
//       mainLoop(v)
//     }).catch((e: any) => {
//       console.error('!Error')
//       console.error(`${e}`)
//     })
//     // } else if (p instanceof Trampoline) {
//     //   zoop(trampoline(() => p))
//   } else { // Simple result
//     console.log('End', p.toString())
//   }
// }

// try {
//   const p = pushingEval1(cored, new Env(new Map()))

//   // mainLoop(p)
// } catch (e) {
//   console.error('*Error')
//   console.error(`${e}`)
// }

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
