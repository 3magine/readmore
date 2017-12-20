var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var npm_javascript = [].map(function(lib){
   return 'node_modules/'+lib;
});

gulp.task('javascript_lib', function(){
  return gulp.src(npm_javascript)
      .pipe(plumber())
      .pipe(concat('lib.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('javascript_app', function(){
	return gulp.src([
        'src/js/readmore.js'
      ])
	    .pipe(plumber())
	    .pipe(babel({
	        presets: ['es2015']
	    }))
	    .pipe(concat('readmore.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts', ['javascript_lib', 'javascript_app']);
