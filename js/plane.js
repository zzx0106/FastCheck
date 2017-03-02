var plane = function() {
	//		获取车次列表
	var mPlanebgn = $("#plane-begin");
	var mPlaneend = $("#plane-end");
	var mPlanedate = $("#plane-date");
	var mPlanesubmit = $("#plane-submit");
	var mPlanelist  = $("#planelist");
	
	var getTrainList = function() {
		var startCity = mPlanebgn.val();
		var endCity = mPlaneend.val();
		var dateTime = mPlanedate.val().replace(/\//g, "-"); //转义为xxxx-xx-xx
		if(dateTime || (startCity && endCity)) {
			var searchBtn = $(this);
			searchBtn.button("option", "disable", true);
			$.mobile.loading('show', {
				text: '正在搜索请稍后。', //加载器中显示的文字    
				textVisible: true //是否显示文字    
			});
			loadData();
			function loadData() {
				$.ajax({
					type: "get",
					url: "server/planepage.php",
					data: {
						"planstart": startCity,
						"planend": endCity,
						"data": dateTime
					},
					async: true,
					error: function() {
						$.mobile.loading("hide");
						alert('服务器访问错误！');
					},
					success: function(data, status) { //如果调用php成功   
						var _arr = [];
						var	_data =$(data);
						$.each(_data.find("AirlinesTime"), function(index, item) {
							var train = item.queryLeftNewDTO
							var _html = '<li>' +
											'<h2>' + _data.find("Company:eq("+index+")").text()+ '</h2>' +
											'<p>起始机场：' + _data.find("StartDrome:eq("+index+")").text() + '</p>' +
											'<p>起始时间：' + _data.find("StartTime:eq("+index+")").text() + '开</p>' +
											'<p>起始机场：' + _data.find("ArriveDrome:eq("+index+")").text() + '</p>' +
											'<p>终点时间：' + _data.find("ArriveTime:eq("+index+")").text() + '到</p>' +
										'</li>';
							_arr.push(_html);
						});
						if(_arr.length > 0) {
							mPlanelist.html(_arr.join(""));
							mPlanelist.listview("refresh");
						}
						$.mobile.loading("hide");
						searchBtn.button("option", "disable", false);
					}
				});
			}
		} else {
			alert("请输入起点、终点、日期")
		}
	}
	var bindEvent = function() {
		mPlanesubmit.on("click", getTrainList);
	}

	$(document).on("pageinit", "#planepage", function() {
		bindEvent();
	});
}
plane();