/*
 * @Author: yb 
 * @Date: 2018-01-24 10:16:04 
 * @Last Modified by: yb
 * @Last Modified time: 2018-01-30 18:22:50
 */

"use strict";
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else if (window.layui && layui.define) { //用于layui 加载
        layui.define(function(exports) { //layui加载
            exports('base', factory(root));
        });
    } else {
        //浏览器全局变量(root 即 window)
        root.base = factory(root);
    }
}(this, function() {

    // 全局数据状态管理
    var states = {}; // 私有变量，用来存储状态与数据

    /**********************************对外接口******************************************/
    var base = {
        // 全局数据状态管理方法--------------begin
        statesSet: statesSet, //设置值
        statesGet: statesGet, //根据key取值
        getGlobalStatusData: getGlobalStatusData, //取全部值
        // 全局数据状态管理方法--------------end
        timeFormat: timeFormat, //时间格式化函数
        individuationTimeFormat: individuationTimeFormat, //时间个性化输出
        getJsonKey: getJsonKey, //获取 JSON key   IE 9+
        countDown: countDown, //倒计时
        randomNumber: randomNumber, //随机数
        deepClone: deepClone, //深拷贝
        loadStyle: loadStyle, //动态加载样式表
        imgLoader: imgLoader, //图片预加载 (多用于移动端)
        pageInit: pageInit, //简单分页
        goTop: goTop, //回到顶部
        strRegeMatch: strRegeMatch, //判断输入字符串是否合法
        getRequest: getRequest, //获取地址栏参数
        getExplore: getExplore, //获取浏览器版本和序号-1
        getExploreName: getExploreName, //获取浏览器名称
        getBrowserLanguage: getBrowserLanguage, //检测浏览器语言
        judgeMachine: judgeMachine, // 判断iPhone|iPad|iPod|iOS|Android
        randomString: randomString, //生成随机字符转
        setHtmlRem: setHtmlRem, //自适应rem初始化(淘宝~)
        on: on, //添加动作监听
        yszzAdd: yszzAdd, //隐式转换

    }

    /**
     * 判断是否是function
     * 
     * @param {any} f 
     * @returns 
     */
    function isFunc(f) {
        return typeof f === 'function';
    }

    /**
     *  判断数据类型
     * 
     * @param {any} elem 
     * @returns 
     */
    function type(elem) {
        if (elem == null) {
            return elem + '';
        }
        return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }

    /*
     * @param options {object} 键值对
     * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
     * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
     */
    function statesSet(options, target) {
        var keys = Object.keys(options);
        var o = target ? target : states;

        keys.map(function(item) {
            if (typeof o[item] == 'undefined') {
                o[item] = options[item];
            } else {
                type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
            }
            return item;
        })
    }

    /**
     * @Param name 属性名
     * @Description 通过属性名获取保存在states中的值
     */
    function statesGet(name) {
        return states[name] ? states[name] : undefined;
    }

    function getGlobalStatusData() {
        return states;
    }

    /**
     * [时间格式化函数]
     * @param  {[obj]} date [日期对象]
     * @param  {[string]} format ["yyyy-MM-dd hh:mm:ss"]
     * @return {[string]}        [返回格式化后的字符串]
     * 
     */
    function timeFormat(date, format) {
        var args = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    }

    /*
     *时间个性化输出功能
     *
     *< 60s, 显示为“刚刚”
     *>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
     *>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
     *>= 1day && < 1year, 显示日期“XX月XX日 XX:XX” 
     *>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX” 
     */
    function individuationTimeFormat(time) {
        var date = new Date(time),
            curDate = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 10,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            curYear = curDate.getFullYear(),
            curHour = curDate.getHours(),
            timeStr;
        if (year < curYear) { timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute; } else {
            var pastTime = curDate - date,
                pastH = pastTime / 3600000;
            if (pastH > curHour) { timeStr = month + '月' + day + '日 ' + hour + ':' + minute; } else if (pastH >= 1) { timeStr = '今天 ' + hour + ':' + minute + '分'; } else { var pastM = curDate.getMinutes() - minute; if (pastM > 1) { timeStr = pastM + '分钟前'; } else { timeStr = '刚刚'; } }
        }
        return timeStr;
    }

    // 倒计时
    function countDown(num, fun) {
        for (var i = 0; i <= num; i++) {
            // (function(i) {
            //     setTimeout(function() {
            //         console.log(i);
            //         if (i === 0) {
            //             if (typeof(fun) === 'function') {
            //                 fun();
            //             }
            //         }

            //     }, (num + 1 - i) * 1000);
            // })(i);

            setTimeout((function(i, fun) {
                return function() {
                    console.log(i);
                    if (i === 0) {
                        if (typeof(fun) === 'function') {
                            fun();
                        }
                    }
                }
            })(i, fun), (num + 1 - i) * 1000)
        }
    }

    /**
     *  深拷贝
     * 
     * @param {object} obj 
     * @returns 
     */
    function deepClone(obj) {
        if (obj == null || typeof obj !== 'object') {
            return obj;
        }
        switch (Object.prototype.toString.call(obj)) {
            case '[object Array]':
                {
                    var result = new Array(obj.length);
                    for (var i = 0; i < result.length; ++i) {
                        result[i] = deepClone(obj[i]);
                    }
                    return result;
                }

            case '[object Error]':
                {
                    var result = new obj.constructor(obj.message);
                    result.stack = obj.stack; // hack...
                    return result;
                }

            case '[object Date]':
            case '[object RegExp]':
            case '[object Int8Array]':
            case '[object Uint8Array]':
            case '[object Uint8ClampedArray]':
            case '[object Int16Array]':
            case '[object Uint16Array]':
            case '[object Int32Array]':
            case '[object Uint32Array]':
            case '[object Float32Array]':
            case '[object Float64Array]':
            case '[object Map]':
            case '[object Set]':
                return new obj.constructor(obj);

            case '[object Object]':
                {
                    var keys = Object.keys(obj);
                    var result = {};
                    for (var i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        result[key] = deepClone(obj[key]);
                    }
                    return result;
                }

            default:
                {
                    throw new Error("Unable to copy obj! Its type isn't supported.");
                }
        }
    }

    /**
     * 动态加载样式表
     * 
     * @param {any} url 
     */
    function loadStyle(url) {
        try {
            document.createStyleSheet(url)
        } catch (e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink)
        }
    }

    /**
     * 回到顶部
     * 
     * @param {number} duration //滚动时间
     */
    function goTop(duration) {
        var durations = duration || 300;
        var y1 = 0;
        var y2 = 0;
        var y3 = 0;
        if (document.documentElement) {
            y1 = document.documentElement.scrollTop || 0;
        }
        if (document.body) {
            y2 = document.body.scrollTop || 0;
        }
        var y3 = window.scrollY || 0;
        // 滚动条到页面顶部的垂直距离 
        var y = Math.max(y1, Math.max(y2, y3));
        for (var i = 60; i >= 0; i--) {
            setTimeout(function(i) {
                return function() {
                    window.scrollTo(0, y * i / 60);
                };
            }(i), durations * (1 - i / 60));
        }
    }

    /**
     * [js 添加on]
     * @param  {obj} elem [要添加的 js对象]
     * @param  {string} even ['click','input'。。。。。。]
     * @param  {function} fn [执行的方法]
     * 
     */
    function on(elem, even, fn) {
        elem.attachEvent ? elem.attachEvent('on' + even, function(e) { //for ie
            e.target = e.srcElement;
            fn.call(elem, e);
        }) : elem.addEventListener(even, fn, false);
        return this;
    }


    /**
     * 判断输入字符串是否合法
     * 
     * @param {any} str 
     * @returns 
     */
    function strRegeMatch(str) {
        //正整数 /^[0-9]*[1-9][0-9]*$/;
        //负整数 /^-[0-9]*[1-9][0-9]*$/;
        //正浮点数 /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        //负浮点数 /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        //浮点数 /^(-?\d+)(\.\d+)?$/; //email地址 /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        //url地址 /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/; 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$
        //年/月/日（年-月-日、年.月.日） /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        //匹配中文字符 /[\u4e00-\u9fa5]/;
        //匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线) /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
        //匹配空白行的正则表达式 /\n\s*\r/;
        //匹配中国邮政编码 /[1-9]\d{5}(?!\d)/;
        //匹配身份证 /\d{15}|\d{18}/;
        //匹配国内电话号码 /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
        //匹配IP地址 /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
        //匹配首尾空白字符的正则表达式 /^\s*|\s*$/;
        //匹配HTML标记的正则表达式 < (\S*?)[^>]*>.*?|< .*? />;
        //sql 语句 ^(select|drop|delete|create|update|insert).*$
        //提取信息中的网络链接 (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
        //提取信息中的邮件地址 \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
        //提取信息中的图片链接 (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
        //提取信息中的 IP 地址 (\d+)\.(\d+)\.(\d+)\.(\d+)
        //取信息中的中国手机号码 (86)*0*13\d{9} 
        //提取信息中的中国邮政编码 [1-9]{1}(\d+){5}
        //提取信息中的浮点数（即小数） (-?\d*)\.?\d+ 
        //提取信息中的任何数字 (-?\d*)(\.\d+)? 
        //电话区号 ^0\d{2,3}$ //腾讯 QQ 号 ^[1-9]*[1-9][0-9]*$ 
        //帐号（字母开头，允许 5-16 字节，允许字母数字下划线） ^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
        //中文、英文、数字及下划线 ^[\u4e00-\u9fa5_a-zA-Z0-9]+$



        var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
        if (pattern.test(val)) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 图片预加载
     *  var loading = base.imgLoader;
     *  var loader = new loading({
     *      resources: [
     *          // 新增
     *          './image/bgnew.jpg',
     *         './image/clothes.png'
     *     ],
     *     onStart: function(total) {
     *         console.log('start:' + total);
     *    },
     *    onProgress: function(current, total) {
     *        console.log(current + '/' + total);
     *    },
     *    onComplete: function(total) {
     *    console.log('加载完成。。。。。。。。');
     *   }
     * });
     */
    function imgLoader(config) {
        this.option = {
            resourceType: 'image', //资源类型，默认为图片
            baseUrl: './', //基准url
            resources: [], //资源路径数组
            onStart: null, //加载开始回调函数，传入参数total
            onProgress: null, //正在加载回调函数，传入参数currentIndex, total
            onComplete: null //加载完毕回调函数，传入参数total
        }
        if (config) {
            for (var i in config) {
                this.option[i] = config[i];
            }
        } else {
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引


        this.start = function() {
            this.status = 1;
            var _this = this;
            var baseUrl = this.option.baseUrl;
            for (var i = 0, l = this.option.resources.length; i < l; i++) {
                var r = this.option.resources[i],
                    url = '';
                if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
                    url = r;
                } else {
                    url = baseUrl + r;
                }

                var image = new Image();
                image.onload = function() { _this.loaded(); };
                image.onerror = function() { _this.loaded(); };
                image.src = url;
            }
            if (isFunc(this.option.onStart)) {
                this.option.onStart(this.total);
            }
        }
        this.loaded = function() {
            if (isFunc(this.option.onProgress)) {
                this.option.onProgress(++this.currentIndex, this.total);
            }
            //加载完毕
            if (this.currentIndex === this.total) {
                if (isFunc(this.option.onComplete)) {
                    this.option.onComplete(this.total);
                }
            }
        }
    }



    function pageInit(config) {
        this.option = {
            id: '',
            pageCount: 0,
            current: 0,
            backFn: function() {}
        }
        var isIE = false;


        console.log(':' + getExploreName())
        if (getExploreName() == 'IE') {
            isIE = true;
        }
        if (config) {
            for (var i in config) {
                this.option[i] = config[i];
            }
        } else {
            alert('参数错误！');
            return;
        }


        var page_div = document.getElementById(this.option.id);
        page_div.removeEventListener('click', clicks, false);
        var args = this.option;
        if (args.pageCount === 0) {
            return false;
        }

        fillHtml(page_div, args);

        function fillHtml(obj, args) {


            page_div.innerHTML = '';
            page_div.removeEventListener('click', clicks, false);
            //上一页
            if (args.current > 1) {
                var a = document.createElement('a');
                a.classList.add('prevPage');
                page_div.appendChild(a);
            } else {
                var span = document.createElement('span');
                console.log(span)
                if (isIE) {
                    span.className += ' disabled disabled-prve';
                } else {
                    span.classList.add('disabled');
                    span.classList.add('disabled-prve');
                }


                page_div.appendChild(span);
            }

            // //中间页码
            if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                var a = document.createElement('a');
                if (isIE) {
                    a.className += ' tcdNumber';
                } else {
                    a.classList.add('tcdNumber');
                }

                a.setAttribute('href', 'javascript:;');
                a.innerHTML = 1;
                page_div.appendChild(a);
            }
            if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                var a = document.createElement('a');
                var span = document.createElement('span');
                span.innerHTML = '...';
                a.appendChild(span);

                if (isIE) {
                    a.className += ' page-omit';
                } else {
                    a.classList.add('page-omit');
                }

                a.setAttribute('href', 'javascript:;');
                page_div.appendChild(a);
            }

            var start = args.current - 2,
                end = args.current + 2;
            if ((start > 1 && args.current < 4) || args.current == 1) {
                end++;
            }
            if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                start--;
            }

            for (; start <= end; start++) {
                if (start <= args.pageCount && start >= 1) {
                    if (start != args.current) {
                        var a = document.createElement('a');
                        if (isIE) {
                            a.className += ' tcdNumber';
                        } else {
                            a.classList.add('tcdNumber');
                        }

                        a.setAttribute('href', 'javascript:;');
                        a.innerHTML = start;
                        page_div.appendChild(a);
                    } else {
                        var span = document.createElement('span');

                        if (isIE) {
                            span.className += ' current';
                        } else {
                            span.classList.add('current');
                        }

                        span.innerHTML = start;
                        page_div.appendChild(span);
                    }
                }
            }


            if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                var a = document.createElement('a');
                var span = document.createElement('span');
                span.innerHTML = '...';
                a.appendChild(span);


                if (isIE) {
                    a.className += ' page-omit';
                } else {
                    a.classList.add('page-omit');
                }
                a.setAttribute('href', 'javascript:;');
                page_div.appendChild(a);
            }
            if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                var a = document.createElement('a');
                if (isIE) {
                    a.className += ' tcdNumber';
                } else {
                    a.classList.add('tcdNumber');
                }

                a.setAttribute('href', 'javascript:;');
                a.innerHTML = args.pageCount;
                page_div.appendChild(a);
            }
            // //下一页
            if (args.current < args.pageCount) {

                var a = document.createElement('a');

                if (isIE) {
                    a.className += ' nextPage';
                } else {
                    a.classList.add('nextPage');
                }

                a.setAttribute('href', 'javascript:;');
                page_div.appendChild(a);
            } else {
                var span = document.createElement('span');


                if (isIE) {
                    span.className += ' disabled disabled-next';
                } else {
                    span.classList.add('disabled');
                    span.classList.add('disabled-next');
                }

                page_div.appendChild(span);
            }

            page_div.addEventListener('click', clicks, false);
            // page_div.removeEventListener('click', clicks, false);
        }




        function clicks(ev) {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            var node_name = target.nodeName.toLowerCase();
            console.log(node_name)
            if ((' ' + target.className + ' ').indexOf(' ' + 'prevPage' + ' ') > -1) {
                console.log('上一页');
                var current = parseInt(page_div.getElementsByClassName('current')[0].innerHTML);
                fillHtml(page_div, { "current": current - 1, "pageCount": args.pageCount });

                if (typeof(args.backFn) == "function") {
                    args.backFn(current - 1);
                }
            }

            if ((' ' + target.className + ' ').indexOf(' ' + 'tcdNumber' + ' ') > -1) {
                console.log('页数');

                var current = parseInt(target.innerHTML);
                fillHtml(page_div, { "current": current, "pageCount": args.pageCount });

                if (typeof(args.backFn) == "function") {
                    args.backFn(current);
                }
            }

            if ((' ' + target.className + ' ').indexOf(' ' + 'nextPage' + ' ') > -1) {
                console.log('下一页');
                var current = parseInt(page_div.getElementsByClassName('current')[0].innerHTML);
                fillHtml(page_div, { "current": current + 1, "pageCount": args.pageCount });

                if (typeof(args.backFn) == "function") {
                    args.backFn(current + 1);
                }
            }
        }









    }


    /**
     * 随机数
     * 
     * @param {开始值} n 
     * @param {结束值} m 
     * @param {需要的类型} type
     * type 1 生成n-m，包含n但不包含m的整数
     *      2 生成n-m，不包含n但包含m的整数
     *      3 生成n-m，不包含n和m的整数
     *      4 生成n-m，包含n和m的随机数
     * @return {} number 
     */
    function randomNumber(n, m, type) {
        // Math.round(Math.random())//可均衡获取0到1的随机整数。
        // Math.floor(Math.random() * 10);// 可均衡获取0到9的随机整数。
        // Math.ceil() //返回大于等于数字参数的最小整数(取整函数)， 对数字进行上舍入
        // Math.floor() //返回小于等于数字参数的最大整数， 对数字进行下舍入　
        // Math.round() //返回数字最接近的整数， 四舍五入

        switch (type) {
            case 1:
                return parseInt(Math.random() * (m - n) + n, 10);
                break;
            case 2:
                return Math.floor(Math.random() * (m - n) + n) + 1;
                break;
            case 3:
                return Math.round(Math.random() * (m - n - 2) + n + 1);
                break;
            case 4:
                return Math.round(Math.random() * (m - n) + n);
                break;
            default:
                return Math.floor(Math.random() * 10); // 可均衡获取0到9的随机整数。
                break;
        }
    }


    /**
     * 隐式转换
     * 
     * @returns 
     */
    function yszzAdd() {
        console.log(arguments)
            // 第一次执行时，定义一个数组专门用来存储所有的参数
        var _args = [].slice.call(arguments);
        console.log(_args)
            // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
        var adder = function() {
            var _adder = function() {

                [].push.apply(_args, [].slice.call(arguments));
                console.log(_args)
                return _adder;
            };
            // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
            _adder.toString = function() {
                return _args.reduce(function(a, b) {
                    return a + b;
                });
            }
            return _adder;
        }
        return adder();
    }

    /**
     * 获取地址栏参数
     */
    function getRequest() {
        var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
        var object = {};
        if (url.indexOf("?") != -1) //url中存在问号，也就说有参数。 
        {
            var str = url.substr(1); //得到?后面的字符串
            var strs = str.split("&"); //将得到的参数分隔成数组[id="123456",Name="bicycle"];
            for (var i = 0; i < strs.length; i++) {　　　　　　　　 object[strs[i].split("=")[0]] = strs[i].split("=")[1]　　　　 }　　
        }
        return object;
    }

    /**
     * 获取浏览器版本和序号-1
     */
    function getExplore() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
            (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
            (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;
        // 根据关系进行判断
        if (Sys.ie) return ('IE:' + Sys.ie);
        if (Sys.edge) return ('EDGE:' + Sys.edge);
        if (Sys.firefox) return ('Firefox:' + Sys.firefox);
        if (Sys.chrome) return ('Chrome:' + Sys.chrome);
        if (Sys.opera) return ('Opera:' + Sys.opera);
        if (Sys.safari) return ('Safari:' + Sys.safari);
        return 'Unkonwn';
    }

    /**
     * 获取浏览器名称
     */
    function getExploreName() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            return 'Opera';
        } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
            return 'IE';
        } else if (userAgent.indexOf("Edge") > -1) {
            return 'Edge';
        } else if (userAgent.indexOf("Firefox") > -1) {
            return 'Firefox';
        } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1) {
            return 'Safari';
        } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1) {
            return 'Chrome';
        } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return 'IE>=11';
        } else {
            return 'Unkonwn';
        }
    }


    /**
     *  检测浏览器语言
     * 
     * @returns 
     */
    function getBrowserLanguage() {
        var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
        if (!currentLang) { //判断IE浏览器使用语言
            currentLang = navigator.browserLanguage;
        }
        return currentLang;
    }


    // 判断iPhone|iPad|iPod|iOS|Android
    function judgeMachine() {
        var type;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            type = 'ios';
        } else if (/(Android)/i.test(navigator.userAgent)) {
            type = 'Android';
        } else {
            type = 'pc';
        };
        return type;
    }

    /**
     *  生成随机字符串
     * 
     * @param {number} length   随机字符串长度 如果不填或0 默认为18
     * @returns 
     */
    function randomString(length) {
        var type = typeof(length);
        if (type === 'number' || type === 'undefined') {
            length = length || 18;
            var random_number = new Date().getTime().toString(36);　
            var base_charts = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
            var chart_length = base_charts.length;
            var str = '';
            for (var i = 0; i < length; i++) {　　　　
                str += base_charts.charAt(Math.floor(Math.random() * chart_length));　　
            }　

            if (length <= 8) {
                return str;
            } else {

                return str.substr(0, str.length - 8) + random_number;
            }
            console.log('输入length:' + length);
        } else {
            alert('输入错误')
        }
    }

    // 自适应rem初始化(淘宝~)
    function setHtmlRem() {
        // (function(b) {
        var b = document;
        var a = {};
        a.Html = b.getElementsByTagName('html')[0];
        a.widthProportion = function() {
            var c = (b.body && b.body.clientWidth || a.Html.offsetWidth) / 750;
            console.log(c)
            return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
        };
        a.changePage = function() {
            // console.log(a.widthProportion())
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + 'px!important;height:auto');
        }

        a.changePage();
        setInterval(a.changePage, 1000);
        // })(document);
    }

    /**
     * 获取 JSON key   IE 9+
     * 
     * @param {obj} json 
     * @returns 
     */
    function getJsonKey(json) {
        return Object.keys(json)
    }

    //暴露公共方法
    return base;
}));

// base.statesSet({ name: 'yb' });
// console.log(JSON.stringify(base.getGlobalStatusData(), null, 2));
// console.log(base.statesGet('name'));


// // base.countDown(5);
// console.log('日期:' + base.timeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'));
// console.log('浏览器类型:' + base.getExplore() + '========' + base.getExploreName())
// console.log('获取浏览器语言:' + base.getBrowserLanguage());
// console.log('pc？移动:' + base.judgeMachine());
// console.log('个性化输出:' + base.individuationTimeFormat('2018/01/25 13:20:56'));
// console.log('随机字符串:' + base.randomString());

// console.log(JSON.stringify(base.getJsonKey({
//     a: '1',
//     b: '2',
//     c: {
//         a: '1'
//     }
// }), null, 2))


// tableExport('table', 'table', 'csv');


// base.loadStyle('./css/reset.css');