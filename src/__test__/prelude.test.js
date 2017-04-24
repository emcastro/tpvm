// @flow

import {arrayEqual} from '../prelude'

test('adds 1 + 2 to equal 3', () => {
  expect(arrayEqual([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true)
})
