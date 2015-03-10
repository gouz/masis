var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  onError = function(err) {
      notify.onError({
  		title:    "Gulp!",
  		message:  "Error: <%= error %>",
  		sound:    "Beep"
  	})(err);
	   this.emit('end');
   };

gulp.task('coffee', function() {
	return gulp.src([
    'src/core.coffee',
    'src/methods/*.coffee',
    ])
		.pipe(plumber({errorHandler: onError}))
    .pipe(concat('masis.coffee'))
		.pipe(coffee())
		.pipe(rename('masis.js'))
    .pipe(gulp.dest('dist'))
	 	.pipe(uglify())
    .pipe(rename('masis.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['coffee'], function() {
	gulp.watch('src/**/*.coffee', ['coffee']);
});
