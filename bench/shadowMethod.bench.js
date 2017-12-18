
const { newSuite, run } = require('./utils/bench')
const _ = require('lodash')

class A {
  toString () {
    return 'A'
  }
}
A.prototype.typ = 'a'

class B {
  toString () {
    return 'B'
  }
}
B.prototype.typ = 'b'

class C {
  toString () {
    return 'C'
  }
}
C.prototype.typ = 'c'

const values = _.times(50, n => {
  switch (n % 3) {
    case 0: return new A()
    case 1: return new B()
    case 2: return new C()
  }
})

const suite = newSuite()

function testSwitchCase (v) {
  switch (v.typ) {
    case 'a': return 'aa'
    case 'b': return 'bb'
    case 'c': return 'cc'
    default: throw TypeError()
  }
}

suite.add('switchCase', () => {
  values.map(v => {
    testSwitchCase(v)
  })
})

// ----------------------------

const symbol = Symbol('shadow')

A.prototype[symbol] = function () { return 'aa' }
B.prototype[symbol] = function () { return 'bb' }
C.prototype[symbol] = function () { return 'cc' }

function testShadowMethod (v) {
  v[symbol](v)
}

suite.add('shadowMethod', () => {
  values.map(v => {
    testShadowMethod(v)
  })
})

// ----------------------------

A.prototype.visible = function () { return 'aa' }
B.prototype.visible = function () { return 'bb' }
C.prototype.visible = function () { return 'cc' }

function testVisibleMethod (v) {
  v.visible(v)
}

suite.add('visibleMethod', () => {
  values.map(v => {
    testVisibleMethod(v)
  })
})

run(suite, 'switchCase')
