const path = require('path')
module.exports = {
  entry: {
    app: ['./src/test.js']
  },
  output: {
    // path: path.resolve(__dirname, 'web'), // When dumping to files
    // publicPath: '/assets/', // When serving http
    filename: 'bundle.js'
  },
  devtool: 'source-map'
}
