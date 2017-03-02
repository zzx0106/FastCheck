
var translates = function(){
var mTranslatestar = $("#translateStar");
var mTranslateinto = $("#translate-into");
var mTranslatelist = $("#translatelist");
var findword = function() {
	var word = mTranslateinto.val();
	mTranslatestar.button("option", "disable", true);
	if(word) {
		$.mobile.loading('show', {
		text: '正在搜索请稍后。', //加载器中显示的文字    
		textVisible: true //是否显示文字    
		});
		console.log(word)
		$.ajax({
			type: "get",
			url: "server/translatehomepage.php",
			async: true,
			data: {
				"word": word
			},
			success: function(data, status) {
				var _data = $(data);
				//				WordKey //单词
				//				Pron//音标
				//				Translation//翻译
				//				Sentence >Orig//造句
				//				Sentence >Trans//句子翻译
				//				console.log($(data).find("Translation").text());

				var _html = '<li>' +
					'<h2>' + _data.find("WordKey").text() + '</h2>' +
					'<p>音标：' + _data.find("Pron").text() + '</p>' +
					'<p>翻译：' + _data.find("Translation").text() + '</p>' +
					'<p>造句1：' + _data.find("Orig:eq(0)").text() + '</p>' +
					'<p>句释1：' + _data.find("Trans:eq(0)").text() + '</p>' +
					'<p>造句2：' + _data.find("Orig:eq(1)").text() + '</p>' +
					'<p>句释2：' + _data.find("Trans:eq(1)").text() + '</p>' +
					'<p>造句3：' + _data.find("Orig:eq(2)").text() + '</p>' +
					'<p>句释3：' + _data.find("Trans:eq(2)").text() + '</p>' +
					'</li>';
				mTranslatelist.html(_html);
				mTranslatelist.listview("refresh");
				$.mobile.loading("hide");
				mTranslatestar.button("option", "disable", false);
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
	mTranslatestar.on("click", findword);
}

$(document).on("pageinit", "#translatepage", function() {
	bindEvent();
})
}
translates();