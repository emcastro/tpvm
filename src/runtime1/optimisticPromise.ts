import * as BlueBird from 'bluebird'
import { Strictness, StrictnessInfo } from './primitive1'
import { Value, XValue } from './eval1'
import { checkNotCast } from '../utils/prelude'

export const promisify = BlueBird.promisify

// export interface Promise<Q> { } // tslint:disable-line
export type Promise<Q> = BlueBird<Q>

const stats = {
  direct: 0,
  fulfilled: 0,
  pending: 0
}

process.on('exit', () => {
  console.log('==Access stats==')
  console.log(stats)
})

export function isPromise<Q> (q: Q | Promise<Q>): q is Promise<Q> {
  return q instanceof BlueBird
}

/**
 * Optimisation on monadic `then`.
 * @param q Immediate value or promise.
 * @param f Function to apply on the immediate value, or on the promise result.
 */
export function then<Q, P> (q: Q | Promise<Q>, f: (q: Q) => P | Promise<P>): P | Promise<P> {
  if (isPromise(q)) {
    if (q.isFulfilled()) {
      stats.fulfilled++
      const v = q.value()
      checkNotCast(v, Promise)
      return then(v, f)
    } else {
      stats.pending++
      return q.then(f)
    }
  } else {
    stats.direct++
    return f(q)
  }
}

/* CallPrimitive decodes its promised arguments. */
export function callPrimitive (op: Function, args: (Value | Promise<Value>)[], from: number): XValue {
  const s: StrictnessInfo = (op as any).strictness
  const l = s.length

  for (let i = from; i < l; i++) {
    const arg = args[i]
    if (s[i] === Strictness.VALUE) {
      if (isPromise(arg)) {  // Wait the value
        return then(arg, a => {
          args[i] = a
          return callPrimitive(op, args, i + 1)
        })
      } else {
        stats.direct++
      }
    } else {
      // nothing to do
      console.log('Primitive Promise ', i)
    }
  }

  // // Attention : no arg no change

  return op.apply(null, args)
}

export const delay = BlueBird.delay
