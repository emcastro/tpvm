
import * as fs from 'fs'
import { } from './eval1'
import { Value } from './eval1'
import { equal } from '../utils/prelude'

import { then, Promise, promisify, delay } from './optimisticPromise'

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
  [s('readFile')]: function fs_readFile (xname: X<string>): X<string> {
    return then(xname, (name) => {
      return readFile(name, 'utf8')
    })
  },

  [s('string_asList')]: function string_asList (xstr: X<string>): X<number[]> {
    return then(xstr, (str) => {
      const array: number[] = []
      for (let i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i)
      }
      return array
    })
  },

  [s('list_asString')]: function list_asString (xarray: X<any[]>): X<string> {
    return then(xarray, (array) => {
      let s: string = ''
      for (let i = 0; i < array.length; i++) {
        then(array[i], c => { // TODO: Dificulté. Il faut attendre que tous les éléments du tableau soient résolus
          if (typeof c === 'number') {
            s += String.fromCharCode(c)
          } else {
            throw new RuntimeError(`Expecting number (char code), was: ${c} (${typeof c})`)
          }
        })
      }
      return s
    })
  },

  [s('nil')]: [],

  [s('list_length')]: function list_length<T> (xlist: X<T[]>): X<number> {
    return then(xlist, (list) => list.length)
  },

  [s('list_tailFrom')]: function list_tailFrom<T> (xlist: X<T[]>, xfrom: X<number>): X<T[]> {
    return then2(xlist, xfrom, (list, from) => {
      return list.slice(from)
    })
  },

  [s('list_concat')]: function list_concat<T> (xlist1: X<T[]>, xlist2: X<T[]>): X<T[]> {
    return then2(xlist1, xlist2, (list1, list2) => {
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

  [s('minus')]: function minus (a: X<any>, b: X<any>): X<any> {
    return then2(a, b, (va, vb) => {
      return a - b
    })
  },

  [s('error')]: function error (xcause: X<any>) {
    return then(xcause, cause => {
      throw new RuntimeError(cause)
    })
  },

  [s('spy')]: function spy (xdata: any) {
    return then(xdata, data => {
      console.log(data)
      return data
    })
  },

  [s('delay')]: function promise_delay (xtime: X<number>, xresult: X<any>) {
    return then2(xtime, xresult, (time, result) => {
      return delay(time).then(() => result)
    })
  }
}
