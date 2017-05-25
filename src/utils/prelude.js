// @flow

/** Typed version of o[Symbol.iterator]() */
export function iterator (o : any) : Iterator<mixed> {
  return o[Symbol.iterator]()
}

/** Iterator to Array */
export function iteratorToArray<T> (i : Iterator<T>) : T[] {
  const list : T[] = []
  let item : { done: boolean, value: T }  // TODO: report type error in Flow about IteratorResult
  while (!(item = (i.next() : any)).done) {
    list.push(item.value)
  }
  return list
}

/** Deep Equals.
 * Compare primitive objects (number, string, boolean),
 * standard Array and Map, and
 * objects with that have .equals() method.
 */
export function equal (a: mixed, b: mixed) : boolean {
  if (a === b) return true // fast-track
  if (a != null && typeof a === 'object') {
    if (typeof a.equals === 'function' && b != null) return a.equals(b)

    if (a instanceof Map && b instanceof Map) return mapEqual(a, b)

    if (a instanceof Array && b instanceof Array) return arrayEqual(a, b)
  }
  return false
}

/** Compare Map */
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

/** Compare Array */
export function arrayEqual (a: mixed[], b: mixed[]) : boolean {
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

  // if (!(itemA.done && itemB.done)) throw new Error('Assertion error')
  return true
}

export function notnull<T> (value: ?T) : T {
  if (value == null) throw new Error('Null or undefined value')
  return value
}
