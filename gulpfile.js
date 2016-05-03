var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var mainBowerFiles = require('main-bower-files');
var pjson = require('./package.json');
var stylish = require('jshint-stylish');

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
  "sass": "src/sass/**/*.scss",
  "locales": "locales/**/*.json",
  "content": "content/**/*.json"
};

var intermediates = {
  "templates": "build/temp"
};

var destinations = {
  "dist": "build/release"
};

gulp.task("templates", function() {
  return gulp.src(sources.templates)
    .pipe(plugins.pug({
      pretty: environmentOptions.pug.pretty,
      data: templateData
    }))
    .pipe(gulp.dest(destinations.dist));
});


gulp.task("compile-templates", function() {
  return gulp.src(sources.templates)
    .pipe(plugins.pug({
      pretty: environmentOptions.pug.pretty,
      data: templateData
    }))
    .pipe(gulp.dest(intermediates.templates));
});

gulp.task("minify-templates", function() {
  return gulp.src(intermediates.templates + "/**/*.html")
    //.pipe(plugins.minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
});

gulp.task("copy-locales", function(){
  return gulp.src(sources.locales)
    .pipe(plugins.copy(destinations.dist));
});

gulp.task("copy-content", function(){
  return gulp.src(sources.content)
    .pipe(plugins.copy(destinations.dist));
});

gulp.task("script-vendor", function(){
  return gulp.src(mainBowerFiles())
    .pipe(plugins.concat("vendor.js"))
    .pipe(plugins.minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
});

gulp.task("script-app", function(){
  return gulp.src(sources.scripts)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish,{"verbose": true}))
    .pipe(plugins.minify(environmentOptions.minify))
    .pipe(plugins.concat("app-min.js"))
    .pipe(gulp.dest(destinations.dist));
});

gulp.task("style", function(){
  return gulp.src(sources.sass)
    .pipe(plugins.sass())
    .pipe(plugins.minify(environmentOptions.minify))
    .pipe(gulp.dest(destinations.dist));
})
