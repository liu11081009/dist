<?php
header('content-type:text/html;charset="utf-8"');


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

// 准备sql，看数据库中是否存在该email
$sql1 = "SELECT * FROM user WHERE email='{$email}'";
//发送sql语句
$res1 = mysql_query($sql1);
//取出一行数据
$row1 = mysql_fetch_assoc($res1);
if($row1){
    echo "已有";
    exit;
};

// 5.准备sql语句
$sql = "INSERT INTO user(email,psd) VALUES('{$email}',{$psd})";

// 6.发送sql请求
$res = mysql_query($sql);

// var_dump($res);  // true;
if($res){
    echo "注册成功";
}else{
    echo "注册失败";
};

mysql_close($link);

?>