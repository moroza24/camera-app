var gulp = require('gulp'),
settings = require('./settings'),
webpack = require('webpack'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
rgba = require('postcss-hexrgba'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
colorFunctions = require('postcss-color-function'),
sass = require('gulp-sass');

gulp.task('styles', function() {
  return gulp.src('./sass/style.sass')
    .pipe(sass())
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest('./css/'));
});



gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});


gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    proxy: 'http://localhost/interjet/pallmall/',
    ghostMode: false
  });
  gulp.watch('./**/*.html', function() {
    browserSync.reload();
  });
  
  gulp.watch(['./sass/**/*.sass', './sass/**/**/*.sass'], ['waitForStyles']);
  gulp.watch(['./sass/**/*.scss', './sass/**/**/*.scss'], ['waitForStyles']);
  gulp.watch(['./js/modules/**/*.js', './js/scripts.js'], ['waitForScripts']);
});

gulp.task('waitForStyles', ['styles'], function() {
  return gulp.src('./css/style.css')
    .pipe(browserSync.stream());
});

gulp.task('waitForScripts', ['scripts'], function() {
  browserSync.reload();
});

