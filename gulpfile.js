var gulp = require('gulp'),
	less = require('gulp-less');
	plumber	 = require('gulp-plumber');
	gulp_src = './public/css/*.less';


gulp.task('less-compile', function() {
	gulp.src(gulp_src)
	  .pipe(plumber())
	  .pipe(less())
	  .pipe(gulp.dest('./public/css/'));
});


gulp.task('default', function() {

	gulp.watch(gulp_src, ['less-compile']);

});