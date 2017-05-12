// @flow

const gulp = require('gulp')
const clean = require('gulp-clean')
const gulpSequence = require('gulp-sequence')
const flatMap = require('flat-map')
const Vinyl = require('vinyl')
const antlr4 = require('gulp-antlr4')
const path = require('path')
const download = require('gulp-download')
const fs = require('fs')

// // Global error report
process.on('uncaughtException', function (error) {
  console.error(error)
  console.error(error.stack)
  this.emit('end')
})

gulp.task('default', gulpSequence('clean', 'codegen', 'antlr4'))

// const SOURCE = 'src'
const GENERATED = 'src/generated'
const BUILD = 'build'
const CODEGEN = 'codegen/**/*_codegen.js'
const ANTLR4 = 'codegen/**/*.g4'

process.env.CLASSPATH = ':' + path.join(__dirname, 'antlr-4.7-complete.jar') + ':' // TODO: report bug to gulp-antlr4

gulp.task('clean', () => {
  return (
  gulp.src([GENERATED, BUILD, GENERATED], { read: true })
  .pipe(clean()))
})

// http://www.antlr.org/download/antlr-4.7-complete.jar

console.log(fs.existsSync('antlr-4.7-complete.jar'))

gulp.task('antlr4-download', () => {
  if (!fs.existsSync('antlr-4.7-complete.jar')) {
    return download('http://www.antlr.org/download/antlr-4.7-complete.jar').pipe(gulp.dest('.'))
  }
})

gulp.task('antlr4', ['antlr4-download'], () => {
  return gulp.src(ANTLR4)
  .pipe(antlr4({
    parserDir: GENERATED,
    visitor: true
  }))
})

gulp.task('codegen', () => {
  return gulp.src(CODEGEN)
  .pipe(flatMap((data, cb) => {
    const code = data.contents.toString()
    let result
    try {
      result = eval('"use strict"\n' + code) // eslint-disable-line no-eval
    } catch (e) {
      result = []
    }
    cb(null, result.map(({ path, sourceCode }) => new Vinyl({
      path,
      contents: Buffer.from(sourceCode)
    }))
    )
  }))
  .pipe(gulp.dest(GENERATED))
})

// Continuous build for NodeJS
gulp.task('autocodegen', ['default'], () => {
  return gulp.watch(CODEGEN, ['codegen'])
})
