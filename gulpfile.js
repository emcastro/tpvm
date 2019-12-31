// @ts-check
// Builds everything, expect typescript

const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
const gulpClean = require('gulp-clean')

const Vinyl = require('vinyl')

const gulpAntlr4 = require('gulp-antlr4')
const gulpDownload = require('gulp-download-stream')

const DATA_RESOURCES = 'src/**/data/*'
const GENERATED = 'src/generated'
const DIST = 'dist'
const CODEGEN = 'codegen/**/*_codegen.js'
const ANTLR4 = 'codegen/**/*.g4'
const COVERAGE = 'coverage'

const ANTLR_VERSION = '4.7.2'

exports.clean = clean
function clean () {
  return (
    gulp.src([GENERATED, DIST, COVERAGE], { allowEmpty: true })
      .pipe(gulpClean()))
}

// ANTLR4
process.env.CLASSPATH = ':' + path.join(__dirname, `antlr-${ANTLR_VERSION}-complete.jar`) + ':' // FIXME: report bug to gulp-antlr4

function antlr4Download (done) {
  if (!fs.existsSync(`antlr-${ANTLR_VERSION}-complete.jar`)) {
    return gulpDownload(`http://www.antlr.org/download/antlr-${ANTLR_VERSION}-complete.jar`).pipe(gulp.dest('.'))
  } else {
    done()
  }
}

function antlr4Build () {
  return (
    gulp.src(ANTLR4)
      .pipe(gulpAntlr4({
        parserDir: GENERATED,
        mode: 'none'
      })))
}

function antlr4Normalize () {
  return (
    gulp.src(GENERATED + '/*{Lexer,Parser}.js')
      .pipe(asyncMap(async (file, encoding) => {
        const buffer = file.contents
        file.contents = Buffer.from(buffer.toString(encoding).replace(/(Generated from).*\/(.*?\/.*\.g4)/, '$1 $2'), 'utf8')
        return file
      }))
      .pipe(gulp.dest(GENERATED)))
}

const antlr4 = gulp.series(antlr4Download, antlr4Build, antlr4Normalize)
exports.antlr4 = antlr4

// Codegen
exports.codegen = codegen
function codegen () {
  return (
    gulp.src(CODEGEN)
      .pipe(asyncFlatMap(async (file, encoding) => {
        const code = file.contents.toString(encoding)
        let result
        try {
          // eslint-disable-next-line no-eval
          result = eval('"use strict"\n' + code)
          return result.map(({ path, sourceCode }) => new Vinyl({
            path,
            contents: Buffer.from(sourceCode)
          }))
        } catch (e) {
          return []
        }
      }))
      .pipe(gulp.dest(GENERATED))
  )
}

// TSC and dist generation

exports.tsc = tsc
function tsc (cb) {
  const watch = childProcess.spawn('npx', ['tsc'], {
    stdio: 'inherit'
  })
  watch.on('close', cb)
}

exports.tscWatch = tscWatch
function tscWatch (cb) {
  const watch = childProcess.spawn('npx', ['tsc', '--watch'], {
    stdio: 'inherit'
  })
  watch.on('close', cb)
}

function dataResources () {
  return gulp.src(DATA_RESOURCES).pipe(gulp.dest((DIST)))
}

// Build

const smallBuild = gulp.parallel(antlr4, codegen, dataResources)
exports.smallBuild = smallBuild

exports.build = gulp.series(this.smallBuild, tsc)

// Watch

exports.watch = gulp.parallel(
  async () => gulp.watch(ANTLR4, antlr4),
  async () => gulp.watch(CODEGEN, codegen),
  async () => gulp.watch(DATA_RESOURCES, dataResources),
  this.tscWatch
)

// Utils

const stream = require('stream')

/** @param {(chunk: any, encoding: string) => Promise<any>} f */
function asyncMap (f) {
  return new stream.Transform({
    objectMode: true,
    transform (chunk, encoding, cb) {
      f(chunk, encoding)
        .then(result => cb(null, result))
        .catch(e => cb(e, null))
    }
  })
}

/** @param {(chunk: any, encoding: string) => Promise<any[]>} f */
function asyncFlatMap (f) {
  return new stream.Transform({
    objectMode: true,
    transform (chunk, encoding, cb) {
      f(chunk, encoding)
        .then(result => {
          result.forEach(r => this.push(r))
          cb()
        })
        .catch(e => cb(e, null))
    }
  })
}
