// @flow

const benchmark = require('benchmark')
const color /*: * */ = require('ansi-colorizer')
color.color = true

function newSuite () /*: typeof benchmark.Suite */ {
  return new benchmark.Suite()
}

function usage (prefered /*: string */, others /*: string[] */) {
  console.log(`Use ${color.green(prefered)} instead of ${others.map(o => color.grey(o)).join(' or ')}`)
}

function run (suite /*: typeof benchmark.Suite */, expectedFastest /*: string */) {
  suite.on('cycle', function (event) {
    console.log(String(event.target))
  })
  suite.on('complete', function () {
    const fastest /*: string[] */ = this.filter('fastest').map('name')
    const c = (fastest.includes(expectedFastest) ? color.green : color.red).bind(color)
    console.log('Fastest is ' + c(fastest))
  })

  suite.run()
}

module.exports = { color, newSuite, usage, run }
