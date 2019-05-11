var gulp   = require('gulp');
var clean  = require('gulp-clean');
var log    = require('fancy-log');
var rename = require('gulp-rename');

var brfs = require('../index');

var src = gulp.src;
var dest = gulp.dest;
var parallel = gulp.parallel;
var series = gulp.series;

function stream() {
  var isStream = false;

  return src('./source.js', {buffer: false})
    .on('data', function (data) {
      log.info('Stream `isStream()`', data.isStream());
    })
    .pipe(brfs())
    .pipe(rename('stream.js'))
    .pipe(dest('./output'));
}
stream.displayName = 'test:streams';

function buffer() {
  return src('./source.js', {buffer: true})
    .on('data', function (data) {
      log.info('Buffer `isBuffer()`', data.isBuffer())
    })
    .pipe(brfs())
    .pipe(rename('buffer.js'))
    .pipe(dest('./output'));
}
buffer.displayName = 'test:buffers';

function cleanTests() {
  return src('./output/*.js', {read: false})
    .pipe(clean());
}
cleanTests.displayName = 'clean';

exports.default = series(cleanTests, parallel(stream, buffer));
