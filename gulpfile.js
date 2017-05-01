// @flow

const gulp = require('gulp')
const clean = require('gulp-clean')
const gulpSequence = require('gulp-sequence')
const flatMap = require('flat-map')
const Vinyl = require('vinyl')

// // Global error report
process.on('uncaughtException', function (error) {
  console.error(error)
  console.error(error.stack)
  this.emit('end')
})

gulp.task('default', gulpSequence('clean', 'codegen'))

// const SOURCE = 'src'
const GENERATED = 'src/generated'
const BUILD = 'build'
const CODEGEN = 'codegen/**/*_codegen.js'

gulp.task('clean', () => {
  return (
  gulp.src([GENERATED, BUILD], {read: true})
    .pipe(clean()))
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
      cb(null, result.map(({path, sourceCode}) => new Vinyl({
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
