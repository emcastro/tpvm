
const benchmark = require('benchmark')
const fs = require('fs')
const color = require('ansi-colorizer')
color.color = true

function newSuite (suffix) {
  const e = new Error()
  const name = e.stack.split('\n')[2].match(/([^/]*?)\.bench\.js/)[1]

  let fullname
  if (suffix !== undefined) {
    fullname = name + '-' + suffix
  } else {
    fullname = name
  }

  return new benchmark.Suite(fullname)
}

/**
 * @param {*} suite
 * @param {string} expectedFastest
 */
function run (suite, expectedFastest, reference) {
  const entries = []

  suite.on('cycle', function (event) {
    console.log(String(event.target))
    const result = event.target
    const entry = { suite_name: this.name, run_name: result.name, hz: result.hz, rme: result.stats.rme }
    entries.push(entry)
  })
  suite.on('complete', function () {
    const fastest = this.filter(i => i.name !== reference).filter('fastest').map('name')
    const c = (fastest.includes(expectedFastest) ? color.green : color.red).bind(color)
    console.log('Fastest is ' + c(fastest))

    fs.writeFileSync(`${__dirname}/../result/${this.name}.json`, JSON.stringify(entries))
  })

  suite.run()
}

module.exports = { color, newSuite, run }
