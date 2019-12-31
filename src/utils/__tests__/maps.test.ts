import { MultiKeyMap } from '../../utils/maps'

describe('MultiKeyMap', () => {
  it('works on standard cases', () => {
    const m = new MultiKeyMap<[string, number], string>()

    m.set(['alpha', 1], 'alpha-1')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe(undefined)
    expect(m.get(['bravo', 3])).toBe(undefined)
    expect(m.get(['charlie', 42])).toBe(undefined)

    m.set(['alpha', 2], 'alpha-2')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe('alpha-2')
    expect(m.get(['bravo', 3])).toBe(undefined)
    expect(m.get(['charlie', 42])).toBe(undefined)

    m.set(['bravo', 3], 'bravo-3')
    expect(m.get(['alpha', 1])).toBe('alpha-1')
    expect(m.get(['alpha', 2])).toBe('alpha-2')
    expect(m.get(['bravo', 3])).toBe('bravo-3')
    expect(m.get(['charlie', 42])).toBe(undefined)
  })

  it('iterates well', () => {
    const m = new MultiKeyMap<[string, number], string>()
    expect([...m]).toEqual([])

    m.set(['alpha', 1], 'alpha-1')
    m.set(['alpha', 2], 'alpha-2')
    m.set(['bravo', 3], 'bravo-3')

    expect([...m]).toEqual([
      [['alpha', 1], 'alpha-1'],
      [['alpha', 2], 'alpha-2'],
      [['bravo', 3], 'bravo-3']
    ])
    expect([...m.entries()]).toEqual([...m])
    expect([...m.keys()]).toEqual([
      ['alpha', 1],
      ['alpha', 2],
      ['bravo', 3]
    ])
    expect([...m.values()]).toEqual([
      'alpha-1',
      'alpha-2',
      'bravo-3'
    ])
  })
})
