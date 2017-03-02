<?php
header('Content-Type: text/html; charset=utf-8'); 
$timeCode = $_GET["timeCode"];
$startCityCode = $_GET["startCityCode"];
$endCityCode = $_GET["endCityCode"];
$trainCode = $_GET["trainCode"];
$url ="https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no=".$trainCode."&from_station_telecode=".$startCityCode."&to_station_telecode=".$endCityCode."&depart_date=".$timeCode;
$contents = file_get_contents($url);
echo $contents ;
?>