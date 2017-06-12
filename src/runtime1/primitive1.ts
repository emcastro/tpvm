
import * as fs from 'fs'
import { } from './eval1'
import { Value } from './eval1'
import { equal } from '../utils/prelude'

import { then, Promise, promisify } from './optimisticPromise'

function then2<T, U, R> (a: X<T>, b: X<U>, f: (t: T, u: U) => X<R>): X<R> {
  return then(a, (va: T) => {
    return then(b, (vb: U) => {
      return f(va, vb)
    })
  })
}

type X<T> = T | Promise<T>

function varArg (f: any) {
  f.varArg = true
  return f
}

const s = Symbol.for // reccourci

class RuntimeError extends Error { }

// const readFile = promisify(fs.readFile)
const readFile = promisify((fs.readFile as (name: string, enc: string, cb: (err: NodeJS.ErrnoException, data: string) => void) => void))

export const primitives = {
  [s('readFile')]: function _readFile (xname: X<string>): X<string> {
    return then(xname, (name: string) => {
      return readFile(name, 'utf8')
    })
  },

  [s('nil')]: function nil (x: any) {
    if (typeof x === 'string') {
      return ''
    } else {
      return []
    }
  },

  [s('list_length')]: function list_length<T> (xlist: X<T[]>): X<number > {
    return then(xlist, (list: T[]) => list.length)
  },

  [s('list_tailFrom')]: function list_tailFrom<T> (xlist: X<T[]>, xfrom: X<number>): X<T[]> {
    return then2(xlist, xfrom, (list: T[], from: number) => {
      return list.slice(from)
    })
  },

  [s('list_concat')]: function list_concat<T> (xlist1: X<T[]>, xlist2: X<T[]>): X<T[]> {
    return then2(xlist1, xlist2, (list1: T[], list2: T[]) => {
      return list1.concat(list2)
    })
  },

  [s('list')]: varArg(function list<T> (...elements: X<T>[]) {
    return elements.slice() // copy
  }),

  [s('eq')]: function eq (a: X<any>, b: X<any>): X<boolean> {
    return then2(a, b, (va, vb) => {
      return equal(va, vb)
    })
  },

  [s('plus')]: function plus (a: X<any>, b: X<any>): X<any> {
    return then2(a, b, (va, vb) => {
      return a + b
    })
  },

  [s('error')]: function error (cause: any) {
    throw new RuntimeError(cause)
  },

  [s('spy')]: function spy (data: any) {
    return then(data, d => {
      console.log(d)
      return d
    })
  }
}
