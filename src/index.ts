
import { eApply, eVar, eLet, eLiteral, eLambda, eIfElse, Expr } from './expr/Expr'
import eval1, { Env } from './runtime1/eval1'
import { equal } from './utils/prelude'

function symbol (id: string) { return Symbol.for(id) }

console.log('a')
console.log('b')
console.log(equal('c','b'))
