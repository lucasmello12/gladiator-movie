const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Tarefa para compilar Sass
gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'));
});

// Tarefa para processar JS
gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Tarefa para copiar HTML e assets
gulp.task('copy', () => {
  return gulp.src(['src/*.html', 'src/images/**/*'])
    .pipe(gulp.dest('dist'));
});

// Tarefa de build para produção
gulp.task('build', gulp.series('sass', 'js', 'copy'));

// Tarefa padrão (desenvolvimento)
gulp.task('default', gulp.series('build'));