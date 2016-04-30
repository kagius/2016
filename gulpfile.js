var gulp = require('gulp');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
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
  "baseUrl": "http://localhost",
  "languages": ["en","it"]
};

var sources = {
  "templates": "src/**/*.pug",
  "scripts": "src/**/*.js",
  "locales": "locales/**/*.json"
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

gulp.task("copy-locales", function(){
  return gulp.src(sources.locales)
    .pipe(copy(destinations.dist));
})

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
