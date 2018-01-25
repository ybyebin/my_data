$('#foot').load('public.html');
$(function() {
	publicHeadfun()
	getHomePageMessage();
});

$(function() {
	$('#container-pie').highcharts({
		chart: {
			backgroundColor: '#292E46',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
		},
		credits: {
			enabled: false
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					distance: 5,
					enabled: true,
					format: '{point.percentage:.1f} %',
					style: {
						"color": "#BFD3DF",
						"fontSize": "11px",
						"fontWeight": "bold",
						"textOutline": "none"
					},

				},
				showInLegend: true
			}
		},
		legend: {
			align: 'left',
			layout: 'vertical',
			verticalAlign: 'middle',
			itemMarginBottom: 8,
			itemStyle: {
				color: '#7A8FAC;',
				fontWeight: 'bold'
			},
			x: -10,
			y: 50
		},
		series: [{
			type: 'pie',
			name: '能耗占比',
			data: [{
				name: '空调',
				y: 37,
				color: '#1B70B0'
			}, {
				name: '照明',
				y: 28,
				color: '#298372'
			}, {
				name: '办公',
				y: 22,
				color: '#8268BE'
			}, {
				name: '其他',
				y: 13,
				color: '#5DBAC9'
			}]
		}]
	});
	// data_group = [
	// 	[
	// 		1487657008533,
	// 		1
	// 	],
	// 	[
	// 		1487657009534,
	// 		1
	// 	],
	// 	[
	// 		1487657010534,
	// 		3
	// 	],
	// 	[
	// 		1487657011534,
	// 		5
	// 	],
	// 	[
	// 		1487657012534,
	// 		8
	// 	],
	// 	[
	// 		1487657013534,
	// 		null
	// 	],
	// 	[
	// 		1487657014534,
	// 		null
	// 	],
	// 	[
	// 		1487657015534,
	// 		null
	// 	],
	// 	[
	// 		1487657016534,
	// 		null
	// 	],
	// 	[
	// 		1487657017534,
	// 		null
	// 	]

	// ]


	//  setInterval(function(){
	//  	var x = (new Date()).getTime()
	//  	console.log(x)
	//  },1000)
	// Highcharts.chart('container', {
	// 				chart: {
	// 					// zoomType: 'x',
	// 					backgroundColor: '#292E46',
	// 					plotBorderColor: '#30354E',
	// 					plotBorderWidth: 1,
	// 					plotBackgroundImage: 'images/cbsnew/总功率.png',

	// 					events: {
	// 						load: function() {
	// 							// chart = this;
	// 							// var series = this.series[0];
	// 							// tagValueSetInterval = setInterval(function() {

	// 							// 	var x = (new Date()).getTime(),
	// 							// 		// y = Math.random();
	// 							// 		y = real_time_value;
	// 							// 	// console.log('x:' + x);
	// 							// 	// console.log('Y:' + y);
	// 							// 	series.addPoint([x, y], true, false);
	// 							// 	$('#label_min' + label_min).remove();
	// 							// 	$('#label_max' + label_max).remove();
	// 							// 	activeLastPointToolip(chart);
	// 							// }, 30000);
	// 						}
	// 					}
	// 				},
	// 				credits: {
	// 					enabled: false
	// 				},
	// 				title: {
	// 					text: ''
	// 				},
	// 				xAxis: {
	// 					type: 'datetime',
	// 					dateTimeLabelFormats: {
	// 						millisecond: '%H:%M:%S.%L',
	// 						second: '%H:%M:%S',
	// 						minute: '%H:%M',
	// 						hour: '%H:%M',
	// 						day: '%m-%d',
	// 						week: '%m-%d',
	// 						month: '%Y-%m',
	// 						year: '%Y'
	// 					},
	// 					visible: false
	// 				},
	// 				tooltip: {
	// 					dateTimeLabelFormats: {
	// 						millisecond: '%H:%M:%S.%L',
	// 						second: '%H:%M:%S',
	// 						minute: '%H:%M',
	// 						hour: '%H:%M',
	// 						day: '%Y-%m-%d',
	// 						week: '%m-%d',
	// 						month: '%Y-%m',
	// 						year: '%Y'
	// 					}
	// 				},
	// 				yAxis: {
	// 					minPadding:0,
	// 					startOnTick:false,

	// 					title: {
	// 						text: ''
	// 					},
	// 					gridLineWidth: 0
	// 				},
	// 				legend: {
	// 					enabled: false
	// 				},
	// 				plotOptions: {



	// 					area: {
	// 						fillColor: {
	// 							linearGradient: {
	// 								x1: 0,
	// 								y1: 0,
	// 								x2: 0,
	// 								y2: 1
	// 							},
	// 							stops: [
	// 								[0, Highcharts.getOptions().colors[0]],
	// 								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	// 							]
	// 						},
	// 						marker: {
	// 							radius: 2,
	// 							enabled: false
	// 						},
	// 						lineWidth: 1,
	// 						states: {
	// 							hover: {
	// 								lineWidth: 1
	// 							}
	// 						},
	// 						threshold: null
	// 					}
	// 				},
	// 				series: [{
	// 					type: 'area',
	// 					name: '总功率',
	// 					data: data_group
	// 				}]
	// 			}, function(chart) { // on complete
	// 				chart = this;
	// 				if (data_group.length == 0) {

	// 				} else {
	// 					activeLastPointToolip(chart);
	// 				}

	// 			});
});

function activeLastPointToolip(chart) {

	var min = 1000000000,
		max = 0,
		pointsToShow = [0, 0],
		points = chart.series[0].points;
	Highcharts.each(points, function(p) {
		if (p.y > max) {
			pointsToShow[0] = p.index;
			max = p.y;
		}
		if (p.y != null) {
			if (p.y < min) {
				pointsToShow[1] = p.index;
				min = p.y;
			}
		}

	});
	label_max += 1;
	label_min += 1;
	render_max(chart, points[pointsToShow[0]], '<br><span style="color:#B5A6B2">最大值</span>');
	render_min(chart, points[pointsToShow[1]], '<br><span style="color:#B5A6B2">最小值</span>');

}

var label_max = 0;
var label_min = 0;
// 查询图表最大值
function render_max(chart, point, text) {
	console.log('查看最大值：' + point.y)
	chart.renderer.label(Number((point.y).toFixed(3)) + 'kw' + text, point.plotX + chart.plotLeft - 20, point.plotY + chart.plotTop, 'callout', point.plotX + chart.plotLeft, point.plotY + chart.plotTop)
		.css({
			color: '#F1F2F3',
			align: 'center',
		})
		.attr({
			zIndex: 6,
			id: 'label_max' + label_max
		})
		.add();


}
// 查询图表最小值
function render_min(chart, point, text) {
	// console.log(point)
	labels = chart.renderer.label(Number((point.y).toFixed(3)) + 'kw' + text, point.plotX + chart.plotLeft - 20, point.plotY + chart.plotTop - 45, 'callout', point.plotX + chart.plotLeft, point.plotY + chart.plotTop)
		.css({
			color: '#F1F2F3',
			align: 'center',
		})
		.attr({
			zIndex: 6,
			id: 'label_min' + label_min
		})
		.add();


}



$(".point-monitor p:last-child").hover(function() {
	console.log('距离上' + $(this).offset().top)
	console.log('距离下' + $(this).offset().left)
	var top = Number($(this).offset().top) - 30;
	var left = Number($(this).offset().left) + 20;
	var hover_tips = $('<div class="hover-tips"><p>' + $(this).data('name') + '</p></div>')
	$('body').append(hover_tips.css({
		top: top + 'px',
		left: left + 'px'
	}))
}, function() {
	$('.hover-tips').remove();
});

function getHomePageMessage() {
	$.ajax({
		url: apiurl + 'r=api/main/demo',
		type: 'post',
		dataType: 'json',
		data: null,
		beforeSend: function() {
			$(".loading").show();
		},

		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				console.log(JSON.stringify(data, null, 2));
				var tag_data = data.data.realTimeTag;
				for (var key in tag_data) {
					switch (Number(tag_data[key].tagId)) {
						case 1422:
						case 1423:
						case 1424:
						case 1425:
						case 1426:
						case 1427:
							changeValue.pointValue(tag_data[key]);
							break;
						case 1428:
						case 1429:
						case 1430:
						case 1431:
						case 1432:
						case 1433:
						case 1434:
						case 1435:
							changeValue.footValue(tag_data[key]);
							break;
						case 1436:
						case 1437:
							changeValue.titleValue(tag_data[key]);
							break;
						case 1438:
						case 1440:
							changeValue.rightValue(tag_data[key]);
							break;

					}
				}

				$('#1436 li:nth-child(2) p:first-child').text(data.data.target[0]);
				$('#1437 li:nth-child(2) p:first-child').text(data.data.target[1]);
				if (!isNaN($('#1436 li:nth-child(1) p:first-child').text())) {
					$('#1436 li:nth-child(3) p:first-child').text((Number($('#1436 li:nth-child(1) p:first-child').text()) / Number(data.data.target[0]) * 100).toFixed(2));
				}else{
					$('#1436 li:nth-child(3) p:first-child').text('0');
				}
				if (!isNaN($('#1437 li:nth-child(1) p:first-child').text())) {
					$('#1437 li:nth-child(3) p:first-child').text((Number($('#1437 li:nth-child(1) p:first-child').text()) / Number(data.data.target[1]) * 100).toFixed(2));
				}else{
					$('#1437 li:nth-child(3) p:first-child').text('0');
				}
				
				


				var data_highchar = data.data.power.data;
				var data_group = data_highchar;

				

				Highcharts.chart('container', {
					chart: {
						// zoomType: 'x',
						backgroundColor: '#292E46',
						plotBorderColor: '#30354E',
						plotBorderWidth: 1,
						plotBackgroundImage: 'images/cbsnew/总功率.png',

						events: {
							load: function() {
								chart = this;
								var series = this.series[0];
								tagValueSetInterval = setInterval(function() {

									if (addData) {
										var x = real_time;
										var y = real_time_value;
										series.addPoint([x, y], true, false);
										$('#label_min' + label_min).remove();
										$('#label_max' + label_max).remove();
										activeLastPointToolip(chart);
										addData = false;
									}
								}, 1000);
							}
						}
					},
					credits: {
						enabled: false
					},
					title: {
						text: ''
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						},
						visible: false
					},
					tooltip: {
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%Y-%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					yAxis: {
						title: {
							text: ''
						},
						gridLineWidth: 0
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						area: {
							fillColor: {
								linearGradient: {
									x1: 0,
									y1: -5,
									x2: 0,
									y2: 1
								},
								stops: [
									[0, Highcharts.getOptions().colors[0]],
									[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
								]
							},
							marker: {
								radius: 2,
								enabled: false
							},
							lineWidth: 1,
							states: {
								hover: {
									lineWidth: 1
								}
							},
							threshold: null
						}
					},
					series: [{
						type: 'area',
						name: '总功率',
						data: data_group,
						lineWidth: 0.5,
						lineColor: '#438FBE',
						// fillOpacity: 0.09,

					}]
				}, function(chart) { // on complete
					chart = this;
					if (data_group.length == 0) {

					} else {
						activeLastPointToolip(chart);
					}

				});

				MQTTconnect();

			} else {
				console.log("错误原因" + JSON.stringify(data, null, 2));
				layer.msg(data.error_message);
				returnLogIn(data.error_message);
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message)
			console.log("错误原因" + JSON.stringify(data, null, 2));
		}
	});
}

var changeValue = {};　
changeValue = (function(_changeValue) {　
	_changeValue.pointValue = function(data) {
		$('#' + data.tagId + ' p:last-child').data('name', data.message);
		if (data.alarm) {
			$('#' + data.tagId + ' p:first-child').hide();
			$('#' + data.tagId + ' p:last-child').show();
		}
	};
	_changeValue.footValue = function(data) {
		if (data.alarm) {
			$('#' + data.tagId + ' p:last-child').html('异常<img class="css3-warn" src="images/cbsnew/baojing.png">');
		} else {
			$('#' + data.tagId + ' p:last-child').html('正常');
		}
	};
	_changeValue.titleValue = function(data) {
		if (!isNaN(data.value)) {
			$('#' + data.tagId + ' li:first-child p:first-child').text(data.value);
		}
		else{
			$('#' + data.tagId + ' li:first-child p:first-child').text('异常');
		}
		
	};
	_changeValue.rightValue = function(data) {
		if (!isNaN(data.value)) {
			$('#' + data.tagId).text(data.value);
		}else{
			$('#' + data.tagId).text('异常');
		}
		
	}

	return _changeValue;　
})(changeValue);

var changeValue_mqtt = {};

changeValue_mqtt = (function(_changeValue) {　
	_changeValue.pointValue = function(data) {
		console.log('报警状态：' + data.isAlarm)
		if (data.isAlarm) {
			$('#' + data.tagId + ' p:first-child').hide();
			$('#' + data.tagId + ' p:last-child').show();
		} else {
			$('#' + data.tagId + ' p:first-child').show();
			$('#' + data.tagId + ' p:last-child').hide();
		}
	};
	_changeValue.footValue = function(data) {
		if (data.isAlarm) {
			$('#' + data.tagId + ' p:last-child').html('异常<img class="css3-warn" src="images/cbsnew/baojing.png">');
		} else {
			$('#' + data.tagId + ' p:last-child').html('正常');
		}
	};
	_changeValue.titleValue = function(data) {
		if (!isNaN(data.value)) {
			$('#' + data.tagId + ' li:first-child p:first-child').html(data.value);
			var num = Number(data.value) / Number($('#' + data.tagId + ' li:nth-child(2) p:first-child').text()) * 100;
			$('#' + data.tagId + ' li:nth-child(3) p:first-child').html(num.toFixed(2));
		}else{
			$('#' + data.tagId + ' li:first-child p:first-child').html('异常');
			$('#' + data.tagId + ' li:nth-child(3) p:first-child').html('0');
		}


		

	};
	_changeValue.rightValue = function(data) {
		$('#' + data.tagId).text(Number(data.value).toFixed(2));
	}

	return _changeValue;　
})(changeValue_mqtt);

var addData = false;
var real_time = ''; //时间
var real_time_value = 0; //实时值
var view_id = '9999'; //画面ID
var mqtt;
var reconnectTimeout = 2000;
var clientID = '123';
var timeout = false; //启动及关闭按钮
var setIntvals;

mqtt = new Paho.MQTT.Client(
	"192.168.2.2",
	61614,
	String(parseInt(Math.random() * 100,
		10)));

function MQTTconnect() {
	var options = {
		// timeout: 3,
		useSSL: false,
		cleanSession: false,
		onSuccess: function() {
			subscribeView();
		},
		onFailure: function(message) {
			console.log("connect Failure");
			setTimeout(MQTTconnect, reconnectTimeout);
		}
	};

	mqtt.onConnectionLost = onConnectionLost;
	mqtt.onMessageArrived = onMessageArrived;
	mqtt.connect(options);
}

//订阅画布消息
function subscribeView() {
	mqtt.subscribe('Bayax/Push/' + view_id);
	var message6 = new Paho.MQTT.Message(view_id);
	message6.destinationName = 'Bayax/View/' + clientID;
	message6.qos = 0;
	// time(message6);

	setIntvals = setInterval(function() {
		mqtt.send(message6);
	}, 30000);
}



//重新链接MQTT服务器
function onConnectionLost(response) {
	console.log("connect Lost:" + JSON.stringify(response, null, 2));
	clearInterval(setIntvals);
	setTimeout(MQTTconnect, reconnectTimeout);
};
//接受消息
function onMessageArrived(messages) {
	var message = JSON.parse(messages.payloadString);
	// console.log('查看MQTT返回的数据:' + JSON.stringify(message, null, 2));
	// tagId
	// status
	// isAlarm
	// value
	// 
	switch (Number(message.tagId)) {
		case 1422:
		case 1423:
		case 1424:
		case 1425:
		case 1426:
		case 1427:
			console.log('查看MQTT返回的数据:' + JSON.stringify(message, null, 2));
			changeValue_mqtt.pointValue(message);
			break;
		case 1428:
		case 1429:
		case 1430:
		case 1431:
		case 1432:
		case 1433:
		case 1434:
		case 1435:
			changeValue_mqtt.footValue(message);
			break;
		case 1436:
		case 1437:
			changeValue_mqtt.titleValue(message);

			break;
		case 1438:
		case 1440:
			changeValue_mqtt.rightValue(message);
			break;
		case 1442:
			console.log(message.value)
			addData = true;
			real_time = new Date(message.time).format("yyyy-MM-dd hh:mm:ss")
			real_time_value = Number(Number(message.value).toFixed(2));
			break;

	}
}


$('.left-center-foot li a').on('click', function() {
	sessionStorage.setItem("device_viewid", $(this).data('id'));
});

$(function() {

	changeBodyHeight();


})
window.onresize = function() {
	changeBodyHeight();


}

function changeBodyHeight() {	
	if (Number(window.outerHeigth) ===Number(screen.height)  && Number(window.outerWidth) ==Number(screen.width)) {
		$('body').css('padding-top', '0');
	} else {
		$('body').css('padding-top', '2%');

	}
	
	if (window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth) {		
			$('body').css('padding-top', '0');
	}else{
		$('body').css('padding-top', '2%');
	}
}







