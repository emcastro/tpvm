// @flow

import _ from 'lodash'
import { escape } from './stringTools'

export class SExprRenderer<N> {
  splitNode (o: N): string | [string, Array<N>] {
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
    const l = _.indexOf(name, ' ')
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
        return tabs + '(' + name + ')'
      } else {
        return tabs + '(' + name + _.join(_.map(seq, e => '\n' + this.sExprLn(e, newTab)), '') + ')'
      }
    } else {
      return _.repeat(' ', tab) + this.escape(m)
    }
  }

  escape (o: string): string { return "'" + escape(o) + "'" }
}

export default SExprRenderer
