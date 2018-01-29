// 弹窗-新建表格
function method1() {
  layer.open({
		title: ['新建表格', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['465px', '270px'], //宽高
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
// 弹窗-提示
function method2() {
  layer.open({
		title: ['提示', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['365px', '200px'], //宽高
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

// 弹窗-配置模板
function method3() {
  layer.open({
		title: ['配置模板', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['465px', '300px'], //宽高
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

// 编辑流程弹框
function method4() {
  layer.open({
		title: ['编辑流程', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
		type: 1,
		// skin: 'layui-layer-rim', //加上边框
		area: ['670px', '440px'], //宽高
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
	method4()
},1000)



var setting = {
  check: {
    enable: true,
    chkboxType: {
      "Y": "",
      "N": ""
    }
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  view: {
    showIcon: true //图标
  }

};

var zNodes = [{
  id: 1,
  pId: 0,
  name: "随意勾选 1",
  open: false
}, {
  id: 11,
  pId: 1,
  name: "随意勾选 1-1",
  open: true
}, {
  id: 111,
  pId: 11,
  name: "随意勾选 1-1-1"
}, {
  id: 112,
  pId: 11,
  name: "随意勾选 1-1-2"
}, {
  id: 12,
  pId: 1,
  name: "随意勾选 1-2",
  open: true
}, {
  id: 121,
  pId: 12,
  name: "随意勾选 1-2-1"
}, {
  id: 122,
  pId: 12,
  name: "随意勾选 1-2-2"
}, {
  id: 2,
  pId: 0,
  name: "随意勾选 2",
  checked: true,
  open: true
}, {
  id: 21,
  pId: 2,
  name: "随意勾选 2-1"
}, {
  id: 22,
  pId: 2,
  name: "随意勾选 2-2",
  open: true
}, {
  id: 221,
  pId: 22,
  name: "随意勾选 2-2-1",
  checked: true
}, {
  id: 222,
  pId: 22,
  name: "随意勾选 2-2-2"
}, {
  id: 23,
  pId: 2,
  name: "随意勾选 2-3"
}];

$(document).ready(function() {
  // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
  treeInit('tree1-ul');
});
// 初始化树
function treeInit(id){
   $.fn.zTree.init($("#"+id), setting, zNodes);
}

// 获取被选中的check
function count(id) {
  var zTree = $.fn.zTree.getZTreeObj(id),
    checkCount = zTree.getCheckedNodes(true);

  var classpurview = "";
  for (var i = 0; i < checkCount.length; i++) {
    classpurview += "," + checkCount[i].id
  }
  alert(classpurview);
}
function showHideTree(id){
  $('#'+id).toggle();
}


// 删除的按钮事件
var checkbox_index = true;
$('body').on('click','.check_del',function () {
  if (checkbox_index) {
    $('.my-template-ul .layui-form-checkbox[lay-skin=primary]  i').css('visibility','visible');
    checkbox_index = false;
  }else {
    $('.my-template-ul .layui-form-checkbox[lay-skin=primary]  i').css('visibility','hidden');
    checkbox_index = true;
  }
})
