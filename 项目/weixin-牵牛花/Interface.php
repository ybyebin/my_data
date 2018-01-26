<?php
// header('Content-Type:text/json;charset=utf-8');
// 
$types = $_POST['type'];
switch ($types) {
    # 站长登录
    case 'zzlogin':
        $data['user_name'] = $_POST['username'];
        $data['phone_mm'] = $_POST['password'];
        $url = "http://back.ctcgsw.com/index.php?s=/Home/Listenrate/login";
        $res = http_post($url,$data);
        echo $res;
      break;
    # 调查仪类型查询 
    case 'InstrumentType':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Station/type_query';
        $backweb = return_web(http_post($url,$data));
        echo $backweb;
        break;
    # 调查仪编号查询
    case 'InstrumentNumber':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $data['type_id'] = $_POST['type_id'];
        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Station/unadded_station_bh';
        $backweb = return_web(http_post($url,$data));
        echo $backweb;
        break;
    # 站长信息查询
    case 'zzmessage':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Station/station_admin_info';
        $backweb = return_web(http_post($url,$data));
        echo $backweb;
      break;
    # 样本户编号查询
    case 'sampleNum':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Sample/sample_user_id';
        $backweb = return_web(http_post($url,$data));
        echo $backweb;
      break;
    # 上传样本户信息
    case 'upsample':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $data['dcy_bh'] = $_POST['dcy_bh'];
        $data['dcy_lx'] = $_POST['dcy_lx'];
        $data['sample_number'] = $_POST['sample_number'];
        $data['name'] = $_POST['name'];
        $data['job'] = $_POST['job'];
        $data['age'] = $_POST['age'];
        $data['income'] = $_POST['income'];
        $data['gender'] = $_POST['gender'];

        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Sample/sample_user_added_update';
        $res = http_post($url,$data);
        echo $res;
      break;
    # 搜索样本户
    case 'searchsample':
        $data['station_admin_id'] = $_POST['station_admin_id'];
        $data['dcy_bh'] = $_POST['dcy_bh'];//SN51478896
        $url = 'http://back.ctcgsw.com/index.php?s=/Home/Sample/sample_user_info';
        $backweb = return_web(http_post($url,$data));
        echo $backweb;
       
      break;
    default:
      break;
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

function http_post_no_body($url){
   $ch = curl_init();
  $header = "Accept-Charset: utf-8";
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
  // curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpInfo = curl_exec($ch);
  $errorno=curl_errno($ch);
  return $tmpInfo;
}

function return_web($res){
     $retu = json_decode($res, true)['status'];
     $arrtrue = array('success' =>
        true, 'data' =>json_decode($res, true)['data'] );
        $arrfalse = array('success' => false, 'data' => json_decode($res, true)['data']);

        if ($retu == '1') {
          return  json_encode($arrtrue);
        }else{
          return json_encode($arrfalse);
        }
}