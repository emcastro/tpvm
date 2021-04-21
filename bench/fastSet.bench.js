
const { color, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

// const { Set } = require('immutable')

const { fasteach } = require('../dist/utils/fastArray')
const { XList } = require('../dist/utils/XList')

// for (let i = 3; i < 15; i += 4) {
for (const i of [3, 11, 18, 30, 60, 150]) {
  console.log(color.yellow('list.length = ' + i))
  const suite = newSuite('list.length = ' + i)

  const list = _.times(i)

  suite.add('Standard Set', () => {
    const result = new Set()
    fasteach(list, x => result.add(`(${x})`))
  })

  suite.add('Set from list', () => {
    const result = []
    fasteach(list, x => { result.push(`(${x})`) })
    return new Set(result)
  })

  suite.add('Set copy add', () => {
    let result = new Set()
    fasteach(list, x => {
      result = new Set(result)
      result.add(`(${x})`)
    })
  })

  suite.add('Set from XList', () => {
    let result = new XList()
    fasteach(list, x => { result = result.concat(new XList([`(${x})`], false)) })
    return new Set(result.toList())
  })

  // suite.add('Immutable JS', () => {
  //   let result = Set()
  //   fasteach(list, x => { result = result.add(`(${x})`) })
  // })

  run(suite, 'Standard Set')
}
