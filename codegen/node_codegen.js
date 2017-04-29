// @flow - in comments only
const _ = require('lodash')

// Format keyword
function kw (keyword, argument) {
  if (argument != null) {
    return ` ${keyword} ${argument}`
  } else {
    return ''
  }
}

function defCaseClass (name, extend, implement, typedAttributes) {
  const attributes = typedAttributes.map(attr => attr.trim().split(/\s*:\s*/)[0])
  const types = typedAttributes.map(attr => attr.trim().split(/\s*:\s*/)[1])

  const sourceCode = (`

export class ${name}${kw('extends', extend)}${kw('implements', implement)} {
  // generated code

  ${_.join(typedAttributes, ';\n  ')}

  constructor (${typedAttributes.join(', ')}) {
    // generated code
    super()
    ${_.join(_.map(attributes, a => `this.${a} = ${a}`), '\n    ')}
  }

  static n (${typedAttributes.join(', ')}) : ${name} {
    // generated code
    return new ${name}(${attributes.join(', ')})
  }

  children () : [${_.join(types, ', ')}] {
    // generated code
    return [${_.join(_.map(attributes, a => `this.${a}`), ', ')}]
  }

  rewrite (subExprs: [${_.join(types, ', ')}]) : ${name} {
    // generated code
    return ${name}.n(${_.join(_.map(attributes, (a, idx) => `subExprs[${idx}]`), ', ')})
  }

  equals (that: mixed | ${name}) : boolean {
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof ${name}) {
      ${_.join(_.map(attributes, a => `if (!equal(this.${a}, that.${a})) return false`), '\n      ')}
      return true
    }
    return false
  }

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
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
  import?: Array<string>;
  implement?: string;
  constructors: { [name: string]: Array<string> }
}
*/

function data (name /* :string */, params /* :dataParams */) {
  const header = (`// @flow
/* eslint-disable  no-multiple-empty-lines */
// generated code

${(params.import && params.import.join('\n')) || ''}

// eslint-disable-next-line no-use-before-define
export type ${name} = ${_.join(_.keys(params.constructors), ' | ')}
`)

  const entries = typedEntries(params.constructors).map(([name, typedAttributes]) =>
    defCaseClass(name, params.extend, params.implement, typedAttributes)
  )

  const footer = (`
// EOF
`)

  return { path: name + '.js', sourceCode: [header, ...entries, footer].join('\n') }
}

const files = [data('Expr',
  {
    extend: 'ExprBase',
    import: [
      'import {ExprBase} from \'../ExprBase\'',
      'import {equal} from \'../prelude\''
    ],
    constructors: {
      'Var': ['varId: string'],
      'Literal': ['value: mixed'],
      'Apply': ['operator: Expr', 'operands: Array<Expr>'],
      'IfElse': ['ifClause: Expr', 'thenClause: Expr', 'elseClause: Expr'],
      'Lambda': ['params: Array<string>', 'body: Expr'],
      'Let': ['defs: Map<string, Expr>', 'body: Expr']
    }
  })]

files // eslint-disable-line no-unused-expressions
