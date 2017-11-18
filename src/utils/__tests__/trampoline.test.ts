import { done, tailCall, trampoline, Trampoline } from '../trampoline'

function fortyTwo () {
  return done(42)
}

function maxiLoop (count: number, result: string): Trampoline<string> {
  if (count > 0) {
    return tailCall(() => maxiLoop(count - 1, result + '.'))
  } else {
    return done(result)
  }
}

function maxiLoop2 (count: number, result: string): string {
  if (count > 0) {
    return maxiLoop2(count - 1, result + '.')
  } else {
    return result
  }
}

describe('trampoline', () => {
  it('done as done ', () => {
    expect(trampoline(fortyTwo())).toBe(42)
  })

  it('loops', () => {
    expect(trampoline(maxiLoop(10000, '')).length).toBe(10000)
  })

  it('is better that RangeError', () => {
    expect(() => maxiLoop2(10000, '')).toThrowError(RangeError)
  })
})
