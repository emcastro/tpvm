// @flow

const benchmark = require('benchmark')

const { fastmap } = require('../build/utils/functional')

const _ = require('lodash')

const color = require('ansi-colorizer')
color.color = true

console.log(`Use ${color.purple('fastmap')} instead of ${color.grey('_.map')} or ${color.grey('Array.map')}`)

for (let i = 0; i < 15; i++) {
  console.log(color.yellow('list.length = ' + i))
  const suite = new benchmark.Suite('fastmap fast')

  const list = _.times(i)

  suite.add('_.map', () => _.map(list, x => `(${x})`))
  suite.add('fastmap', () => fastmap(list, x => `(${x})`))
  suite.add('Array.map', () => list.map(x => `(${x})`))

  suite.on('cycle', function (event) {
    console.log(String(event.target))
  })
  suite.on('complete', function () {
    const fastest /*: string[] */ = this.filter('fastest').map('name')
    const c = (fastest.includes('fastmap') ? color.green : color.red).bind(color)
    console.log('Fastest is ' + c(fastest))
  })

  suite.run()
}
