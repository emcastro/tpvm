
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fasteach } = require('../dist/utils/fastArray')

for (let i = 0; i < 15; i++) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite('list.length = ' + i)

  const list = _.times(i)

  // ===
  // `for i` notation is faster, it would be possible to inline it with a custom Babel plugin
  // ===
  // suite.add('for i', () => {
  //   const r = []
  //   for (let i = 0; i < list.length; i++) {
  //     r.push(`(${list[i]})`)
  //   }
  //   return r
  // })

  suite.add('fasteach', () => {
    const r = []
    fasteach(list, x => r.push(`(${x})`))
    return r
  })

  suite.add('_.forEach', () => {
    const r = []
    _.forEach(list, x => r.push(`(${x})`))
    return r
  })

  suite.add('for of', () => {
    const r = []
    for (const x of list) {
      r.push(`(${x})`)
    }
    return r
  })

  suite.add('Array.forEach', () => {
    const r = []
    list.forEach(x => r.push(`(${x})`))
    return r
  })

  run(suite, 'Array.forEach')
}
