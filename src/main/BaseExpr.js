// @flow

interface BaseExpr {

}

//type Expr = Var | Literal | Apply | IfElse | Lambda | Let;

function notnull (v: any) {
  if (v == null) {
    throw new Error('Null Pointer')
  }
  return v
}

// Compare primitive object (number, string, boolean) and
// objects with that have .equals() method.
function rewriteEquals (a: any, b: any) {
  if (a == null) return b == null
  if (a === 'object') return a.equals(b)
  return a === b
}

export { notnull, rewriteEquals }
