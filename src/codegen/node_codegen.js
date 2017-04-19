// @flow
const _ = require('lodash')

function defCaseClass (name, attributes) {
  const sourceCode = (`// generated code

export default class ${name} {

  constructor (${attributes.join(', ')}) {
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

${name}.prototype.toString = expr_toString
${name}.prototype.toText = expr_toText

${name}

`)

  return {path: `${name}.js`, sourceCode}
}

const result = ([
  defCaseClass('Var', ['varId']),
  defCaseClass('Literal', ['value']),
  defCaseClass('Apply', ['operator', 'operands']),
  defCaseClass('IfElse', ['ifClause', 'thenClause', 'elseClause']),
  defCaseClass('Lambda', ['params', 'body']),
  defCaseClass('Let', ['defs', 'body'])
])

result
