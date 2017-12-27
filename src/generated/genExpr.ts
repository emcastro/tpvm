
// generated code

import { ExprBase, LiteralValue } from '../expr/ExprBase'
import { equal } from '../utils/prelude'

export type Expr = Var | Literal | Apply | IfElse | Lambda | Let

//

export const VAR = 0

export class Var extends ExprBase {
  // generated code

  typ: typeof VAR

  varId: string

  constructor (varId: string) {
    // generated code
    super()
    this.typ = VAR // typ is faster when set on instances
    this.varId = varId
  }

  children (): [string] {
    // generated code
    return [this.varId]
  }

  rewrite (subExprs: [string]): Var {
    // generated code
    return new Var(subExprs[0])
  }

  equals (that: any): boolean { // Var
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Var) {
      if (!equal(this.varId, that.varId)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for Var */
export let eVar: ((varId: string) => Var) & { typ: typeof VAR }

eVar = ((varId: string) => {
  // generated code
  return new Var(varId)
}) as typeof eVar

eVar.typ = VAR // Shortcut that avoids importing VAR

export function isVar (expr: Expr): expr is Var {
  return expr.typ === VAR
}

//

export const LITERAL = 1

export class Literal extends ExprBase {
  // generated code

  typ: typeof LITERAL

  value: LiteralValue | symbol

  constructor (value: LiteralValue | symbol) {
    // generated code
    super()
    this.typ = LITERAL // typ is faster when set on instances
    this.value = value
  }

  children (): [LiteralValue | symbol] {
    // generated code
    return [this.value]
  }

  rewrite (subExprs: [LiteralValue | symbol]): Literal {
    // generated code
    return new Literal(subExprs[0])
  }

  equals (that: any): boolean { // Literal
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Literal) {
      if (!equal(this.value, that.value)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for Literal */
export let eLiteral: ((value: LiteralValue | symbol) => Literal) & { typ: typeof LITERAL }

eLiteral = ((value: LiteralValue | symbol) => {
  // generated code
  return new Literal(value)
}) as typeof eLiteral

eLiteral.typ = LITERAL // Shortcut that avoids importing LITERAL

export function isLiteral (expr: Expr): expr is Literal {
  return expr.typ === LITERAL
}

//

export const APPLY = 2

export class Apply extends ExprBase {
  // generated code

  typ: typeof APPLY

  operator: Expr
  operands: Expr[]

  constructor (operator: Expr, operands: Expr[]) {
    // generated code
    super()
    this.typ = APPLY // typ is faster when set on instances
    this.operator = operator
    this.operands = operands
  }

  children (): [Expr, Expr[]] {
    // generated code
    return [this.operator, this.operands]
  }

  rewrite (subExprs: [Expr, Expr[]]): Apply {
    // generated code
    return new Apply(subExprs[0], subExprs[1])
  }

  equals (that: any): boolean { // Apply
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Apply) {
      if (!equal(this.operator, that.operator)) return false
      if (!equal(this.operands, that.operands)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for Apply */
export let eApply: ((operator: Expr, operands: Expr[]) => Apply) & { typ: typeof APPLY }

eApply = ((operator: Expr, operands: Expr[]) => {
  // generated code
  return new Apply(operator, operands)
}) as typeof eApply

eApply.typ = APPLY // Shortcut that avoids importing APPLY

export function isApply (expr: Expr): expr is Apply {
  return expr.typ === APPLY
}

//

export const IFELSE = 3

export class IfElse extends ExprBase {
  // generated code

  typ: typeof IFELSE

  ifClause: Expr
  thenClause: Expr
  elseClause: Expr

  constructor (ifClause: Expr, thenClause: Expr, elseClause: Expr) {
    // generated code
    super()
    this.typ = IFELSE // typ is faster when set on instances
    this.ifClause = ifClause
    this.thenClause = thenClause
    this.elseClause = elseClause
  }

  children (): [Expr, Expr, Expr] {
    // generated code
    return [this.ifClause, this.thenClause, this.elseClause]
  }

  rewrite (subExprs: [Expr, Expr, Expr]): IfElse {
    // generated code
    return new IfElse(subExprs[0], subExprs[1], subExprs[2])
  }

  equals (that: any): boolean { // IfElse
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof IfElse) {
      if (!equal(this.ifClause, that.ifClause)) return false
      if (!equal(this.thenClause, that.thenClause)) return false
      if (!equal(this.elseClause, that.elseClause)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for IfElse */
export let eIfElse: ((ifClause: Expr, thenClause: Expr, elseClause: Expr) => IfElse) & { typ: typeof IFELSE }

eIfElse = ((ifClause: Expr, thenClause: Expr, elseClause: Expr) => {
  // generated code
  return new IfElse(ifClause, thenClause, elseClause)
}) as typeof eIfElse

eIfElse.typ = IFELSE // Shortcut that avoids importing IFELSE

export function isIfElse (expr: Expr): expr is IfElse {
  return expr.typ === IFELSE
}

//

export const LAMBDA = 4

export class Lambda extends ExprBase {
  // generated code

  typ: typeof LAMBDA

  params: string[]
  body: Expr

  constructor (params: string[], body: Expr) {
    // generated code
    super()
    this.typ = LAMBDA // typ is faster when set on instances
    this.params = params
    this.body = body
  }

  children (): [string[], Expr] {
    // generated code
    return [this.params, this.body]
  }

  rewrite (subExprs: [string[], Expr]): Lambda {
    // generated code
    return new Lambda(subExprs[0], subExprs[1])
  }

  equals (that: any): boolean { // Lambda
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Lambda) {
      if (!equal(this.params, that.params)) return false
      if (!equal(this.body, that.body)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for Lambda */
export let eLambda: ((params: string[], body: Expr) => Lambda) & { typ: typeof LAMBDA }

eLambda = ((params: string[], body: Expr) => {
  // generated code
  return new Lambda(params, body)
}) as typeof eLambda

eLambda.typ = LAMBDA // Shortcut that avoids importing LAMBDA

export function isLambda (expr: Expr): expr is Lambda {
  return expr.typ === LAMBDA
}

//

export const LET = 5

export class Let extends ExprBase {
  // generated code

  typ: typeof LET

  defs: Map<string, Expr>
  body: Expr

  constructor (defs: Map<string, Expr>, body: Expr) {
    // generated code
    super()
    this.typ = LET // typ is faster when set on instances
    this.defs = defs
    this.body = body
  }

  children (): [Map<string, Expr>, Expr] {
    // generated code
    return [this.defs, this.body]
  }

  rewrite (subExprs: [Map<string, Expr>, Expr]): Let {
    // generated code
    return new Let(subExprs[0], subExprs[1])
  }

  equals (that: any): boolean { // Let
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Let) {
      if (!equal(this.defs, that.defs)) return false
      if (!equal(this.body, that.body)) return false
      return true
    }
    return false
  }

  notEquals (that: any): boolean { return !(this.equals(that)) }
}

/** Builder for Let */
export let eLet: ((defs: Map<string, Expr>, body: Expr) => Let) & { typ: typeof LET }

eLet = ((defs: Map<string, Expr>, body: Expr) => {
  // generated code
  return new Let(defs, body)
}) as typeof eLet

eLet.typ = LET // Shortcut that avoids importing LET

export function isLet (expr: Expr): expr is Let {
  return expr.typ === LET
}

//

// EOF
