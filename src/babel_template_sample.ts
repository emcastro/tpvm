// https://babeljs.io/docs/en/babel-template
import generate from '@babel/generator'
import template from '@babel/template'
import * as t from '@babel/types'

const scope = template('{ %%code%% }')
const call = template('print(%%p%%)')
const expr = template.expression('%%a%%+%%b%%')

const z = expr({ a: t.numericLiteral(3), b: t.identifier('c') })

const ast = scope({
  code: [
    call({ p: expr({ a: t.numericLiteral(1), b: t.identifier('b') }) }),
    call({ p: [expr({ a: t.numericLiteral(2), b: z }), expr({ a: t.numericLiteral(2), b: z })] })
  ]
})

const output = generate(ast as any).code

console.log(output)
