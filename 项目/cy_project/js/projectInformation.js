// 弹窗删除人员-提示
function method1() {
	layer.open({
		title: ['提示', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['420px', '200px'], //宽高
		btn: ['确定'],
		content: $("#layer-for-method1"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('del-person');
		},
		btn1:function(){
			alert(1)
			// 确认方法
		}
	});
}

// 弹窗-添加工程
function method2() {
	layer.open({
		title: ['添加单体', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['524px', '450px'], //宽高
		btn: ['取消','确定'],
		content: $("#layer-for-method2"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('cancel');
			$('.layui-layer-btn a:last-child').addClass('sure');
		},
		btn1:function(){
			layer.closeAll(); //疯狂模式，关闭所有层
		},
		btn2:function(){

		}
	});
}

// 弹窗-添加人员信息
function method3() {
	layer.open({
		title: ['添加人员信息', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['545px', '450px'], //宽高
		btn: ['取消','确定'],
		content: $("#layer-for-method3"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('cancel');
			$('.layui-layer-btn a:last-child').addClass('sure');
		},
		btn1:function(){
			layer.closeAll(); //疯狂模式，关闭所有层
		},
		btn2:function(){

		}
	});
}

// 弹窗-修改人员信息
function method4() {
	layer.open({
		title: ['修改人员信息', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['529px', '400px'], //宽高
		btn: ['取消','确定'],
		content: $("#layer-for-method4"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('cancel');
			$('.layui-layer-btn a:last-child').addClass('sure');
		},
		btn1:function(){
			layer.closeAll(); //疯狂模式，关闭所有层
		},
		btn2:function(){

		}
	});
}


setTimeout(function(){
	method4();
},1000)