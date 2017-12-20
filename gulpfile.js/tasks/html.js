var gulp = require('gulp');
var plumber = require('gulp-plumber');
var htmlmin = require('gulp-htmlmin');

gulp.task('html', function(){
    return gulp.src(['src/*.html'])
        .pipe(plumber())
        .pipe(htmlmin({
          collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});
