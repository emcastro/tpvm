// Generated from /media/ecastro/Store/tpvm/codegen/TPGrammar.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var grammarFileName = "TPGrammar.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001fb\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0003",
    "\u0002\u0007\u0002\u001a\n\u0002\f\u0002\u000e\u0002\u001d\u000b\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "*\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003",
    "B\n\u0003\f\u0003\u000e\u0003E\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003",
    "\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\u001b",
    "\u0003\u0004\r\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0002\u0007\u0003\u0002\u0016\u0017\u0003\u0002\u0014\u0015\u0003\u0002",
    "\u0012\u0013\u0003\u0002\f\u0011\u0004\u0002\u0005\u0005\u0018\u001a",
    "\u0002b\u0002\u001b\u0003\u0002\u0002\u0002\u0004)\u0003\u0002\u0002",
    "\u0002\u0006F\u0003\u0002\u0002\u0002\bH\u0003\u0002\u0002\u0002\nL",
    "\u0003\u0002\u0002\u0002\fO\u0003\u0002\u0002\u0002\u000eQ\u0003\u0002",
    "\u0002\u0002\u0010S\u0003\u0002\u0002\u0002\u0012U\u0003\u0002\u0002",
    "\u0002\u0014W\u0003\u0002\u0002\u0002\u0016_\u0003\u0002\u0002\u0002",
    "\u0018\u001a\u0005\u0006\u0004\u0002\u0019\u0018\u0003\u0002\u0002\u0002",
    "\u001a\u001d\u0003\u0002\u0002\u0002\u001b\u001c\u0003\u0002\u0002\u0002",
    "\u001b\u0019\u0003\u0002\u0002\u0002\u001c\u001e\u0003\u0002\u0002\u0002",
    "\u001d\u001b\u0003\u0002\u0002\u0002\u001e\u001f\u0005\u0004\u0003\u0002",
    "\u001f \u0007\u0002\u0002\u0003 \u0003\u0003\u0002\u0002\u0002!\"\b",
    "\u0003\u0001\u0002\"*\u0005\u0014\u000b\u0002#*\u0005\u0016\f\u0002",
    "$*\u0005\u0012\n\u0002%&\t\u0002\u0002\u0002&*\u0005\u0004\u0003\u000b",
    "\'(\u0007\u000b\u0002\u0002(*\u0005\u0004\u0003\u0005)!\u0003\u0002",
    "\u0002\u0002)#\u0003\u0002\u0002\u0002)$\u0003\u0002\u0002\u0002)%\u0003",
    "\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002*C\u0003\u0002\u0002\u0002",
    "+,\f\n\u0002\u0002,-\t\u0003\u0002\u0002-B\u0005\u0004\u0003\u000b.",
    "/\f\t\u0002\u0002/0\t\u0002\u0002\u00020B\u0005\u0004\u0003\n12\f\b",
    "\u0002\u000223\t\u0004\u0002\u00023B\u0005\u0004\u0003\t45\f\u0007\u0002",
    "\u000256\t\u0005\u0002\u00026B\u0005\u0004\u0003\b78\f\u0006\u0002\u0002",
    "89\u0005\f\u0007\u00029:\u0005\u0004\u0003\u0007:B\u0003\u0002\u0002",
    "\u0002;<\f\u0004\u0002\u0002<=\u0007\n\u0002\u0002=B\u0005\u0004\u0003",
    "\u0005>?\f\u0003\u0002\u0002?@\u0007\t\u0002\u0002@B\u0005\u0004\u0003",
    "\u0004A+\u0003\u0002\u0002\u0002A.\u0003\u0002\u0002\u0002A1\u0003\u0002",
    "\u0002\u0002A4\u0003\u0002\u0002\u0002A7\u0003\u0002\u0002\u0002A;\u0003",
    "\u0002\u0002\u0002A>\u0003\u0002\u0002\u0002BE\u0003\u0002\u0002\u0002",
    "CA\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002D\u0005\u0003\u0002",
    "\u0002\u0002EC\u0003\u0002\u0002\u0002FG\u0005\b\u0005\u0002G\u0007",
    "\u0003\u0002\u0002\u0002HI\u0005\n\u0006\u0002IJ\u0007\b\u0002\u0002",
    "JK\u0005\u0004\u0003\u0002K\t\u0003\u0002\u0002\u0002LM\u0005\u000e",
    "\b\u0002MN\u0005\u0010\t\u0002N\u000b\u0003\u0002\u0002\u0002OP\u0007",
    "\u001b\u0002\u0002P\r\u0003\u0002\u0002\u0002QR\u0007\u001b\u0002\u0002",
    "R\u000f\u0003\u0002\u0002\u0002ST\u0003\u0002\u0002\u0002T\u0011\u0003",
    "\u0002\u0002\u0002UV\t\u0006\u0002\u0002V\u0013\u0003\u0002\u0002\u0002",
    "WX\u0007\u0006\u0002\u0002XY\u0007\u0003\u0002\u0002YZ\u0005\u0004\u0003",
    "\u0002Z[\u0007\u0004\u0002\u0002[\\\u0005\u0004\u0003\u0002\\]\u0007",
    "\u0007\u0002\u0002]^\u0005\u0004\u0003\u0002^\u0015\u0003\u0002\u0002",
    "\u0002_`\u0007\u001b\u0002\u0002`\u0017\u0003\u0002\u0002\u0002\u0006",
    "\u001b)AC"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", null, "'if'", "'else'", "'='", 
                     "'or'", "'and'", "'not'", "'=='", "'<'", null, "'>'", 
                     null, null, "'++'", "'--'", null, null, "'+'" ];

var symbolicNames = [ null, null, null, "INVALID_LITERAL", "IF", "ELSE", 
                      "EQ_DEF", "OR", "AND", "NOT", "EQ", "LT", "LE", "GT", 
                      "GE", "NEQ", "CONCAT", "MINUSMINUS", "MUL", "DIV", 
                      "PLUS", "MINUS", "BOOLEAN", "INTEGER", "FLOAT", "ID", 
                      "WS", "COMMENT", "LINE_COMMENT", "LINE_COMMENT_EOF" ];

var ruleNames =  [ "start", "expr", "definition", "valueDefinition", "typedVar", 
                   "userOp", "varId", "typeAnnotation", "literalExpr", "ifElseExpr", 
                   "varExpr" ];

function TPGrammarParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

TPGrammarParser.prototype = Object.create(antlr4.Parser.prototype);
TPGrammarParser.prototype.constructor = TPGrammarParser;

Object.defineProperty(TPGrammarParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

TPGrammarParser.EOF = antlr4.Token.EOF;
TPGrammarParser.T__0 = 1;
TPGrammarParser.T__1 = 2;
TPGrammarParser.INVALID_LITERAL = 3;
TPGrammarParser.IF = 4;
TPGrammarParser.ELSE = 5;
TPGrammarParser.EQ_DEF = 6;
TPGrammarParser.OR = 7;
TPGrammarParser.AND = 8;
TPGrammarParser.NOT = 9;
TPGrammarParser.EQ = 10;
TPGrammarParser.LT = 11;
TPGrammarParser.LE = 12;
TPGrammarParser.GT = 13;
TPGrammarParser.GE = 14;
TPGrammarParser.NEQ = 15;
TPGrammarParser.CONCAT = 16;
TPGrammarParser.MINUSMINUS = 17;
TPGrammarParser.MUL = 18;
TPGrammarParser.DIV = 19;
TPGrammarParser.PLUS = 20;
TPGrammarParser.MINUS = 21;
TPGrammarParser.BOOLEAN = 22;
TPGrammarParser.INTEGER = 23;
TPGrammarParser.FLOAT = 24;
TPGrammarParser.ID = 25;
TPGrammarParser.WS = 26;
TPGrammarParser.COMMENT = 27;
TPGrammarParser.LINE_COMMENT = 28;
TPGrammarParser.LINE_COMMENT_EOF = 29;

TPGrammarParser.RULE_start = 0;
TPGrammarParser.RULE_expr = 1;
TPGrammarParser.RULE_definition = 2;
TPGrammarParser.RULE_valueDefinition = 3;
TPGrammarParser.RULE_typedVar = 4;
TPGrammarParser.RULE_userOp = 5;
TPGrammarParser.RULE_varId = 6;
TPGrammarParser.RULE_typeAnnotation = 7;
TPGrammarParser.RULE_literalExpr = 8;
TPGrammarParser.RULE_ifElseExpr = 9;
TPGrammarParser.RULE_varExpr = 10;

function StartContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_start;
    return this;
}

StartContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StartContext.prototype.constructor = StartContext;

StartContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

StartContext.prototype.EOF = function() {
    return this.getToken(TPGrammarParser.EOF, 0);
};

StartContext.prototype.definition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DefinitionContext);
    } else {
        return this.getTypedRuleContext(DefinitionContext,i);
    }
};




TPGrammarParser.StartContext = StartContext;

TPGrammarParser.prototype.start = function() {

    var localctx = new StartContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, TPGrammarParser.RULE_start);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 25;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
        while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1+1) {
                this.state = 22;
                this.definition(); 
            }
            this.state = 27;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
        }

        this.state = 28;
        this.expr(0);
        this.state = 29;
        this.match(TPGrammarParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;

ExprContext.prototype.ifElseExpr = function() {
    return this.getTypedRuleContext(IfElseExprContext,0);
};

ExprContext.prototype.varExpr = function() {
    return this.getTypedRuleContext(VarExprContext,0);
};

ExprContext.prototype.literalExpr = function() {
    return this.getTypedRuleContext(LiteralExprContext,0);
};

ExprContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ExprContext.prototype.PLUS = function() {
    return this.getToken(TPGrammarParser.PLUS, 0);
};

ExprContext.prototype.MINUS = function() {
    return this.getToken(TPGrammarParser.MINUS, 0);
};

ExprContext.prototype.NOT = function() {
    return this.getToken(TPGrammarParser.NOT, 0);
};

ExprContext.prototype.MUL = function() {
    return this.getToken(TPGrammarParser.MUL, 0);
};

ExprContext.prototype.DIV = function() {
    return this.getToken(TPGrammarParser.DIV, 0);
};

ExprContext.prototype.CONCAT = function() {
    return this.getToken(TPGrammarParser.CONCAT, 0);
};

ExprContext.prototype.MINUSMINUS = function() {
    return this.getToken(TPGrammarParser.MINUSMINUS, 0);
};

ExprContext.prototype.EQ = function() {
    return this.getToken(TPGrammarParser.EQ, 0);
};

ExprContext.prototype.LT = function() {
    return this.getToken(TPGrammarParser.LT, 0);
};

ExprContext.prototype.LE = function() {
    return this.getToken(TPGrammarParser.LE, 0);
};

ExprContext.prototype.GT = function() {
    return this.getToken(TPGrammarParser.GT, 0);
};

ExprContext.prototype.GE = function() {
    return this.getToken(TPGrammarParser.GE, 0);
};

ExprContext.prototype.NEQ = function() {
    return this.getToken(TPGrammarParser.NEQ, 0);
};

ExprContext.prototype.userOp = function() {
    return this.getTypedRuleContext(UserOpContext,0);
};

ExprContext.prototype.AND = function() {
    return this.getToken(TPGrammarParser.AND, 0);
};

ExprContext.prototype.OR = function() {
    return this.getToken(TPGrammarParser.OR, 0);
};



TPGrammarParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, TPGrammarParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 39;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TPGrammarParser.IF:
            this.state = 32;
            this.ifElseExpr();
            break;
        case TPGrammarParser.ID:
            this.state = 33;
            this.varExpr();
            break;
        case TPGrammarParser.INVALID_LITERAL:
        case TPGrammarParser.BOOLEAN:
        case TPGrammarParser.INTEGER:
        case TPGrammarParser.FLOAT:
            this.state = 34;
            this.literalExpr();
            break;
        case TPGrammarParser.PLUS:
        case TPGrammarParser.MINUS:
            this.state = 35;
            _la = this._input.LA(1);
            if(!(_la===TPGrammarParser.PLUS || _la===TPGrammarParser.MINUS)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 36;
            this.expr(9);
            break;
        case TPGrammarParser.NOT:
            this.state = 37;
            this.match(TPGrammarParser.NOT);
            this.state = 38;
            this.expr(3);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 65;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 63;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 41;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 42;
                    _la = this._input.LA(1);
                    if(!(_la===TPGrammarParser.MUL || _la===TPGrammarParser.DIV)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 43;
                    this.expr(9);
                    break;

                case 2:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 44;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 45;
                    _la = this._input.LA(1);
                    if(!(_la===TPGrammarParser.PLUS || _la===TPGrammarParser.MINUS)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 46;
                    this.expr(8);
                    break;

                case 3:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 47;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 48;
                    _la = this._input.LA(1);
                    if(!(_la===TPGrammarParser.CONCAT || _la===TPGrammarParser.MINUSMINUS)) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 49;
                    this.expr(7);
                    break;

                case 4:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 50;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 51;
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TPGrammarParser.EQ) | (1 << TPGrammarParser.LT) | (1 << TPGrammarParser.LE) | (1 << TPGrammarParser.GT) | (1 << TPGrammarParser.GE) | (1 << TPGrammarParser.NEQ))) !== 0))) {
                    this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 52;
                    this.expr(6);
                    break;

                case 5:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 53;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 54;
                    this.userOp();
                    this.state = 55;
                    this.expr(5);
                    break;

                case 6:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 57;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 58;
                    this.match(TPGrammarParser.AND);
                    this.state = 59;
                    this.expr(3);
                    break;

                case 7:
                    localctx = new ExprContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
                    this.state = 60;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 61;
                    this.match(TPGrammarParser.OR);
                    this.state = 62;
                    this.expr(2);
                    break;

                } 
            }
            this.state = 67;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function DefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_definition;
    return this;
}

DefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DefinitionContext.prototype.constructor = DefinitionContext;

DefinitionContext.prototype.valueDefinition = function() {
    return this.getTypedRuleContext(ValueDefinitionContext,0);
};




TPGrammarParser.DefinitionContext = DefinitionContext;

TPGrammarParser.prototype.definition = function() {

    var localctx = new DefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, TPGrammarParser.RULE_definition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 68;
        this.valueDefinition();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValueDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_valueDefinition;
    return this;
}

ValueDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueDefinitionContext.prototype.constructor = ValueDefinitionContext;

ValueDefinitionContext.prototype.typedVar = function() {
    return this.getTypedRuleContext(TypedVarContext,0);
};

ValueDefinitionContext.prototype.EQ_DEF = function() {
    return this.getToken(TPGrammarParser.EQ_DEF, 0);
};

ValueDefinitionContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};




TPGrammarParser.ValueDefinitionContext = ValueDefinitionContext;

TPGrammarParser.prototype.valueDefinition = function() {

    var localctx = new ValueDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, TPGrammarParser.RULE_valueDefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 70;
        this.typedVar();
        this.state = 71;
        this.match(TPGrammarParser.EQ_DEF);
        this.state = 72;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TypedVarContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_typedVar;
    return this;
}

TypedVarContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypedVarContext.prototype.constructor = TypedVarContext;

TypedVarContext.prototype.varId = function() {
    return this.getTypedRuleContext(VarIdContext,0);
};

TypedVarContext.prototype.typeAnnotation = function() {
    return this.getTypedRuleContext(TypeAnnotationContext,0);
};




TPGrammarParser.TypedVarContext = TypedVarContext;

TPGrammarParser.prototype.typedVar = function() {

    var localctx = new TypedVarContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, TPGrammarParser.RULE_typedVar);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 74;
        this.varId();
        this.state = 75;
        this.typeAnnotation();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function UserOpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_userOp;
    return this;
}

UserOpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UserOpContext.prototype.constructor = UserOpContext;

UserOpContext.prototype.ID = function() {
    return this.getToken(TPGrammarParser.ID, 0);
};




TPGrammarParser.UserOpContext = UserOpContext;

TPGrammarParser.prototype.userOp = function() {

    var localctx = new UserOpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, TPGrammarParser.RULE_userOp);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 77;
        this.match(TPGrammarParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function VarIdContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_varId;
    return this;
}

VarIdContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VarIdContext.prototype.constructor = VarIdContext;

VarIdContext.prototype.ID = function() {
    return this.getToken(TPGrammarParser.ID, 0);
};




TPGrammarParser.VarIdContext = VarIdContext;

TPGrammarParser.prototype.varId = function() {

    var localctx = new VarIdContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, TPGrammarParser.RULE_varId);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 79;
        this.match(TPGrammarParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TypeAnnotationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_typeAnnotation;
    return this;
}

TypeAnnotationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TypeAnnotationContext.prototype.constructor = TypeAnnotationContext;





TPGrammarParser.TypeAnnotationContext = TypeAnnotationContext;

TPGrammarParser.prototype.typeAnnotation = function() {

    var localctx = new TypeAnnotationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, TPGrammarParser.RULE_typeAnnotation);
    try {
        this.enterOuterAlt(localctx, 1);

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function LiteralExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_literalExpr;
    return this;
}

LiteralExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LiteralExprContext.prototype.constructor = LiteralExprContext;

LiteralExprContext.prototype.INTEGER = function() {
    return this.getToken(TPGrammarParser.INTEGER, 0);
};

LiteralExprContext.prototype.FLOAT = function() {
    return this.getToken(TPGrammarParser.FLOAT, 0);
};

LiteralExprContext.prototype.BOOLEAN = function() {
    return this.getToken(TPGrammarParser.BOOLEAN, 0);
};

LiteralExprContext.prototype.INVALID_LITERAL = function() {
    return this.getToken(TPGrammarParser.INVALID_LITERAL, 0);
};




TPGrammarParser.LiteralExprContext = LiteralExprContext;

TPGrammarParser.prototype.literalExpr = function() {

    var localctx = new LiteralExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, TPGrammarParser.RULE_literalExpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 83;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TPGrammarParser.INVALID_LITERAL) | (1 << TPGrammarParser.BOOLEAN) | (1 << TPGrammarParser.INTEGER) | (1 << TPGrammarParser.FLOAT))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function IfElseExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_ifElseExpr;
    return this;
}

IfElseExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IfElseExprContext.prototype.constructor = IfElseExprContext;

IfElseExprContext.prototype.IF = function() {
    return this.getToken(TPGrammarParser.IF, 0);
};

IfElseExprContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

IfElseExprContext.prototype.ELSE = function() {
    return this.getToken(TPGrammarParser.ELSE, 0);
};




TPGrammarParser.IfElseExprContext = IfElseExprContext;

TPGrammarParser.prototype.ifElseExpr = function() {

    var localctx = new IfElseExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, TPGrammarParser.RULE_ifElseExpr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this.match(TPGrammarParser.IF);
        this.state = 86;
        this.match(TPGrammarParser.T__0);
        this.state = 87;
        this.expr(0);
        this.state = 88;
        this.match(TPGrammarParser.T__1);
        this.state = 89;
        this.expr(0);
        this.state = 90;
        this.match(TPGrammarParser.ELSE);
        this.state = 91;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function VarExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TPGrammarParser.RULE_varExpr;
    return this;
}

VarExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VarExprContext.prototype.constructor = VarExprContext;

VarExprContext.prototype.ID = function() {
    return this.getToken(TPGrammarParser.ID, 0);
};




TPGrammarParser.VarExprContext = VarExprContext;

TPGrammarParser.prototype.varExpr = function() {

    var localctx = new VarExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, TPGrammarParser.RULE_varExpr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 93;
        this.match(TPGrammarParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


TPGrammarParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

TPGrammarParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 5);
		case 4:
			return this.precpred(this._ctx, 4);
		case 5:
			return this.precpred(this._ctx, 2);
		case 6:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.TPGrammarParser = TPGrammarParser;
