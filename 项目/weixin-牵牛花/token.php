<?php
/**
  * wechat php test
  */
//define your token
error_reporting(E_ALL^E_NOTICE);
date_default_timezone_set("PRC");
define("TOKEN", "zhongshiguanglian");
$wechatObj = new wechatCallbackapiTest();
$wechatObj->valid();
class wechatCallbackapiTest
{
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        //valid signature , option
        if($this->checkSignature()){
            echo $echoStr;
            exit;
        }
    }
    public function responseMsg()
    {
        //get post data, May be due to the different environments
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        //extract post data
        if (!empty($postStr)){
                
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $fromUsername = $postObj->FromUserName;
            $toUsername = $postObj->ToUserName;
            $keyword = trim($postObj->Content);
            $time = time();
            $textTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        <FuncFlag>0</FuncFlag>
                        </xml>";             
            if(!empty( $keyword )){
                $msgType = "text";
                $contentStr = "Welcome to wechat world!";
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                echo $resultStr;
            }else{
                echo "Input something...";
            }
        }else {
            echo "";
            exit;
        }
    }
    
    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
       
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );
        if( $tmpStr == $signature ){
            return true;
        }else{
            return false;
        }
    }
}


function http_post($url, $data){
  $ch = curl_init();
  $header = "Accept-Charset: utf-8";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpInfo = curl_exec($ch);
  $errorno=curl_errno($ch);
  return $tmpInfo;
}





//接入时验证接口
$echostr = $_GET ['echostr'];
if($echostr) {
    echo $echostr;
    exit(0);
}
 
//获取POST数据
function getPostData() {
    $data = $GLOBALS['HTTP_RAW_POST_DATA'];
    return        $data;
}
$PostData = getPostData();
 
//验错
if(!$PostData){
    echo_server_log("wrong input! PostData is NULL");
    echo "wrong input!";
    exit(0);
}
 
//装入XML
$xmlObj = simplexml_load_string($PostData, 'SimpleXMLElement', LIBXML_NOCDATA);
 
//验错
if(!$xmlObj) {
    echo_server_log("wrong input! xmlObj is NULL\n");
    echo "wrong input!";
    exit(0);
}
 
//准备XML
$fromUserName = $xmlObj->FromUserName;//发送方(微信用户)
$toUserName = $xmlObj->ToUserName; //接收方(公众号)
$msgType = $xmlObj->MsgType;//消息类型
 
 
// if($msgType == 'voice') {//判断是否为语音
//     $content = $xmlObj->Recognition;
// }elseif($msgType == 'device_event'){
//     $content = $xmlObj->Event;
// }else{
//     $retMsg = '只支持文本和语音消息';
// }
// 
if ($msgType == 'device_event') {
    $content = $xmlObj->Event;
}
 
if ($content=='bind') {
   $data['device_event'] =  $xmlObj->Event;
   $data['DeviceID'] = $xmlObj->DeviceID;
   $data['OpenID'] = $xmlObj->OpenID;
   // 
    // $url = "http://back.ctcgsw.com/index.php?s=Home/Listenrate/submit";
    // $res = http_post($url,$data);

   
}

?>