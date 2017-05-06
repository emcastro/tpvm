// @flow

/* xeslint-disable */

import fsp from 'fs-es6-promise'
import { } from './eval1'
import type { Value } from './eval1' // eslint-disable-line
import { equal } from './../prelude'

function now (value, f) {
  if (value instanceof Promise) {
    return value.then(f)
  }
  return f(value)
}

function now2 (a, b, f) {
  return now(a, (va) => {
    return now(b, (vb) => {
      return f(va, vb)
    })
  })
}

function symbolize (map) {
  const smap = {}
  for (let key in map) {
    // $TypingTrick
    smap[Symbol.for(key)] = map[key]
  }
  return smap
}

type X<T> = T | Promise<T>

export const primitives : { [Symbol] : Function } = symbolize({
  '#readFile': function (name: X<string>) {
    return now(name, (vName) => {
      return fsp.readFile(vName, 'utf8')
    })
  },

  '#list_length': function <T> (list: X<Array<T>>) {
    return now(list, (l) => l.length)
  },

  '#eq': function (a, b) {
    return now2(a, b, (va, vb) => {
      return equal(va, vb)
    })
  }
})

/*
export function callPrimitive (primitive: string, operands: Array<Value | Promise<Value>>) {
  switch (primitive) {
    case '#readFile':
      checkSize(operands, 1)
      return now(operands[0], (name) => {
        return fsp.readFile(name, 'utf8')
      })

    case '#list_length':
      checkSize(operands, 1)
      return now(operands[0], (l:any) => l.length)

    case '#eq':
      checkSize(operands, 2)
      return now2(operands[0], operands[1], (a, b) => {
        return equal(a, b)
      })

    default:
      throw new Error('Not implemented primitive: ' + primitive)
  }
}

function checkSize (list: Array<mixed>, size: number) : void {
  if (list.length !== size) {
    throw new PrimitiveError(`Argument count ${list.length} differs from parameter count ${size}`)
  }
}
*/
