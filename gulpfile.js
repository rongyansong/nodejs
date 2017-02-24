///**
// * Created by Administrator on 2016/12/13 0013.
// */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');
    //del = require('del');
//压缩css
gulp.task('css', function() {
    return gulp.src('public/backup/css/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('public/css'));   //输出文件夹
});
//压缩js
gulp.task('js', function() {
    return gulp.src('public/backup/js/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/js'));    //输出文件夹
});
//压缩图片
gulp.task('image', function() {
    return gulp.src('public/backup/imgs/*.{png,jpg,gif,ico}')
        .pipe(imagemin())   //压缩
        .pipe(gulp.dest('public/imgs'));    //输出文件夹
});
//执行压缩前，先删除文件夹里的内容
//gulp.task('clean', function(cb) {
//    del(['public/css', 'public/js'], cb)
//});
//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function() {
    gulp.start('css', 'js', 'image');
});