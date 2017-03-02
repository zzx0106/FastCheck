var kuaidi = function() {


	var mKuaidsearch = $("#kuaidiSearch");
	var mKuaidimain = $("#kuaidimain");
	var findword = function() {
	var mType = $("#kuaidi-type").val();
	var mPostid = $("#kuaidi-postid").val();
		if(mType || mPostid) {
			$.mobile.loading('show', {
				text: '正在搜索请稍后。', //加载器中显示的文字    
				textVisible: true //是否显示文字    
			});
			$.ajax({
				type: "get",
				url: "server/kuaidipage.php",
				async: true,
				data: {
					"type": mType,
					"postid":mPostid
				},
				success: function(data, status) {
					var jsonObj = $.parseJSON(data);
					console.log(jsonObj)
//		'			context:"[广东宝安黄田营业厅]前台签收-已签收"
//					ftime:"2017-01-04 21:39:30"
//					location:"广东宝安黄田营业厅"
//					time:"2017-01-04 21:39:30"'
					var _arr = [];
					$.each(jsonObj.data, function(index,item) {
					var _html = '<li>' +
						'<p>标注：' + item.context + '</p>' +
						'<p>时间：' + item.time + '</p>' +
						'</li>';
						_arr.push(_html);
					});
					mKuaidimain.append(_arr.join(""));
					$.mobile.loading("hide");
				},
				error: function() {
					$.mobile.loading("hide");
					alert('服务器访问错误！');
				}
			});

		} else {
			alert("输入不能为空")
		}
	}

	var bindEvent = function() {
		mKuaidsearch.on("click", findword);
	}

	$(document).on("pageinit", "#kuaidipage", function() {
		bindEvent();
	})

}
kuaidi();