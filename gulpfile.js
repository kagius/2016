var gulp = require('gulp');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var pjson = require('./package.json');

var environmentOptions = {
  "pug": {
    "pretty": false
  },
  "minify": {
    "compress": {},
    "mangle": true,
    "noSource": true
  }
};

var templateData = {
  "version": pjson.version,
  "languages": ["en","it"]
};

var sources = {
  "templates": "src/**/*.pug",
  "scripts": "src/**/*.js",
};

var intermediates = {
  "templates": "build/temp"
};

var destinations = {
  "dist": "build/release"
};

gulp.task("compile-templates", function() {
  return gulp.src(sources.templates)
    .pipe(pug({
      pretty: environmentOptions.pug.pretty,
      data: templateData
    }))
    .pipe(gulp.dest(intermediates.templates));
});

gulp.task("minify-templates", function() {
  return gulp.src(intermediates.templates + "/**/*.html")
  //  .pipe(minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
});

gulp.task("script-vendor", function(){
  return gulp.src(mainBowerFiles())
    .pipe(concat("vendor.js"))
    .pipe(minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
});

gulp.task("script-app", function(){
  return gulp.src(sources.scripts)
    .pipe(concat("app-min.js"))
    //.pipe(minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
});
