// @flow

import {arrayEqual} from '../prelude'

describe('arrayEqual', () => {
  const emptyArray = []
  const array = [1, 2, 'b', []]

  it('does not have to handle null because of typing', () => {})

  it('return true when using same array twice', () => {
    expect(arrayEqual(emptyArray, emptyArray)).toBe(true)

    expect(arrayEqual(array, array)).toBe(true)
  })
})
