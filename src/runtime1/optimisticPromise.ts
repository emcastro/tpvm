
import * as BlueBird from 'bluebird'
import { StrictnessInfo } from './primitive1'
import { Strictness } from './primitive1'
import { Value } from './eval1'

export const promisify = BlueBird.promisify

export interface Promise<Q> { } // tslint:disable-line

const stats = {
  direct: 0,
  fulfilled: 0,
  pending: 0
}

process.on('exit', () => {
  console.log('=================')
  console.log(stats)
})

export function isPromise<Q> (q: Q | Promise<Q>): q is Promise<Q> {
  return q instanceof BlueBird
}

export function then<Q, P> (q: Q | Promise<Q>, f: (q: Q) => P): P | Promise<P> {
  if (isPromise(q)) {
    let qq = q as any
    if (qq.isFulfilled()) {
      stats.fulfilled++
      qq = qq.value()
      return then(qq, f)
    } else {
      stats.pending++
      return qq.then(f)
    }
  } else {
    stats.direct++
    return f(q)
  }
}

export function callPrimitive (op: Function, args: (Value | Promise<Value>)[], from: number): any {
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
