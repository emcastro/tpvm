// @flow

const Vinyl = require('vinyl')

function file (name /* : string */, content /* : string*/) {
  return new Vinyl({
    path: name,
    contents: new Buffer(content)
  })
}

module.exports = file
