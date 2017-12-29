
import { anything, defined, toString } from './prelude'

interface Entries<K, V extends defined> extends Map<K, V | Entries<K, V>> { }

export class MultiKeyMap<KS extends Array<anything>, V> {
  root: Entries<anything, V> = new Map()

  put (ks: KS, v: V) {
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
    map.set(ks[i], v)
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
}
