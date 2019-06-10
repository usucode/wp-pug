const gulp = require('gulp')
const rename = require('gulp-rename')
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')
const ts = require('gulp-typescript')
const plumber = require('gulp-plumber') // エラー時の強制終了を防止
const notify = require('gulp-notify') // エラー発生時にデスクトップ通知する

const dist = "./wp-content/themes/my-theme"

// Styles
function styles() {
  return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus({
      outputStyle: 'compressed',
      'include css': true
      // outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(`${dist}`))
}

// Views
function views() {
  return gulp.src('./src/views/**/*.pug')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest(`${dist}/`))
}

// TypeScript
function typescript(){
  return gulp.src('./src/ts/**/*.ts')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(ts({
      target: 'ES5',
      noImplicitAny: true,
      outFile: 'dist.js'
    }))
    .pipe(gulp.dest(`${dist}/js/`))
}

// Watch
function watch() {
  gulp.watch('./src/stylus/**/*.styl', styles)
  gulp.watch('./src/views/**/*.pug', views)
  gulp.watch('./src/ts/**/*.ts', typescript)
}

exports.styles = styles;
exports.views = views;
exports.typescript = typescript;
exports.watch = watch;

gulp.task('default', gulp.series(gulp.parallel(styles, views, typescript, watch)));