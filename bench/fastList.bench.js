
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { List } = require('immutable')

const { fasteach } = require('../dist/utils/fastArray')
const { XList } = require('../dist/utils/XList')

// usage('---', [])

for (let i = 0; i < 15; i++) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite()

  const list = _.times(i)

  suite.add('Standard Array', () => {
    let result = []
    fasteach(list, x => result.push(`(${x})`))
  })

  suite.add('XList', () => {
    let result = new XList()
    fasteach(list, x => { result = result.concat(new XList([`(${x})`], false)) })
  })

  suite.add('Immutable', () => {
    let result = List()
    fasteach(list, x => { result = result.push(`(${x})`) })
  })

  run(suite, 'Standard Array')
}
