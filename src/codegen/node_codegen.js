// @flow - in comments only
const _ = require('lodash')

function defCaseClass (name, extend, implement, typedAttributes) {
  const attributes = typedAttributes.map(attr => attr.trim().split(/\s*:\s*/)[0])

  function kw (keyword, argument) {
    if (argument != null) {
      return ` ${keyword} ${argument}`
    } else {
      return ''
    }
  }

  const sourceCode = (`

export class ${name}${kw('extends', extend)}${kw('implements', implement)} {

  constructor (${typedAttributes.join(', ')}) {
    // generated code
    ${_.join(_.map(attributes, a => `this.${a} = notnull(${a})`), '\n    ')}
  }

  children () {
    // generated code
    return [${_.join(_.map(attributes, a => `this.${a}`), ', ')}]
  }

  rewrite (subExprs) {
    // generated code
    return new ${name}(${_.join(_.map(attributes, (a, idx) => `subExprs[${idx}]`), ', ')})
  }

  equals (other) {
    // generated code
    if (other === this) return true // fast-track
    if (other == null) return false
    if (other.constructor !== this.constructor) return false
    ${_.join(_.map(attributes, a => `if (rewriteEquals(this.${a}, that.${a})) return false`), '\n    ')}
    return true
  }

  notEquals (other) { return !(this.equals(other)) }
}

`)

  return sourceCode
}

// ////////////////////

function typedEntries (object) {
  return Object.keys(object).map(k => [k, object[k]])
}

/* ::
type dataParams = {
  extend?: string;
  implement?: string;
  constructors: { [name: string]: Array<string> }
}
*/

function data (name /* :string */, params /* :dataParams */) {
  const header = (`// @flow
// generated code


  `)

  const entries = typedEntries(params.constructors).map(([name, typedAttributes]) =>
    defCaseClass(name, params.extend, params.implement, typedAttributes)
  )

  const footer = (`
// EOF`)

  return { path: 'generated/Expr.js', sourceCode: [header, ...entries, footer].join('\n') }
}

[data('Expr',
  {
    extend: 'ExprBase',
    constructors: {
      'Var': ['varId : string'],
      'Literal': ['value: any'],
      'Apply': ['operator: Expr', 'operands: Array<Expr>'],
      'IfElse': ['ifClause: Expr', 'thenClause: Expr', 'elseClause: Expr'],
      'Lambda': ['params: Array<Var>', 'body: Expr'],
      'Let': ['defs: Map<string, Expr>', 'body: Expr']
    }
  })]
