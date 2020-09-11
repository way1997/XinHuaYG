<?php
	mysql_connect("localhost","root",123456);
	mysql_select_db("yuehetong");
	mysql_query("SET NAMES UTF8");

	//页码，从GET请求获得
	$page = $_GET["page"];  //从1开始
	//每页的条目数量
	$pagesize = $_GET["pagesize"];
	//计算跳过多少条
	$skip = $pagesize * ($page - 1);
	//本次SQL语句
	$sql = "SELECT * FROM yuedu ORDER BY id  LIMIT {$skip},{$pagesize}";
	//本次所有结果
	$result = mysql_query($sql);

	//得到条目总数，所以就要发出一次SQL查询
	$sql2 = mysql_query("SELECT count(*) FROM yuedu");
	$r = mysql_fetch_array($sql2);
	$count = $r[0];

	//准备一个大数组
	$allresult = array();

	while($row = mysql_fetch_array($result)){
		array_push($allresult , $row);
	}

	echo '{"count" : ' . $count .' ,"result" : ' . json_encode($allresult) . '}';
?>