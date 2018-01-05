var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function() {
    gulp.src([
        'js/jquery.js',
        'js/pecas.js',
        'js/game.js',
        'js/campo.js',
        'js/peca.js',
        'js/info.js',
        'js/app.js'
    ])
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('.'))
});