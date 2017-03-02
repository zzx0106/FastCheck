var weathers = function() {
	var mWeatherstar = $("#weatherStar");
	var mWeatherinto = $("#weather-into");
	var mWeathermain = $(".weathermain");
	var findweather = function() {
		var city = mWeatherinto.val();
		mWeatherstar.button("option", "disable", true);

		if(city) {
			$.mobile.loading('show', {
			text: '正在搜索请稍后。', //加载器中显示的文字    
			textVisible: true //是否显示文字    
		});
			$.ajax({
				type: "get",
				url: "server/weatherpage.php",
				async: true,
				data: {
					"city":city
				},
				success: function(data, status) {
					console.log(data)
					var _data = $(data);
					var _html = '<div class="day clear-fix">' +
									'<h2>' + _data.find("currentCity").text()+ '</h2>' +
										'<p>' + _data.find("date:eq(1)").text() + '</p>' +
										'<p>' + _data.find("weather:eq(0)").text() + '</p>' +
										'<p>' + _data.find("wind:eq(0)").text() + '</p>' +
										'<p>' + _data.find("temperature:eq(0)").text() + '</p>' +
									'<div>' +
										'<p>' + _data.find("date:eq(2)").text() + '</p>' +
										'<p>' + _data.find("weather:eq(1)").text() + '</p>' +
										'<p>' + _data.find("wind:eq(1)").text() + '</p>' +
										'<p>' + _data.find("temperature:eq(1)").text() + '</p>' +
									'</div>' +
									'<div>' +
										'<p>' + _data.find("date:eq(3)").text() + '</p>' +
										'<p>' + _data.find("weather:eq(2)").text() + '</p>' +
										'<p>' + _data.find("wind:eq(2)").text() + '</p>' +
										'<p>' + _data.find("temperature:eq(2)").text() + '</p>' +
									'</div>' +
									'<div>' +
										'<p>' + _data.find("date:eq(4)").text() + '</p>' +
										'<p>' + _data.find("weather:eq(3)").text() + '</p>' +
										'<p>' + _data.find("wind:eq(3)").text() + '</p>' +
										'<p>' + _data.find("temperature:eq(3)").text() + '</p>' +
									'</div>' +	
								'</div>'+
										'<h5 class="suggest">' + _data.find("des:eq(0)").text() + '</h5>' +
										'<h5 class="suggest">' + _data.find("des:eq(1)").text() + '</h5>' +
										'<h5 class="suggest">' + _data.find("des:eq(2)").text() + '</h5>' +
										'<h5 class="suggest">' + _data.find("des:eq(3)").text() + '</h5>';
					mWeathermain.append(_html);
					$.mobile.loading("hide");
					mWeatherstar.button("option", "disable", false);
				},
				error: function() {
					alert('服务器访问错误！');
				}
			});

		} else {
			alert("输入不能为空")
		}
	}

	var bindEvent = function() {
		mWeatherstar.on("click", findweather);
	}

	$(document).on("pageinit", "#weatherpage", function() {
		bindEvent();
	})
}
weathers();