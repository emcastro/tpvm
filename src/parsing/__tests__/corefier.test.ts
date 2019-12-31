
import { core } from '../corefier'
import { parse } from '../parser'

describe('Corefier', () => {
  it('works', () => {
    expect(core(parse(`
    a = z;
    b = a + y;
    c = d + x;
    d = a;
    a(a, b, c, d, x, w)
  `), true).toText()).toMatchSnapshot()
  })
})
