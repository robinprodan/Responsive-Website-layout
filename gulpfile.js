const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

//logs message
gulp.task('message', function(done){
   console.log('Gulp is running...');
  done();
});

//copy all html files
gulp.task('copyHtml', function(done){
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
  done();
});

//optimize images
gulp.task('imageMin', () =>
gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
  
);

//minify js
gulp.task('minify', function(done){
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
  done();
});

//compile sass
gulp.task('sass', function(done){
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));
  done();
});

//scripts
gulp.task('scripts',function(done){
gulp.src('src/js/*.js')
.pipe(concat('main.js'))
.pipe(uglify())
.pipe(gulp.dest('dist/js'));
done();
});

// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']); 
gulp.task('watch', function(done){

  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*',gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  done();

});

