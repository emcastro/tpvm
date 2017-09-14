
import * as fs from 'fs'
import { } from './eval1'
import { Value } from './eval1'
import { equal, notnull } from '../utils/prelude'

import { then, Promise, promisify, delay } from './optimisticPromise'

export enum Strictness {
  VALUE, PROMISE
}

export type StrictnessInfo = Strictness[] & { result: Strictness }

function varArg (f: any) {
  f.varArg = true
  return f
}

// In the following document, strictness is about not being a promise

class RuntimeError extends Error { }

// const readFile = promisify(fs.readFile)
const readFile = promisify((fs.readFile as (name: string, enc: string, cb: (err: NodeJS.ErrnoException, data: string) => void) => void))

export const primitives = annotate({
  readFile: function fs_readFile_vp (name: string): Promise<string> {
    return readFile(name, 'utf8')
  },

  'string_asList': function string_asList_vv (str: string): number[] {
    const array: number[] = []
    for (let i = 0; i < str.length; i++) {
      array[i] = str.charCodeAt(i)
    }
    return array // list of strict values
  },

  'fromCharCode': function fromCharCode_vv (code: number): string {
    return String.fromCharCode(code)
  },

  'nil': [],

  'list_length': function list_length_vv<T> (list: T[]): number {
    return list.length
  },

  'list_tailFrom': function list_tailFrom_vvv<T> (list: T[], from: number): T[] {
    return list.slice(from)  // same strictness as source
  },

  'list_concat': function list_concat_vvv<T> (list1: T[], list2: T[]): T[] {
    return list1.concat(list2) // strict if both sources are strict
  },

  'list': varArg(function list_pv<PT> (...elements: PT[]) {
    return elements.slice() // copy // same strictness are strict
  }),

  'eq': function eq_vvv (a: any, b: any): boolean {
    return equal(a, b)
  },

  'plus': function plus_vvv (a: any, b: any): any {
    return a + b
  },

  'minus': function minus_vvv (a: any, b: any): any {
    return a - b
  },

  'error': function error_vv (cause: any) {
    throw new RuntimeError(cause)
  },

  'spy': function spy_vv (data: any) {
    console.log(data)
    return data
  },

  'delay': function promise_delay_vvp (time: number, result: any) {
    return delay(time).then(() => result)
  }
})

function annotate (primitives: {[key: string]: any}): {[keySymbol: string]: any} {
  const annotated: {[keySymbol: string]: any} = {}
  Object.entries(primitives).forEach(([k,v]) => {
    if (v instanceof Function) {
      v.strictness = strictnessDecoder(v)
    }

    annotated[Symbol.for(k)] = v
  })
  return annotated
}

// ---------------------------------------

function strictnessDecoder (f: Function): StrictnessInfo {
  const name = f.name

  let i = name.lastIndexOf('_') + 1

  const strictnessArray: StrictnessInfo = [] as any
  while (i < name.length) {
    let s
    switch (name[i]) {
      case 'p' : s = Strictness.PROMISE
        break
      case 'v' : s = Strictness.VALUE
        break
      default: throw new Error('Unexpected strictness suffix: ' + name[i])
    }
    strictnessArray.push(s)
    i++
  }
  // The last element of strictness is for the function result
  // We put it into a convenient place
  strictnessArray.result = notnull(strictnessArray.pop())

  return strictnessArray
}
