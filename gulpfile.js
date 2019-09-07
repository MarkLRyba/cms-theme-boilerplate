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

exports.default = function() {
    watch('src/**/*.css', css);
    watch('src/**/*', copy)
  };