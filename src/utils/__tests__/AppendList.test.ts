
import * as _ from 'lodash'
import { AppendList } from '../AppendList'

describe('AppendList', () => {
  it('can be built', () => {
    _.times(10).forEach(i => {
      const l = _.times(i)
      const al = new AppendList(l)
      expect(al.toList()).toEqual(l)
    })
  })

  it('gives access to its elements', () => {
    _.times(10).forEach(i => {
      const l = _.times(i)
      const al = new AppendList(l)

      for (let j = 0; j < al.length; j++) {
        expect(l[j]).toBe(al.get(j))
      }
    })
  })

  it('throws exception on out-of-bound access', () => {
    const al1 = new AppendList()
    const al10 = new AppendList(_.times(10))

    expect(() => al1.get(-1)).toThrow('Index out of bounds: -1 < 0')
    expect(() => al1.get(0)).toThrow('Index out of bounds: 0 >= 0')
    expect(() => al10.get(-1)).toThrow('Index out of bounds: -1 < 0')
    expect(al10.get(0)).toBe(0)
    expect(al10.get(9)).toBe(9)
    expect(() => al10.get(10)).toThrow('Index out of bounds: 10 >= 10')
  })

  it('appends', () => {
    const max = 4
    _.times(max).forEach(i => {
      const l1 = _.times(i)
      const l2 = _.times(max - i)
      const l1b = l1.slice()
      const l2b = l2.slice()

      const al1 = new AppendList(l1b, false)
      const al2 = new AppendList(l2b, false)
      const al3 = new AppendList(l2)

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

})
