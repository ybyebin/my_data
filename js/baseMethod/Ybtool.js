/*
 * @Author: yb 
 * @Date: 2018-02-01 10:32:18 
 * @Last Modified by: yb
 * @Last Modified time: 2018-03-12 13:16:26
 */

/******************查询***********************
 * 全局状态管理
 * **************************************************         
 * setStates------------>设置值
 * getStates------------>根据 key 取值
 * getStatusData-------->获取全部状态数据
 * **************************************************
 *
 * 时间相关
 *******************************************************
 * timeFormat------------>时间格式化函数
//  * individuationTime----->时间个性化输出功能
 * countDown------------->倒计时
 *******************************************************
 *
 * 字符串相关
 *****************************************************
 * randomString--------->随机字符串
 * strRegeMatch--------->判断输入字符串是否合法
 * checkPwdStreng------->检测密码强度
 * 
 *****************************************************
 *
 * 数组相关
 * *****************************************************
 * countInArr----------->统计数组中特定值出现的次数
 * countAllInArr-------->统计数组中每个元素出现的次数
 * removeRepeatArray---->数组去重
 * *****************************************************
 * 
 * 对象相关
 * *****************************************************
 * deepClone------------>深拷贝
 * getJsonKey----------->获取 JSON key
 * *****************************************************
 * 
 * cookie
 * *****************************************************
 * setCookie----------->设置cookie
 * getCookie----------->获取cookie
 * removeCookie-------->删除cookie
 * *****************************************************
 *
 * 功能相关
 * *****************************************************
 * randomNumber--------->随机数
 * debounce------------->延时执行(项目中用于input实时搜索)
 * goTop---------------->body回到顶部
 * imgLoader------------>图片预加载
 * imgUpload------------> 图片上传(**不能直接使用**)
 * getRequest----------->获取地址栏参数
 * getBrowserLanguage--->检测浏览器语言
 * pageInit------------->简单分页
 * stope---------------->阻止事件冒泡
 * loadStyle||link------>动态加载 css
 * loadJs--------------->动态加载 js
 * *****************************************************
 * 
 * js 原生
 * *****************************************************
 * addHandler----------->js 添加监听
 * removeHandler-------->js 移除监听
 * jsObjHasClass-------->js  原生对象  判断是否包含某 class
 * getStyle------------->获取节点的style属性值
 * addClass------------->添加类名
 * removeClass---------->删除类名
 * ajax----------------->封装ajax函数
 * *****************************************************
 * 
 * 
 * 设备相关
 * *****************************************************
 * getExplore----------->获取 浏览器版本和序号-1
 * getExploreName------->获取浏览器 名称
 * judgeMachine--------->判断iPhone|iPad|iPod|iOS|Android
 * device--------------->设备信息
 * 
 * *****************************************************
 * 
 * 其他
 * *****************************************************
 * setHtmlRem----------->自适应rem初始化(淘宝~)
 * yszzAdd-------------->隐式转换
 * ****************************************************
 * */


;
! function(win) {
    "use strict";

    var doc = document;
    var config = {}; //基础数据
    var Ybtool = function() {
        this.data = {} // 全局数据状态管理 存储全局数据
        this.timeout_id = '';
        this.v = '0.0.1'; //版本号
    }

    Ybtool.prototype = {
        constructor: Ybtool,
        init: function() {
            // 初始时需要做些什么事情
        },

        /**
         * @description 全局配置
         */
        config: function(options) {
            options = options || {};
            for (var key in options) {
                config[key] = options[key];
            }
            return this;
        },

        /**
         * @description 全局状态管理-------设置值
         * @param [{}]  键值对
         * @param [{}]  属性值为对象的属性，只在函数实现时递归中传入
         */
        setStates: function(options, target) {
            var keys = Object.keys(options);
            var o = target ? target : this.data;
            keys.map(function(item) {
                if (typeof o[item] == 'undefined') {
                    o[item] = options[item];
                } else {
                    type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
                }
                return item;
            });
        },

        /**
         * @description    全局状态管理-------根据 key 取值
         * @param [string] 属性名  
         * @return [{}]    返回相对应的值
         */
        getStates: function(key) {
            var states = this.data;
            return states[key] ? states[key] : undefined;
        },

        /**
         * @description 全局状态管理-------获取 全部 状态数据
         * @return [{}] 返回全局状态数据
         */
        getStatusData: function() {
            return this.data;
        },

        /**
         * @description 时间格式化函数
         * @param  [string]  "yyyy-MM-dd hh:mm:ss" 
         * @param  [Date]    日期对象
         * @return [string]  格式化后的字符串
         */
        timeFormat: function(format, date) {
            var date = date || new Date;
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

        /**
         * @description 时间个性化输出功能
         * @param  [string] 
         * @return [string]  时间日期
         *< 60s, 显示为“刚刚”
         *>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
         *>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
         *>= 1day && < 1year, 显示日期“XX月XX日 XX:XX” 
         *>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX” 
         */
        individuationTime: function(time) {
            // var date = new Date(time),
            //     curDate = new Date(),
            //     year = date.getFullYear(),
            //     month = date.getMonth() + 1,
            //     day = date.getDate(),
            //     hour = date.getHours(),
            //     minute = date.getMinutes(),
            //     curYear = curDate.getFullYear(),
            //     curHour = curDate.getHours(),
            //     timeStr;


            // console.log(year, month, day, hour, minute)
            // console.log(curYear, curHour);



            // if (year < curYear) {
            //     timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
            // } else {
            //     var pastTime = curDate - date,
            //         pastH = pastTime / 3600000;
            //     if (pastH > curHour) {
            //         timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
            //     } else if (pastH >= 1) {
            //         timeStr = '今天 ' + hour + ':' + minute + '分';
            //     } else {
            //         var pastM = curDate.getMinutes() - minute;
            //         if (pastM > 1) {
            //             timeStr = pastM + '分钟前';
            //         } else {
            //             timeStr = '刚刚';
            //         }
            //     }
            // }
            // return timeStr;
        },

        /**
         * @description 倒计时
         * @param  [number]   
         * @param  [function]    
         */
        countDown: function(num, fun) {
            for (var i = 0; i <= num; i++) {
                (function(i) {
                    setTimeout(function() {
                        console.log(i)
                        if (i === 0) {
                            if (typeof fun === 'function') {
                                fun()
                            }
                        }
                    }, (num + 1 - i) * 1000)
                })(i)
            }
        },

        /**
         * @description 生成随机字符串
         * @param  [number]   随机字符串长度 如果不填或0 默认为18
         * @return  [string]    
         */
        randomString: function(length) {
            var type = typeof(length);
            if (type === 'number' || type === 'undefined') {
                length = length || 18;
                var random_number = new Date().getTime().toString(36);　
                console.log(random_number)
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
        },
        /**
         * @description 判断输入字符串是否合法
         */
        strRegeMatch: function(str) {
            var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
            if (pattern.test(val)) {
                return false;
            } else {
                return true;
            }
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
        },
        /**
         * @description 检测密码强度
         * @param [string]
         */
        checkPwdStreng: function(str) {
            var nowLv = 0;
            if (str.length < 6) {
                return nowLv
            }
            if (/[0-9]/.test(str)) {
                nowLv++
            }
            if (/[a-z]/.test(str)) {
                nowLv++
            }
            if (/[A-Z]/.test(str)) {
                nowLv++
            }
            if (/[\.|-|_]/.test(str)) {
                nowLv++
            }
            return nowLv;
        },


        /**
         * @description 统计数组中特定值出现的次数
         * @param  [arr]   
         * @param  [numper]   
         * @return [number] 
         *  countInArr([1, 1, 2, 1, 2, 3], 1) -> 3
         */
        countInArr: function(arr, value) {
            return arr.reduce(function(a, v) {
                return v === value ? a + 1 : a + 0;
            }, 0);
        },
        /**
         * @description 统计数组中每个元素出现的次数
         * @param  [arr]   
         */
        countAllInArr: function(arr) {
            return arr.reduce(function(allNames, name) {
                if (name in allNames) {
                    allNames[name]++;
                } else {
                    allNames[name] = 1;
                }
                return allNames;
            }, {});
        },

        /**
         * @description 数组去重
         */
        removeRepeatArray: function(arr) {
            return arr.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
            //es6
            //return Array.from(new Set(arr))
        },

        /**
         * @description 深拷贝
         */
        deepClone: function(arr) {
            return deepClone(arr);
        },

        /**
         * @description 获取 JSON key   IE 9 +
         * @param  [json]   
         * @return  [arr]    
         */
        getJsonKey: function(json) {
            return Object.keys(json);
        },


        /**
         * @description 设置cookie
         */
        setCookie: function(name, value, iDay) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = name + '=' + value + ';expires=' + oDate;
        },

        /**
         * @description 获取cookie
         */
        getCookie: function(name) {
            var arr = document.cookie.split('; '),
                arr2;
            for (var i = 0; i < arr.length; i++) {
                arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return arr2[1];
                }
            }
            return '';
        },

        /**
         * @description 删除cookie
         */
        removeCookie: function(name) {
            this.setCookie(name, 1, -1);
        },

        /**
         * @description 随机数生成
         * @param  [number]  开始值 
         * @param  [number]  结束值 
         * @param  [number]  需要的类型 
         * type 1 生成n-m，包含n但不包含m的整数
         *      2 生成n-m，不包含n但包含m的整数
         *      3 生成n-m，不包含n和m的整数
         *      4 生成n-m，包含n和m的随机数 
         * @return [number] 
         */
        randomNumber: function(n, m, type) {
            // Math.round(Math.random())//可均衡获取0到1的随机整数。
            // Math.floor(Math.random() * 10);// 可均衡获取0到9的随机整数。
            // Math.ceil() //返回大于等于数字参数的最小整数(取整函数)， 对数字进行上舍入
            // Math.floor() //返回小于等于数字参数的最大整数， 对数字进行下舍入　
            // Math.round() //返回数字最接近的整数， 四舍五入
            var type = type || 4;
            var n = n || 0;
            var m = m || 9;
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

        /**
         * @description 延时执行
         * @param  [function] 要执行的方法
         * @param  [number] 延时时间
         * @param  [] options
         * ybtool.debounce(function() {
         *      alert(1)
         *      }, 300, {
         *   leading: false
         *  })();
         */
        debounce: function(fn, delay, options) {
            if (!options) {
                options = {};
            }
            var delay = delay || 300;
            var leadingExc = false;
            var _this = this;

            return function() {
                var that = this,
                    args = arguments;
                if (!leadingExc && !(options.leading === false)) {
                    fn.apply(that, args);
                }
                leadingExc = true;
                if (_this.timeout_id) {
                    clearTimeout(_this.timeout_id);
                }
                _this.timeout_id = setTimeout(function() {
                    if (!(options.trailing === false)) {
                        fn.apply(that, args);
                    }
                    leadingExc = false;
                }, delay);
            }
        },

        /**
         * @description 回到顶部
         * @param [number]  滚动时间
         */
        goTop: function() {
            var durations = duration || 300;
            var y1 = 0;
            var y2 = 0;
            var y3 = 0;
            if (doc.documentElement) {
                y1 = doc.documentElement.scrollTop || 0;
            }
            if (doc.body) {
                y2 = doc.body.scrollTop || 0;
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
         * @description 图片预加载
         *  var loading = ybtool.imgLoader;
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
        imgLoader: function() {
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
        },

        /**
         * @description 图片上传(自行使用)
         */
        imgUpload: function(config) {
            // 生成方法
            var config = config || {};
            if (!config.hasOwnProperty('id')) {
                config.id = ybtool.randomString()
            }
            if (!config.hasOwnProperty('fun')) {
                config.fun = '';
            }

            var inp = document.createElement('input');
            inp.setAttribute('type', 'file');
            inp.setAttribute('id', config.id);
            inp.setAttribute('data-fnname', config.fun);

            inp.classList.add('ybui-hide')
            inp.onchange = function(a) {
                var file = this.files[0];

                var fun_name = this.getAttribute('data-fnname');

                if (fun_name === '') {
                    alert('未定义方法');
                } else {
                    fns(file, fun_name);
                }

                console.log(this.getAttribute('id'))

            };
            var btn = document.createElement('button');
            btn.setAttribute('data-id', config.id);
            btn.innerHTML = '点击上传图片';
            btn.onclick = function() {
                var id = this.getAttribute('data-id');
                var a = document.getElementById(id);
                a.value = '';
                a.click();

            }
            var div = document.createElement('div');
            div.appendChild(inp);
            div.appendChild(btn);
            document.getElementById('mode').appendChild(div);


            // 要执行的方法
            function fns(file, fun) {
                console.log(file)

                if (file == null) {
                    return;
                }
                if (!/image\/\w+/.test(file.type)) {
                    layer.msg("请确保文件为图像类型")
                    return false;
                }
                if (window.FileReader) {
                    var fr = new FileReader();
                    fr.readAsDataURL(file);
                    fr.onload = function(e) {
                        // console.log(e.target.result);
                        method.fun(e.target.result);
                    };
                }

            }

            // 执行
            imageUp({
                fun: 'fun'
            });
            var method = {};
            method.fun = function(data) {
                console.log(data);
            }
        },

        /**
         * @description 获取地址栏参数
         */
        getRequest: function() {
            var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
            var object = {};
            if (url.indexOf("?") != -1) //url中存在问号，也就说有参数。 
            {
                var str = url.substr(1); //得到?后面的字符串
                var strs = str.split("&"); //将得到的参数分隔成数组[id="123456",Name="bicycle"];
                for (var i = 0; i < strs.length; i++) {
                    object[strs[i].split("=")[0]] = strs[i].split("=")[1];
                }　　　
            }　　
            return object;
        },

        /**
         * @description 检测浏览器语言
         */
        getBrowserLanguage: function() {
            var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
            if (!currentLang) { //判断IE浏览器使用语言
                currentLang = navigator.browserLanguage;
            }
            return currentLang;
        },

        /**
         * @description 简单分页
         */
        pageInit: function(config) {
            var option = {
                id: '',
                pageCount: 0,
                current: 0,
                backFn: function() {}
            }

            if (config) {
                for (var i in config) {
                    option[i] = config[i];
                }
            } else {
                alert('参数错误！');
                return;
            }
            // var args = option;
            if (option.pageCount === 0) {
                return false;
            }
            var page_div = doc.getElementById(option.id);
            fillHtml(page_div, option);
        },

        /**
         * @description 阻止事件冒泡
         */
        stope: function(thisEvent) {
            thisEvent = thisEvent || win.event;
            try { thisEvent.stopPropagation() } catch (e) {
                thisEvent.cancelBubble = true;
            }
        },

        /**
         * @description 动态加载样式表
         * @param  [string]  地址
         */
        loadStyle: function(url) {
            try {
                doc.createStyleSheet(url)
            } catch (e) {
                var cssLink = doc.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.type = 'text/css';
                cssLink.href = url;
                var head = doc.getElementsByTagName('head')[0];
                head.appendChild(cssLink)
            }
        },

        /**
         * @description 动态加载样式表
         * @param  [string]  地址
         * @param  [string]  名称
         * ybtool.link('../../../../css/reset.css', 'reset');
         */
        link: function(href, cssname) {
            var that = this,
                link = doc.createElement('link'),
                head = doc.getElementsByTagName('head')[0];

            var app = (cssname || href).replace(/\.|\//g, ''),
                id = link.id = app;
            link.rel = 'stylesheet';
            link.href = href;
            if (!doc.getElementById(id)) {
                head.appendChild(link);
            }
        },

        /**
         * @description 动态加载  js
         * 
         * @param [string]  给js设置id
         * @param [string]   地址
         * @param [function] 回调函数
         */
        loadJs: function(sid, jsurl, callback) {
            var nodeHead = doc.getElementsByTagName('head')[0];
            var nodeScript = null;
            if (doc.getElementById(sid) == null) {
                nodeScript = doc.createElement('script');
                nodeScript.setAttribute('type', 'text/javascript');
                nodeScript.setAttribute('src', jsurl);
                nodeScript.setAttribute('id', sid);
                if (callback != null) {
                    nodeScript.onload = nodeScript.onreadystatechange = function() {
                        if (nodeScript.ready) {
                            return false;
                        }
                        if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                            nodeScript.ready = true;
                            callback();
                        }
                    };
                }
                nodeHead.appendChild(nodeScript);
            } else {
                if (callback != null) {
                    callback();
                }
            }
        },

        /**
         * @description 数据类型判断
         * istype([],'array')
         * true
         * istype([])
         * '[object Array]'
         */
        istype: function(o, type) {
            if (type) {
                var _type = type.toLowerCase();
            }
            switch (_type) {
                case 'string':
                    return Object.prototype.toString.call(o) === '[object String]';
                case 'number':
                    return Object.prototype.toString.call(o) === '[object Number]';
                case 'boolean':
                    return Object.prototype.toString.call(o) === '[object Boolean]';
                case 'undefined':
                    return Object.prototype.toString.call(o) === '[object Undefined]';
                case 'null':
                    return Object.prototype.toString.call(o) === '[object Null]';
                case 'function':
                    return Object.prototype.toString.call(o) === '[object Function]';
                case 'array':
                    return Object.prototype.toString.call(o) === '[object Array]';
                case 'object':
                    return Object.prototype.toString.call(o) === '[object Object]';
                case 'nan':
                    return isNaN(o);
                case 'elements':
                    return Object.prototype.toString.call(o).indexOf('HTML') !== -1
                default:
                    return Object.prototype.toString.call(o)
            }
        },



        /**
         * @description 判断是否包含某 class
         * @param [obj]  
         * @param [string]
         */
        jsObjHasClass: function(obj, className) {
            return jsObjHasClass(obj, className);
        },

        /**
         * @description 获取节点的style属性值
         */
        getStyle: function(node, name) {
            var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
            return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
        },

        /**
         * @description 添加类名
         */
        addClass: function(obj, classStr) {
            if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (!this.hasClass(obj[i], classStr)) {
                        obj[i].className += " " + classStr;
                    }
                }
            } else {
                if (!this.hasClass(obj, classStr)) {
                    obj.className += " " + classStr;
                }
            }
        },

        /**
         * @description 删除类名
         */
        removeClass: function(obj, classStr) {
            if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (this.hasClass(obj[i], classStr)) {
                        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                        obj[i].className = obj[i].className.replace(reg, '');
                    }
                }
            } else {
                if (this.hasClass(obj, classStr)) {
                    var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                    obj.className = obj.className.replace(reg, '');
                }
            }
        },


        /* 封装ajax函数
         * @param {string}obj.type http连接的方式，包括POST和GET两种方式
         * @param {string}obj.url 发送请求的url
         * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
         * @param {object}obj.data 发送的参数，格式为对象类型
         * @param {function}obj.success ajax发送并接收成功调用的回调函数
         * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
         */
        //  ajax({
        //  	type:'get',
        //  	url:'xxx',
        //  	data:{
        //  		id:'111'
        //  	},
        //  	success:function(res){
        //  		console.log(res)
        //  	}
        //  })
        ajax: function(obj) {
            obj = obj || {};
            obj.type = obj.type.toUpperCase() || 'POST';
            obj.url = obj.url || '';
            obj.async = obj.async || true;
            obj.data = obj.data || null;
            obj.success = obj.success || function() {};
            obj.error = obj.error || function() {};
            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var params = [];
            for (var key in obj.data) {
                params.push(key + '=' + obj.data[key]);
            }
            var postData = params.join('&');
            if (obj.type.toUpperCase() === 'POST') {
                xmlHttp.open(obj.type, obj.url, obj.async);
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            } else if (obj.type.toUpperCase() === 'GET') {
                xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
                xmlHttp.send(null);
            }
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    obj.success(xmlHttp.responseText);
                } else {
                    obj.error(xmlHttp.responseText);
                }
            };
        },






        /**
         * @description 获取 浏览器版本和序号-1
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
            if (Sys.ie) return ('IE:' + Sys.ie);
            if (Sys.edge) return ('EDGE:' + Sys.edge);
            if (Sys.firefox) return ('Firefox:' + Sys.firefox);
            if (Sys.chrome) return ('Chrome:' + Sys.chrome);
            if (Sys.opera) return ('Opera:' + Sys.opera);
            if (Sys.safari) return ('Safari:' + Sys.safari);
            return 'Unkonwn';
        },

        /**
         * @description 获取浏览器 名称
         */
        getExploreName: function() {
            return getExploreName();
        },


        /**
         * @description 判断iPhone|iPad|iPod|iOS|Android
         */
        judgeMachine: function() {
            var type;
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                type = 'ios';
            } else if (/(Android)/i.test(navigator.userAgent)) {
                type = 'Android';
            } else {
                type = 'pc';
            };
            return type;
        },

        /**
         * @description 设备信息
         */
        device: function(key) {
            var agent = navigator.userAgent.toLowerCase()

            //获取版本号
            , getVersion = function(label) {
                var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
                label = (agent.match(exp) || [])[1];
                return label || false;
            }

            //返回结果集
            , result = {
                os: function() { //底层操作系统
                    if (/windows/.test(agent)) {
                        return 'windows';
                    } else if (/linux/.test(agent)) {
                        return 'linux';
                    } else if (/iphone|ipod|ipad|ios/.test(agent)) {
                        return 'ios';
                    } else if (/mac/.test(agent)) {
                        return 'mac';
                    }
                }(),
                ie: function() { //ie版本
                    return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
                        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
                    ) : false;
                }(),
                weixin: getVersion('micromessenger') //是否微信
            };

            //任意的key
            if (key && !result[key]) {
                result[key] = getVersion(key);
            }

            //移动设备
            result.android = /android/.test(agent);
            result.ios = result.os === 'ios';

            return result;
        },

        /**
         * @description 自适应rem初始化(淘宝~)
         */
        setHtmlRem: function() {
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
        },

        /**
         * @description 隐式转换
         */
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










    };
    /** ******************************************************************* */
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

    /**
     * 判断 原生对象  是否有某个类名
     * 
     * @param {object} obj 
     * @param {string} className 
     * @returns 
     */
    function jsObjHasClass(obj, className) {
        if ((' ' + obj.className + ' ').indexOf(' ' + className + ' ') > -1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 添加绑定事件
     * 
     * @param {any} element 
     * @param {any} type 
     * @param {any} handler 
     */
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element["on" + type] = handler /*直接赋给事件*/
        }

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



    // 简单分页-----填充数据
    function fillHtml(obj, args) {
        var page_div = doc.createElement('div');
        var isIE = false;
        obj.innerHTML = '';
        if (getExploreName() == 'IE') {
            isIE = true;
        }
        //上一页
        if (args.current > 1) {
            var a = doc.createElement('a');
            a.classList.add('prevPage');
            a.setAttribute('href', 'javascript:;');
            page_div.appendChild(a);
        } else {
            var span = doc.createElement('span');
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
            var a = doc.createElement('a');
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
            var a = doc.createElement('a');
            var span = doc.createElement('span');
            span.innerHTML = '...';
            a.appendChild(span);
            if (isIE) {
                a.className += ' page-omit';
            } else {
                a.classList.add('page-omit');
            }
            // a.setAttribute('href', 'javascript:;');
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
                    var a = doc.createElement('a');
                    if (isIE) {
                        a.className += ' tcdNumber';
                    } else {
                        a.classList.add('tcdNumber');
                    }

                    a.setAttribute('href', 'javascript:;');
                    a.innerHTML = start;
                    page_div.appendChild(a);
                } else {
                    var span = doc.createElement('span');

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
            var a = doc.createElement('a');
            var span = doc.createElement('span');
            span.innerHTML = '...';
            a.appendChild(span);
            if (isIE) {
                a.className += ' page-omit';
            } else {
                a.classList.add('page-omit');
            }
            // a.setAttribute('href', 'javascript:;');
            page_div.appendChild(a);
        }
        if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
            var a = doc.createElement('a');
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
            var a = doc.createElement('a');
            if (isIE) {
                a.className += ' nextPage';
            } else {
                a.classList.add('nextPage');
            }
            a.setAttribute('href', 'javascript:;');
            page_div.appendChild(a);
        } else {
            var span = doc.createElement('span');
            if (isIE) {
                span.className += ' disabled disabled-next';
            } else {
                span.classList.add('disabled');
                span.classList.add('disabled-next');
            }
            page_div.appendChild(span);
        }
        var fn = pageClicks.bind(null, args);
        addHandler(page_div, 'click', fn);
        page_div.setAttribute('data-pagecount', args.pageCount);
        page_div.setAttribute('data-current', args.current);
        obj.appendChild(page_div);
    }

    // 简单分页-----添加监听
    function pageClicks(arg) {
        var a = [].slice.call(arguments);
        var ev = a[1] || window.event;
        var args = a[0];
        var fun = args.backFn;
        var target = ev.target || ev.srcElement;
        var node_name = target.nodeName.toLowerCase();
        var parent_div = target.parentNode.parentNode;
        var parent_parent_div = target.parentNode;
        var current = Number(parent_parent_div.getAttribute('data-current'));
        var pageCount = Number(parent_parent_div.getAttribute('data-pagecount'));

        if (jsObjHasClass(target, 'prevPage')) {
            console.log('上一页');
            fillHtml(parent_div, { "current": current - 1, "pageCount": pageCount, 'backFn': fun });

            if (typeof(fun) == "function") {
                fun(current - 1);
            }
        }
        if (jsObjHasClass(target, 'tcdNumber')) {
            console.log('页数');
            var current = parseInt(target.innerHTML);
            fillHtml(parent_div, { "current": current, "pageCount": pageCount, 'backFn': fun });
            if (typeof(fun) == "function") {
                fun(current);
            }
        }
        if (jsObjHasClass(target, 'nextPage')) {
            console.log('下一页');
            fillHtml(parent_div, { "current": current + 1, "pageCount": pageCount, 'backFn': fun });

            if (typeof(fun) == "function") {
                fun(current + 1);
            }
        }
    }

    /**
     * @description 深拷贝
     * @param  [obj] 
     * @returns [obj]
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

    // 全局时间格式化输出     new Date().format('yyyy-MM-dd hh:mm:ss')
    Date.prototype.format = function(format) {
        var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
        this
    }


    win.ybtool = new Ybtool();
}(window);

ybtool.setStates({ name: 'yb' });

console.log(new Date().toLocaleDateString())
console.log(new Date('2018/03/18 10:34:53'))
    // console.log('timeFormat:' + ybtool.timeFormat('yyyy-MM-dd'));
ybtool.countDown(5, function() {
    console.log('结束')
})