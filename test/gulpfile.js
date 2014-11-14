var gulp   = require('gulp');
var clean  = require('gulp-clean');
var rename = require('gulp-rename');

var brfs = require('../index');

gulp.task('default', ['stream', 'buffer']);

gulp.task('stream', function () {
  return gulp.src('./source.js', {buffer: false})
    .pipe(brfs())
    .pipe(rename('stream.js'))
    .pipe(gulp.dest('./output'));
});

gulp.task('buffer', function () {
  return gulp.src('./source.js', {buffer: true})
    .pipe(brfs())
    .pipe(rename('buffer.js'))
    .pipe(gulp.dest('./output'));
});

gulp.task('clean', function () {
  return gulp.src('./output/*.js', {read: false})
    .pipe(clean());
});
