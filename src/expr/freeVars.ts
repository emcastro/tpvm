import { Expr } from './Expr'
import { ExprBase } from './ExprBase'

declare module './ExprBase' {

  export interface ExprBase {
    freeVars (): string[]
  }

}

ExprBase.prototype.freeVars = function (this: Expr) {
  console.log(this)
  return []
}
