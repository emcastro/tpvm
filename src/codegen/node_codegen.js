// @flow

const _ = require('lodash')

const file = require('./vinyl-file')

function defCaseClass (name, attributes) {
  const code = (`
    function ${name} (${attributes.join(', ')}) {
      // generated code
      ${_.join(_.map(attributes, a => `this.${a} = notnull(${a});`), '\n      ')}
    }

    ${name}.prototype.children = function() {
      // generated code
      return [${_.join(_.map(attributes, a => `this.${a}`), ', ')}]
    }

    ${name}.prototype.rewrite = function(subExprs) {
      // generated code
      return new ${name}(${_.join(_.map(attributes, (a, idx) => `subExprs[${idx}]`), ', ')})
    }

    ${name}.prototype.equals = function(other) {
      // generated code
      if (other === this) return true; // fast-track
      if (other == null) return false
      if (other.constructor !== this.constructor) return false
      ${_.join(_.map(attributes, a => `if (rewriteEquals(this.${a}, that.${a})) return false;`), '\n      ')}
      return true
    }

    ${name}.prototype.notEquals = function(other) { return !(this.equals(other)); }

    ${name}.prototype.toString = expr_toString
    ${name}.prototype.toText = expr_toText

    ${name}

    `)

  // console.log(code)
  return file(`${name}.js`, code)
}

module.exports = [
  defCaseClass('Var', ['varId']),
  defCaseClass('Literal', ['value']),
  defCaseClass('Apply', ['operator', 'operands']),
  defCaseClass('IfElse', ['ifClause', 'thenClause', 'elseClause']),
  defCaseClass('Lambda', ['params', 'body']),
  defCaseClass('Let', ['defs', 'body'])
]
