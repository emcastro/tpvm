// @flow
/* eslint-disable  no-multiple-empty-lines */
// generated code

import { ExprBase } from '../ExprBase'
import { equal } from '../prelude'
import type { LiteralValue } from '../ExprBase'

// eslint-disable-next-line no-use-before-define
export type Expr = Var | Literal | Apply | IfElse | Lambda | Let

//

export const VAR = 0

class Var extends ExprBase {
  // generated code

  typ: typeof VAR
  varId: string

  constructor (varId: string) {
    // generated code
    super()
    this.typ = VAR // typ is faster when set on instances
    this.varId = varId
  }

  children () : [string] {
    // generated code
    return [this.varId]
  }

  rewrite (subExprs: [string]) : Var {
    // generated code
    return eVar(subExprs[0])
  }

  equals (that: mixed | Var) : boolean {
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Var) {
      if (!equal(this.varId, that.varId)) return false
      return true
    }
    return false
  }

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for Var */
export function eVar (varId: string) : Var {
  // generated code
  return new Var(varId)
}

eVar.typ = VAR // Shortcut that avoids importing VAR

export type { Var } // Export type only, not the class implementation

//


export const LITERAL = 1

class Literal extends ExprBase {
  // generated code

  typ: typeof LITERAL
  value: LiteralValue

  constructor (value: LiteralValue) {
    // generated code
    super()
    this.typ = LITERAL // typ is faster when set on instances
    this.value = value
  }

  children () : [LiteralValue] {
    // generated code
    return [this.value]
  }

  rewrite (subExprs: [LiteralValue]) : Literal {
    // generated code
    return eLiteral(subExprs[0])
  }

  equals (that: mixed | Literal) : boolean {
    // generated code
    if (that === this) return true // fast-track
    if (that == null) return false
    if (that instanceof Literal) {
      if (!equal(this.value, that.value)) return false
      return true
    }
    return false
  }

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for Literal */
export function eLiteral (value: LiteralValue) : Literal {
  // generated code
  return new Literal(value)
}

eLiteral.typ = LITERAL // Shortcut that avoids importing LITERAL

export type { Literal } // Export type only, not the class implementation

//


export const APPLY = 2

class Apply extends ExprBase {
  // generated code

  typ: typeof APPLY
  operator: Expr
  operands: Array<Expr>

  constructor (operator: Expr, operands: Array<Expr>) {
    // generated code
    super()
    this.typ = APPLY // typ is faster when set on instances
    this.operator = operator
    this.operands = operands
  }

  children () : [Expr, Array<Expr>] {
    // generated code
    return [this.operator, this.operands]
  }

  rewrite (subExprs: [Expr, Array<Expr>]) : Apply {
    // generated code
    return eApply(subExprs[0], subExprs[1])
  }

  equals (that: mixed | Apply) : boolean {
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

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for Apply */
export function eApply (operator: Expr, operands: Array<Expr>) : Apply {
  // generated code
  return new Apply(operator, operands)
}

eApply.typ = APPLY // Shortcut that avoids importing APPLY

export type { Apply } // Export type only, not the class implementation

//


export const IFELSE = 3

class IfElse extends ExprBase {
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

  children () : [Expr, Expr, Expr] {
    // generated code
    return [this.ifClause, this.thenClause, this.elseClause]
  }

  rewrite (subExprs: [Expr, Expr, Expr]) : IfElse {
    // generated code
    return eIfElse(subExprs[0], subExprs[1], subExprs[2])
  }

  equals (that: mixed | IfElse) : boolean {
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

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for IfElse */
export function eIfElse (ifClause: Expr, thenClause: Expr, elseClause: Expr) : IfElse {
  // generated code
  return new IfElse(ifClause, thenClause, elseClause)
}

eIfElse.typ = IFELSE // Shortcut that avoids importing IFELSE

export type { IfElse } // Export type only, not the class implementation

//


export const LAMBDA = 4

class Lambda extends ExprBase {
  // generated code

  typ: typeof LAMBDA
  params: Array<string>
  body: Expr

  constructor (params: Array<string>, body: Expr) {
    // generated code
    super()
    this.typ = LAMBDA // typ is faster when set on instances
    this.params = params
    this.body = body
  }

  children () : [Array<string>, Expr] {
    // generated code
    return [this.params, this.body]
  }

  rewrite (subExprs: [Array<string>, Expr]) : Lambda {
    // generated code
    return eLambda(subExprs[0], subExprs[1])
  }

  equals (that: mixed | Lambda) : boolean {
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

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for Lambda */
export function eLambda (params: Array<string>, body: Expr) : Lambda {
  // generated code
  return new Lambda(params, body)
}

eLambda.typ = LAMBDA // Shortcut that avoids importing LAMBDA

export type { Lambda } // Export type only, not the class implementation

//


export const LET = 5

class Let extends ExprBase {
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

  children () : [Map<string, Expr>, Expr] {
    // generated code
    return [this.defs, this.body]
  }

  rewrite (subExprs: [Map<string, Expr>, Expr]) : Let {
    // generated code
    return eLet(subExprs[0], subExprs[1])
  }

  equals (that: mixed | Let) : boolean {
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

  notEquals (that: mixed) : boolean { return !(this.equals(that)) }
}

/** Builder for Let */
export function eLet (defs: Map<string, Expr>, body: Expr) : Let {
  // generated code
  return new Let(defs, body)
}

eLet.typ = LET // Shortcut that avoids importing LET

export type { Let } // Export type only, not the class implementation

//


// EOF
