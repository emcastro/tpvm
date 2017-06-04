// @flow

const { color, usage, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fastmap } = require('../dist/utils/fastArray')

usage('fastmap', ['_.map', 'Array.map'])

for (let i = 0; i < 15; i++) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite()

  const list = _.times(i)

  // ===
  // `for i` notation is faster, it would be possible to inline it with a custom Babel plugin
  // ===
  // suite.add('for i', () => {
  //   const r = []
  //   for (let i = 0; i < list.length; i++) {
  //     r.push(`(${list[i]})`)
  //   }
  // })

  suite.add('_.map', () => _.map(list, x => `(${x})`))
  suite.add('fastmap', () => fastmap(list, x => `(${x})`))
  suite.add('Array.map', () => list.map(x => `(${x})`))

  run(suite, 'fastmap')
}
