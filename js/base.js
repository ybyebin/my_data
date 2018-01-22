
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else if (window.layui && layui.define) { //用于layui 加载
        layui.define(function (exports) { //layui加载
            exports('base', factory(root));
        });
    } else {
        //浏览器全局变量(root 即 window)
        root.base = factory(root);
    }
}(this, function () {
    var isFunc = function (f) {
        return typeof f === 'function';
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
        format: function (date, format) {
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
        deepClone: function (obj) {
            if (obj == null || typeof obj !== 'object') {
                return obj;
            }
            switch (Object.prototype.toString.call(obj)) {
                case '[object Array]': {
                    const result = new Array(obj.length);
                    for (let i = 0; i < result.length; ++i) {
                        result[i] = deepClone(obj[i]);
                    }
                    return result;
                }

                case '[object Error]': {
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

                case '[object Object]': {
                    const keys = Object.keys(obj);
                    const result = {};
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        result[key] = deepClone(obj[key]);
                    }
                    return result;
                }

                default: {
                    throw new Error("Unable to copy obj! Its type isn't supported.");
                }
            }
        },

        // 回到顶部
        goTop: function (duration) {
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
                setTimeout(function (i) {
                    return function () {
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
        on: function (elem, even, fn) {
            elem.attachEvent ? elem.attachEvent('on' + even, function (e) { //for ie
                e.target = e.srcElement;
                fn.call(elem, e);
            }) : elem.addEventListener(even, fn, false);
            return this;
        },
        // 判断输入字符串是否合法
        strRegeMatch: function (str) {
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
        imgLoader: function (config) {
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


            this.start = function () {
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
                    image.onload = function () { _this.loaded(); };
                    image.onerror = function () { _this.loaded(); };
                    image.src = url;
                }
                if (isFunc(this.option.onStart)) {
                    this.option.onStart(this.total);
                }
            }
            this.loaded = function () {
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

    }

    //暴露公共方法
    return base;
}));



console.log('日期:' + base.format(new Date(), 'yyyy-MM-dd'))
