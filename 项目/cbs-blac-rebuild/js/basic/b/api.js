var apiurl = "/api/";
// var wsSocket = "ws://192.168.2.4:1234";

/**
 * [公共方法-获取工程信息]
 * @return {[type]} [description]
 */
function projectInfo() {
	$.ajax({
		url: apiurl + 'project',
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.success) {
				var data = data.data;
				$('#logo').attr('src', data.logo_path).data('proid', data.id);
				// $('#logo');
				$('#logo-name').text(data.name);
				$('#navbar-brandImg').attr('src', data.logo_path).data('proid', data.id);
				$('.projectName').text(data.name);
				$('#navbar-brandImg');
				
			} else {
				layer.msg(data.error_message);
			}
		},
		error: function(data) {
			layer.msg(data.error_message);
			returnLogIn(data);
		}
	});
}

/**
 * [判断字符串是否合法 -提示]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatch(thiss, warnspans, instructions) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
	if (thiss.val() != '' && thiss != null) {
		if (pattern.test(thiss.val())) {
			instructions.hide();
			warnspans.show().text('输入不合法');
			return false;
		}
	}
}

/**
 * [判断字符串是否合法 -不提示]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatchTwo(thiss, warnspans) {
	var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
	if (thiss.val() != '' && thiss != null) {
		if (pattern.test(thiss.val())) {
			warnspans.text('输入不合法');
			return false;
		}
	}
}



// 判断字符长度    汉字算2个字符
function chEnWordCount(str) {
	var count = str.replace(/[^\x00-\xff]/g, "**").length;
	return count;
}


function icheckInte() {
	$('input').iCheck('destroy');
	$(".ckss").iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
		increaseArea: '20%'
	});
}

//服务器当前日期
function ServerCurrentTime(type) {
	var time = new Date().format("MM月dd日 hh:mm:ss")
	$("#CurrentTime a").text(time);
	var timer = setTimeout("ServerCurrentTime()", 1000);
}


/**
 * [时间格式化函数]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 * new Date().format("yyyy-MM-dd hh:mm:ss")
 */
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
};
/**
 * [解析url地址]
 * @param {[type]} value [description]
 */
function GetRequest(value) {
	var urls = location.search;
	var object = {};
	if (urls.indexOf("?") != -1) {
		var str = urls.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {　　　　　　　　
			object[strs[i].split("=")[0]] = strs[i].split("=")[1]　　　　
		}　　
	}
	return object;
}

// 修改密码
$('.user-changePassword').on('click', function() {
	layer.open({
		title: ['修改密码', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '330px'], //宽高
		content: $("#changePassword-layer"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {
			$('.old-pas').val('');
			$('.new-pas').val('');
			$('.renew-pas').val('');
		},
		yes: function(indexs) {
			var num = 3;
			$('#changePassword-layer input').each(function(index, element) {
				if ($(element).val() == "") {
					num = index;
					return false;
				}
			})
			switch (num) {
				case 0:
					layer.msg("原密码不能为空");
					break;
				case 1:
					layer.msg("新密码不能为空");
					break;
				case 2:
					layer.msg("确认密码不能为空");
					break;
				case 3:

					var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\\]/g);
					var length_enough = true;
					var str_format = true;
					
					if (length_enough) {
						$('.pas').each(function(index, ele) {
							if (pattern.test($(ele).val())) {
								$(ele).val('');
								layer.msg('密码格式错误(可以是数字、字母及组合)');
								str_format = false;
								return false;
							}
						});
						if (str_format) {

							if ($('.new-pas').val() === $('.renew-pas').val()) {
								layer.msg('可以提交');

								$.ajax({
									url: apiurl + 'usermanage/1',
									type: 'PUT',
									dataType: 'json',
									data: {
										old_password: $('.old-pas').val(),
										new_password: $('.new-pas').val(),
									},
									beforeSend: function() {
										$(".loading").show();
									},
									complete: function() {
										$(".loading").hide();
									},
									success: function(data) {
										$(".loading").hide();
										if (data.success) {
											layer.msg("密码修改成功");
											layer.close(indexs);
										} else {
											layer.msg(data.error_message);
										}
									},
									error: function(data) {
										$(".loading").hide();
										layer.msg(data.error_message);
										returnLogIn(data);
									}

								});
							} else {
								layer.msg('新密码与重复密码不一致')
							}
						}
					}
					break;
			}
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});
//退出登录
$('.user-logout').on('click', function() {
	var loadings = $('.loading');
	layer.open({
		title: ['退出登录', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
		type: 1,
		skin: 'layui-primary', //加上边框
		area: ['600px', '200px'], //宽高
		content: $("#logout"), //捕获的元素,
		shift: 2,
		move: false,
		btn: ['确定', '放弃'],
		success: function() {},
		yes: function(index) {
			$.ajax({
				url: apiurl + 'login',
				type: 'DELETE',
				beforeSend: function() {
					loadings.show();
				},
				complete: function() {
					loadings.hide();
				},
				success: function(data) {
					loadings.hide();
					if (data.success) {
						window.location.href = "login.html";
					} else {
						layer.msg(data.error_message);
					}
				},
				error: function(data) {
					loadings.hide();
					layer.msg(data.error_message);
					returnLogIn(data);
				}
			})
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

// 用户登录超时 返回登录页面
function returnLogIn(data) {
	if (Number(data.status) === 401) {
		window.location.href = 'login.html';
	}
}

function publicAjaxError(data) {
	$('.loading').hide();
	layer.msg(data.error_message);
	if (Number(data.status) === 401) {
		window.location.href = 'login.html';
	}
}


/**
 * [报警数量-指示点]
 * @return {[type]} [description]
 */
function update_alarm_label() {
	var warn_content = $('#header_alarm_count');
	var head_warnImg = $('.head-warn img');
	$.ajax({
		url: apiurl + 'alarmvalue/1',
		type: 'GET',
		success: function(data) {
			var num = Number(data.data)
			if (num > 0) {
				warn_content.css('display', 'inline-block');
				head_warnImg.attr('src', 'images/baojing.gif');
				if (num < 99) {
					warn_content.text(num);
				} else {
					warn_content.text('99+');
				}
			} else {
				warn_content.hide();
				head_warnImg.attr('src', 'images/warn.png');
			}
		},
		error: function(data) {

		}
	});

}

/**
 * [头部获取数据]
 * @return {[type]} [description]
 */
function publicHeadfun() {
	projectInfo();
	ServerCurrentTime();
	update_alarm_label();
	setInterval(update_alarm_label, 5000);
}


// 分页
(function($){
  var ms = {
    init:function(obj,args){
      return (function(){       
        ms.fillHtml(obj,args);
        ms.bindEvent(obj,args);
      })();
    },
    //填充html
    fillHtml:function(obj,args){
      return (function(){

        obj.empty();
        if (args.pageCount === 0) {
          return false;
        }
        //上一页
        if(args.current > 1){
          obj.append('<a href="javascript:;" class="prevPage"></a>');
        }else{
          obj.remove('.prevPage');
          obj.append('<span class="disabled disabled-prve"></span>');
        }
        //中间页码
        if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
          obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
        }
        if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
          obj.append('<a class="page-omit"><span>...</span></a>');
        }
        var start = args.current -2,end = args.current+2;
        if((start > 1 && args.current < 4)||args.current == 1){
          end++;
        }
        if(args.current > args.pageCount-4 && args.current >= args.pageCount){
          start--;
        }
        for (;start <= end; start++) {
          if(start <= args.pageCount && start >= 1){
            if(start != args.current){
              obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
            }else{
              obj.append('<span class="current">'+ start +'</span>');
            }
          }
        }
        if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
          obj.append('<a class="page-omit"><span>...</span></a>');
        }
        if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
          obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
        }
        //下一页
        if(args.current < args.pageCount){
          obj.append('<a href="javascript:;" class="nextPage"></a>');
        }else{
          obj.remove('.nextPage');
          obj.append('<span class="disabled disabled-next"></span>');
        }
      })();
    },
    //绑定事件
    bindEvent:function(obj,args){
      return (function(){
        obj.off("click","a.tcdNumber");
        obj.off("click","a.prevPage");
        obj.off("click","a.nextPage");
        if (args.pageCount === 0) {
          return false;
        }
        obj.on("click","a.tcdNumber",function(){
          var current = parseInt($(this).text());
          ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
          if(typeof(args.backFn)=="function"){
            args.backFn(current);
          }
        });
        //上一页
        obj.on("click","a.prevPage",function(){
          var current = parseInt(obj.children("span.current").text());
          ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
          if(typeof(args.backFn)=="function"){
            args.backFn(current-1);
          }
        });
        //下一页
        obj.on("click","a.nextPage",function(){
          var current = parseInt(obj.children("span.current").text());
          ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
          if(typeof(args.backFn)=="function"){
            args.backFn(current+1);
          }
        });

      })();
    }
  }
  $.fn.createPage = function(options){
    var args = $.extend({
      pageCount : 10,
      current : 1,
      backFn : function(){}
    },options);
    ms.init(this,args);
  }
})(jQuery);


// 计算json对象的长度
function CalculationJsonLength(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
	if (isjson) {
		var num = 0;
		for(var key in obj){
			num+=1;
		}
		return num;
	}else{
		return false;
	}
}