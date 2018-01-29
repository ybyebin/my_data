function method1() {
	layer.open({
		title: ['新建表格', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['485px', '300px'], //宽高
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
// setTimeout(function () {
//     method1();
// },100)

// 点击事件
$(function () {
	var a_btn_tbsm = $('.a-btn-tbsm'),
		a_btn_tbfl = $('.a-btn-tbfl'),
		tbsm_box   = $('.tbsm-box'),
		tbfl_box   = $('.tbfl-box'),
		my_temlate_div = $('.my-temlate-div'),
		close_icon_tbfl = $('.close-icon-tbfl'),
		bgtz_div = $('.bgtz-div'),
		close_icon_tbsm = $('.close-icon-tbsm');
	// 填报说明按钮
	a_btn_tbsm.on('click',function () {
		bgtz_div.removeClass('layui-col-md12 layui-col-lg12').addClass('layui-col-md6 layui-col-lg6');
		tbsm_box.css('display','block');
		tbfl_box.css('display','none');
	});
	// 填表说明的关闭按钮
	close_icon_tbsm.on('click',function () {
		tbsm_box.css('display','none');
		bgtz_div.removeClass('layui-col-md6 layui-col-lg6').addClass('layui-col-md12 layui-col-lg12');
	});
	// 填表范例
	a_btn_tbfl.on('click',function () {
		console.log(1)
		bgtz_div.removeClass('layui-col-md12 layui-col-lg12').addClass('layui-col-md6 layui-col-lg6');
		tbfl_box.css('display','block');
		tbsm_box.css('display','none');
	});
	// 填表说明的关闭按钮
	close_icon_tbfl.on('click',function () {
		tbfl_box.css('display','none');
		bgtz_div.removeClass('layui-col-md6 layui-col-lg6').addClass('layui-col-md12 layui-col-lg12');
	});
})



