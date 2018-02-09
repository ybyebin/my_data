var gulp = require('gulp');
var config = require('./config.js');
var minJs = require('gulp-uglify'); //压缩js
var minCss = require('gulp-clean-css'); //- 压缩CSS为一行；
var minImage = require('gulp-imagemin'); //压缩图片
var minHtml = require('gulp-htmlmin'); //压缩 Html
var less = require('gulp-less');
var concat = require('gulp-concat'); //- 多个文件合并为一个；
var revMd5 = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var clean = require('gulp-clean'); //清空
var runSequence = require('run-sequence'); // 依赖执行

//删除dist文件
gulp.task('clean', function(cb) {
    return gulp.src([config.clean.src], { read: false })
        .pipe(clean())
        .on('data', function(file) {
            console.log('删除文件' + file.history[0])
        });
});

// 压缩 css
gulp.task('mincss', function() {
    gulp.src([config.css.src, config.css.no])
        .pipe(minCss()) //- 压缩处理成一行
        .pipe(revMd5()) //- 文件名加MD5后缀
        .pipe(gulp.dest(config.css.dest)) //- 输出文件本地
        .pipe(revMd5.manifest({
            // base: 'build/assets',
            path: config.rev.src,
            merge: true
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function(file) {
            console.log('MD5-----css文件' + file.history[0])
        });
});

//压缩js
gulp.task('minjs', function() {
    gulp.src([config.js.src])
        .pipe(minJs({
            compress: {
                drop_console: true //去掉console.log
            }
        })) //- 压缩处理成一行
        .pipe(revMd5()) //- 文件名加MD5后缀
        .pipe(gulp.dest(config.js.dest)) //- 输出文件本地
        .pipe(revMd5.manifest({
            path: config.rev.src,
            merge: true // merge with the existing manifest if one exists
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function(file) {
            console.log('MD5---JSJS');
        });
});

// 压缩 image
gulp.task('minimg', function() {
    gulp.src('src/image/*.{png,jpg,gif,ico}') //压缩图片路径
        .pipe(minImage()) //压缩图片
        .pipe(gulp.dest('dist')) //压缩图片输出路径
        .on('data', function(file) {
            console.log(file.history[0])
        });
});

// 压缩  html
// gulp.task('minhtml', function() {
//     gulp.src('dist/**/*.html')
//         .pipe(minHtml(config.html.options))
//         .pipe(gulp.dest('dist'))
//         .on('data', function(file) {
//             console.log('压缩html' + file.history[0])
//         });
// });

//复制文件夹 plugin
gulp.task('copy', function() {
    return gulp.src(config.copy.src)
        .pipe(gulp.dest(config.copy.dest))
        .on('data', function(file) {
            console.log('复制文件' + file.history[0])
        });
});

// 替换js  cs  
gulp.task('revjs', ['mincss', 'minjs'], function() {
    gulp.src([config.rev.src, , './src/**.html'])
        //- 读取 rev-manifest.json 文件以及需要进行js名替换的文件
        .pipe(revCollector({
            replaceReved: true,
        }))
        //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'))
        .on('data', function(file) {
            console.log('替换JSJJSJS' + file.history[0])
        });
    //- 替换后的文件输出的目录
});

// 默认执行
gulp.task('default', function(callback) {
    runSequence('clean', ['copy', 'revjs', 'minimg'],
        callback);
});



// less 处理
// 编译 less
gulp.task('testless', function() {
    gulp.src([config.less.all, config.less.no])
        .pipe(less())
        .pipe(gulp.dest('./src/css')) //- 输出文件本地
});

gulp.task('lesswatch', function() {
    gulp.watch('src/**/*.less', ['testless']); //当所有less文件发生改变时，调用testLess任务
});











// gulp.task('default', ['build']); //运行所有任务