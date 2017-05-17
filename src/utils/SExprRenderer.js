// @flow

import _ from 'lodash'
import { jsEscape } from './stringTools'

/**
 * Generic S-Expression renderer.js
 * @param <N> Non-terminal node
 * @param <T> Terminal node
 */
export class SExprRenderer<N, T> {
  splitNode (o: N): T | [string, Array<N>] {
    throw new Error('Unimplemented')
  }

  sExpr (o: N) {
    const m = this.splitNode(o)
    if (m instanceof Array) {
      const [name, seq] = m
      return '(' + name + ' ' + _.join(_.map(seq, e => this.sExpr(e)), ' ') + ')'
    } else {
      return this.escape(m)
    }
  }

  length (name: string): number {
    const l = name.indexOf(' ')
    if (l === -1) {
      return name.length
    } else {
      return l
    }
  }

  sExprLn (o: N, tab: number = 0): string {
    const m = this.splitNode(o)
    if (m instanceof Array) {
      const [name, seq] = m
      const newTab = tab + this.length(name) + 2
      const tabs = _.repeat(' ', tab)
      if (seq.length === 0) {
        return tabs + '(' + name + ')' // Does not happen with Expr
      } else {
        return tabs + '(' + name + _.join(_.map(seq, e => '\n' + this.sExprLn(e, newTab)), '') + ')'
      }
    } else {
      return _.repeat(' ', tab) + this.escape(m)
    }
  }

  escape (o: T): string { return "'" + jsEscape(String(o)) + "'" }
}

export default SExprRenderer
