
import * as BlueBird from 'bluebird'

export const promisify = BlueBird.promisify

export interface Promise<Q> { }

const stats = {
  direct: 0,
  fulfilled: 0,
  pending: 0
}

process.on('exit', () => {
  console.log('=================')
  console.log(stats)
})

export function then<Q, P> (q: Q | Promise<Q>, f: (q: Q) => P): P | Promise<P> {
  if (q instanceof BlueBird) {
    let qq = q
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
    return f(q as Q)
  }
}

export const delay = BlueBird.delay
