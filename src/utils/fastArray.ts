
import * as _ from 'lodash'

export function fastmap<T, R> (array: T[], f: (t: T) => R): R[] {
  const length = array.length
  switch (length) {
    case 0: return []
    case 1: return [f(array[0])]
    case 2: return [f(array[0]), f(array[1])]
    case 3: return [f(array[0]), f(array[1]), f(array[2])]
    case 4: return [f(array[0]), f(array[1]), f(array[2]), f(array[3])]
    case 5: return [f(array[0]), f(array[1]), f(array[2]), f(array[3]), f(array[4])]
    case 6: return [f(array[0]), f(array[1]), f(array[2]), f(array[3]), f(array[4]), f(array[5])]
    case 7: return [f(array[0]), f(array[1]), f(array[2]), f(array[3]), f(array[4]), f(array[5]), f(array[6])]
  }

  const result = []
  for (let i = 0; i < length; i++) {
    result[i] = f(array[i])
  }
  return result
}

export function fasteach<T> (array: T[], f: (t: T) => void): void {
  const length = array.length
  if (length === 0) return  // entering the loop with length 0 cause deoptimisation problems
  for (let i = 0; i < length; i++) {
    f(array[i])
  }
}

export function flapmap<T, R> (array: T[], f: (t: T) => (R | R[])): R[] {
  const length = array.length
  const result: R[] = []
  let j = 0
  for (let i = 0; i < length; i++) {
    const r = f(array[i])
    if (Array.isArray(r)) {
      for (let k = 0; k < r.length; k++) {
        result[j++] = r[k]
      }
    } else {
      if (r !== undefined) {
        result[j++] = r
      }
    }
  }
  return result
}

const id = <T>(x: T) => x

export function flatten<T> (array: (T|T[])[]): T[] {
  return flapmap(array, id)
}

export function zip<A, B> (array1: A[], array2: B[]): [A, B][] {
  if (array1.length !== array2.length) throw new Error('zipping list of different sizes')
  const result: [A,B][] = []
  const length = array1.length
  for (let i = 0; i < length; i++) {
    result[i] = [array1[i], array2[i]]
  }
  return result
}

export function safeNewMap<K,V> (values: [K, V][]): Map < K,V > {
  const map = new Map(values)
  if (map.size !== values.length) {
    throw new Error(`Duplicate keys`)
  }
  return map
}
