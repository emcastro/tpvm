// @flow

import _ from 'lodash'

import { fastmap, fasteach, flapmap } from '../fastArray'

describe('fastmap', () => {
  it('works like Array.map on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = _.times(i)
      expect(fastmap(list, x => `(${x})`)).toEqual(list.map(x => `(${x})`))
    }
  })
})

describe('fasteach', () => {
  it('works like Array.forEach on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = _.times(i)

      const foreachResult = []
      const arrayForEachResult = []
      fasteach(list, x => foreachResult.push(`(${x})`))
      list.forEach(x => arrayForEachResult.push(`(${x})`))

      expect(foreachResult).toEqual(arrayForEachResult)
    }
  })
})

describe('flatmap', () => {
  it('flattens when needed', () => {
    expect(flapmap([1, [2, 3], [], null, undefined, [[5]]], x => x)).toEqual([1, 2, 3, null, [5]])
  })

  it('works like _.flatMap', () => {
    for (let i = 0; i < 5; i++) {
      const list = _.times(i)

      const flattened = _.flatMap((list: any), x => _.times(x))
      expect(flapmap(list, x => _.times(x))).toEqual(flattened)
    }
  })

  it('works like _.map', () => {
    for (let i = 0; i < 5; i++) {
      const list = _.times(i)

      const flattened = _.map(list, x => x * 10)
      expect(flapmap(list, x => x * 10)).toEqual(flattened)
    }
  })
})
