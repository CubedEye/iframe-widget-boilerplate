var gulp = require('gulp');
var inlinesource = require('gulp-inline-source');
var sass = require('gulp-sass');
var order = require('gulp-order');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var removeUseStrict = require("gulp-remove-use-strict");
var watch = require('gulp-watch');
var stripBom = require('gulp-stripbom');

gulp.task('default', ['build']);
gulp.task('watch', ['build'], function () {
   gulp.watch('./src/**', ['build']);
});

gulp.task('build', ['sass', 'scripts', 'html'], function() {
    return gulp.src('./build/**.*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('production', ['sass', 'scripts', 'html'], function() {
    return gulp.src('./build/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./output'));
});

gulp.task('html', function () {
    return gulp.src('./src/html/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss', {base: '.'})
    .pipe(order([
        'src/scss/reset.scss',
    ]))
    .pipe(sass().on('error', sass.logError))
    .pipe(stripBom({
        showLog: false,
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build/'));
});


gulp.task('scripts', function() {
  return gulp.src('src/javascript/**/*.js', {base: '.'})
    .pipe(order([
        'src/javascript/stileInterface.js',
    ]))
    .pipe(eslint({
        'extends':'eslint:recommended',
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(removeUseStrict({
        force: true
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/'));
});