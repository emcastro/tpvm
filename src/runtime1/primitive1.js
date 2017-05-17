// @flow

/* xeslint-disable */

import fsp from 'fs-es6-promise'
import { } from './eval1'
import type { Value } from './eval1' // eslint-disable-line
import { equal } from '../utils/prelude'

type X<T> = T | Promise<T>

export function now<T, R> (value: X<T>, f : T => X<R>) : X<R> {
  if (value instanceof Promise) {
    return value.then(f)
  }
  return f(value)
}

function now2<T, U, R> (a: X<T>, b: X<U>, f: (T, U) => X<R>) : X<R> {
  return now(a, (va : T) => {
    return now(b, (vb : U) => {
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

function varArg (f) {
  f.varArg = true
  return f
}

/* eslint-disable camelcase */

export const primitives : { [Symbol] : Function } = symbolize({
  '#readFile': function readFile (xname: X<string>) : X<string> {
    return now(xname, (name : string) => {
      return fsp.readFile(name, 'utf8')
    })
  },

  '#nil': [],

  '#list_length': function list_length<T> (xlist: X<T[]>) : X<number> {
    return now(xlist, (list : T[]) => list.length)
  },

  '#list_tailFrom': function list_tailFrom <T> (xlist: X<T[]>, xfrom: X<number>) : X<T[]> {
    return now2(xlist, xfrom, (list : T[], from: number) => {
      return list.slice(from)
    })
  },

  '#list_concat': function list_concat <T> (xlist1: X<T[]>, xlist2: X<T[]>) : X<T[]> {
    return now2(xlist1, xlist2, (list1 : T[], list2 : T[]) => {
      return list1.concat(list2)
    })
  },

  '#list': varArg(function list<T> (...elements: X<T>[]) {
    return elements.slice() // copy
  }),

  '#eq': function eq (a : X<mixed>, b : X<mixed>) : X<boolean> {
    return now2(a, b, (va, vb) => {
      return equal(va, vb)
    })
  }
})
