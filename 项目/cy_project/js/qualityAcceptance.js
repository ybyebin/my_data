// 弹窗1
function method1() {
	layer.open({
		title: ['提示', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['420px', '200px'], //宽高
		content: $("#layer-for-method1"), //捕获的元素,
	});
}
// 弹窗2
function method2() {
	layer.open({
		title: ['提示', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['420px', '200px'], //宽高
		btn: ['确定'],
		content: $("#layer-for-method2"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('tishi')
		}
	});
}
// 发起流程
function method3() {
	layer.open({
		title: ['发起流程', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['478px', '400px'], //宽高
		btn: ['取消', '确定'],
		content: $("#layer-for-method3"), //捕获的元素,
		success: function() {
			$('.layui-layer-btn a:first-child').addClass('cancel');
			$('.layui-layer-btn a:last-child').addClass('tishi');
		},
		btn1: function() {
			layer.closeAll(); //疯狂模式，关闭所有层
		},
		btn2: function() {

		}
	});
}

function method4(){
	layer.open({
		title: ['2017-08-22 13：53：17至2017-08-22 13：53：17梁柱节点钢筋隐蔽过程', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['612px', '500px'], //宽高
		content: $("#layer-for-method4"), //捕获的元素,
	});
}