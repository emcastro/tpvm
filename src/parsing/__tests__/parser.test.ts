
import * as fs from 'fs'
import * as path from 'path'
import { parse, dump, TPNode } from '../parser'

describe('The Parser', () => {
  it('can be tested with snapshots', () => {
    // Testing the representation of special strings in Jest snapshots
    expect('"test"').toMatchSnapshot()
    expect('"\\"test"\\"').toMatchSnapshot()
  })

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
