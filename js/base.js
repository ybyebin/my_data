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
    var isFunc = function(f) {
        return typeof f === 'function';
    }

    function isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    var base = {
        /**********************************公共******************************************/
        /**
         * [时间格式化函数]
         * @param  {[obj]} date [日期对象]
         * @param  {[string]} format ["yyyy-MM-dd hh:mm:ss"]
         * @return {[string]}        [返回格式化后的字符串]
         * 
         */
        format: function(date, format) {
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
        },

        // 深拷贝
        deepClone: function(obj) {
            if (obj == null || typeof obj !== 'object') {
                return obj;
            }
            switch (Object.prototype.toString.call(obj)) {
                case '[object Array]':
                    {
                        const result = new Array(obj.length);
                        for (let i = 0; i < result.length; ++i) {
                            result[i] = deepClone(obj[i]);
                        }
                        return result;
                    }

                case '[object Error]':
                    {
                        const result = new obj.constructor(obj.message);
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
                        const keys = Object.keys(obj);
                        const result = {};
                        for (let i = 0; i < keys.length; ++i) {
                            const key = keys[i];
                            result[key] = deepClone(obj[key]);
                        }
                        return result;
                    }

                default:
                    {
                        throw new Error("Unable to copy obj! Its type isn't supported.");
                    }
            }
        },

        // 回到顶部
        goTop: function(duration) {
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
        },

        /**
         * [时间格式化函数]
         * @param  {[obj]} elem [要添加的 js对象]
         * @param  {[string]} even ['click','input'。。。。。。]
         * @param  {[]} fn [执行的方法]
         * 
         */
        on: function(elem, even, fn) {
            elem.attachEvent ? elem.attachEvent('on' + even, function(e) { //for ie
                e.target = e.srcElement;
                fn.call(elem, e);
            }) : elem.addEventListener(even, fn, false);
            return this;
        },
        // 判断输入字符串是否合法
        strRegeMatch: function(str) {
            var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
            if (pattern.test(val)) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * 图片预加载
         * 
         *  var loader = new loadimg({
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
        imgLoader: function(config) {
            this.option = {
                resourceType: 'image', //资源类型，默认为图片
                baseUrl: './', //基准url
                resources: [], //资源路径数组
                onStart: null, //加载开始回调函数，传入参数total
                onProgress: null, //正在加载回调函数，传入参数currentIndex, total
                onComplete: null //加载完毕回调函数，传入参数total
            }
            if (config) {
                for (i in config) {
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
        },

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
        randomNumber: function(n, m, type) {
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
        },


        // 隐式转换
        yszzAdd: function() {
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
        },

        /**
         * 获取地址栏参数
         */
        getRequest: function() {
            var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
            var object = {};
            if (url.indexOf("?") != -1) //url中存在问号，也就说有参数。 
            {
                var str = url.substr(1); //得到?后面的字符串
                var strs = str.split("&"); //将得到的参数分隔成数组[id="123456",Name="bicycle"];
                for (var i = 0; i < strs.length; i++) {　　　　　　　　 object[strs[i].split("=")[0]] = strs[i].split("=")[1]　　　　 }　　
            }
            return object;
        },

        /**
         * 获取浏览器版本和序号-1
         */
        getExplore: function() {
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
            if (Sys.ie) return ('IE: ' + Sys.ie);
            if (Sys.edge) return ('EDGE: ' + Sys.edge);
            if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
            if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
            if (Sys.opera) return ('Opera: ' + Sys.opera);
            if (Sys.safari) return ('Safari: ' + Sys.safari);
            return 'Unkonwn';
        },

        /**
         * 获取浏览器名称
         */
        getExploreName: function() {
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



    }

    //暴露公共方法
    return base;
}));

console.log('日期:' + base.format(new Date(), 'yyyy-MM-dd'));
console.log(base.getExplore() + '========' + base.getExploreName())

function randomNumber(n) {

}