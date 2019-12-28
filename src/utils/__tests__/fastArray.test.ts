
import times from 'lodash/times'

import { fastmap, fasteach, flapmap, zip } from '../fastArray'

describe('fastmap', () => {
  it('works like Array.map on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = times(i)
      expect(fastmap(list, x => `(${x})`)).toEqual(list.map(x => `(${x})`))
    }
  })
})

describe('fasteach', () => {
  it('works like Array.forEach on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = times(i)

      const foreachResult: string[] = []
      const arrayForEachResult: string[] = []
      fasteach(list, x => foreachResult.push(`(${x})`))
      list.forEach(x => arrayForEachResult.push(`(${x})`))

      expect(foreachResult).toEqual(arrayForEachResult)
    }
  })
})

describe('flatmap', () => {
  it('flattens when needed', () => {
    expect(flapmap<any,any>([1, [2, 3], [], null, undefined, [[5]]], x => x)).toEqual([1, 2, 3, null, [5]])
  })

  it('works like _.flatMap', () => {
    for (let i = 0; i < 5; i++) {
      const list = times(i)

      const flattened = list.flatMap(x => times(x))
      expect(flapmap(list, x => times(x))).toEqual(flattened)
    }
  })

  it('works like _.map', () => {
    for (let i = 0; i < 5; i++) {
      const list = times(i)

      const flattened = list.map(x => x * 10)
      expect(flapmap(list, x => x * 10)).toEqual(flattened)
    }
  })
})

describe('zip', () => {
  it('zips', () => {
    expect(zip(['A','b','©'], [1,2,3])).toEqual([['A',1], ['b', 2], ['©',3]])
  })

  it('works on empty lists', () => {
    expect(zip([], [])).toEqual([])
  })

  it('throws Error when list sizes do not match', () => {
    expect(() => zip([], [1])).toThrowError(Error)
  })
})
