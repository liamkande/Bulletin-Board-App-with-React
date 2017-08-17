var gulp = require('gulp'),
    minifyCSS = require("gulp-minify-css"),
    minifyHTML = require("gulp-minify-html"),
    gulpif = require('gulp-if');


var env,
    app

env = process.env.NODE_ENV || "development";
 //do not run the production command prior to removing the react code from the index.html file as well and creating its own js file and gulp browserif and reactify task.

if (env=== "development") {
  app = "builds/development/";
} else {
  app = "builds/production/";
}


gulp.task('html', function() {
  gulp.src("builds/development/*.html")
  .pipe(gulpif(env === "production", minifyHTML()))
  .pipe(gulpif(env === "production", gulp.dest(app)))
});

gulp.task('css', function() {
  gulp.src("builds/development/css/*.css")
    .pipe(gulpif(env === "production", minifyCSS()))
    .pipe(gulpif(env === "production", gulp.dest("builds/production/css")))
});


gulp.task('watch', function() {
  gulp.watch( app + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('default', ['watch', 'html', 'css']);
