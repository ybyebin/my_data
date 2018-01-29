
// 弹窗-查看变更
function method1() {
layer.open({
		title: ['查看变更', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['636px', '500px'], //宽高
		btn: ['取消','确定'],
		content: $("#layer-for-method1"), //捕获的元素,
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


// 弹窗-查看图纸
function method2() {
layer.open({
		title: ['查看图纸', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['636px', '500px'], //宽高
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


// 弹窗-上传变更
function method3() {
layer.open({
		title: ['上传变更', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['636px', '500px'], //宽高
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
setTimeout(function(){
	method3()
},1000)
