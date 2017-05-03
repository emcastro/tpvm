// @flow

const stringConcat = String.prototype.concat

export function concat (strings: Array<string>) : string {
  return stringConcat.apply('', strings)
}

/** Javascript string escape */
export function jsEscape (string: string) : string {
  const chars = []
  const length = string.length
  for (var i = 0; i < length; i++) { // var ++ optim-rule
    const c = string[i]
    let e
    switch (c) {
      case '\b': e = '\\b'; break
      case '\t': e = '\\t'; break
      case '\n': e = '\\n'; break
      case '\f': e = '\\f'; break
      case '\r': e = '\\r'; break
      case '"': e = '\\"'; break
      case '\'': e = '\\\''; break
      case '\\': e = '\\\\'; break
      default: e = c
    }
    chars.push(e)
  }
  return concat(chars)
}
