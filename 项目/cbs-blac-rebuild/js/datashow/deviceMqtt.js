var view_id = ''; //画面ID
var mqtt;
var reconnectTimeout = 5000;
var clientID = '123';
var restart = false;
// var userDisconnec = false;

function MQTTconnect() {
	mqtt = new Paho.MQTT.Client(
		// "demo.bayax.cn",
		"192.168.118.153",
		61614,
		String(parseInt(Math.random() * 100,
			10)));

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
	// options.userName = "username";
	// options.password = "password";
	mqtt.connect(options);

}

//订阅画布消息
function subscribeView() {
	console.log('连接成功');
	console.log('view_id' + view_id)
	restart = true;
	mqtt.subscribe('Bayax/Push/' + view_id);
}
// 取消订阅
function unsubscribeView(){
	console.log('取消订阅');
	  mqtt.unsubscribe('Bayax/Push/' + view_id);
}
$(function() {
	setInterval(function() {
		if (Number(view_id) > 0 && mqtt) {
			var message6 = new Paho.MQTT.Message(view_id);
			message6.destinationName = 'Bayax/View/' + clientID;
			message6.qos = 0;
			mqtt.send(message6);
			console.log('页面id：' + view_id)
		}

	}, 15000);
});

//重新链接MQTT服务器
function onConnectionLost(response) {
	
	if (restart) {
		console.log("手动断开:" + JSON.stringify(response, null, 2));		
	}else{
		console.log("意外断开:" + JSON.stringify(response, null, 2));	
		setTimeout(MQTTconnect, reconnectTimeout);
	}
	
};
//接受消息
function onMessageArrived(messages) {
	onlyForOnMessageArrived(messages);
}

function onlyForOnMessageArrived(messages) {
	var message = JSON.parse(messages.payloadString);
	console.log('查看MQTT返回的数据:' + JSON.stringify(message, null, 2));
	var mqttflags = true;
	// console.log(JSON.stringify(componentIsReadonly,null,2))
	for (var dic in componentIsReadonly) {
		if (componentIsReadonly[dic].tag_id == message.tagId) {
			// console.log('开始比对：'+componentIsReadonly[dic].status +'=='+message.status)
			// console.log('开始比对：'+componentIsReadonly[dic].alarm +'=='+message.isAlarm)
			// console.log('开始比对：'+componentIsReadonly[dic].value +'=='+message.value)
			if ((componentIsReadonly[dic].status === message.status) && (componentIsReadonly[dic].alarm === message.isAlarm) && (componentIsReadonly[dic].value === message.value)) {
				mqttflags = false;
				break;
			}
		}

	}

	if(mqttflags){
		// console.log('开始筛选控件显示值')
		for (var key in allComponent) {
		if (Number(allComponent[key]) === message.tagId) {

			if (getCanvasNode(imageCanvas, key) === 'notCanvasNode') {
				if (message.status === 0) {
					switch (message.value) {
						case true:
							$("#" + key).find(".tagsValue").text(message.value);
							$('.' + key).data('value', '1').removeClass('boolean-false boolean-true').addClass('boolean-false');
							break;
						case false:
							$("#" + key).find(".tagsValue").text(message.value);
							$('.' + key).data('value', '0').removeClass('boolean-false boolean-true').addClass('boolean-true');
							break;
					}
				}
			} else {
				// console.log('画布控件+messageValue:' + message.value);

				var node = getCanvasNode(imageCanvas, key);
				// 显示内容控件更新内容
				if (node === 'notCanvasNode') {
					return false;
				}
				if (node === null) {
					return false;
				}
				if (node.userData.valueType) {
					// console.log('这是label')
					if (message.status === 0) {
						switch (node.userData.valueType) {
							case "textValueComponent":
								if (node.userData.Tag.tag_type === 1) {
									node.setText(String(message.value + node.userData.unit));
								}else{
									var num = Number(message.value);
									if(!isNaN(num)){
										node.setText(num.toFixed(2) + node.userData.unit);
									}else{
										node.setText(String(message.value + node.userData.unit));
									}
									
								}
								
								node.repaint();
								break;
							case "valueComponent":
								if (node.userData.types === 'LabelComponent') {
									if (node.userData.Tag.tag_type === 1) {
										node.setText(String(message.value));
									}else{
										var num = Number(message.value);
										if(!isNaN(num)){
											node.setText(num.toFixed(2));
										}else{
											node.setText(String(message.value));
										}
									}
									
									node.repaint();
								} else {
									if (node.userData.Tag.tag_type === 1) {
										node.label.setText(String(message.value));
									}else{
										var num = Number(message.value);
										if(!isNaN(num)){
											node.label.setText(num.toFixed(2));
										}else{
											node.label.setText(String(message.value));
										}
									}
									node.label.repaint();
								}
								break;
						}
					} else {
						switch (node.userData.valueType) {
							case "textValueComponent":
								node.setText('通信异常');
								node.repaint();
								break;
							case "valueComponent":
								if (node.userData.types === 'LabelComponent') {
									node.setText('通信异常');
									node.repaint();
								} else {
									node.label.setText('通信异常');
									node.label.repaint();
								}
								break;
						}
					}
				}
				// 普通控件更新样式
				switch (message.status) {
					case 0:
						switch (message.isAlarm) {
							case true:
								if (node.userData.Tag.tag_type === 1) {
									nodeOnAlarm(node, message.value);
								} else {
									numFixedTwo(node,message.value,nodeOnAlarm);
								}
								break;
							case false:
								if (node.userData.Tag.tag_type === 1) {
									switch (String(message.value)) {
										case 'true':
											nodeOnTrue(node, message.value)
											break;
										case 'false':
											nodeOnFalse(node, message.value)
											break;
									}
								} else {
									numFixedTwo(node,message.value,nodeOnTrue);
								}
								break;
						}
						break;
					case 1:
						nodeOnDisconnected(node, message.value);
						break;
					case 2:
						nodeOnDisconnected(node, message.value);
						break;
					// case 3:
					// nodeOnDisconnected(node, '超时');
					// 	break;
					// 	case 11:
					// nodeOnDisconnected(node, '服务器失联');
					// 	break;
					// 	case 12:
					// nodeOnDisconnected(node, '失败');
					// 	break;
					default:
					nodeOnDisconnected(node, message.value);
						break;

				}
			}
		}
	}
	// 修改表格内容
	websocketChangetable(message);
	changeTagValueForHighChar(message);
	}

	// 修改画布控件样式
	
}

function nodeOnTrue(node, btn_str) {
	if (node.userData.types === 'LabelComponent') {} else {
		node.stopTimer();
		node.userData.BlinkingType = "onTrue";
		if (node.userData.onTrue.Blinking == true) {
			node.startTimer(1000);
		}
		node.setStroke(Number(node.userData.onTrue.LineWidth));
		node.setDashArray(node.userData.onTrue.LineStyle);
		node.setColor(node.userData.onTrue.LineColor);
	}

	switch (node.userData.types) {
		case "imageComponent":
			node.image.setPath(node.userData.onTrue.picture);
			break;
		case "buttonComponent":
			node.setBackgroundColor(node.userData.onTrue.FillColor);
			if (node.userData.onTrue.Text == "") {
				if (node.userData.onTrue.unit) {
					node.setText(String(btn_str + node.userData.onTrue.unit));
				} else {
					node.setText(String(btn_str));
				}

			} else {
				node.setText(node.userData.onTrue.Text);
			}
			node.setFontColor(node.userData.onTrue.TextColor);
			break;
		case "basicComponent":
			node.setBackgroundColor(node.userData.onTrue.FillColor);
			node.setAlpha(Number(node.userData.onTrue.alpha));
			break;
		case "conduitCompontent":
			node.setBackgroundColor(node.userData.onTrue.FillColor);
			break;
		case "LineComponent":
			break;
	}

	node.repaint();

}

function nodeOnFalse(node, btn_str) {
	if (node.userData.types === 'LabelComponent') {} else {
		node.stopTimer();
		node.userData.BlinkingType = "onFalse";
		if (node.userData.onFalse.Blinking == true) {
			node.startTimer(1000);
		}
		node.setStroke(Number(node.userData.onFalse.LineWidth));
		node.setDashArray(node.userData.onFalse.LineStyle);
		node.setColor(node.userData.onFalse.LineColor);

	}
	switch (node.userData.types) {
		case "imageComponent":
			node.image.setPath(node.userData.onFalse.picture);
			break;
		case "buttonComponent":
			node.setBackgroundColor(node.userData.onFalse.FillColor);
			if (node.userData.onFalse.Text == "") {
				if (node.userData.onFalse.unit) {
					node.setText(String(btn_str + node.userData.onFalse.unit));
				} else {
					node.setText(String(btn_str));
				}

			} else {
				node.setText(node.userData.onFalse.Text);
			}
			node.setFontColor(node.userData.onFalse.TextColor);
			break;
		case "basicComponent":
			node.setBackgroundColor(node.userData.onFalse.FillColor);
			node.setAlpha(Number(node.userData.onFalse.alpha));
			break;
		case "conduitCompontent":
			node.setBackgroundColor(node.userData.onTrue.FillColor);
			break;
		case "LineComponent":
			break;
	}
	node.repaint();
}

function nodeOnAlarm(node, btn_str) {
	if (node.userData.types === 'LabelComponent') {} else {
		node.stopTimer();
		node.userData.BlinkingType = "onAlarm";
		if (node.userData.onAlarm.Blinking == true) {
			node.startTimer(1000);
		}
		node.setStroke(Number(node.userData.onAlarm.LineWidth));
		node.setDashArray(node.userData.onAlarm.LineStyle);
		node.setColor(node.userData.onAlarm.LineColor);

	}
	switch (node.userData.types) {
		case "imageComponent":
			node.image.setPath(node.userData.onAlarm.picture);
			break;
		case "buttonComponent":
			node.setBackgroundColor(node.userData.onAlarm.FillColor);
			if (node.userData.onAlarm.Text == "") {
				if (node.userData.onAlarm.unit) {
					node.setText(String(btn_str + node.userData.onAlarm.unit));
				} else {
					node.setText(String(btn_str));
				}

			} else {
				node.setText(node.userData.onAlarm.Text);
			}
			node.setFontColor(node.userData.onAlarm.TextColor);
			break;
		case "basicComponent":
			node.setBackgroundColor(node.userData.onAlarm.FillColor);
			node.setAlpha(Number(node.userData.onAlarm.alpha));
			break;
		case "conduitCompontent":
			node.setBackgroundColor(node.userData.onAlarm.FillColor);
			break;
		case "LineComponent":
			break;
	}
	node.repaint();
}

function nodeOnDisconnected(node, btn_str) {
	if (node.userData.types === 'LabelComponent') {} else {
		node.stopTimer();
		node.userData.BlinkingType = "onDisconnected";
		if (node.userData.onDisconnected.Blinking == true) {
			node.startTimer(1000);
		}
		node.setStroke(Number(node.userData.onDisconnected.LineWidth));
		node.setDashArray(node.userData.onDisconnected.LineStyle);
		node.setColor(node.userData.onDisconnected.LineColor);
	}
	switch (node.userData.types) {
		case "imageComponent":
			node.image.setPath(node.userData.onDisconnected.picture);
			break;
		case "buttonComponent":
			node.setBackgroundColor(node.userData.onDisconnected.FillColor);
			if (node.userData.onDisconnected.Text == "") {

				// if (node.userData.onDisconnected.unit) {
				// 	node.setText(String(btn_str+node.userData.onDisconnected.unit));
				// }
				// node.setText(String(btn_str));
			} else {
				node.setText(node.userData.onDisconnected.Text);
			}
			node.setFontColor(node.userData.onDisconnected.TextColor);
			break;
		case "basicComponent":
			node.setBackgroundColor(node.userData.onDisconnected.FillColor);
			node.setAlpha(Number(node.userData.onDisconnected.alpha));
			break;
		case "conduitCompontent":
			node.setBackgroundColor(node.userData.onDisconnected.FillColor);
			break;
		case "LineComponent":
			break;
	}
	node.repaint();
}


//修改表格内容 
//function websocketChangetable(tagid, status, alarm, value) {
function websocketChangetable(message) {
	// 刷新列表与趋势图数据
	$("#qu table tbody tr").find(".havetagid").each(function(index, element) {
		// console.log("每个TagID为:" + $(element).text());
		if (Number($(element).text()) == message.tagId) {
			var Tag_type = Number($(element).parent().find(".havetagtype").text());

			
			console.log(JSON.stringify(message,null,2))
			switch (message.status) {
				case 0:
					switch (message.isAlarm) {
						case false:						
							if (Tag_type === 1) {
								
								$(element).parent().find(".tagState").html('正常').data('status', '0');										
								$(element).parent().find(".tagsValue").text(message.value);
							} else {

								$(element).parent().find(".tagState").html("").data('status', '0');
								$(element).parent().find(".tagsValue").text(TableNumFixedTwo(message.value));
							}
							break;
						case true:
								$(element).parent().find(".tagState").html('<span class="warn"></span><span class="size_red">报警</span>').data('status', '0');;
								
								if (Tag_type === 1) {
									$(element).parent().find(".tagsValue").text(message.value);
								}else{
									$(element).parent().find(".tagsValue").text(TableNumFixedTwo(message.value));
								}
								
							break;
					}
					break;
				case 1:
					$(element).parent().find(".tagState").html('<span class="catch"></span><span class="size_yellow">通信异常</span>').data('status', '1');
					$(element).parent().find(".tagsValue").html('--');
					break;
				case 2:
					$(element).parent().find(".tagState").html('<span class="catch"></span><span class="size_yellow">通信异常</span>').data('status', '2');
					$(element).parent().find(".tagsValue").html('--');
					break;
				// case 3:
				// 	$(element).parent().find(".tagState").html('超时').data('status', '3');
				// 	$(element).parent().find(".tagsValue").html('--');
				// 	break;
				// case 11:
				// 	$(element).parent().find(".tagState").html('服务器失联').data('status', '11');
				// 	$(element).parent().find(".tagsValue").html('--');
				// 	break;
				// case 12:
				// 	$(element).parent().find(".tagState").html('请求失败').data('status', '12');
				// 	$(element).parent().find(".tagsValue").html('--');
				// 	break;
				default:
					$(element).parent().find(".tagState").html('<span class="catch"></span><span class="size_yellow">通信异常</span>').data('status', message.status);
					$(element).parent().find(".tagsValue").html('--');
					// $(element).parent().find(".tagState").html('状态错误').data('status', '-2');
					// $(element).parent().find(".tagsValue").html('--');
					break;
			}
		}
	});

	// 存储 websocket 推过来的 数据
	for (var dic in componentIsReadonly) {
		if (Number(componentIsReadonly[dic].tag_id) == Number(message.tagId)) {
			componentIsReadonly[dic].status = message.status;
			componentIsReadonly[dic].alarm = message.isAlarm;			
			componentIsReadonly[dic].value = message.value;
		}
	}
}



/**
 * [webSocket更改 实时数据展示需要的值]
 * @param  {[number]} value [传回的值]
 * 
 */
function changeTagValueForHighChar(message) {
	if (message.tagId == tagIdForHighChar) {
		if (!isNaN(message.value)) {
			tagValueForHighChar = Number(message.value);
		}

	}
}


// canvas组件    浮点型 保留两位小数
function numFixedTwo(node,value,fun) {
	var num = Number(value);
	if (!isNaN(num)) {
		if(isInteger(num)){
			fun(node,value);
		}else{
			fun(node, num.toFixed(2));
		}
	} else {
		fun(node,value);
	}
}

// 表格 浮点型 保留两位小数

function TableNumFixedTwo(value){
	var num = Number(value);
	if (!isNaN(num)) {
		if(isInteger(num)){
			return num;
		}else{
			return num.toFixed(2);
		}
	} else {
		return value;
	}
}

function isInteger(obj) {
 return Math.floor(obj) === obj
}