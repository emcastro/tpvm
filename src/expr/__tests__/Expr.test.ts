
import { eApply, eIfElse, eLambda, eLet, eLiteral, eVar, Expr } from '../Expr'

describe('Expr', () => {
  function build () {
    return eLet(
      new Map<string, Expr>([
        // Literals with different types of data
        ['aString', eLiteral('a')],
        ['aNumber', eLiteral(1)],
        ['aSymbol', eLiteral(Symbol.for('#symbol'))],
        // Lambda, IfElse, and Var
        ['d', eLambda(['x', 'y'],
          eIfElse(eLiteral(true),
            eVar('x'),
            eVar('y')))],
        ['e', eApply(eVar('foo'), [eVar('a'), eVar('b')])],
        // Empty Let
        ['f', eLet(new Map(), eVar('e'))],
        // Empty Lambda
        ['g', eLambda([], eVar('g'))]
      ]),
      eVar('a'))
  }

  it('can be built', () => {
    build()
  })

  it('prints with .toText()', () => {
    expect(build().toText()).toMatchSnapshot()
  })

  it('initializes defBodies correctly', () => {
    const letExpr = eLet(new Map([
      ['a', eLiteral(1)]
    ]), eVar('a'))
    expect(letExpr.defBodies).toEqual([eLiteral(1)])
    expect(letExpr.defNames).toEqual(['a'])
  })

  it('prints with .toString()', () => {
    expect(build().toString()).toMatchSnapshot()
  })
})
