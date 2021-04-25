// Code to be included in runtime space
import fs from 'fs'
import { promisify } from 'util'

import { checkType } from '../utils/prelude'
import { XList } from '../utils/XList'

// utilities ========================================
const paramStrictness = Symbol('paramStrictness')
const resultStrictness = Symbol('resultStrictness')

// root functions ===================================
const readFileP = promisify(fs.readFile)

// primitives ========================================
/* eslint-disable @typescript-eslint/camelcase */

// =======================

export async function readFile (path: string): Promise<any> {
  return readFileP(path, { encoding: 'utf-8' })
}
readFile[paramStrictness] = 'v'
readFile[resultStrictness] = 'p'

// =======================

export function string_asList (str: string): XList<number> {
  checkType(str, 'string')
  const array: number[] = []
  for (let i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i)
  }
  return new XList(array, false) // list of strict values
}
string_asList[paramStrictness] = 'v'
string_asList[resultStrictness] = 'v'

// =======================

export function plus (a: any, b: any): any {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return a + b
}
plus[paramStrictness] = 'vv'
plus[resultStrictness] = 'v'
