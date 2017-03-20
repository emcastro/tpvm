// @flow

const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const clean = require('gulp-clean')

gulp.task('default', () => {
  return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
      //  .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('server', () => {
  gulp.watch('src/**', ['default'])
})

gulp.task('clean', () => {
  gulp.src('dist', {read: false})
         .pipe(clean())
})
