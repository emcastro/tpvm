
import { parse as fancyParse } from '../../parsing/parser'
import { core } from '../../parsing/corefier'

function parse (test: string) {
  return core(fancyParse(test), true)
}

describe('freeVar', () => {

  it('works on if-else', () => {
    expect(parse('if (a) b else c').freeVars()).toEqual(new Set(['a', 'b', 'c']))
    expect(parse('if (a) a else a').freeVars()).toEqual(new Set(['a']))
    expect(parse('a = 1; if (a) a else a').freeVars()).toEqual(new Set([]))
  })

  it('works on apply', () => {
    expect(parse('a').freeVars()).toEqual(new Set(['a']))
    expect(parse('a()').freeVars()).toEqual(new Set(['a']))
    expect(parse('a(b)').freeVars()).toEqual(new Set(['a', 'b']))
    expect(parse('a(b,c)').freeVars()).toEqual(new Set(['a', 'b', 'c']))
    expect(parse('a(a,a)').freeVars()).toEqual(new Set(['a']))
    expect(parse('a = 1; a(a,a)').freeVars()).toEqual(new Set([]))
  })

  it('works on simple Let', () => {
    expect(parse(`
    a = z;
    b = a + y;
    c = d + x;
    d = a;
    a(a, b, c, d, x, w)
  `).freeVars()).toEqual(new Set(['x', 'y', 'z', 'w', '__plus__']))
  })

  it('works on Lambda', () => {
    expect(parse('() -> a').freeVars()).toEqual(new Set(['a']))
    expect(parse('(a) -> a').freeVars()).toEqual(new Set([]))
    expect(parse('(a,b) -> b(a,c)').freeVars()).toEqual(new Set(['c']))
  })

  it('works on functional Let', () => {
    expect(parse(`
    a = z;
    b(c) = c(a) + y;
    b2(c2) = c2(a) + y;
    a(c)
  `).freeVars()).toEqual(new Set(['z', 'y', 'c', '__plus__']))
  })

  it('works on multilevel expressions', () => {
    expect(parse(`
    a = z;
    b = {
      c = w
      c
    }
    a
  `).freeVars()).toEqual(new Set(['z', 'w']))
  })
})
