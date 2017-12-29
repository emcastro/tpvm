
import * as _ from 'lodash'

export type defined = number | string | boolean | symbol | object | null | Function
export type anything = defined | undefined

/** Frozen empty list */
const _emptyList: any[] = Object.freeze([]) as any
export function emptyList<T> () { return _emptyList as T[] }

/** Typed version of o[Symbol.iterator]() */
export function iterator (o: any): Iterator<anything> {
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

let _emptySet = new Set()
export function emptySet<T> (): Set<T> {
  if (_emptySet.size === 0) {
    return _emptySet as any
  } else {
    _emptySet = new Set()
    return _emptySet as any
  }
}

export function singleton<T> (value: T): Set<T> {
  const set = new Set()
  set.add(value)
  return set
}

/** @return the same set is item in not in this, or a new set including the new item */
export function setAdd<T> (set: Set<T>, item: T): Set<T> {
  if (set.has(item)) {
    return set
  } else {
    const copy = new Set(set)
    copy.add(item)
    return copy
  }
}

/** @return a new set including the other set */
export function extendSet<T> (set1: Set<T>, set2: Set<T>): Set<T> {
  if (set1.size === 0) {
    return set2
  } else if (set2.size === 0) {
    return set1
  } else {
    const copy = new Set(set1)
    for (const item of set2) {
      copy.add(item)
    }
    return copy
  }
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
export function mapEqual (a: Map<anything, anything>, b: Map<anything, anything>): boolean {
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
export function arrayEqual (a: anything[], b: anything[]): boolean {
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

export function isNotNull<A> (v: A | null): v is A {
  return v !== null
}

export function switchMap<T1, R> (object: { [switchKey: string]: (switchValue: anything) => R }): Map<string, (switchValue: T1) => R> {
  return new Map(Object.entries(object)) as Map<string, (switchValue: T1) => R>
}

export function switchMap2<T1, T2, R> (object: { [switchKey: string]: (switchValue: anything, arg: T2) => R }): Map<string, (switchValue: T1, arg: T2) => R> {
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

export function memo<V, R extends defined> (f: (v: V) => R): (v: V) => R {
  const store = new Map<V, R>()

  return ((arg: V) => {
    let result = store.get(arg)
    if (result === undefined) {
      result = f(arg)
      store.set(arg, result)
    }

    return result
  })
}

/** Error with cascading cause error */
export class XError extends Error {

  cause?: Error

  constructor (msg?: string, cause?: Error, showSelfTrace: boolean = true) {
    super(msg)
    if (showSelfTrace) {
      this.stack = this.stack!.replace(/^Error/, this.constructor.name)

      if (cause !== undefined) {
        this.stack += '\n'
        this.stack += cause.stack
      }
    } else {
      this.stack = `${this.constructor.name}: ${msg}\n${cause!.stack}`
    }
  }

}

type Class<T> = new (...args: any[]) => T

class ClassCastError extends Error {
  constructor (public awaitedClass: Class<anything>, public value: anything, public include: boolean) {
    super(`ClassCastError: awaiting ${include ? '' : 'not '}${awaitedClass.name}; found: \`${value}\`: ${value && value.constructor.name}`)
  }
}

const CHECK_CAST: boolean = true

export function checkCast<T> (value: T, classConstructor: Class<T>) {
  if (CHECK_CAST && !(value instanceof classConstructor)) {
    throw new ClassCastError(classConstructor, value, true)
  }
}

export function checkNotCast (value: anything, classConstructor: Class<anything>) {
  if (CHECK_CAST && (value instanceof classConstructor)) {
    throw new ClassCastError(classConstructor, value, false)
  }
}

type TypeName = 'string' | 'number' | 'boolean' // and others?

class TypeCastError extends Error {
  constructor (public awaitedType: TypeName, public value: any, public include: boolean) {
    super(`TypeCastError: awaiting ${include ? '' : 'not '}${awaitedType}; found: \`${value}\`: ${typeof value}`)
  }
}

export function checkType (value: anything, typeName: TypeName) {
  if (CHECK_CAST && (typeof value !== typeName)) { // tslint:disable-line
    throw new TypeCastError(typeName, value, true)
  }
}

export function checkNotType (value: anything, typeName: TypeName) {
  if (CHECK_CAST && !(typeof value !== typeName)) { // tslint:disable-line
    throw new TypeCastError(typeName, value, false)
  }
}

export function notnull<T> (value: T | null | undefined): T {
  if (value == null) throw new Error('Null or undefined value')
  return value
}

export function assertNever (invalidValue: never): never {
  throw new Error(`Invalid value that should never happen: ${invalidValue}`)
}

export function $$$ (): never {
  throw new Error(`Not implemented yet`)
}

/** Build a comparator for Array::sort() */
export function by<T> (accessor: (value: T) => number): (v1: T, v2: T) => number {
  return (v1, v2) => accessor(v1) - accessor(v2)
}
