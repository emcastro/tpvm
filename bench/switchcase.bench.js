// @flow

console.log()

const { usage, newSuite, run } = require('./utils/bench')
const _ = require('lodash')

const { fastmap } = require('../dist/utils/fastArray')

usage('switch Map', ['switch case', 'switch {object}'])

const keys = _.shuffle(_.times(30, n => 'k' + n))

const suite = newSuite()

suite.add('switch case', () => {
  return fastmap(keys, k => {
    switch (k) {
      case 'k0': return [k + '%' + k]
      case 'k1': return [k + '%' + k]
      case 'k2': return [k + '%' + k]
      case 'k3': return [k + '%' + k]
      case 'k4': return [k + '%' + k]
      case 'k5': return [k + '%' + k]
      case 'k6': return [k + '%' + k]
      case 'k7': return [k + '%' + k]
      case 'k8': return [k + '%' + k]
      case 'k9': return [k + '%' + k]
      case 'k10': return [k + '%' + k]
      case 'k11': return [k + '%' + k]
      case 'k12': return [k + '%' + k]
      case 'k13': return [k + '%' + k]
      case 'k14': return [k + '%' + k]
      case 'k15': return [k + '%' + k]
      case 'k16': return [k + '%' + k]
      case 'k17': return [k + '%' + k]
      case 'k18': return [k + '%' + k]
      case 'k19': return [k + '%' + k]
      case 'k20': return [k + '%' + k]
      case 'k21': return [k + '%' + k]
      case 'k22': return [k + '%' + k]
      case 'k23': return [k + '%' + k]
      case 'k24': return [k + '%' + k]
      case 'k25': return [k + '%' + k]
      case 'k26': return [k + '%' + k]
      case 'k27': return [k + '%' + k]
      case 'k28': return [k + '%' + k]
      case 'k29': return [k + '%' + k]
    }
  })
})

const switchObject = {
  k0 (k) { return [k + '%' + k] },
  k1 (k) { return [k + '%' + k] },
  k2 (k) { return [k + '%' + k] },
  k3 (k) { return [k + '%' + k] },
  k4 (k) { return [k + '%' + k] },
  k5 (k) { return [k + '%' + k] },
  k6 (k) { return [k + '%' + k] },
  k7 (k) { return [k + '%' + k] },
  k8 (k) { return [k + '%' + k] },
  k9 (k) { return [k + '%' + k] },
  k10 (k) { return [k + '%' + k] },
  k11 (k) { return [k + '%' + k] },
  k12 (k) { return [k + '%' + k] },
  k13 (k) { return [k + '%' + k] },
  k14 (k) { return [k + '%' + k] },
  k15 (k) { return [k + '%' + k] },
  k16 (k) { return [k + '%' + k] },
  k17 (k) { return [k + '%' + k] },
  k18 (k) { return [k + '%' + k] },
  k19 (k) { return [k + '%' + k] },
  k20 (k) { return [k + '%' + k] },
  k21 (k) { return [k + '%' + k] },
  k22 (k) { return [k + '%' + k] },
  k23 (k) { return [k + '%' + k] },
  k24 (k) { return [k + '%' + k] },
  k25 (k) { return [k + '%' + k] },
  k26 (k) { return [k + '%' + k] },
  k27 (k) { return [k + '%' + k] },
  k28 (k) { return [k + '%' + k] },
  k29 (k) { return [k + '%' + k] }
}

suite.add('switch {object}', () => {
  return fastmap(keys, k => {
    switchObject[k](k)
  })
})

const switchMap2 = new Map(Object.entries(switchObject))

suite.add('switch Map', () => {
  return fastmap(keys, k => {
    // $TypingTricks
    switchMap2.get(k)(k)
  })
})

run(suite, 'switch Map')
