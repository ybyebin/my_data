 // 新增人员信息
 function method1() {
   layer.open({
     title: ['旁站工序', 'font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;'],
     type: 1,
     // skin: 'layui-layer-rim', //加上边框
     area: ['512px', '190px'], //宽高
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