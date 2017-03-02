<?php
header('Content-Type: text/html; charset=utf-8');
$type = $_GET["type"];
$postid = $_GET["postid"]; 
$urlstr = "http://www.kuaidi100.com/query?type=".$type ."&postid=".$postid;
$content = file_get_contents($urlstr);
echo $content;
?>