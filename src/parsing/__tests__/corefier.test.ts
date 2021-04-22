
import { core } from '../corefier'
import { parse } from '../parser'

describe('Corefier', () => {
  it('works', () => {
    expect(core(parse(`
    a = z;
    b = a + y;
    c = d + x;
    d = a;
    f() = f;
    g(a) = g(a);
    a.h = _h(a);
    a.i() = _i(a);
    a.j(b) = _j(a,b);
    a(a, b, c, d, x, w)
  `), true).toText()).toMatchSnapshot()
  })
})
