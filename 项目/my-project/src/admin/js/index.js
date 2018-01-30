/*
 * @Author: yb 
 * @Date: 2018-01-29 13:59:07 
 * @Last Modified by: yb
 * @Last Modified time: 2018-01-29 15:37:30
 */


"use strict";
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (window.layui && layui.define) { //用于layui 加载
        layui.define(function(exports) { //layui加载
            exports('custom', factory(root));
        });
    } else {
        root.custom = factory(root);
    }
}(this, function() {
    var class_list = {
        active_cls: 'ybui-this',
        ybui_show: 'ybui-show',
        form_select: 'ybui-form-select',
        form_selected: 'ybui-form-selected'
    };

    var custom = {
        init: function() {
            this.bodyClick();
            this.formSelect();
            this.tab();
            this.collapse();
            this.verticalNavMenu();


        },
        bodyClick: bodyClick,
        formSelect: formSelect, //下拉菜单
        tab: tab, //选项卡
        collapse: collapse, // 折叠面板
        verticalNavMenu: verticalNavMenu, //垂直导航菜单

    };
    /**
     * 下拉菜单
     */
    function formSelect() {
        var selects = document.getElementsByClassName(class_list.form_select);
        for (var i = 0; i < selects.length; i++) {
            selects[i].onclick = function(ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var node_name = target.nodeName.toLowerCase();
                var element = target.parentNode.parentNode;
                var cls = class_list.form_selected;
                var active_cls = class_list.active_cls;
                if (node_name == 'input' || node_name == 'i') {

                    ev.stopPropagation();
                    ev.cancelBubble = true;
                    var curent_have_cla = false;
                    if ((' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1) {
                        curent_have_cla = true;
                    }
                    for (var j = 0; j < selects.length; j++) {
                        selects[j].classList.remove(cls);
                    }
                    if (!curent_have_cla) {
                        element.classList.add(cls);
                    }
                }
                if (node_name == 'li') {
                    var lis = target.parentNode.getElementsByTagName('li');
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].classList.remove(active_cls);
                    }

                    target.classList.add(active_cls);
                    element.getElementsByTagName('input')[0].value = target.innerHTML;
                    for (var j = 0; j < selects.length; j++) {
                        selects[j].classList.remove(cls);
                    }
                }
            }
        }
    }
    /**
     * tab 选项卡
     * 
     */
    function tab() {
        var cls = class_list.active_cls;
        var show = class_list.ybui_show;
        var tabs = document.getElementsByClassName('ybui-tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].onclick = function(ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var node_name = target.nodeName.toLowerCase();
                var tab_item = target.parentNode.parentNode.getElementsByClassName('ybui-tab-item');
                if (node_name == 'li') {
                    var tab_ul = target.parentNode.getElementsByTagName('li');
                    var index = [].indexOf.call(tab_ul, target);
                    for (var i = 0; i < tab_ul.length; i++) {
                        tab_ul[i].classList.remove(cls);
                    }
                    target.classList.add(cls);

                    for (let i = 0; i < tab_item.length; i++) {
                        tab_item[i].classList.remove(show);
                    }
                    tab_item[index].classList.add(show);

                }
            }
        }
    }
    /**
     * 折叠面板
     */
    function collapse() {
        var collapse = document.getElementsByClassName('ybui-collapse');
        for (var i = 0; i < collapse.length; i++) {
            collapse[i].onclick = function(ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var node_name = target.nodeName.toLowerCase();
                var tab_item = target.parentNode.parentNode.getElementsByClassName('ybui-tab-item');
                if (node_name == 'h2') {
                    var cls = class_list.ybui_show;
                    var colla_content = getNearEle(target, 0);
                    console.log(colla_content)

                    if ((' ' + colla_content.className + ' ').indexOf(' ' + cls + ' ') > -1) {
                        colla_content.classList.remove(cls);
                    } else {
                        colla_content.classList.add(cls);
                    }
                }
            }
        }

    }

    /**
     * 垂直导航菜单
     * 
     */
    function verticalNavMenu() {
        var NavMenu = document.getElementsByClassName('ybui-nav-tree');
        for (var i = 0; i < NavMenu.length; i++) {
            NavMenu[i].onclick = function(ev) {
                var ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                var node_name = target.nodeName.toLowerCase();
                if (node_name == 'a') {
                    if ((' ' + target.className + ' ').indexOf(' ' + 'nav-itemed-title' + ' ') > -1) {
                        var cls = 'ybui-nav-itemed';
                        var li = target.parentNode;
                        if ((' ' + li.className + ' ').indexOf(' ' + cls + ' ') > -1) {
                            li.classList.remove(cls);
                        } else {
                            li.classList.add(cls);
                        }
                    }
                }
            }
        }
    }

    function bodyClick() {
        var bodys = document.getElementsByTagName('body');
        bodys[0].onclick = function() {
            var selects = document.getElementsByClassName(class_list.form_select);
            for (var j = 0; j < selects.length; j++) {
                selects[j].classList.remove(class_list.form_selected);
            }
        }

    }
    /**
     * 获取相邻元素
     * @param ele 参考物元素
     * @param type 类型，上一个(1)or下一个(0)
     * @return 返回查找到的元素Dom对象，无则返回null
     */
    function getNearEle(ele, type) {
        type = type == 1 ? "previousSibling" : "nextSibling";
        var nearEle = ele[type];
        while (nearEle) {
            if (nearEle.nodeType === 1) {
                return nearEle;
            }
            nearEle = nearEle[type];
            if (!nearEle) {
                break;
            }
        }
        return null;
    }




    //暴露公共方法
    return custom;
}));

custom.init();