! function(win) {
    "use strict";
    var isFunc = function(f) {
            return typeof f === 'function';
        }
        //构造器函数
    function resLoader(config) {
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
    };

    resLoader.prototype.start = function() {
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
            image.onload = function() {
                _this.loaded();
            };
            image.onerror = function() {
                _this.loaded();
            };
            image.src = url;
        }
        if (isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function() {
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

    //暴露公共方法
    // return resLoader;

    win.resLoader = resLoader;
}(window);

var loader = new resLoader({
    resources: [
        'image/bg/bg0.png',
        'image/bg/bg.png',
        'image/bg/bg2.png',
        'image/bg/loading.png',
        'image/0/bg1.png',
        'image/1/1.png',
        'image/1/2.png',
        'image/2/1.png',
        'image/2/2.png',
        'image/2/3.png',
        'image/3/1.png',
        'image/3/2.png',
        'image/4/1.png',
        'image/4/2.png',
        'image/4/3.png',
        'image/5/1.png',
        'image/5/2.png',
        'image/5/3.png',
        'image/6/1.png',
        'image/6/2.png',
        'image/6/3.png',
        'image/7/1.png',
        'image/7/2.png',
        'image/8/1.png',
        'image/8/2.png',
        'image/8/3.png',
        'image/9/1.png',
        'image/9/2.png',
        'image/10/1.png',
        'image/10/2.png',
        'image/10/3.png',
        'image/11/1.png',
        'image/11/2.png',
        'image/12/1.png',
        'image/12/2.png',
        'image/13/1.png',
        'image/13/2.png',
        'image/14/1.png',
        'image/14/2.png',
        'image/14/3.png',
        'image/14/4.png'
    ],
    onStart: function(total) {
        console.log('start:' + total);
    },
    onProgress: function(current, total) {
        let percent = Math.floor(current / total * 100);
        $('#progress').css('width', percent * 0.4 + '%');
    },
    onComplete: function(total) {
        $('#loading').css('display', 'none');
        obj.init(); //初始化函数
    }
});

loader.start();
let obj = {
    pageHome: $("#page-home"),
    page: $("#page"),
    pageHomeBg: $("#page-home-bg"),
    pages: $(".pages"),
    dates: $(".dates"),
    init: () => {
        // obj.readyMusic();
        obj.funHome();
        obj.funPages();
        obj.funDate();
        obj.funReload();
        obj.funClose();
        obj.funShare();
    },
    // 滑动首页，出现第一页
    funHome: () => {
        obj.pageHome
            .css("display", "block")
            .addClass("current")
            .find(".page-home-bg")
            .css("opacity", 1);
        obj.pageHome.find(".page-home-date img").css("opacity", 1);
        setTimeout(() => {
            obj.page.css("display", "block").css({
                "opacity": 1
            });
        }, 1500);
        obj.pageHomeBg.on("click touchend", () => {
            obj.pageHome.addClass("leftBook");
            obj.pages
                .eq(0)
                .css("display", "block")
                .addClass("current");
            setTimeout(() => {
                obj.pageHome.removeClass("current");
            }, 1000);
        });
    },
    funPages: () => {
        obj.page.on("click touchend", ".pages", function() {
            let index = $(this).data("page");
            let length = obj.pages.length;
            if (index >= length) {
                return;
            }
            $(this)
                .find("img")
                .css("opacity", 1);
            $(this).addClass("leftBook");
            obj.pages
                .removeClass("current")
                .eq(index)
                .css("display", "block")
                .addClass("current");
        });
    },
    funDate: () => {
        $("#page-home-date").on("click touchend", ".dates", function() {
            let index = $(this).data("page");
            obj.pageHome.addClass("leftBook");
            $(".pages")
                .eq(index - 1)
                .css("display", "block")
                .addClass("current");
            setTimeout(() => {
                obj.pageHome.removeClass("current");
            }, 1000);
        });
    },
    funReload: () => {
        $('#reload').on('click', () => {
            window.location.reload();
        })
    },
    funShare: () => {
        $('#share').on('click', () => {
            $('.pop').css('display', 'block');
        })
    },
    funClose: () => {
        $('.pop').on('click', () => {
            $('.pop').css('display', 'none');
        })
    },
    readyMusic: () => {
        document.getElementById("bgm").play();
        document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
            document.getElementById("bgm").play();
        });
    }
};
(function() {
    $.ajax({
        type: "get",
        async: true,
        url: "http://partner.qianlong.com/chart/api/cshare",
        dataType: "jsonp",
        data: {
            "weburl": location.href.split("#")[0]
        },
        success: function(json) {
            wx.config({
                debug: false,
                appId: json.appId,
                timestamp: json.timestamp,
                nonceStr: json.nonceStr,
                signature: json.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });
        },
        error: function() {
            console.log("share error");
        }
    });
    wx.ready(function() {
        var obj_co = {
                title: '习近平的"两会时间"',
                link: location.href.split("#")[0],
                imgUrl: "http://comic.qianlong.com/zt/nationalTC201803/image/bg/share.jpg",
                success: function() {
                    console.log("share successfully");
                },
                cancel: function() {}
            },
            obj_co_desc = {
                desc: "感受习近平的“两会时间”快节奏。"
            },
            obj_timeline = $.extend({}, obj_co),
            obj_appmsg = $.extend({}, obj_co_desc, obj_co),
            obj_qq = $.extend({}, obj_co_desc, obj_co),
            obj_wb = $.extend({}, obj_co_desc, obj_co),
            obj_qzone = $.extend({}, obj_co_desc, obj_co);

        wx.onMenuShareTimeline(obj_timeline);
        wx.onMenuShareAppMessage(obj_appmsg);
        wx.onMenuShareQQ(obj_qq);
        wx.onMenuShareWeibo(obj_wb);
        wx.onMenuShareQZone(obj_qzone);
    });
})()