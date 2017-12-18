
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { Set } = require('immutable')

const { fasteach } = require('../dist/utils/fastArray')
const { XList } = require('../dist/utils/XList')

// usage('---', [])

for (let i = 0; i < 15; i++) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite()

  const list = _.times(i)

  suite.add('Standard Set', () => {
    let result = new Set()
    fasteach(list, x => result.add(`(${x})`))
  })

  suite.add('XList', () => {
    let result = new XList()
    fasteach(list, x => { result = result.concat(new XList([`(${x})`], false)) })
    return new Set(result.toList())
  })

  suite.add('Immutable', () => {
    let result = Set()
    fasteach(list, x => { result = result.add(`(${x})`) })
  })

  run(suite, 'Standard Set')
}
