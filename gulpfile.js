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

// Build for NodeJS
gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
})

// Continuous build for NodeJS
gulp.task('server', ['default'], () => {
  return gulp.watch('src/**/*', ['build'])
})

// Continuous build for Web-browser test
gulp.task('http', () => {
  const webserver = require('gulp-webserver')
  const webpack = require('gulp-webpack')
  const named = require('vinyl-named')

  return gulp.src('src/**/*.js')
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('web'))

    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }))
})
