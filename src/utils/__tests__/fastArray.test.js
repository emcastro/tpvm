// @flow

import _ from 'lodash'

import { map, foreach } from '../fastArray'

describe('map', () => {
  it('works like Array.map on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = _.times(i)
      expect(map(list, x => `(${x})`)).toEqual(list.map(x => `(${x})`))
    }
  })
})

describe('foreach', () => {
  it('works like Array.forEach on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = _.times(i)

      const foreachResult = []
      const arrayForEachResult = []
      foreach(list, x => foreachResult.push(`(${x})`))
      list.forEach(x => arrayForEachResult.push(`(${x})`))

      expect(foreachResult).toEqual(arrayForEachResult)
    }
  })
})
