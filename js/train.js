var trains = function(){
	//		获取车次列表
		var mSearchno = $("#search-no");
		var mSearchbgn  = $("#search-begin");
		var mSearchend  = $("#search-end");	
		var mSearchdate = $("#search-date");
		
		var timeCode;
		var startCityCode;
     	var endCityCode;
		var getTrainList = function(){
			var startCity  = mSearchbgn.val();
     		var endCity = mSearchend.val();
     		var dateTime = mSearchdate.val().replace(/\//g,"-");//转义为xxxx-xx-xx
			timeCode = dateTime;
			if(dateTime || (startCity && endCity)){

				var searchBtn = $(this);
				searchBtn.button("option","disable",true);
				 $.mobile.loading('show', {  
	                text: '正在搜索请稍后。', //加载器中显示的文字    
	                textVisible: true//是否显示文字    
            	});  
				//匹配城市字符码
				$.getJSON("data/traindata.json", function(jsonstr) {
					for(var i = 0; i < jsonstr.citylist.length; i++) {
						if(jsonstr.citylist[i].city.replace(/\s/g, '') == startCity) {
							startCityCode=jsonstr.citylist[i].name.replace(/\s/g, '');
						}
						if(jsonstr.citylist[i].city.replace(/\s/g, '') == endCity) {
							endCityCode=jsonstr.citylist[i].name.replace(/\s/g, '');
						}
					}
					if(startCityCode ==undefined || endCityCode ==undefined){
						$.mobile.loading("hide");
						alert("城市没有找到！")
						return;
					}else{
						//匹配完后加载
						loadData();
					}
				})
				
			function loadData(){
					$.ajax({
					type:"get",
					url:"server/trainhomepage.php",
					data:{
						"startCityCode":startCityCode,
						"endCityCode":endCityCode,
						"dateTime":dateTime
					},
					async:true,
					error: function(){  
                        alert('服务器访问错误！');  
                    },                   
                    success: function(data,status){//如果调用php成功   
                    	var jsonObj = $.parseJSON(data);
//                  	"train_no": "240000G1210H"
//                  	 "from_station_telecode": "VNP",
//						"station_train_code": "G3",
//		                "from_station_name": "北京南",
//		                "to_station_telecode": "AOH",
//		                "to_station_name": "上海虹桥",
//                  	  "from_station_telecode": "VNP",
//                  	  "start_time": "10:28"
//                  	   "arrive_time": "16:28"
//                  	    "rw_num": "--"
//                  	    "yw_num": "--"
//                  	    "wz_num": "--"
//                  	     "yz_num": "--",
//                  	     ze_num//二等
						var list = $("#list");
						var _arr = [];
						$.each(jsonObj.data, function(index,item) {
						var train  = item.queryLeftNewDTO
						var i = index;
						if(i>15){
							return;
						}
						 var _html ='<li>'+
										'<a href="" data-no="'+train.train_no+'">'+
											'<h2>车次：'+train.station_train_code+'</h2>'+
											'<p>始：'+train.from_station_name+'</p>'+
											'<p>时间：'+train.start_time+'开</p>'+
											'<p>终：'+train.to_station_name+'</p>'+
											'<p>时间：'+train.arrive_time+'到</p>'+
											'<div class="zuowei">'+
											'<p class="">软卧：'+train.rw_num+'</p>'+
											'<p class="">硬卧：'+train.yw_num+'</p>'+
											'<p class="">硬座：'+train.yz_num+'</p>'+
											'<p class="">无座：'+train.wz_num+'</p>'+
											'<p class="">二等座：'+train.ze_num+'</p>'+
											'</div>'
										'</a>'+
									'</li>';
						_arr.push(_html);
						});
						if(_arr.length > 0){
							list.html(_arr.join(""));
							list.listview("refresh");
						}
						$.mobile.loading("hide");
						searchBtn.button("option","disable",false);
                    }
				});
			}
			}else{
				alert("请输入发车站、终点站、日期")
			}
		}
		
		
		var mSearchsubmit = $("#search-submit");
		var mList = $("#list");
		var mDetail  = $("#detail");
		//点击具体车次
		var isAjax = false;
		var getInfoByTrainCode = function(){
			if(isAjax) {
				return;
			}
			isAjax = true;
		
			$.mobile.loading('show', {
				text: '正在搜索请稍后。', //加载器中显示的文字    
				textVisible: true //是否显示文字    
			});
			var trainCode = $(this).attr("data-no");
			$.ajax({
				type:"get",
				url:"server/trainchildpage.php",
				data:{
					"timeCode":timeCode,
					"startCityCode":startCityCode,
					"endCityCode":endCityCode,
					"trainCode":trainCode
				},
				async:true,
				error: function(){  
						$.mobile.loading("hide");
                        alert('Error loading XML document');  
                },                   
                success: function(data,status){
                	var jsonObj = $.parseJSON(data);
                	var tbody = mDetail.find(".ui-content tbody");
                	mDetail.find(".ui-content h2").first().html(jsonObj.data.data[0].station_train_code+"次列车");
                	tbody.html("");
                	$.each(jsonObj.data.data, function(index,item) {
//              		 "start_station_name": "长沙南",
//		                "arrive_time": "----",
//		                "station_train_code": "G6017",
//		                "station_name": "长沙南",
//		                "train_class_name": "高速",
//		                "service_type": "2",
//		                "start_time": "10:08",
//		                "stopover_time": "----",
//		                "end_station_name": "深圳北",
//		                "station_no": "01",
//		                "isEnabled": true
                		var tr =$("<tr></tr>");
                		var _html = '<td>'+item.station_no+'</td>'+
									'<td>'+item.station_name+'</td>'+
									'<td>'+item.arrive_time+'</td>'+
									'<td>'+item.start_time+'</td>'+
									'<td>'+item.stopover_time+'</td>';
						tr.html(_html);
						tbody.append(tr);
                	});
                	$.mobile.loading("hide");
					isAjax =false;
					$.mobile.changePage("#detail");
                }
			});
		}
		var bindEvent = function(){
			console.log("onclick")
			mSearchsubmit.on("click",getTrainList);
			mList.on("click","a",getInfoByTrainCode);
		}
		
		$(document).on("pageinit","#index1",function(){
			bindEvent();
		});
}
trains();