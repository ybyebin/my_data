<?php
 date_default_timezone_set('PRC');
require_once "jssdk.php";
$jssdk = new JSSDK("wxe8d37f1c6a66383f", "279e41a2cc01b30bbb518f75e2d17bb7");

$signPackage = $jssdk->
GetSignPackage();

?>
<!DOCTYPE html>
<html style="background:background: #EFEFF4;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="UTF-8">
  <title>WIFI配网</title>
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link rel="stylesheet" type="text/css" href="css_js/weui.min.css">
  <!-- <link rel="stylesheet" type="text/css" href="css_js/regists.css"> -->
  <script type="text/javascript" src="css_js/zepto.min.js"></script>

</head>
<body style="background:#EFEFF4;">
  <div class="page" style="background: #EFEFF4;padding-top: 20px;">
    <div class="page__hd" style="padding: 0 15px;">
      <h1 class="page__title" style="text-align: center;">
        <img src="image/WI-FI.png" style="width: 100%">
      </h1>
    </div>
    <div class="page__bd page__bd_spacing" style="padding: 0 30px;">
      <a id="action" href="#" class="weui-btn weui-btn_primary">开始配置</a>
    </div>
    <script type="text/javascript" src="css_js/jweixin-1.0.0.js"></script>
  </div>
<p id="message" style="display: none;"></p>

</body>
<script type="text/javascript">
   wx.config({
    beta : true,// 开启内测接口调用，注入wx.invoke方法
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList : ['configWXDeviceWiFi','closeWindow'] // 需要使用的jsapi列表
  });

  wx.ready(function(){
      $(document).ready(function(){      
       $('#action').click(function(){
           // configWiFi(); 
            wx.checkJsApi({
            jsApiList: ['configWXDeviceWiFi'],
            success: function(res1) {
              wx.invoke('configWXDeviceWiFi', {}, function(res){             
                var err_msg = res.err_msg;
                if(err_msg == 'configWXDeviceWiFi:ok') {
                  $('.page').hide();
                  $('#message').show().html("配置 WIFI成功，<span id='second'>3</span>秒后跳转到首页。");   
                  for (var i = 0; i <=2 ; i++) {
                    (function(i) {
                      setTimeout(function() {
                        $('#second').text(i);
                        if (i === 0) {
                           wx.closeWindow();
                        }
                      }, (3-i) * 1000);
                    })(i);
                  }                 
                  
                } else {                 
                  alert('配置失败！请重试');
                }
              });
            }
          });
      
       });
  })
  });



</script>

