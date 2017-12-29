// import { Spy, SpyResult, Assert } from './spy'
import { copyArrayInto } from './fastArray'
import { arrayEqual } from './prelude'

export class XList<T> {
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

  // @Assert(function (this: AppendList<any>, that: AppendList<any>, result: AppendList<any>) {
  //   return arrayEqual([...this.toList(), ...that.toList()], result.toList())
  // })
  // @SpyResult({
  //   in (this: AppendList<any>, that: AppendList<any>) { return [this.toString(), that.toString()] },
  //   out (result: AppendList<any>) { return result.toString() }
  // })
  concat (that: XList<T>): XList<T> {
    if (this.from !== 0 || this.to !== this.backend.length) {
      // An append or slice has already occurred
      return new XList(this.toList(), false).concat(that)
    } else if (that.from !== 0) {
      return this.concat(new XList(that.toList(), false))
    } else {
      const list = XList.innerMake<T>()
      list.from = 0
      list.to = this.length + that.length
      list.backend = this.backend
      copyArrayInto(that.backend, list.backend)
      return list
    }
  }

  append (item: T): XList<T> {
    if (this.from !== 0 || this.to !== this.backend.length) {
      // An append or slice has already occurred
      return new XList(this.toList(), false).concat(new XList([item], false))
    } else {
      const list = XList.innerMake<T>()
      list.from = 0
      list.to = this.length + 1
      list.backend = this.backend
      list.backend[this.length] = item
      return list
    }
  }

  slice (from: number, to: number): XList<T> {
    const list = XList.innerMake<T>()
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
    if (!(other instanceof XList)) {
      return false
    }
    return arrayEqual(this.toList(), other.toList()) // FIXME: very inefficient (copy arrays)
  }

  private static innerMake<T> (): XList<T> {
    return Object.create(XList.prototype) as XList<T>
  }

  toString () {
    return `[:${this.toList().toString()}:]`
  }
}
