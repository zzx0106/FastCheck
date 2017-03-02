<?php
header('Content-Type: text/html; charset=utf-8'); 
$city = $_GET["city"];
$urlstr = "http://api.map.baidu.com/telematics/v3/weather?location=".$city."&output=JSON&ak=FK9mkfdQsloEngodbFl4FeY3";
$content = file_get_contents($urlstr);
echo $content;

?>
