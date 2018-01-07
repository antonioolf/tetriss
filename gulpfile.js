var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

gulp.task('watch', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch(['js/*.js'],{
        verbose: true
    }, function () {
        build();
    });
});

gulp.task('js', function() {
    build();
});

var build = function () {
    gulp.src([
        'js/jquery.js',
        'js/pecas.js',
        'js/game.js',
        'js/campo.js',
        'js/peca.js',
        'js/info.js',
        'js/app.js',
        'node_modules/particles.js/particles.js',
        'js/extra.js'
    ])
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('.'))    
}