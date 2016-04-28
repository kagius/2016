var gulp = require('gulp');
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var pjson = require('./package.json');

var environmentOptions = {
  "pug": {
    "pretty": true
  },
  "minify": {
    "compress": {},
    "mangle": true,
    "noSource": true
  }
};

var templateData = {
  "version": pjson.version
};

var sources = {
  "templates": "src/**.pug"
};

var intermediates = {
  "templates": "build/temp"
};

var destinations = {
  "templates": "build/release"
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
    .pipe(minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.templates));
});
