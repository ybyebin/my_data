/*
 * @Author: yb 
 * @Date: 2018-01-24 10:16:04 
 * @Last Modified by: yb
 * @Last Modified time: 2018-03-06 14:02:50
 * IE 9
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else if (window.layui && layui.define) { //用于layui 加载
        layui.define(function(exports) { //layui加载
            exports('ybTool', factory(root));
        });
    } else {
        //浏览器全局变量(root 即 window)
        root.ybTool = factory(root);
    }
}(this, function() {
    "use strict";
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
        }
        //暴露公共方法
    return new Ybtool();
}));