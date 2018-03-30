/**
 * 公共头部 v1
 *
 * @依赖文件：
 *
 *  http://login-user.kugou.com/v1/kguser.js
 *  http://gstatic.kugou.com/js/public/KGG/Login/base.js
 *  http://gstatic.kugou.com/js/public/KGG/Register/base.js
 *  http://gstatic.kugou.com/js/public/KGG/LoginAndRegisterPop/v1/base.js
 *
 *  http://gstatic.kugou.com/js/public/KGG/Header/v1/res/base.debug.css
 *  http://gstatic.kugou.com/js/public/KGG/Header/v1/res/tmpl.js
 *  http://gstatic.kugou.com/js/public/KGG/Header/v1/res/base.debug.js
 *
 * @结构说明：
 *
 *  KGG.Header
 *      |
 *      |- @property {string} version       : [] 版本
 *      |- @property {function} login       : [ () ] 打开登录弹窗
 *      |- @property {function} register    : [ () ] 打开注册弹窗
 *      |- @property {function} update      : [ () ] 更新公共头部状态（给业务层使用，通过其他方式登录成功后
 *      |                                            调用该方法）
 *      `- @property {function} mkHotGames  : [ (arr) ] 热门搜索链接节点列表生成
 *                                              |
 *                                              `- @param {array} arr : [ [] ] 热门搜索链接节点列表
 *                                                  |
 *                                                  `- @each {object} arr[n] : 数据对象
 *                                                      |
 *                                                      |- @node {string} url  : [] 地址
 *                                                      `- @node {string} name : [] 游戏名
 */

var KGG = KGG || {};

KGG.Header = (function() {

   "use strict";

   var func_init,
      func_login,
      func_register,
      func_successCB;

   /**
     * 打开登录框
     */
   func_login = function() {

      KGG.LoginAndRegisterPop.show({type: "log"});
   };

   /**
     * 打开注册框
     */
   func_register = function() {

      KGG.LoginAndRegisterPop.show({type: "reg"});
   };

   /**
     * 初始化
     */
   func_init = function() {

      /**
         * 共用变量
         */

      var node_doc = document,
         node_body = node_doc.body,
         node_html = node_doc.documentElement,
         data_isIE6 = /msie\s6/i.test(navigator.userAgent);

      /**
         * 封装共有事件
         */

      // 事件绑定函数
      function func_bind(node, type, func) {

         if (typeof addEventListener !== "undefined") {

            node.addEventListener(type, func, false);

         } else if (typeof attachEvent !== "undefined") {

            node.attachEvent("on" + type, func);

         } else {

            node["on" + type] = func;
         }
      };

      // 通过 id 获取元素
      function func_eleById(id) {

         return node_doc.getElementById(id);
      };

      // 通过 name 获取元素
      function func_eleByName(name, root) {

         var root = root || node_html,
            list = root.getElementsByTagName("*"),
            i = 0,
            len = list.length;

         for (; i < len; i++) {

            if (list[i].name === name) {

               return list[i];
            }
         }

         return {};
      };

      // 是否拥有 class
      function func_hasClass(tar, cls) {

         var _re = new RegExp("(^|\\s)" + cls + "(\\s|$)");

         return _re.test(tar.className);
      };

      // 通过 class 获取元素，返回列表
      // @need {function} func_hasClass
      function func_elesByClass(cls, root) {

         var root = root || node_html,
            list = root.getElementsByTagName("*"),
            i = 0,
            len = list.length,
            nodes = [],
            fn_cls = func_hasClass;

         for (; i < len; i++) {

            fn_cls(list[i], cls) && nodes.push(list[i]);
         }

         return nodes;
      };

      // 添加 class
      // @need {function} func_hasClass
      function func_addClass(tar, cls) {

         if (!func_hasClass(tar, cls)) {

            tar.className += (" " + cls);
            tar.className = tar.className.replace(/^\s+/, '').replace(/\s+$/, '');
         }
      };

      // 清除 class
      // @need {function} func_hasClass
      function func_removeClass(tar, cls) {

         if (func_hasClass(tar, cls)) {

            tar.className = tar.className.replace(cls, '').replace(/^\s+/, '').replace(/\s+$/, '');
         }
      };

      // 设置/获取元素指定样式
      var func_style = (function() {

         if (window.getComputedStyle) {

            return function(ele, key, value) {

               if (value === undefined) {

                  return window.getComputedStyle(ele, null)[key];

               } else {

                  ele.style[key] = value;
               }
            }

         } else {

            return function(ele, key, value) {

               if (value === undefined) {

                  return ele.currentStyle[key];

               } else {

                  ele.style[key] = value;
               }
            }
         }
      })();

      // 动画函数
      function func_animate(obj, clsname, iTarget, aniType, fn) {

         clearInterval(obj.timer);

         obj.timer = setInterval(function() {

            var curVal = parseInt(func_style(obj, clsname)),
               speed = (aniType === 'liner')
                  ? iTarget / 100
                  : (iTarget - curVal) / 10;

            speed = speed > 0
               ? Math.ceil(speed)
               : Math.floor(speed);

            if (curVal === iTarget) {

               clearInterval(obj.timer);

               typeof fn === 'function'
                  ? fn()
                  : null;

            } else {

               obj.style[clsname] = curVal + speed + 'px';
            }

         }, 17); // 1000 微秒 ÷ 每秒 60 帧 ≈ 16.6666 微秒/帧
      };

      /**
         * scroll -> 头部变高、变矮
         */

      var node_tar_scroll = /chrome/i.test(navigator.userAgent)
            ? node_body
            : node_html,
         node_header = func_eleById("kw_header"),
         node_ani_tar = func_eleById("nav");
      console.log(node_ani_tar);
      var data_raw_h = typeof window.getComputedStyle !== "undefined"
            ? window.getComputedStyle(node_ani_tar, false)["height"]
            : node_ani_tar.currentStyle["height"],
         data_raw_h = parseInt(data_raw_h),
         data_checkid = null,
         data_checkDelay = 50;

      // 变得更矮
      function func_shorter() {

         data_isIE6
            ? (node_ani_tar.style.height = "70px")
            : func_animate(node_ani_tar, "height", 70);
      };

      // 变回原高度
      function func_higher() {

         data_isIE6
            ? (node_ani_tar.style.height = data_raw_h + "px")
            : func_animate(node_ani_tar, "height", data_raw_h);
      };

      // 根据外框 scrollTop 值，变高或变矮
      // @need {function} func_shorter
      // @need {function} func_higher
      function func_short_or_high() {

         node_tar_scroll.scrollTop > 10
            ? func_shorter()
            : func_higher();
      };

      // 检测高度
      // @need {function} func_shorter
      function func_check_top() {

         clearTimeout(data_checkid);

         data_checkid = setTimeout(func_short_or_high, data_checkDelay);
      };

      func_bind(window, "scroll", func_check_top);

      /**
         * 搜索框
         */

      var node_form = func_eleById("khv1_form"),
         node_form_kw = func_eleByName("kw", node_form),
         node_kw_input = func_eleById("khv1_input"),
         node_kw_inputPh = func_elesByClass("khv1_input_placeholder", node_header)[0],
         node_submit = func_eleById("khv1_submit");

      // 文本框-刷新时清除文本框的值（非IE，IE的促发时机不同）
      node_kw_input.value = "";

      // 文本框-聚焦动作，控制提示字段区域消失
      func_bind(node_kw_inputPh, "click", function(event) {

         node_kw_input.focus();
      });

      // 文本框-聚焦动作，控制提示字段区域消失
      func_bind(node_kw_input, "focus", function(event) {

         node_kw_inputPh.style.visibility = "hidden";
      });

      // 文本框-失焦动作，控制提示字段区域显示
      func_bind(node_kw_input, "blur", function(event) {

         // 失焦且文本框的值为空
         !node_kw_input.value && (node_kw_inputPh.style.visibility = "visible");
      });

      // 文本框-按下 enter 提交数据
      func_bind(node_kw_input, "keyup", function(event) {

         if (event.keyCode === 13) {

            var kw = node_kw_input.value,
               kw = /\(.*\)/.test(kw)
                  ? ""
                  : encodeURIComponent(kw);

            node_form_kw.value = kw;
            node_form.submit();
         }
      });

      // 提交按钮-点击提交数据
      func_bind(node_submit, "click", function(event) {

         var kw = node_kw_input.value,
            kw = /\(.*\)/.test(kw)
               ? ""
               : encodeURIComponent(kw);

         node_form_kw.value = kw;
         node_form.submit();
      });

      /**
         * 用户信息
         */

      // 登录或注册成功-用户名填充到对应位置，并且把按钮部分隐藏，用户信息部分显示
      function func_login_or_register_success(userinfo) {

         /*func_eleById("khv1_ele_name").innerHTML = userinfo.username || userinfo.nickname;

            func_addClass(func_eleById("khv1_part_logReg"), "khv1_hide");

            func_removeClass(func_eleById("khv1_part_user"), "khv1_hide");*/
      };

      func_successCB = func_login_or_register_success;

      KGG.Login.success(func_login_or_register_success).init(function(data) {

         // 已登录
         data.userinfo && func_login_or_register_success(data.userinfo);
      });

      KGG.Register.success(func_login_or_register_success).init(function(data) {

         // 已登录
         data.userinfo && func_login_or_register_success(data.userinfo);
      });

      /**
         * 子项鼠标滑过状态
         */

      (function() {

         var list = func_elesByClass("khv1_dirBox_item", node_header),
            i = 0,
            len = list.length;

         for (; i < len; i++) {

            func_bind(list[i], "mouseenter", function(event) {

               var tar = event.srcElement || event.target;

               func_addClass(tar, "khv1_dirBox_item_hor");
            });

            func_bind(list[i], "mouseleave", function(event) {

               var tar = event.srcElement || event.target;

               func_removeClass(tar, "khv1_dirBox_item_hor");
            });
         }
      })();

      /**
         * 当前状态
         */

      // 1、如果页面有 KGG_Header_v1_config 对象，且 curNavIndex 节点为数字，获取其值
      // 2、如果 script 标签带 data-kgg-header-v1-cur 属性，获取其值
      // ...
      // 以上由上往下做判断，拿取定位索引，如果都没有，则用默认值 0
      (function() {

         var curIndex = 0;

         if (typeof KGG_Header_v1_config !== "undefined") {

            !isNaN(KGG_Header_v1_config.curNavIndex) && (curIndex = KGG_Header_v1_config.curNavIndex);

         } else {

            (function() {

               var list = node_doc.getElementsByTagName("script"),
                  i = 0,
                  len = list.length;

               for (; i < len; i++) {

                  if (list[i].getAttribute("data-kgg-header-v1-cur")) {

                     curIndex = +list[i].getAttribute("data-kgg-header-v1-cur");
                  }
               }

            })();
         }

         var node_items = func_elesByClass("khv1_dirBox_item", node_header);

         // 元素存在才调用
         node_items[curIndex] && func_addClass(node_items[curIndex], "khv1_dirBox_item_cur");

      })();

      /**
         * 绑定
         *
         * @need {module} KggLogAndRegPop
         */

      /*func_bind(func_eleById("khv1_ctrl_log"), "click", func_login); // 登录按钮
        func_bind(func_eleById("khv1_ctrl_reg"), "click", func_register); // 注册按钮
        func_bind(func_eleById("khv1_ctrl_logout"), "click", KGG.Login.loginout); // 登出按钮*/
   };

   /**
     * 调用-初始化
     */
   func_init();

   /**
     * 对外
     */
   return {

      version: "1.0.1",

      login: func_login,

      register: func_register,

      update: function() {

         KGG.Login.init(function(data) {

            data.userinfo && func_successCB(data.userinfo); // 已登录
         });
      }

      /* mkHotGames  : function(arr) {

                            var
                                dataList    = arr instanceof Array ? arr : [],
                                i           = 0,
                                len         = dataList.length,
                                nodes       = [],
                                cls;

                            for (; i < len; i++) {

                                cls = i === 0 ? "khv1_hot_item_1st" : "khv1_hot_item";

                                nodes.push('<a href="' + dataList[i].url + '" class="' + cls + '" target="_blank" title="' + dataList[i].name + '">' + dataList[i].name + '</a>');
                            }

                            document.getElementById('kgg_header_v1_list').outerHTML = nodes.join('');
                        }*/
   };

})();

/**
 * 热门搜索链接节点列表生成
 */
/*KGG.Header.mkHotGames([
        {
            "url"   : "http://hqg.kugou.com/",
            "name"  : "花千骨"
        },
        {
            "url"   : "http://cqby.kugou.com/",
            "name"  : "传奇霸业"
        },
        {
            "url"   : "http://dtszj.kugou.com/",
            "name"  : "大天使之剑"
        },
        {
            "url"   : "http://clx.kugou.com/",
            "name"  : "楚留香新传"
        }
    ]);*/
