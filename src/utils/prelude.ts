
/** Typed version of o[Symbol.iterator]() */
export function iterator (o: any): Iterator<any> {
  return o[Symbol.iterator]()
}

/** Iterator to Array */
export function iteratorToArray<T> (i: Iterator<T>): T[] {
  const list: T[] = []
  let item
  while (!(item = i.next()).done) { // tslint:disable-line
    list.push(item.value)
  }
  return list
}

/** Deep Equals.
 * Compare primitive objects (number, string, boolean),
 * standard Array and Map, and
 * objects with that have .equals() method.
 */
export function equal (a: any, b: any): boolean {
  if (a === b) return true // fast-track
  if (a != null && typeof a === 'object') {
    if (typeof a.equals === 'function' && b != null) return a.equals(b)

    if (a instanceof Map && b instanceof Map) return mapEqual(a, b)

    if (a instanceof Array && b instanceof Array) return arrayEqual(a, b)
  }
  return false
}

/** Compare Map */
export function mapEqual (a: Map<any, any>, b: Map<any, any>): boolean {
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
export function arrayEqual (a: any[], b: any[]): boolean {
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

export function notnull<T> (value: T | null | undefined): T {
  if (value == null) throw new Error('Null or undefined value')
  return value
}

export function switchMap<T1, R> (object: { [switchKey: string]: (switchValue: any) => R }): Map<string, (switchValue: T1) => R> {
  return new Map(Object.entries(object)) as Map<string, (swtichValue: T1) => R>
}

export function switchMap2<T1, T2, R> (object: { [switchKey: string]: (switchValue: any, arg: T2) => R }): Map<string, (switchValue: T1, arg: T2) => R> {
  return new Map(Object.entries(object)) as Map<string, (switchValue: T1, arg: T2) => R>
}

export type MayBe<T> = T | undefined

export type OneOrMany<T> = T | T[]

export class Pair<A, B> {
  _0: A
  _1: B

  constructor (a: A, b: B) {
    this._0 = a
    this._1 = b
  }
}

export function memo<F extends Function> (f: F) {
  const store = new Map()

  return ((arg: any) => {
    let result = store.get(arg)
    if (result === undefined) {
      result = f(arg)
      store.set(arg, result)
    }

    return result
  }) as any as F
}
