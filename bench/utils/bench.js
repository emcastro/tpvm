
const benchmark = require('benchmark')
const color = require('ansi-colorizer')
color.color = true

function newSuite () {
  return new benchmark.Suite()
}

/**
 * @param {string} prefered
 * @param {string[]} others
 */
function usage (prefered, others) {
  console.log(`Use ${color.green(prefered)} instead of ${others.map(o => color.grey(o)).join(' or ')}`)
}

/**
 * @param {*} suite
 * @param {string} expectedFastest
 */
function run (suite, expectedFastest) {
  suite.on('cycle', function (event) {
    console.log(String(event.target))
  })
  suite.on('complete', function () {
    const fastest = this.filter('fastest').map('name')
    const c = (fastest.includes(expectedFastest) ? color.green : color.red).bind(color)
    console.log('Fastest is ' + c(fastest))
  })

  suite.run()
}

module.exports = { color, newSuite, usage, run }
