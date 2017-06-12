grammar TPGrammar;

topLevel: definition* expr ';'* EOF; // let-like

expr: simpleExpr # simple
    | expr (apply | '.' attr apply?)    # call    // attr => method ?
    | (PLUS | MINUS) expr               # unOp
    | expr (MUL | DIV) expr             # binOp // Multiplicative
    | expr (PLUS | MINUS) expr          # binOp // Additive
    | expr (CONCAT | MINUSMINUS) expr   # binOp
    | expr (EQ | LT | LE | GT | GE | NEQ) expr
                                        # binOp // Comparator
    | expr userOpId expr                # userOp
    | NOT expr                          # unOp  // Logic
    | expr AND expr                     # binOp
    | expr OR expr                      # binOp
    ;

simpleExpr: literalExpr
          | varExpr
          | '(' expr ')'
          | ifElseExpr
          | shortLambdaExpr
          | lambdaExpr

          | letExpr
          ;

definition: (valueDefinition | tupleDefinition | functionDefinition) ';'* ;

valueDefinition: typedVar EQ_DEF expr;

functionDefinition: functionId '(' typedParams? ')' typeAnnotation EQ_DEF expr;

tupleDefinition: '(' typedVars? ')' EQ_DEF expr;

typedVar: varId typeAnnotation;

typedParam: paramId typeAnnotation;

attr: ID;

method: ID;

userOpId: ID;

varId: ID;

functionId: ID;

paramId: ID;

apply: '(' args? ')';

arg: expr;

typeAnnotation: ;

// Groups

args: arg (',' arg)*;

typedParams: typedParam (',' typedParam)*;

typedVars: typedVar (',' typedVar)*;

// Expressions

literalExpr: INTEGER | FLOAT | BOOLEAN | STRING | NATIVE
           | INVALID_LITERAL
           ;

ifElseExpr: IF '(' expr ')' expr ELSE expr;

lambdaExpr: '(' typedParams? ')' '->' expr;

shortLambdaExpr: paramId '->' expr;

varExpr: ID;

letExpr: '{' definition* expr ';'* '}';

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

COMMENT:    '/*' .*? '*/' -> skip; // TODO Incomplet

LINE_COMMENT:
            '//' ~[\n\r]* '\r'? '\n' -> skip;

LINE_COMMENT_EOF:
            '//' ~[\n\r]* -> skip; // Comment at EOF
