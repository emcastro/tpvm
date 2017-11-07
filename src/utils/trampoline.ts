
export type Trampoline<T> = Done<T> | Tail<T>

class Done<T> {
  constructor (public result: T) { }
}

class Tail<T> {
  constructor (public continuation: () => Trampoline<T>) { }
}

export function done<T> (result: T): Trampoline<T> { return new Done(result) }
export function tailCall<T> (continuation: () => Trampoline<T>): Trampoline<T> { return new Tail(continuation) }

/**
 * @param start A thunk returning a trampoline (instead of just the trampoline itself), so that
 * we can properly forget the first trampoline of the loop.
 */
export function trampoline<T> (start: () => Trampoline<T>) {
  let next = start()
  while (next instanceof Tail) {
    next = next.continuation()
  }
  return next.result
}
