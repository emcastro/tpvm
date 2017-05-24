// @flow

export function map<T, R> (array: T[], f: T=>R): R[] {
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

export function foreach<T> (array: T[], f: T=>mixed): void {
  const length = array.length
  if (length === 0) return  // entering the loop with length 0 cause deoptimisation problems
  for (let i = 0; i < length; i++) {
    f(array[i])
  }
}
