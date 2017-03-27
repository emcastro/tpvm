// @flow
// node-browser-loader

// https://nodejs.org/api/modules.html

class Module { // eslint-disable-line no-unused-vars
  /* ::
  id : string
  exports: any
  parent: ?Module
  filename: string
  loaded: boolean
  _dirname: string
  */

  constructor (id /* :string */, parent /* :Module */) {
    this.id = id
    this.exports = {}
    this.parent = parent
    this.filename = id
    this.loaded = false
    this._dirname = dirname(id)
  // no children
  // no paths
  }

  require (x /* :string */) {
    console.log('requiring', x)

    if (x.startsWith('./') || x.startsWith('../')) {
      let m
      m = this.loadAsFile(this._dirname + '/' + x)
      if (m != null) { return m }
      m = this.loadAsDirectory(this._dirname + '/' + x)
      if (m != null) { return m }
      m = this.loadNodeModules(x)
      if (m != null) { return m }
      throw new Error('not found: ' + x)
    } else {
      const m = this.loadNodeModules(x)
      if (m != null) { return m }
      throw new Error('not found: ' + x)
    }
  }

  loadAsFile (x) {
    let f
    f = this.loadEval(x)
    if (f != null) { return f }
    f = this.loadEval(x + '.js')
    if (f != null) { return f }
    return loadJson(x + '.json')
  }

  loadIndex (x) {
    let f, j
    f = this.loadEval(x + '/index.js')
    if (f != null) { return f }
    j = loadJson(x + '/index.json')
    if (j != null) { return j }
  }

  loadAsDirectory (x) {
    let j
    j = loadJson(x + '/package.json')
    if (j != null) {
      const m = x + '/' + j.main
      const f = this.loadAsFile(m)
      if (f != null) { return f }
      return this.loadIndex(m)
    }
    return this.loadIndex(x)
  }

  loadNodeModules (x) {
    // Simplified version not covering all the specs

    // TODO Il faut traiter les module dans les modules
    let f
    f = this.loadAsFile('/node_modules/' + x)
    if (f != null) { return f }
    return this.loadAsDirectory('/node_modules/' + x)
  }

  loadEval (x) {
    const f = load(x)
    if (f != null) {
      const builder = eval(`(function _module_(exports, require, module, __filename, __dirname){${f}\n})`)
      const module = new Module(x, this)
      builder.call({}, module.exports, (id) => module.require(id), module, module.filename, module._dirname)
      return module.exports
    }
  }

}

function load (x) {
  const req = new XMLHttpRequest() // eslint-disable-line no-undef
  req.open('GET', x, false)
  req.send(null)

  if (req.status === 200) {
    return req.responseText
  }
}

function loadJson (x) {
  const j = load(x)
  if (j != null) { return JSON.parse(j) }
}

const dirnameRe = /(.*)\/.*/
function dirname (path /* :string */) /* :string */ {
  return dirnameRe.exec(path)[1]
}

// ///////////////////////////////
// Banc de test

const m = new Module('/', null)
m.require('./dist/toto.js')
