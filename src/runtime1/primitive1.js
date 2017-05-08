// @flow

/* xeslint-disable */

import fsp from 'fs-es6-promise'
import { } from './eval1'
import type { Value } from './eval1' // eslint-disable-line
import { equal } from './../prelude'

type X<T> = T | Promise<T>

function now<T, R> (value: X<T>, f : T => X<R>) : X<R> {
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

export const primitives : { [Symbol] : Function } = symbolize({
  '#readFile': function (xname: X<string>) : X<string> {
    return now(xname, (name : string) => {
      return fsp.readFile(name, 'utf8')
    })
  },

  '#list_length': function <T> (xlist: X<Array<T>>) : X<number> {
    return now(xlist, (list : Array<T>) => list.length)
  },

  '#list_tailFrom': function<T> (xlist: X<Array<T>>, xfrom: X<number>) : X<Array<T>> {
    return now2(xlist, xfrom, (list : Array<T>, from: number) => {
      return list.slice(from)
    })
  },

  '#list_concat': function<T> (xlist1: X<Array<T>>, xlist2: X<Array<T>>) : X<Array<T>> {
    return now2(xlist1, xlist2, (list1 : Array<T>, list2 : Array<T>) => {
      return list1.concat(list2)
    })
  },

  '#list': varArg(function<T> (...elements: Array<X<T>>) {
    return elements.slice() // copy
  }),

  '#eq': function (a : X<mixed>, b : X<mixed>) : X<boolean> {
    return now2(a, b, (va, vb) => {
      return equal(va, vb)
    })
  }
})
