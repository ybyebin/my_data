var gulp = require('gulp');
var config = require('./config.js');
var minJs = require('gulp-uglify'); //压缩js
var minCss = require('gulp-clean-css'); //- 压缩CSS为一行；
var minImage = require('gulp-imagemin'); //压缩图片
var minHtml = require('gulp-htmlmin'); //压缩 Html
var less = require('gulp-less');
var babel = require('gulp-babel');

var concat = require('gulp-concat'); //- 多个文件合并为一个；
var revMd5 = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var clean = require('gulp-clean'); //清空
var runSequence = require('run-sequence'); // 依赖执行
var autoprefixer = require('gulp-autoprefixer'); //自动加上浏览器前缀

var fecs = require('fecs-gulp'); // 百度格式化

//加载browser-sync模块
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;





// 百度校验测试
gulp.task('fecs', function() {
    // return gulp.src(['./test/css/*', './test/html/*', './test/js/*'])
    return gulp.src([config.js.src,'.src/css/**/*.less'])
      
        .pipe(
            // 这么写reporter的配置都是默认的
            // fecs.reporter()

            // fecs.reporter('')
            // fecs.reporter('default');

            // fecs.reporter('baidu')

            // fecs.reporter(require('fecs/lib/reporter/baidu'))

            // fecs.reporter('default', {
            //     color: true,
            //     rule: true,
            //     sort: true
            // })

            fecs.reporter('baidu', {
                color: true,
                rule: true,
                sort: true
            })

        )
        .pipe(fecs.format(
            // 可以没有options参数
            // {
            // 不支持replace
            // 不支持type
            // 不支持output
            // }
        ))
        .pipe(gulp.dest('./dist/')) //- 将 rev-manifest.json 保存到 rev 目录内
        .on('data', function(file) {
            console.log('MD5---JSJS');
        });
});





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
        .pipe(babel({
            presets: ['@babel/env']
        }))
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
    gulp.src('src/image/**/*.{png,jpg,gif,ico}') //压缩图片路径
        .pipe(minImage({
            progressive: true, //Boolean类型 默认:false 无损压缩图片
            optimizationLevel: 5, //number类型 默认:3 取值范围:0-7(优化等级)
            interlced: true, //Boolean类型 默认false 隔行扫描gif进行渲染
            multipass: true //Boolean类型 默认false 多次优化svg直到完全优化
        })) //压缩图片
        .pipe(gulp.dest('dist/image')) //压缩图片输出路径
        .on('data', function(file) {
            console.log(file.history[0])
        });
});

// 压缩  html
gulp.task('minhtml', function() {
    gulp.src('dist/**/*.html')
        .pipe(minHtml(config.html.options))
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log('压缩html' + file.history[0])
        });
});

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



// less 处理
// 编译 less
gulp.task('less', function() {
    gulp.src([config.less.all, config.less.no])
        .pipe(less())
        .pipe(autoprefixer({ //自动加上浏览器前缀
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('./src/css')) //- 输出文件本地
});





// gulp.task('lesswatch', function() {
//     gulp.watch('src/**/*.less', ['testless']); //当所有less文件发生改变时，调用testLess任务
// });

//启动热更新  
gulp.task('serve', function() {
    // gulp.start('script', 'less', 'html');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['src'],
            index: 'bike.html' // 指定默认打开的文件
        }
    });
    gulp.watch('src/**/*.less', ['less']).on('change', reload); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('src/**/*.html').on('change', reload); //当所有less文件发生改变时，调用testLess任务

});



// 默认执行
gulp.task('default', function(callback) {
    runSequence(['copy', 'revjs', 'minimg'],
        callback);
});


// gulp.task('text', ['serve']);


// gulp.task('text', ['serve']);

// gulp.task('default', ['build']); //运行所有任务