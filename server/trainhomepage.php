<?php
header('Content-Type: text/html; charset=utf-8'); 
$startP = $_GET["startCityCode"];
$endP = $_GET["endCityCode"];
$time = $_GET["dateTime"];
$url ="http://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=".$time."&leftTicketDTO.from_station=".$startP."&leftTicketDTO.to_station=".$endP."&purpose_codes=ADULT";
$contents = file_get_contents($url);
echo $contents ;
?>