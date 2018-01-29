 // 新增人员信息
 function method1() {
   layer.open({
     title: ['编辑', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
     type: 1,
     // skin: 'layui-layer-rim', //加上边框
     area: ['512px', '240px'], //宽高
     btn: ['取消', '保存'],
     content: $("#layer-for-method1"), //捕获的元素,
     success: function() {
       $('.layui-layer-btn a:first-child').addClass('cancel');
       $('.layui-layer-btn a:last-child').addClass('sure');
     },
     btn1: function() {
       layer.closeAll(); //疯狂模式，关闭所有层
     },
     btn2: function() {

     }
   });
 }

 setTimeout(function() {
   method1()
 }, 1000)


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
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);

});