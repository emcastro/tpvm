// Generated from /media/ecastro/Store/tpvm/codegen/TPGrammar.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by TPGrammarParser.

function TPGrammarVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

TPGrammarVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
TPGrammarVisitor.prototype.constructor = TPGrammarVisitor;

// Visit a parse tree produced by TPGrammarParser#start.
TPGrammarVisitor.prototype.visitStart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#expr.
TPGrammarVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#definition.
TPGrammarVisitor.prototype.visitDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#valueDefinition.
TPGrammarVisitor.prototype.visitValueDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#typedVar.
TPGrammarVisitor.prototype.visitTypedVar = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#userOp.
TPGrammarVisitor.prototype.visitUserOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#varId.
TPGrammarVisitor.prototype.visitVarId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#typeAnnotation.
TPGrammarVisitor.prototype.visitTypeAnnotation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#literalExpr.
TPGrammarVisitor.prototype.visitLiteralExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#ifElseExpr.
TPGrammarVisitor.prototype.visitIfElseExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by TPGrammarParser#varExpr.
TPGrammarVisitor.prototype.visitVarExpr = function(ctx) {
  return this.visitChildren(ctx);
};



exports.TPGrammarVisitor = TPGrammarVisitor;