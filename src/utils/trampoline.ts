import { AppendList } from './AppendList'
import { checkCast, checkNotCast } from './prelude'

export type Trampoline<T> = Done<T> | TailCall<T>

// interface Done<T> {
//   $Done$: never
// }

class Done<T> {
  constructor (public result: T) { }
}

class TailCall<T> {
  constructor (public continuation: () => Trampoline<T>) { }
}

export function done<T> (result: T): Trampoline<T> {
  checkNotCast(result, Done)
  checkNotCast(result, TailCall)
  return new Done(result)
}

export function tailCall<T> (continuation: () => Trampoline<T>): Trampoline<T> {
  return new TailCall(continuation)
}

export function trampoline<T> (start: Trampoline<T>): T {
  let next = start  // Theoretical memory leak on `start`
  while (next instanceof TailCall) {
    next = next.continuation()
  }
  checkCast(next, Done)
  const value = next.result
  return value
}
