import { MultiKeyMap } from '../../utils/MultiKeyMap'

describe('MultiKeyMap', () => {

  it('works on standard cases', () => {
    const m = new MultiKeyMap<[string, number], string>()

    m.put(['alpha', 1], 'alpha-1')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe(undefined)
    expect(m.get(['bravo', 3])).toBe(undefined)
    expect(m.get(['charlie', 42])).toBe(undefined)

    m.put(['alpha', 2], 'alpha-2')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe('alpha-2')
    expect(m.get(['bravo', 3])).toBe(undefined)
    expect(m.get(['charlie', 42])).toBe(undefined)

    m.put(['bravo', 3], 'bravo-3')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe('alpha-2')
    expect(m.get(['bravo', 3])).toBe('bravo-3')
    expect(m.get(['charlie', 42])).toBe(undefined)
  })

})
