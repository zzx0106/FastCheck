<?php
header('Content-Type: text/html; charset=utf-8'); 
$word = $_GET["word"];
$urlstr = "http://fy.webxml.com.cn/webservices/EnglishChinese.asmx/Translator?wordKey=".$word;
$content = file_get_contents($urlstr);
echo $content;
?>