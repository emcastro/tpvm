
import { Expr } from './Expr'
import { ExprBase } from './ExprBase'

declare module './ExprBase' {

  export interface ExprBase {
    monadicKind (): string[]
  }

}

ExprBase.prototype.monadicKind = function (this: Expr) {
  console.log(this)
  return []
}
