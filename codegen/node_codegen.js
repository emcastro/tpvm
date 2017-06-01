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

let typCounter = 0

function defCaseClass (name, extend, implement, typedAttributes) {
  const typ = typCounter++

  const attributes = typedAttributes.map(attr => attr.trim().split(/\s*:\s*/)[0])
  const types = typedAttributes.map(attr => attr.trim().split(/\s*:\s*/)[1])

  const sourceCode = (`
export const ${name.toUpperCase()} = ${typ}

export class ${name}${kw('extends', extend)}${kw('implements', implement)} {
  // generated code

  typ: typeof ${name.toUpperCase()}

  ${_.join(typedAttributes, '\n  ')}

  constructor (${typedAttributes.join(', ')}) {
    // generated code
${extend ? '    super()': ''}
    this.typ = ${name.toUpperCase()} // typ is faster when set on instances
    ${_.join(_.map(attributes, a => `this.${a} = ${a}`), '\n    ')}
  }

  children (): [${_.join(types, ', ')}] {
    // generated code
    return [${_.join(_.map(attributes, a => `this.${a}`), ', ')}]
  }

  rewrite (subExprs: [${_.join(types, ', ')}]): ${name} {
    // generated code
    return new ${_.upperFirst(name)}(${_.join(_.map(attributes, (a, idx) => `subExprs[${idx}]`), ', ')})
  }

  equals (that: any): boolean { // ${name}
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof ${name}) {
      ${_.join(_.map(attributes, a => `if (!equal(this.${a}, that.${a})) return false`), '\n      ')}
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for ${name} */
export let e${_.upperFirst(name)}: ((${typedAttributes.join(', ')}) => ${name}) & { typ: typeof ${name.toUpperCase()} }

e${_.upperFirst(name)} = ((${typedAttributes.join(', ')}) => {
  // generated code
  return new ${name}(${attributes.join(', ')})
}) as typeof e${_.upperFirst(name)}

e${_.upperFirst(name)}.typ = ${name.toUpperCase()} // Shortcut that avoids importing ${name.toUpperCase()}

//`)

  return sourceCode
}

// ////////////////////

function typedEntries (object) {
  return Object.keys(object).map(k => [k, object[k]])
}

/* ::
type dataParams = {
  extend?: string,
  import?: Array<string>,
  implement?: string,
  constructors: { [name: string]: Array<string> }
}
*/

function data (name /* :string */, params /* :dataParams */) {
  const header = (`
// generated code

${params.import ? params.import.join('\n') : ''}

export type ${name} = ${_.join(_.keys(params.constructors), ' | ')}

//`)

  const entries = typedEntries(params.constructors).map(([name, typedAttributes]) =>
    defCaseClass(name, params.extend, params.implement, typedAttributes)
  )

  const footer = (`
// EOF
`)

  return { path: 'gen' + _.upperFirst(name) + '.ts', sourceCode: [header, ...entries, footer].join('\n') }
}

const files = [data('Expr',
  {
    extend: 'ExprBase',
    import: [
      "import { ExprBase, LiteralValue } from '../expr/ExprBase'",
      "import { equal } from '../utils/prelude'"
    ],
    constructors: {
      'Var': ['varId: string'],
      'Literal': ['value: LiteralValue | symbol'],
      'Apply': ['operator: Expr', 'operands: Expr[]'],
      'IfElse': ['ifClause: Expr', 'thenClause: Expr', 'elseClause: Expr'],
      'Lambda': ['params: string[]', 'body: Expr'],
      'Let': ['defs: Map<string, Expr>', 'body: Expr']
    }
  })]

files // eslint-disable-line no-unused-expressions
