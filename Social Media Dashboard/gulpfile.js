// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); //Compiles SCSS files to CSS
const postcss = require('gulp-postcss'); //Lets me run CSS Transformations 
const autoprefixer = require('autoprefixer'); // Adds vendor prefices to css for cross-browser support - don't need to add -webkit and -ms
const cssnano = require('cssnano'); //Minifies CSS to reduce file size
const babel = require('gulp-babel'); //Allows me to use modern JS features like let and const on older browsers by transpiling (rewrtiing?)
const terser = require('gulp-terser'); //Minifies js file
const browsersync = require('browser-sync').create(); //Creates live-reloading development server
const esbuild = require('gulp-esbuild');

//Minifies - removing all unnecessary characters from code without changing it like removing spaces, newlines and comments or shortening variable names

// Use dart-sass for @use and @forward rather than node-sass
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
  return src('app/js/script.js') // main entry file
    .pipe(esbuild({
      outfile: 'script.js', // output file in dist
      bundle: true,         // combine all imports
      minify: true,         // minify
      sourcemap: true,
      target: ['es2015'],   // transpile to ES5
    }))
    .pipe(dest('dist'));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    proxy: "http://localhost:3000", // proxy Express server
    port: 4000, // Browsersync runs on a different port
    notify: {
      styles: { top: 'auto', bottom: '0' },
    },
  });
  cb();
}

function browserSyncReload(cb) { //Just Reloads the Browser
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload); //Watches html browser, if theres a change it runs the reload func
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask, jsTask, browserSyncReload) //Same for sass and js
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
