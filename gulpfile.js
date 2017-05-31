// @flow

// Builds everything, expect typescript

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

gulp.task('default', gulpSequence('clean', 'codegen', 'antlr4', 'resources'))

const RESOURCES = 'src/**/data/*'
const GENERATED = 'src/generated'
const DIST = 'dist'
const CODEGEN = 'codegen/**/*_codegen.js'
const ANTLR4 = 'codegen/**/*.g4'
const COVERAGE = 'coverage'

process.env.CLASSPATH = ':' + path.join(__dirname, 'antlr-4.7-complete.jar') + ':' // TODO: report bug to gulp-antlr4

gulp.task('clean', () => {
  return (
    gulp.src([GENERATED, DIST, COVERAGE], { read: true })
      .pipe(clean()))
})

// http://www.antlr.org/download/antlr-4.7-complete.jar

gulp.task('antlr4-download', () => {
  if (!fs.existsSync('antlr-4.7-complete.jar')) {
    return download('http://www.antlr.org/download/antlr-4.7-complete.jar').pipe(gulp.dest('.'))
  }
})

gulp.task('antlr4', ['antlr4-download'], () => {
  return gulp.src(ANTLR4)
    .pipe(antlr4({
      parserDir: GENERATED,
      mode: 'none'
    }))
})
defauto('antlr4', ANTLR4)

gulp.task('codegen', () => {
  return gulp.src(CODEGEN)
    .pipe(flatMap((data, callback) => {
      const code = data.contents.toString()
      let result
      try {
        result = eval('"use strict"\n' + code) // eslint-disable-line no-eval
      } catch (e) {
        result = []
      }
      callback(null, result.map(({ path, sourceCode }) => new Vinyl({
        path,
        contents: Buffer.from(sourceCode)
      }))
      )
    }))
    .pipe(gulp.dest(GENERATED))
})
defauto('codegen', CODEGEN)

gulp.task('resources', function () {
  return gulp.src(RESOURCES).pipe(gulp.dest((DIST)))
})
defauto('resources', RESOURCES)

// Continuous build for NodeJS
gulp.task('auto', ['autoresources', 'autocodegen', 'autoantlr4'])

function defauto (name, sources) {
  gulp.task('auto' + name, () => gulp.watch(sources, [name]))
}
