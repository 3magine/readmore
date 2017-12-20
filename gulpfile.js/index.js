var gulp = require('gulp');
var requireDir = require('require-dir');
var browserSync = require('browser-sync').create();
var del = require('del');

requireDir('./tasks', { recurse: true });

//run this seperately, then run bulp again (only if any files were deleted from src)
gulp.task('clean:dist', function () {
  return del([
    'dist/*'
  ]);
});

gulp.task('build', ['styles','scripts']);
gulp.task('serve', ['build'], function(){
    browserSync.init({
      server: {
        baseDir: "./dist",
        index: "demo.html"
      },
      notify: false,
      ghostMode: false
    });

    gulp.watch(['src/*.html'], ['html', browserSync.reload])
    gulp.watch('src/js/**/*.js', ['scripts', browserSync.reload])
    gulp.watch('src/css/**/*.scss', ['styles', browserSync.reload])
});

gulp.task('default', ['serve']);
