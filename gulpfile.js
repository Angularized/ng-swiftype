var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();

var karma = require('karma').server;
var reporters = require('jasmine-reporters');

// Because 'watch' dies onError
var swallowError = function(err) {
  plugins.util.log(err.toString());
  this.emit('end');
};

// Clean task
gulp.task('clean', function(callback){
  del(['dist'], callback);
});


// Lint task
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(['src/**/*.js', '!src/**/*_tests.js',])
    .pipe(plugins.concat('ng-swiftype.js'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.concat('ng-swiftype.min.js'))
    .pipe(plugins.uglifyjs({
      outSourceMap: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', function(callback) {
  runSequence('clean', ['lint', 'scripts'], callback);
});

// Serve Task
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: 'demo/'
    }
  });

  gulp.watch('src/**/*', ['lint','scripts']).on('error', swallowError);
  gulp.watch('dist/**/*').on("change", browserSync.reload).on('error', swallowError);
  
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


// Default Task
gulp.task('default', ['lint', 'test']);

gulp.task('test:tdd', ['lint', 'test-tdd']);

gulp.task('test:report', ['lint', 'test-report']);
