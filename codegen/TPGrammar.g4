grammar TPGrammar;

start: definition*? expr EOF;

expr: ifElseExpr
    | varExpr
    | literalExpr
    | (PLUS | MINUS) expr
    | expr (MUL | DIV) expr // Multiplicative
    | expr (PLUS | MINUS) expr // Additive
    | expr (CONCAT | MINUSMINUS) expr
    | expr (EQ | LT | LE | GT | GE | NEQ) expr // Comparator
    | expr userOp expr
    | NOT expr
    | expr AND expr
    | expr OR expr
    ;

definition: valueDefinition /* | tupleDefinition | functionDefinition */;

valueDefinition: typedVar EQ_DEF expr;

typedVar: varId typeAnnotation;

userOp: ID;

varId: ID;

typeAnnotation: ;

// Expressions

literalExpr: INTEGER | FLOAT | BOOLEAN /*| STRING | NATIVE*/
           | INVALID_LITERAL;

INVALID_LITERAL: DIGIT+ (J_LETTER | DIGIT)*;

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

INTEGER: DIGIT+ | '0x' HEX_DIGIT+ | '0b' BIN_DIGIT;

FLOAT: DEC_SIGNIFICANT DEC_EXPONENT?;

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

//

WS:         [ \r\t\f\n] -> skip;

COMMENT:    '/*' .*? '*/' -> skip;

LINE_COMMENT:
            '//' ~[\n\r]* '\r'? '\n' -> skip;

LINE_COMMENT_EOF:
            '//' ~[\n\r]* -> skip; // Comment at EOF
