
export class AppendList<T> {
  private backend: T[]

  private length: number

  constructor (array: T[] = [], copy: boolean = true) {
    const localArray = copy ? array.slice() : array
    this.backend = localArray
    this.length = localArray.length
    return this
  }

  get (index: number): T {
    if (index < 0) {
      throw new Error(`Index out of bounds: ${index} < 0`)
    } if (index > this.length) {
      throw new Error(`Index out of bounds: ${index} >= ${this.length}`)
    }

    return this.backend[index]
  }

  concat (that: AppendList<T>): AppendList<T> {
    const list = AppendList.innerMake<T>()
    list.length = this.length + that.length
    if (this.backend.length === this.length) {
      // No appending yet
      list.backend = this.backend
    } else {
      // Appending already occurred
      const list = AppendList.innerMake<T>()
      list.backend = []
      for (let i = 0; i < this.backend.length; i++) {
        this.backend.push(this.backend[i])
      }
    }
    for (let i = 0; i < that.backend.length; i++) {
      this.backend.push(that.backend[i])
    }
    return list
  }

  push (element: T): AppendList<T> {
    const list = AppendList.innerMake<T>()
    list.length = this.length + 1
    if (this.backend.length === this.length) {
      // No appending yet
      list.backend = this.backend
    } else {
      // Appending already occurred
      const list = AppendList.innerMake<T>()
      list.backend = []
      for (let i = 0; i < this.backend.length; i++) {
        this.backend.push(this.backend[i])
      }
    }
    this.backend.push(element)
    return list
  }

  private static innerMake<T> (): AppendList<T> {
    return Object.create(AppendList.prototype) as AppendList<T>
  }
}
