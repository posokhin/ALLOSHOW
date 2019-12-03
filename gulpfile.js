let gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    sassGlob = require('gulp-sass-glob'),
    concat = require("gulp-concat"), 
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    cleanCSS = require('gulp-clean-css'),
    gcmq = require('gulp-group-css-media-queries'),
    cssnano = require('gulp-cssnano');
    
    

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())
        /* .pipe(cleanCSS({
            compatibility: 'ie8',
        })) */
        .pipe(browserSync.stream())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
});


gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir : './public/'
        }
    });
    gulp.watch("./src/scss/**/*scss", gulp.series('sass'));
    gulp.watch("./src/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./src/js/*.js", gulp.series('js'));
});
/* gulp.task('concat', function() {
    return gulp.src('./src/css/main.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
});
 */

gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('public/'))						
    .pipe(browserSync.reload({
        stream: true							
    }));
});

/* js */
jsFiles = ['./node_modules/jquery/dist/jquery.min.js', './src/js/main.js', './src/js/filter-picker.js'];
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.reload({
            stream: true							
        }));
});

/* end js */
