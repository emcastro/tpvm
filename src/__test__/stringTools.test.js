// @flow

import { jsEscape } from '../stringTools'

describe('jsEscape', () => {
  // it does not have to handle null because of typing

  it('return empty string on empty string', () => {
    expect(jsEscape('')).toBe('')
  })

  it('works well', () => {
    expect(jsEscape('abc')).toBe('abc')
    expect(jsEscape('\b\t\n\f\r"\'\\')).toBe('\\b\\t\\n\\f\\r\\"\\\'\\\\')
  })
})
