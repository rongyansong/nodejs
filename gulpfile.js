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
//ѹ��css
gulp.task('css', function() {
    return gulp.src('public/backup/css/*.css')      //ѹ�����ļ�
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())   //ִ��ѹ��
        .pipe(gulp.dest('public/css'));   //����ļ���
});
//ѹ��js
gulp.task('js', function() {
    return gulp.src('public/backup/js/*.js')
        //.pipe(concat('main.js'))    //�ϲ�����js��main.js
        .pipe(rename({suffix: '.min'}))   //renameѹ������ļ���
        .pipe(uglify())    //ѹ��
        .pipe(gulp.dest('public/js'));    //����ļ���
});
//ѹ��ͼƬ
gulp.task('image', function() {
    return gulp.src('public/backup/imgs/*.{png,jpg,gif,ico}')
        .pipe(imagemin())   //ѹ��
        .pipe(gulp.dest('public/imgs'));    //����ļ���
});
//ִ��ѹ��ǰ����ɾ���ļ����������
//gulp.task('clean', function(cb) {
//    del(['public/css', 'public/js'], cb)
//});
//Ĭ�������cmd������gulp��ִ�еľ����������
gulp.task('default', function() {
    gulp.start('css', 'js', 'image');
});