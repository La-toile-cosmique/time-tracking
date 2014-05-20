var gulp = require('gulp'),
	less = require('gulp-less'),
	plumber	 	= require('gulp-plumber'),
	plumber	 	= require('gulp-plumber'),
	browserSync = require('browser-sync'),
	gulp_src 	= './public/css/main.less';

gulp.task('less-compile', function() {
	gulp.src(gulp_src)
	  .pipe(plumber())
	  .pipe(less())
	  .pipe(gulp.dest('./public/css/'))
	  .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init( 
    	null, 
    	{proxy: "localhost:4000"}
	);
});

gulp.task('browser-syncouille', function(){

	browserSync.reload();

});

gulp.task('default', ['browser-sync'], function() {

	gulp.watch([gulp_src], ['less-compile']);
	gulp.watch(['./public/**/*.html', './*.js', './public/*.html', './public/**/*.js'], ['browser-syncouille']);

});