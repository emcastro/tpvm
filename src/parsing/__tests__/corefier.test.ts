
import { core } from '../corefier'
import { parse } from '../parser'

describe('Corefier', () => {
  it('works', () => {
    expect(core(parse(`
    a = z; // z free var
    b = a + y; // z defined later
    c = d + x; // x free var
    d = a;
    // fuction definition
    f() = f;
    g(a) = g(a);
    a.h = _h(a);
    a.i() = _i(a);
    a.j(b) = _j(a,b);
    // lambda expr
    l = map((a,b)->b, c->c, (d)->d)
    // list deconstruction
    (x1) = a;
    (x2, y2) = a;
    // literals
    c1 = 1.2 + 0xFF + 0b1010
    c2 = "abcd" + true + #symbol
    c3 = - 2
    c4 = a f b
    // call method-like function (f)
    a.f() = 0;
    e1 = f(a);
    e2 = a.f;
    e3 = a.f();
    e4 = a.f(b);
    e5 = a.f(b,c);
    // js-function
    j2 = a.z;
    j3 = a.z();
    j4 = a.z(b);
    j5 = a.z(b,c);
    // sum up
    a(a, b, c, d, x, w)
  `), true).toText()).toMatchSnapshot()
  })
})
