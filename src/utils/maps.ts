
import { anything, defined, toString, $$$ } from './prelude'

interface Entries<K, V extends defined> extends Map<K, V | Entries<K, V>> { }

export class MultiKeyMap<KS extends Array<anything>, V> implements MapLike<KS, V> {
  root: Entries<anything, V> = new Map()
  keySize: number

  protected navigateToLeafMap (ks: KS) {
    let map = this.root
    let i
    for (i = 0; i < ks.length - 1; i++) {
      const k = ks[i]
      const step = map.get(k)
      if (step === undefined) {
        const newMap = new Map()
        map.set(k, newMap)
        map = newMap
      } else if (step instanceof Map) {
        map = step
      } else {
        throw new Error(`Error while putting sub-key ${k}@${i}. Found: ${toString(step)}`)
      }
    }
    return map
  }

  set (ks: KS, v: V) {
    this.keySize = ks.length
    this.navigateToLeafMap(ks).set(ks[ks.length - 1], v)
  }

  get (ks: KS) {

    let map = this.root
    for (const k of ks) {
      const step = map.get(k)
      if (step === undefined) return undefined
      if (step instanceof Map) {
        map = step
      } else {
        return step
      }
    }
  }

  [Symbol.iterator] () { return this.entries() }

  private *walkEntries<E> (entryFormatter: (keys: KS, v: V) => E) {
    if (this.root.size === 0) return // nothing inside

    const stack = [this.root.entries()]
    const keys: KS = ([] as any as KS)

    let level = 0
    while (level >= 0) {
      const r = stack[level].next()
      if (!r.done) {
        const [k, v] = r.value
        keys[level] = k

        const nextLevel = level + 1
        if (nextLevel < this.keySize) {
          stack[nextLevel] = (v as Entries<KS, V>).entries()
          level = nextLevel
        } else {
          yield entryFormatter(keys, v as V)
        }
      } else {
        level--
      }
    }
  }

  entries () { return this.walkEntries<[KS, V]>((ks, v) => [[...ks] as KS, v]) }

  keys () { return this.walkEntries((ks, v) => [...ks] as KS) }
  values () { return this.walkEntries((ks, v) => v) }

}

interface MapLike<K, V> {
  get (k: K): V | undefined
  set (k: K, v: V): void

  [Symbol.iterator] (): IterableIterator<[K, V]>
  entries (): IterableIterator<[K, V]>
  keys (): IterableIterator<K>
  values (): IterableIterator<V>
}

export type CounterMap<K> = MapLike<K, number> & { inc (k: K): void }

export function counter<K> (newMap: { new(): MapLike<K, number> }): CounterMap<K> {
  const map: Partial<CounterMap<K>> = new newMap()
  map.inc = function (this: CounterMap<K>, k: K) {
    this.set(k, (this.get(k) || 0) + 1)
  }
  return map as CounterMap<K>
}
