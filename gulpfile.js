// @flow

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const gulpSequence = require('gulp-sequence')
// const mapStream = require('map-stream')
const path = require('path')
const es = require('event-stream')
const flatMap = require('flat-map')

// Global error report
process.on('uncaughtException', function (error) {
  console.log(error.toString())
  this.emit('end')
})

gulp.task('default', gulpSequence('clean', 'build'))

const SOURCE = 'src/main'
const GENERATED = 'src/generated'
const BUILD = 'build'

gulp.task('clean', () => {
  return (
  gulp.src([GENERATED, BUILD], {read: true})
    .pipe(clean()))
})

gulp.task('codegen', () => {
  gulp.src('src/codegen/**/*_codegen.js', {read: false}) // TODO CODEGEN
    .pipe(flatMap((data, cb) => {
      const module = path.relative(data.cwd, data.path)
      const result = require('./' + module)
      cb(null, result)
    }))
    .pipe(gulp.dest(GENERATED))
})

gulp.task('build', ['codegen'], () => {
  return gulp.src([`${SOURCE}/**/*.js`, `${GENERATED}/**/*.js`])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD))
})

// Continuous build for NodeJS
gulp.task('server', ['default'], () => {
  return gulp.watch(`src/**/*`, ['build'])  // TODO préciser
})

// Continuous build for Web-browser test
gulp.task('http', () => {
  const webserver = require('gulp-webserver')

  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: 'http://localhost:8000/test.html'
    }))
})
