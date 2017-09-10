
const { usage, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fastmap } = require('../dist/utils/fastArray')

usage('class', ['object', 'array'])

const suite = newSuite()

const list = _.times(5)

class Pair {
  construct (x, y) {
    this.x = x
    this.y = y
  }
}

class Pair2 {
  construct (x, y) {
    this[0] = x
    this[1] = y
  }
}

suite.add('class', () => fastmap(fastmap(list, x => new Pair(x, x + 1)), y => y.y))
suite.add('array', () => fastmap(fastmap(list, x => [x, x + 1]), y => y[1]))
suite.add('object', () => fastmap(fastmap(list, x => ({ a: x, b: x + 1 })), y => y.b))
suite.add('class2', () => fastmap(fastmap(list, x => new Pair2(x, x + 1)), y => y[1]))

run(suite, 'class')
