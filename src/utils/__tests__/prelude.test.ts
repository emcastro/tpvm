
import { equal, arrayEqual, mapEqual, memo } from '../prelude'

describe('arrayEqual', () => {
  it('does not have to handle nulls because of typing (Flow)', () => { /* */ })

  it('returns true when comparing self', () => {
    const empty: any[] = []
    expect(arrayEqual(empty, empty)).toBe(true)

    const array = [1, 2, 'b', []]
    expect(arrayEqual(array, array)).toBe(true)
  })

  it('returns true on equal arrays', () => {
    expect(arrayEqual([], [])).toBe(true)

    expect(arrayEqual([1, 2, 'b'], [1, 2, 'b'])).toBe(true)
  })

  it('is a deep-equal', () => {
    expect(arrayEqual([1, 2, ['b']], [1, 2, ['b']])).toBe(true)
  })

  it('returns false when used with different values', () => {
    expect(arrayEqual([], [1])).toBe(false)
    expect(arrayEqual([0], [1])).toBe(false)
    expect(arrayEqual([1, 2, 'b', []], [1, 2, 'b', [3]])).toBe(false)
  })
})

describe('mapEqual', () => {
  it('does not have to handle nulls because of typing (Flow)', () => { /* */ })

  it('returns true when comparing self', () => {
    const empty = new Map()
    expect(mapEqual(empty, empty)).toBe(true)

    const array = new Map<string, any>([['one', 1], ['two', 2], ['b', 'b'], ['emptyArray', []]])
    expect(mapEqual(array, array)).toBe(true)
  })

  it('returns true on equal maps', () => {
    expect(mapEqual(new Map(), new Map())).toBe(true)

    expect(mapEqual(
      new Map<string, any>([['one', 1], ['two', 2], ['b', 'b']]),
      new Map<string, any>([['one', 1], ['two', 2], ['b', 'b']]))).toBe(true)

    const complexKey = { key: 1 }
    expect(mapEqual(new Map([[complexKey, 1]]), new Map([[complexKey, 1]]))).toBe(true)
  })

  it('is a deep-equal', () => {
    expect(mapEqual(new Map([['array', [1, 2, 3]]]), new Map([['array', [1, 2, 3]]]))).toBe(true)
  })

  it('returns false when used with different values', () => {
    expect(mapEqual(new Map([]), new Map([['one', 1]]))).toBe(false)
    expect(mapEqual(new Map([['one', 0]]), new Map([['one', 1]]))).toBe(false)
    expect(mapEqual(new Map([['zero', 0]]), new Map([['one', 1]]))).toBe(false)

    expect(mapEqual(new Map([[{ key: 1 }, 1]]), new Map([[{ key: 1 }, 1]]))).toBe(false)
  })
})

describe('equal', () => {
  it('works on maps', () => {
    expect(equal(
      new Map<string, any>([['one', 1], ['two', 2], ['b', 'b']]),
      new Map<string, any>([['one', 1], ['two', 2], ['b', 'b']]))).toBe(true)
    expect(equal(
      new Map<string, any>([['one', 1], ['two', 2], ['b', 'b']]), [])).toBe(false)
  })

  it('works on arrays', () => {
    expect(equal([1, 2, 'b'], [1, 2, 'b'])).toBe(true)
    expect(equal([1, 2, 'b'], null)).toBe(false)
  })

  const object1 = {
    value: 42,
    equals: function (that: {value: number}) { return this.value === that.value }
  }

  it('works on objects with equals() method', () => {
    const object2 = { ...object1 }

    const object3 = { ...object1, value: 0 }

    expect(equal(object1, object1)).toBe(true)
    expect(equal(object1, object2)).toBe(true)
    expect(equal(object1, object3)).toBe(false)
  })

  it('does not call equals() when null', () => {
    expect(equal(null, object1)).toBe(false)
    expect(equal(object1, null)).toBe(false)
    expect(equal(object1, 2)).toBe(false)
  })

  it('does not fail on equals() when comparing to anything, as long as equals does not call methods', () => {
    expect(equal(object1, 2)).toBe(false)
    expect(equal(2, object1)).toBe(false)
  })

  it('fails on poorly coded equals() method', () => {
    const poor = {
      value: () => 42,
      equals: function (that: {value: () => number}) { return this.value() === that.value() }
    }

    expect(poor.equals(poor)).toBe(true)

    expect(() => equal(poor, 2)).toThrowError(TypeError)
  })

  it('override equals() when comparing self', () => {
    const strange = {
      equals: (that: any) => false
    }

    expect(strange.equals(strange)).toBe(false)

    expect(equal(strange, strange)).toBe(true)
  })
})

describe('memo', () => {
  it('memoizes', () => {
    let count = 0
    const plus1Memo = memo((x: number) => { count ++ ; return x + 1 })
    expect(plus1Memo(1)).toBe(2)
    expect(plus1Memo(2)).toBe(3)
    expect(plus1Memo(1)).toBe(2)

    expect(count).toBe(2)
  })

})
