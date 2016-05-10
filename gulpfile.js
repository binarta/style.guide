var gulp = require('gulp'),
    less = require('gulp-less'), 
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    serve = require('gulp-serve');


function CompileLessTask() {
    return gulp.src('style-guide.less')
        .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'));
}

function CopyIndex() {
    return gulp.src('index.html').pipe(gulp.dest('build'));
}

function WatchTask() {
    livereload.listen();

    gulp.watch('**/*.less', ['less']);
    gulp.watch('index.html', ['index']);
}

function ServeTask() {
    return serve({
        root:['build'],
        port: 4000
    });
}

gulp.task('index', function () {
    return CopyIndex().pipe(livereload());
});
gulp.task('less', function () {
    return CompileLessTask().pipe(livereload());
});
gulp.task('watch', WatchTask);
gulp.task('serve', ['index', 'less', 'watch'], ServeTask());