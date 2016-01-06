import eslint from 'gulp-eslint'
import gulp from 'gulp'

gulp.task('eslint', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'test/*.js',
    '!**/__test__/**',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})
