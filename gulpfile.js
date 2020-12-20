const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const notify = require('gulp-notify')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default

// browser-sync
const browserSyncStart = () => {
  browserSync.init({
    server: {
      baseDir: './app',
      index: '/index.html',
    },
  })
}
// scss
const styles = () => {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: 'compressed' }).on(
        'error',
        notify.onError({
          title: 'SCSS attention error!',
        })
      )
    )
    .pipe(rename({ suffix: '-min' }))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.stream())
}

// html
const htmlStream = () => {
  return gulp.src('app/index.html').pipe(browserSync.stream())
}

// css libs
const buildLibCss = () => {
  return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss/libs'))
    .pipe(browserSync.stream())
}

// js libs
const buildLibJs = () => {
  return gulp
    .src('node_modules/three/**/*.*')
    .pipe(gulp.dest('app/libs/three'))
    .pipe(browserSync.stream())
}

// js min
const minimizeJs = () => {
  return gulp
    .src('app/js/common.js')
    .pipe(concat('common-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'))
    .pipe(browserSync.stream())
}

// watch files
const watchFiles = () => {
  browserSyncStart()
  gulp.watch('app/scss/**/*.scss', styles)
  gulp.watch('app/index.html', htmlStream)
  gulp.watch('app/js/common.js', minimizeJs)
}

const build = (done) => {
  let buildCss = gulp.src('app/css/*-min.css').pipe(gulp.dest('dist/css')),
    buildFont = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts')),
    buildJs = gulp.src('app/js/*-min.js').pipe(gulp.dest('dist/js')),
    buildLibsJs = gulp.src('app/libs/**/*.*').pipe(gulp.dest('dist/libs')),
    buildImg = gulp.src('app/img/**/*.*').pipe(gulp.dest('dist/img')),
    buildHtml = gulp.src('app/*.html').pipe(gulp.dest('dist')),
    buildMusic = gulp.src('app/music/*.mp3').pipe(gulp.dest('dist/music')),
    buildModel = gulp.src('app/model/*.gltf').pipe(gulp.dest('dist/model'))
  done()
}

exports.styles = styles
exports.miniJs = minimizeJs
exports.build = build
exports.watch = gulp.series(
  buildLibCss,
  styles,
  buildLibJs,
  minimizeJs,
  watchFiles
)
