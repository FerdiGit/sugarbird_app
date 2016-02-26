var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
     del = require('del');

gulp.task("concatScripts", function() {
  'use strict';
  return gulp.src([
    'public/javascripts/jquery.js',
    'public/javascripts/main.js'])
  .pipe(concat("scripts.js"))
  .pipe(gulp.dest("public/javascripts"));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
  'use strict';
  return gulp.src("public/javascripts/scripts.js")
  .pipe(uglify())
  .pipe(rename('scripts.min.js'))
  .pipe(gulp.dest("public/javascripts"));
});

gulp.task("compileSass", function(){
  'use strict';
  return gulp.src("public/stylesheets/scss/application.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/stylesheets/css"));
});

gulp.task("watchFiles", function(){
  gulp.watch("public/stylesheets/scss/**/*.scss", ['compileSass']);
  gulp.watch("public/javascripts/main.js", ['concatScripts']);
});

gulp.task('clean', function(){
  del(['dist',
       'public/stylesheets/css/application.css*',
       'public/javascripts/scripts*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function(){
  return gulp.src(["public/stylesheets/css/**",
                   "public/javascripts/scripts.min.js",
                   "views/*.jade",
                   "public/images/**",
                   "public/fonts/**"], { base: './' })
                   .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function(){
  gulp.start('build');
});
