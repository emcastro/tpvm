import { copyArrayInto } from './fastArray'

export class AppendList<T> {
  private backend: T[]

  private from: number

  private to: number

  get length () { return this.to - this.from }

  constructor (array: T[] = [], copy: boolean = true) {
    const localArray = copy ? copyArrayInto(array, []) : array
    this.backend = localArray
    this.from = 0
    this.to = localArray.length
    return this
  }

  get (index: number): T {
    if (index < 0) {
      throw new Error(`Index out of bounds: ${index} < 0`)
    } if (index >= this.length) {
      throw new Error(`Index out of bounds: ${index} >= ${this.length}`)
    }

    return this.backend[index + this.from]
  }

  concat (that: AppendList<T>): AppendList<T> {
    if (this.from !== 0) {
      return new AppendList(this.toList()).concat(that)
    } else if (that.from !== 0) {
      return this.concat(new AppendList(that.toList()))
    } else {
      const list = AppendList.innerMake<T>()
      list.from = 0
      list.to = this.length + that.length
      if (this.backend.length === this.length) {
        // No append has occurred yet
        list.backend = this.backend
      } else {
        // An append has already occurred
        list.backend = []
        copyArrayInto(this.backend, list.backend)
      }
      copyArrayInto(that.backend, list.backend)
      return list
    }
  }

  slice (from: number, to: number): AppendList<T> {
    const list = AppendList.innerMake<T>()
    list.backend = this.backend
    list.from = this.from + from
    list.to = this.from + to

    if (from > to) {
      throw new Error(`Start after end: ${from} > ${to}`)
    } if (from < 0) {
      throw new Error(`Start index out of bounds: ${from} < 0`)
    } if (to > this.length) {
      throw new Error(`End index out of bounds: ${to} > ${this.length}`)
    }

    return list
  }

  toList (): T[] {
    const result = []
    const l = this.to
    let j = 0
    for (let i = this.from; i < l; i++) {
      result[j++] = this.backend[i]
    }
    return result
  }

  equals (other: any): boolean {
    throw new Error('Pas fini')
  }

  private static innerMake<T> (): AppendList<T> {
    return Object.create(AppendList.prototype) as AppendList<T>
  }

  toString () {
    return '[:' + this.toList().toString() + ':]'
  }
}
