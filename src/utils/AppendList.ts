
function copyArrayInto<T> (from: T[], to: T[]): T[] {
  const fromLength = from.length
  let j = to.length
  for (let i = 0; i < fromLength; i++) {
    to[j++] = from[i]
  }
  return to
}

export class AppendList<T> {
  private backend: T[]

  private _length: number

  get length () { return this._length }

  constructor (array: T[] = [], copy: boolean = true) {
    const localArray = copy ? copyArrayInto(array, []) : array
    this.backend = localArray
    this._length = localArray.length
    return this
  }

  get (index: number): T {
    if (index < 0) {
      throw new Error(`Index out of bounds: ${index} < 0`)
    } if (index >= this._length) {
      throw new Error(`Index out of bounds: ${index} >= ${this._length}`)
    }

    return this.backend[index]
  }

  concat (that: AppendList<T>): AppendList<T> {
    const list = AppendList.innerMake<T>()
    list._length = this._length + that._length
    if (this.backend.length === this._length) {
      // No appending yet
      list.backend = this.backend
    } else {
      // Appending already occurred
      list.backend = []
      copyArrayInto(this.backend, list.backend)
    }
    copyArrayInto(that.backend, list.backend)
    return list
  }

  toList (): T[] {
    const result = []
    const l = this._length // we don't read the whole array
    for (let i = 0; i < l; i++) {
      result[i] = this.backend[i]
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
