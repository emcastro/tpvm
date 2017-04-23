// @flow

// Compare primitive objects (number, string, boolean),
// standard Array and Map, and
// objects with that have .equals() method.
export function equal (a: mixed, b: mixed) : boolean {
  if (a == null) return b == null
  if (typeof a === 'object') {
    if (typeof a.equals === 'function') return a.equals(b)

    if (a instanceof Map && b instanceof Map) return mapEqual(a, b)

    if (a instanceof Array && b instanceof Array) return arrayEqual(a, b)
  }
  return a === b
}

// Compare Map
export function mapEqual (a : Map<mixed, mixed>, b : Map<mixed, mixed>) : boolean {
  if (b === a) return true // fast-track

  if (a.size !== b.size) return false

  for (const itemA of a) {
    const key = itemA[0]
    const value = itemA[1]
    if (!equal(value, b.get(key))) return false
  }
  return true
}

type Iterator = {
  next() : { done: boolean; value: mixed }
}

function iterator (o : any) : Iterator {
  return o[Symbol.iterator]()
}

// Compare Array
export function arrayEqual (a: Array<mixed>, b: Array<mixed>) : boolean {
  if (b === a) return true // fast-track

  if (a.length !== b.length) return false

  const aIter = iterator(a)
  const bIter = iterator(b)

  let itemA = aIter.next()
  let itemB = bIter.next()

  while (!itemA.done) {
    if (!equal(itemA.value, itemB.value)) return false
    itemA = aIter.next()
    itemB = bIter.next()
  }

  if (itemA.done && itemB.done) throw new Error('Assertion error')
  return true
}
