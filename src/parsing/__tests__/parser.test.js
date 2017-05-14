// @flow

import fs from 'fs'
import path from 'path'
import { parse, dump } from '../parser'

describe('The Parser', () => {
  const basePath = path.join(__dirname, 'data')
  for (let testPath of fs.readdirSync(basePath)) {
    if (testPath.endsWith('.tp')) {
      it(`parses ${testPath} correctly`, () => {
        const source = fs.readFileSync(path.join(basePath, testPath), 'utf-8')
        expect(dump(parse(source))).toMatchSnapshot()
      })
    }
  }
})
