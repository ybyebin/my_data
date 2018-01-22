var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); //- 多个文件合并为一个；
var minifyCss = require('gulp-clean-css'); //- 压缩CSS为一行；
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');
var image = require('gulp-imagemin'); //压缩图片
var htmlmin = require('gulp-htmlmin');


//删除Build文件
gulp.task('clean', function(cb) {
    return gulp.src(['dist'], { read: false })
        .pipe(clean())
        .on('data', function(file) {
            console.log('删除文件' + file.history[0])
        });
});


gulp.task('concatcss', function() { //- 创建一个名为 concat 的 task   gulp.src(['./src/css/*.css'])
    gulp.src(['src/**/*.css', '!src/**/*.min.css']) //  .pipe(concat('wrap.min.css'))              //- 合并后的文件名
        .pipe(minifyCss()) //- 压缩处理成一行
        .pipe(rev()) //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/')) //- 输出文件本地
        .pipe(rev.manifest({
            base: 'build/assets',
            merge: true // merge with the existing manifest if one exists
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/assets')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function(file) {
            console.log('MD5-----css文件' + file.history[0])
        });
});







gulp.task('concatjs', function() { //- 创建一个名为 concat 的 task   gulp.src(['./src/css/*.css'])
    gulp.src(['./src/**/*.js']) //  .pipe(concat('wrap.min.css'))              //- 合并后的文件名
        .pipe(uglify({
            compress: {
                drop_console: true //去掉console.log
            }
        })) //- 压缩处理成一行
        .pipe(rev()) //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/')) //- 输出文件本地
        .pipe(rev.manifest({
            base: 'build/assets',
            merge: true // merge with the existing manifest if one exists
        })) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/assets')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function(file) {
            console.log('MD5---JSJS' + file.history[0])
        });
});



// gulp.task('revcss', function() {
//     gulp.src(['./revcss/*.json', './src/**.html'])
//         //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
//         .pipe(revCollector())
//         //- 执行文件内css名的替换
//         .pipe(gulp.dest('./dist/'))
//         .on('data', function(file) {
//             console.log('css替换' + file.history[0])
//         });;
//     //- 替换后的文件输出的目录
// });

gulp.task('revjs', ['concatcss', 'concatjs'], function() {
    gulp.src(['./*.json', './src/**.html'])
        //- 读取 rev-manifest.json 文件以及需要进行js名替换的文件
        .pipe(revCollector())
        //- 执行文件内css名的替换
        .pipe(gulp.dest('./dist/'))
        .on('data', function(file) {
            console.log('替换JSJJSJS' + file.history[0])
        });
    //- 替换后的文件输出的目录
});






gulp.task('img', function() {
    gulp.src('src/**/*.{png,jpg,gif,ico}') //压缩图片路径
        .pipe(image()) //压缩图片
        .pipe(gulp.dest('dist')) //压缩图片输出路径
        .on('data', function(file) {
            console.log(file.history[0])
        });
});


gulp.task('Htmlmin', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('dist/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log('压缩html' + file.history[0])
        });
});



//复制文件夹
gulp.task('copy', function() {
    return gulp.src('./src/plugins/**/*')
        .pipe(gulp.dest('./dist/plugins/'))
        .on('data', function(file) {
            console.log('复制文件' + file.history[0])
        });
});


gulp.task('default', function(cb) {
    runSequence('revjs', 'img', cb);

    // 'revcss',
});




// gulp.task('default', ['build']); //运行所有任务