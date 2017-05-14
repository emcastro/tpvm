grammar TPGrammar;

start: definition* expr | definition* EOF;

expr: simpleExpr # simple
   // | expr ('(' args ')' | '.' attr)
    | (PLUS | MINUS) expr               # unOp
    | expr (MUL | DIV) expr             # binOp // Multiplicative
    | expr (PLUS | MINUS) expr          # binOp // Additive
    | expr (CONCAT | MINUSMINUS) expr   # binOpExpr
    | expr (EQ | LT | LE | GT | GE | NEQ) expr
                                        # binOpExpr // Comparator
    | expr userOp expr                  # userOpExpr
    | NOT expr                          # unOpExpr  // Logic
    | expr AND expr                     # binOpExpr
    | expr OR expr                      # binOpExpr
    ;

//applyExpr: expr '(' args ')';
//attrExpr: expr ;
//methodExpr: expr '.' method '(' args ')';

simpleExpr: ifElseExpr
          | varExpr
          | literalExpr
          ;

definition: valueDefinition /* | tupleDefinition | functionDefinition */;

valueDefinition: typedVar EQ_DEF expr;

typedVar: varId typeAnnotation;

userOp: ID;

varId: ID;

typeAnnotation: ;

// Expressions

literalExpr: INTEGER | FLOAT | BOOLEAN | STRING | /*NATIVE*/
           | INVALID_LITERAL;

ifElseExpr: IF '(' expr ')' expr ELSE expr;

varExpr: ID;

//

IF: 'if';
ELSE: 'else';

EQ_DEF: '=';
OR: 'or';
AND: 'and';
NOT: 'not';
EQ: '==';
LT: '<';
LE: '<=' | '≤';
GT: '>';
GE: '>=' | '≥';
NEQ: '!=' | '≠';
CONCAT: '++';
MINUSMINUS: '--';
MUL: '*' | '×';
DIV: '/' | '÷';
PLUS: '+';
MINUS: '-' | '−';

//

BOOLEAN: 'true' | 'false';

INTEGER: DIGIT+ | '0x' HEX_DIGIT+ | '0b' BIN_DIGIT+;

FLOAT: DEC_SIGNIFICANT DEC_EXPONENT?;

STRING: '"' (~['"\r\n] | ESCAPE_SEQUENCE)* '"';

NATIVE: '#' ID;

INVALID_LITERAL: DIGIT+ (J_LETTER | DIGIT)*;

//

ID: IDENTIFIER;

fragment
IDENTIFIER: J_LETTER (J_LETTER | DIGIT)*;

fragment
J_LETTER: [a-zA-Z_];

fragment
DIGIT: [0-9];

fragment
HEX_DIGIT: [0-9a-fA-F];

fragment
BIN_DIGIT: [01];

fragment
DEC_SIGNIFICANT: DIGIT* '.' DIGIT+
               | DIGIT+ '.' DIGIT*
               | DIGIT+ // Integer with exponent
               ;

fragment
DEC_EXPONENT: [eE] [+\-]? DIGIT+;

fragment
ESCAPE_SEQUENCE: '\\' ~[\r\n];

//

WS:         [ \r\t\f\n] -> skip;

COMMENT:    '/*' .*? '*/' -> skip;

LINE_COMMENT:
            '//' ~[\n\r]* '\r'? '\n' -> skip;

LINE_COMMENT_EOF:
            '//' ~[\n\r]* -> skip; // Comment at EOF
