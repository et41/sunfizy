var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server

gulp.task('default', ['browserSync']);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
            port: 8000,
            open: true,
            notify: false

    });
      gulp.watch('*.html').on('change', browserSync.reload);
      gulp.watch('*.css').on('change', browserSync.reload);
      gulp.watch('js/*.js').on('change', browserSync.reload);


});

