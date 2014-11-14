# gulp-brfs

> Gulp plugin for substack's brfs

## Installation

```
npm install -D gulp-brfs
```

## Usage

```javascript
var gulp = require('gulp');
var brfs = require('gulp-brfs');

gulp.task('default', function () {
    return gulp.src('./src/**/*.js')
    .pipe(brfs())
    .pipe(gulp.dest('./pkg'));
});
```
