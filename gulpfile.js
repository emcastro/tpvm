// @flow

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const gulpSequence = require('gulp-sequence')
// const exec = require('child_process').exec

// Global error report
process.on('uncaughtException', function (error) {
  console.log(error.toString())
  this.emit('end')
})

gulp.task('default', gulpSequence('clean', 'build'))

gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
    .pipe(clean())
})

const map = require('map-stream')
function log (key) {
  return map(function (x, callback) {
  //  console.log(key, x)
    callback(null, x)
  })
}

// Build for NodeJS
gulp.task('build', () => {
  // const gulpCombine = require('gulp-combine')

  return gulp.src('src/**/*.js')
    .pipe(log('a'))
    .pipe(sourcemaps.init())
    .pipe(log('b'))
    .pipe(babel())
    .pipe(log('c'))
    .pipe(sourcemaps.write())
    .pipe(log('d'))
    .pipe(gulp.dest('.'))
})

// Continuous build for NodeJS
gulp.task('server', ['default'], () => {
  return gulp.watch('src/**/*', ['build'])
})

// Continuous build for Web-browser test
gulp.task('http', () => {
  const webserver = require('gulp-webserver')

  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }))
})
