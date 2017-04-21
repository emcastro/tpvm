// @flow

export class ExprBase {
  static a () {}
}

export function notnull<T> (v: T) : T {
  if (v == null) {
    throw new Error('Null argument')
  }
  return v
}

// Compare primitive object (number, string, boolean) and
// objects with that have .equals() method.
export function standardEquals (a: mixed, b: mixed) : boolean {
  if (a == null) return b == null
  if (typeof a === 'object' && typeof a.equals === 'function') return a.equals(b)
  return a === b
}
