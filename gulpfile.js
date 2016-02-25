var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task("concatScripts", function() {
  'use strict';
  gulp.src([
    'public/javascripts/jquery.js',
    'public/javascripts/main.js'])
  .pipe(concat("scripts.js"))
  .pipe(gulp.dest("public/javascripts"));
});

gulp.task("minifyScripts", function(){
  'use strict';
  gulp.src("public/javascripts/scripts.js")
  .pipe(uglify())
  .pipe(rename('scripts.min.js'))
  .pipe(gulp.dest("public/javascripts"));
});

gulp.task('compileSass', function(){
  gulp.src("public/stylesheets/scss/application.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/stylesheets/css"));
});

gulp.task("default", ["hello"], function(){
  console.log("This is the default task.");
});
