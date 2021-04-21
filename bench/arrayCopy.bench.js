
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fastmap } = require('../dist/utils/fastArray')

for (let i = 0; i < 15; i += 3) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite()

  const list = _.times(i)

  suite.add('fastmap', () => fastmap(list, x => x))
  suite.add('push', () => {
    const copy = []
    for (let i = 0; i < list.length; i++) {
      copy.push(list[i])
    }
  })
  suite.add('[i]', () => {
    const copy = []
    for (let i = 0; i < list.length; i++) {
      copy[i] = list[i]
    }
  })
  suite.add('[i] + length copy', () => {
    const copy = []
    const ll = list.length
    for (let i = 0; i < ll; i++) {
      copy[i] = list[i]
    }
  })
  suite.add('[i] with length', () => {
    const copy = []
    copy.length = list.length
    for (let i = 0; i < list.length; i++) {
      copy[i] = list[i]
    }
  })
  suite.add('slice', () => {
    list.slice()
  })
  suite.add('[j]', () => {
    const copy = []
    let j = 0
    for (let i = 0; i < list.length; i++) {
      copy[j++] = list[i]
    }
  })
  suite.add('core-js map(identity)', () => {
    list.map(x => x)
  })

  run(suite, 'slice')
}
