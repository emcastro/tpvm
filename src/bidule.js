// @flow

import _ from 'lodash'

console.log('toto', _.toto)

export function machin ({a, b}: {a: any, b: any}) {
  console.log('toto2', _.toto)
  console.log('>>>', a, b)
  return a
}
