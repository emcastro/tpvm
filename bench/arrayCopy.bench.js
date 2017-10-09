
const { color, usage, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fastmap } = require('../dist/utils/fastArray')

usage('[i]', ['fastmap', 'push', '[i]', '[i] with length'])

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

  run(suite, '[i]')
}
