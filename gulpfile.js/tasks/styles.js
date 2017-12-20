var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

var npm_css = [].map(function(lib){
  return 'node_modules/'+lib;
});

gulp.task('css_lib', function(){
  return gulp.src(npm_css)
        .pipe(plumber())
        .pipe(concat('lib.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('css_app', function(){
    return gulp.src('src/css/**/*.scss')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [ '> 1%',
                        'last 2 versions',
                        'Firefox ESR', // These were the browsersync defaults
                        // Might as well throw in a baseline of -webkit & -moz prefixes
                        // Does not guarantee nor warrant support for these browsers
                        'ff >= 30',
                        'chrome >= 34',
                        'safari >= 7',
                        'ios >= 7',
                        'android >= 4.4'
                      ],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('styles', ['css_lib', 'css_app']);
