<?php
header('content-type:text/html;charset="utf-8"');

// 返回统一格式
$responseData = array("code" => 0,"message" => "");

$email = $_POST['email'];
$psd = $_POST['psd'];

// 1.连接数据库
$link = mysql_connect("127.0.0.1","root","123456");

// 2.判断数据库是否链接成功
if(!$link){
    echo "服务器忙，请稍后再试";
    exit;
}

// 3.设置访问字符集
mysql_set_charset("utf8");

// 4.选择要访问的数据库
mysql_select_db("tianmaouser");

// 5.准备sql语句
$sql = "select email,psd from user where email ='{$email}' and psd = '${psd}'";

// 6.发送sql请求
$res = mysql_query($sql);

// 7.取出数据
$row = mysql_fetch_assoc($res);
if(!$row){
    $responseData['code'] = 5;
	$responseData['message'] = "用户名或密码错误";
//	echo json_encode($responseData);
    echo "错误";
	exit;
}else {
    //用户名和密码验证成功，可以直接登录
    $responseData['code'] = 4;
    $responseData['message'] = "请直接登录";
//    echo json_encode($responseData);
    echo "登录成功";
    exit;
}

mysql_close($link);

?>