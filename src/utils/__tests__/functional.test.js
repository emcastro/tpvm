// @flow

import _ from 'lodash'

import { fastmap } from '../functional'

describe('fastmap', () => {
  it('works like Array.map on non-spare arrays', () => {
    for (let i = 0; i < 15; i++) {
      const list = _.times(i)
      expect(fastmap(list, x => `(${x})`)).toEqual(list.map(x => `(${x})`))
    }
  })
})
