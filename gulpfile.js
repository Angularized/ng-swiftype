var gulp = require('gulp'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    ngdocs = require('gulp-ngdocs'),
    pkg = require('./package.json'),
    uglifyjs = require('gulp-uglifyjs'),
    watch = require('gulp-watch');

var karma = require('karma').server;

var reporters = require('jasmine-reporters');

// Because 'watch' dies onError
function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}

// Lint
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Run Tests Continuously
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    reporters: ['spec', 'coverage'],
    singleRun: true,
    specReporter: {
      suppressPassed: true
    },
    coverageReporter: {
      type: 'text-summary'
    },
  }, done);
});

// Run Tests Continuously
gulp.task('test-tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    reporters: ['clear-screen', 'spec', 'coverage'],
    specReporter: {
      suppressPassed: true
    },
    coverageReporter: {
      type: 'text-summary'
    },
  }, done);
});

// Generate Test Code Coverage Report
gulp.task('test-report', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: ['coverage'],
    coverageReporter: {
      type: 'html',
      subdir: 'report'
    },
  }, done);
});

// Run Tests and Code Coverage Report [Jenkins]
gulp.task('test-jenkins', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: ['spec', 'coverage'],
    specReporter: {
      suppressPassed: false
    },
    coverageReporter: {
      reporters: [
        {type: 'text-summary'},
        {type: 'cobertura', subdir: 'jenkins'}
      ]
    },
  }, done);
});

// Concatenate & Minify JS
gulp.task('build', function() {
  return gulp.src(['src/ng-swiftype.js', '!src/**/*_tests.js','src/**/*.js'])
    .pipe(concat('ng-swiftype.js'))
    .pipe(gulp.dest('dist'))
    .pipe(concat('ng-swiftype.min.js'))
    .pipe(uglifyjs({
      outSourceMap: true
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['lint', 'test']);

gulp.task('test:tdd', ['lint', 'test-tdd']);

gulp.task('test:report', ['lint', 'test-report']);

gulp.task('test:jenkins', ['lint', 'test-jenkins'])

gulp.task('watch:docs', ['watch-ngdocs']);
