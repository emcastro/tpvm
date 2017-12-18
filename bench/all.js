
const fs = require('fs')

fs.readdirSync(__dirname).forEach(name => {
  if (name.endsWith('.bench.js')) {
    console.log('')
    console.log('============', name, '============')
    /* eslint-disable */
    require('./' + name.slice(0, name.length - '.js'.length))
  }
})
