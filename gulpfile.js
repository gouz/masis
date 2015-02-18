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
    'src/controls/*.coffee',
    'src/effects/*.coffee',
    'src/methods/*.coffee'
    ])
		.pipe(plumber({errorHandler: onError}))
    .pipe(concat('masis.coffee'))
		.pipe(coffee())
		.pipe(rename('masis.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

//watch
gulp.task('default', function() {
	gulp.start('coffee');
	//watch .coffee files
	gulp.watch('src/**/*.coffee', function(event) {
		gulp.start('coffee');
	});
});
