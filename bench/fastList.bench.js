
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { List } = require('immutable')

const { fasteach } = require('../dist/utils/fastArray')
const { XList } = require('../dist/utils/XList')

for (const i of [3, 11, 18, 30, 60, 150]) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite('list.length = ' + i)

  const list = _.times(i)

  suite.add('Standard Array', () => {
    const result = []
    fasteach(list, x => result.push(`(${x})`))
  })

  suite.add('Standard Array and copy', () => {
    let result = []
    fasteach(list, x => {
      result = new Array(result)
      result.push(`(${x})`)
    })
  })

  suite.add('XList', () => {
    let result = new XList()
    fasteach(list, x => { result = result.concat(new XList([`(${x})`], false)) })
  })

  suite.add('XList 2', () => {
    let result = new XList()
    fasteach(list, x => { result = result.append(`(${x})`) })
  })

  suite.add('Immutable', () => {
    let result = List()
    fasteach(list, x => { result = result.push(`(${x})`) })
  })

  run(suite, 'Standard Array')
}
