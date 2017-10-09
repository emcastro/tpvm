
export class AppendList<T> {
  private backend: T[]

  private _length: number

  get length () { return this._length }

  constructor (array: T[] = [], copy: boolean = true) {
    const localArray = copy ? array.slice() : array
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
      for (let i = 0; i < this.backend.length; i++) {
        list.backend.push(this.backend[i])
      }
    }
    for (let i = 0; i < that.backend.length; i++) {
      list.backend.push(that.backend[i])
    }
    return list
  }

  toList (): T[] {
    const result = []
    for (let i = 0; i < this._length; i++) {
      result.push(this.backend[i])
    }
    return result
  }

  private static innerMake<T> (): AppendList<T> {
    return Object.create(AppendList.prototype) as AppendList<T>
  }
}
