// @flow
import _ from 'lodash'

// import timer from 'timers'

const list = [1, 2, 3, 4]

function doIt () {
  _.map(list, x => console.log(x))
  for (let i = 0; i < 10 + 0; i++) {
    console.log('> >' + i)
  }
}

list.forEach(doIt)

// timer.setInterval(doIt, 1000)   

import {machin} from './bidule'

machin({a: 33, b: 66})
