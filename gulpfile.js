const {
    src,
    dest,
    parallel,
    watch
} = require('gulp');
const postcss = require('gulp-postcss');
const precss = require('precss');
const sourcemaps = require('gulp-sourcemaps');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const mqpacker = require('css-mqpacker');
const pug = require("gulp-pug");


function css() {
    return src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            postcssImport(),
            pxtorem({
                propList: ['*']
            }),
            mqpacker({
                sort: true
            }),
            autoprefixer(),
            precss()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'))
}

function copy() {
    return src('src/**/*')
        .pipe(dest('dist/'))
}

function testCss() {
    return src('test/src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            postcssImport(),
            pxtorem({
                propList: ['*']
            }),
            mqpacker({
                sort: true
            }),
            autoprefixer(),
            precss()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('test/dist/'))
}

function testPug() {
    return src('test/src/**/*.pug')
        .pipe(pug({
            doctype:'html',
            pretty:true
        }))
        .pipe(dest('test/dist'))
}

exports.default = function() {
    watch('src/**/*.css', css);
    watch('src/**/*', copy);
    watch('test/src/**/*.css', testCss);
    watch('test/src/**/*.pug', testPug);
  };