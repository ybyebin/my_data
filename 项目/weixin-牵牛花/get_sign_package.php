<?php
    date_default_timezone_set('PRC');
    require_once "jssdk.php";
    //$jssdk = new JSSDK("yourAppID", "yourAppSecret");
    $jssdk = new JSSDK("wxe8d37f1c6a66383f", "279e41a2cc01b30bbb518f75e2d17bb7");
    //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1e9a89abda38241c&secret=16ac592f16cf007cece9eaea53177d24
    $signPackage = $jssdk->GetSignPackage();
    echo json_decode($signPackage);
?>