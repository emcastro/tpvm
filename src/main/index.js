// @flow

import { Apply } from './Expr'

console.log(Apply)

class A {
  foo () { return 0 }
}

class B extends A {
  bar () { return 1 }
}

new B()
