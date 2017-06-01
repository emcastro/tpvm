
const fsp = require('fs-es6-promise')
import { } from './eval1'
import { Value } from './eval1'
import { equal } from '../utils/prelude'

type X<T> = T | Promise<T>

export function now<T, R> (value: X<T>, f: (t: T) => X<R>): X<R> {
  if (value instanceof Promise) {
    return value.then(f)
  }
  return f(value)
}

function now2<T, U, R> (a: X<T>, b: X<U>, f: (t: T, u: U) => X<R>): X<R> {
  return now(a, (va: T) => {
    return now(b, (vb: U) => {
      return f(va, vb)
    })
  })
}

function varArg (f: any) {
  f.varArg = true
  return f
}

const s = Symbol.for

export const primitives = {
  [s('#readFile')]: function readFile (xname: X<string>): X<string> {
    return now(xname, (name: string) => {
      return fsp.readFile(name, 'utf8')
    })
  },

  [s('#nil')]: [],

  [s('#list_length')]: function list_length<T> (xlist: X<T[]>): X<number> {
    return now(xlist, (list: T[]) => list.length)
  },

  [s('#list_tailFrom')]: function list_tailFrom <T> (xlist: X<T[]>, xfrom: X<number>): X<T[]> {
    return now2(xlist, xfrom, (list: T[], from: number) => {
      return list.slice(from)
    })
  },

  [s('#list_concat')]: function list_concat <T> (xlist1: X<T[]>, xlist2: X<T[]>): X<T[]> {
    return now2(xlist1, xlist2, (list1: T[], list2: T[]) => {
      return list1.concat(list2)
    })
  },

  [s('#list')]: varArg(function list<T> (...elements: X<T>[]) {
    return elements.slice() // copy
  }),

  [s('#eq')]: function eq (a: X<any>, b: X<any>): X<boolean> {
    return now2(a, b, (va, vb) => {
      return equal(va, vb)
    })
  }
}
