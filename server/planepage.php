<?php
header('Content-Type: text/html; charset=utf-8');
$pstar = $_GET["planstart"];
$pend = $_GET["planend"]; 
$data = $_GET["data"];
$urlstr = "http://ws.webxml.com.cn/webservices/DomesticAirline.asmx/getDomesticAirlinesTime?startCity=".$pstar."&lastCity=".$pend."&theDate=".$data."&userID=";
$content = file_get_contents($urlstr);
echo $content;
?>