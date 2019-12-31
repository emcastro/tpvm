
import times from 'lodash/times'
import { XList } from '../XList'

describe('AppendList', () => {
  it('can be built', () => {
    times(10).forEach(i => {
      const l = times(i)
      const al = new XList(l)
      expect(al.toList()).toEqual(l)
    })
  })

  it('gives access to its elements', () => {
    times(10).forEach(i => {
      const l = times(i)
      const al = new XList(l)

      for (let j = 0; j < al.length; j++) {
        expect(l[j]).toBe(al.get(j))
      }
    })
  })

  it('throws exception on out-of-bound access', () => {
    const al1 = new XList()
    const al10 = new XList(times(10))
    const alShort = al10.slice(3, 4)

    expect(() => al1.get(-1)).toThrow('Index out of bounds: -1 < 0')
    expect(() => al1.get(0)).toThrow('Index out of bounds: 0 >= 0')
    expect(() => al10.get(-1)).toThrow('Index out of bounds: -1 < 0')
    expect(al10.get(0)).toBe(0)
    expect(al10.get(9)).toBe(9)
    expect(() => al10.get(10)).toThrow('Index out of bounds: 10 >= 10')
    expect(() => alShort.get(2)).toThrow('Index out of bounds: 2 >= 1')
    expect(alShort.get(0)).toBe(3)
    expect(() => alShort.get(-1)).toThrow('Index out of bounds: -1 < 0')
    expect(() => alShort.slice(2, 1)).toThrow('Start after end: 2 > 1')
    expect(() => alShort.slice(4, 5)).toThrow('End index out of bounds: 5 > 1')
    expect(() => alShort.slice(-1, 0)).toThrow('Start index out of bounds: -1 < 0')
  })

  it('appends', () => {
    const max = 4
    times(max).forEach(i => {
      const l1 = times(i)
      const l2 = times(max - i)
      const l1b = l1.slice()
      const l2b = l2.slice()

      const al1 = new XList(l1b, false)
      const al2 = new XList(l2b, false)
      const al3 = new XList(l2)

      const concat1 = al1.concat(al2)
      const concat2 = al1.concat(al3)

      expect(concat1.toList()).toEqual(l1.concat(l2))
      expect(concat2.toList()).toEqual(l1.concat(l2))

      // No unexpected changes
      expect(al1.toList()).toEqual(l1)
      expect(al2.toList()).toEqual(l2)
      expect(al3.toList()).toEqual(l2)

      // concatenated target backend is appended
      expect(l1b).toEqual(l1.concat(l2))
      // concatenated operand is untouched
      expect(l2b).toEqual(l2)
    })
  })

  it('slices', () => {
    const a = new XList([1, 2, 3, 4, 5])
    expect(a.slice(0, 5).toList()).toEqual([1, 2, 3, 4, 5])
    expect(a.slice(1, 4).toList()).toEqual([2, 3, 4])
    expect(a.slice(1, 4).slice(1, 2).toList()).toEqual([3])
    expect(a.slice(1, 1).toList()).toEqual([])
  })

  it('chains appended on sliced', () => {
    const a: XList<any> = new XList([1, 2, 3, 4, 5])
    const b = new XList(['a', 'b'])
    expect(a.slice(1, 4).concat(b.slice(1, 2)).toList()).toEqual([2, 3, 4, 'b'])

    expect(a.slice(0, 0).concat(b.slice(1, 2)).toList()).toEqual(['b'])
  })
})
