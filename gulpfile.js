var gulp = require("gulp");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var cssnano = require("gulp-cssnano");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gulpIf = require('gulp-if'); //not used atm
var browserSync = require('browser-sync').create();

gulp.task("sass", function(){
  return gulp.src("app/scss/**/*.scss") //Any .scss files in this directory or children directories
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({
    	stream: true
    }))
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    },
  })
});

gulp.task("lint", function() { //js hint
  return gulp.src("app/js/**/*.js") 
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task("babelUglify", function(){ //transpiles es6 --> es5 via babel, then minimizes js
  return gulp.src("app/js/**/*.js")
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(uglify())
  .pipe(gulp.dest("app/dist"))
  .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("minifyCSS", function(){  //minifies css
  return gulp.src("app/css/**/*.css")
    .pipe(cssnano())
    .pipe(gulp.dest("app/dist"))
});

//Watch
gulp.task("watch", ["browserSync", "sass", "lint", "babelUglify", "minifyCSS"], function(){ 
  gulp.watch("app/scss/**/*.scss", ["sass"]); 
  gulp.watch("app/js/**/*.js", ["lint"]);
  gulp.watch("app/js/**/*.js", ["babelUglify"]);
  gulp.watch("app/css/**/*.css", ["minifyCSS"]);
  gulp.watch("app/css/**/*.css", browserSync.reload);
  gulp.watch("app/*.html", browserSync.reload); 
  gulp.watch("app/js/**/*.js", browserSync.reload);
});

