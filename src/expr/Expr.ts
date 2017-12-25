
import {
  eVar, eLiteral, eApply, eIfElse, eLambda, eLet,
  Expr, Var, Literal, Apply, IfElse, Lambda, Let
} from '../generated/genExpr'

declare module '../generated/genExpr' {
  interface Let {
    defBodies: Expr[]
    defNames: string[]
  }
}

Object.defineProperty(Let.prototype, 'defBodies', {
  get: function (this: Let): Expr[] {
    let lazy: Expr[] | undefined = (this as any).__defBodies
    if (lazy === undefined) {
      lazy = [...this.defs.values()];
      (this as any).__defBodies = lazy
    }
    return lazy
  }
})

Object.defineProperty(Let.prototype, 'defNames', {
  get: function (this: Let): string[] {
    let lazy: string[] | undefined = (this as any).__defNames
    if (lazy === undefined) {
      lazy = [...this.defs.keys()];
      (this as any).__defNames = lazy
    }
    return lazy
  }
})

import { LiteralValue, Binding } from '../expr/ExprBase'

export { eVar, eLiteral, eApply, eIfElse, eLambda, eLet }
export { Expr, Var, Literal, Apply, IfElse, Lambda, Let, LiteralValue }
export { Binding }
