var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var cproc = require('child_process');
var uglify = require('gulp-uglify');

gulp.task('connect', connect.server({
  root: [__dirname],
  port: 13372,
  open: {
    browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome'
  }
}));

gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('docs', function (cb) {
  return cproc.exec('./node_modules/.bin/jsdoc -c conf.json', cb);
});

gulp.task('default', ['clean'], function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js', 
      'bower_components/jquery-cookie/jquery.cookie.js',
      'corelaunch-OfficeAutoPilot2GTM.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['default', 'docs']);