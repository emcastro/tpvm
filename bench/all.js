
const fs = require('fs')

fs.readdirSync(__dirname).forEach(name => {
  if (name.endsWith('.bench.js')) {
    console.log('')
    console.log('============', name, '============')
    /* eslint-disable */
    // $TypingTrick
    require('./' + name.slice(0, name.length - 3)) // 3 = '.js'.length
  }
})
