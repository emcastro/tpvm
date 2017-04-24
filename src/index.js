// @flow

import { Apply, Var } from './Expr'
import {arrayEqual} from './prelude'

console.log(Apply)

console.log(Apply.n(Var.n('ooo'), []))

console.log(arrayEqual([1, 2, 3, 4], [1, 2, 3, 4]))
