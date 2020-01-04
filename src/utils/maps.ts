
import { anything } from './prelude'

// interface Entries<K, V> extends Map<K, V | Entries<K, V>> { }
type Entries<K, V> = Map<K, V | Entries<K, V>>

export class MultiKeyMap<KS extends anything[], V> implements MapLike<KS, V> {
  root: Entries<anything, V> = new Map()
  keySize?: number = undefined

  protected navigateToLeafMap (ks: KS): Entries<anything, V> {
    let map = this.root
    let i: number
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
        throw new Error(`Error while putting sub-key ${String(k)}@${i}. Found: ${String(step)}`)
      }
    }
    return map
  }

  set (ks: KS, v: V): void {
    if (this.keySize === undefined) {
      this.keySize = ks.length
    } else {
      if (this.keySize !== ks.length) throw new Error('Invalid key size')
    }
    this.navigateToLeafMap(ks).set(ks[ks.length - 1], v)
  }

  get (ks: KS): V | undefined {
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

  [Symbol.iterator] (): IterableIterator<[KS, V]> { return this.entries() }

  private * walkEntries<E> (entryFormatter: (keys: KS, v: V) => E): IterableIterator<E> {
    if (this.root.size === 0) return // nothing inside
    if (this.keySize === undefined) throw new Error('Invalid internal state')

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

  entries (): IterableIterator<[KS, V]> { return this.walkEntries<[KS, V]>((ks, v) => [[...ks] as KS, v]) }

  keys (): IterableIterator<KS> { return this.walkEntries((ks, v) => [...ks] as KS) }
  values (): IterableIterator<V> { return this.walkEntries((ks, v) => v) }
}

interface MapLike<K, V> {
  get(k: K): V | undefined
  set(k: K, v: V): void

  [Symbol.iterator](): IterableIterator<[K, V]>
  entries(): IterableIterator<[K, V]>
  keys(): IterableIterator<K>
  values(): IterableIterator<V>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Timestamp extends Number {}

export function diffTimestamp (a: Timestamp, b: Timestamp): number {
  return (b as number) - (a as number)
}

export type CounterMap<K> = MapLike<K, Timestamp[]> & { inc(k: K): void }

export function counter<K> (newMap: new () => MapLike<K, Timestamp[]>): CounterMap<K> {
  // eslint-disable-next-line new-cap
  const map: Partial<CounterMap<K>> = new newMap()
  map.inc = function (this: CounterMap<K>, k: K) {
    let list = this.get(k)
    if (list === undefined) {
      list = []
      this.set(k, list)
    }
    list.push(Date.now() / 1000)
  }
  return map as CounterMap<K>
}
