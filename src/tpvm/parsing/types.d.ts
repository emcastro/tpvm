
declare module 'antlr4' 

declare module 'antlr4/tree/Tree' {
  const TerminalNode: any
  const TerminalNodeImpl: any
}

declare module 'antlr4/error/ErrorListener' {
  const ErrorListener: any
}


declare module 'tpvm/generated/TPGrammarParser' {
  const TPGrammarParser: any
}

declare module 'tpvm/generated/TPGrammarLexer' {
  const TPGrammarLexer: any
}
