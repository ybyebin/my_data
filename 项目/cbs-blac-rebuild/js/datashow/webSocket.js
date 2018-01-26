var ws;
var Interval;

var isselect = false;

var view_id = ""; //画面id
var webScoketjson = {
	viewid: view_id
	}

var componentId;
$(function() {
	 
	// checkWebSocket(wsSocket, token, view_id); //todo:token 应该被赋值
	setInterval(function(){
		if (isselect == false)
		 {
		 // console.log("再次链接")
		 	checkWebSocket(wsSocket,view_id);
		 }
	}, 5000);

})
// 
// 

function checkWebSocket(wcUrl,view_id) {
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	if (!window.WebSocket) {
		alert("你的浏览器不支持WebSocket,请更换浏览器!");
		return;
	} else {
		// alert("支持WebSocket!");
		ws = new WebSocket(wcUrl);
		ws.onopen = doOpen(view_id); //连接建立时触发
		ws.onerror = doError; //通信发生错误时触发
		ws.onclose = doClose; //连接关闭时触发
		ws.onmessage = doMessage; //客户端接收服务端数据时触发

	}
}


function doOpen(view_id) {
	// layer.msg("webSocket连接成功!")
	console.log("连接成功~~~~~~~~~~~~~");
	isselect = true;
	setTimeout(function() {
		ws.send('$Heartbeat@' + JSON.stringify(webScoketjson) + '\n');
	}, 3000);

	Interval = setInterval(function() {
		ws.send('$Heartbeat@' + JSON.stringify(webScoketjson) + '\n');
	}, 5000);
}

function doClose() {
	console.log("连接关闭~~~~~~~~~~~~~");
	// layer.msg("webSocket关闭,请检查")
	clearInterval(Interval);
	isselect = false;
}

function doError(data) {
	// layer.msg("webSocket通信发生错误,请检查!")
	console.log("通信发生错误~");
	console.log("通信发生错误~"+JSON.stringify(data,null,2));

}

function doMessage(message) {
	console.log("服务器发送的数据:"+JSON.stringify(message,null,2))
	var string = message.data.substring(0, 9);

	if (string === "$Message@") {
		var data = message.data.substring(9);
		// console.log("数据:"+data);
		var jsonData = JSON.parse(data);
		console.log("JSON格式数据:" + JSON.stringify(jsonData, null, 2))
		if (jsonData.ViewId == view_id) {
			var componentArray = [];
			// var global_btnArray = [];
			var writer = new draw2d.io.json.Writer();
			writer.marshal(imageCanvas, function(json) {

				// console.log(JSON.stringify(json, null, 2));
				// console.log("我是主画布");
				webScoketTagID = Number(jsonData.tagid); //保存 后台传回的数据的TagID;
				componentId = "";
				for (var i = 0; i < json.length; i++) {
					if (Number(json[i].userData.Tag.tag_id) == Number(jsonData.tagid)) {
						// componentId = json[i].id;
						// console.log("控件在画布中的ID为:"+ componentId);
						var ids = json[i].id;
						componentArray.push(ids);
					}
				}
			});
			// 确保 全局按钮 在 tabel 中的值也被更改
			websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

			for (var i = 0; i < componentArray.length; i++) {
				if (componentArray[i] !== "") {
					// console.log("======打印控件id=="+componentArray[i]+"=========")
					// var node = imageCanvas.getFigure(componentId);
					var node = imageCanvas.getFigure(componentArray[i]);

					
					if (node.userData.valueType) {
						switch (node.userData.valueType) {
							case "textValueComponent":
								node.setText('hahahaha')
								node.setText(dataDic[ids].value);
								node.repaint();
								websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
								changeTagValueForHighChar(jsonData.value);
								break;
							case "valueComponent":
								if (node.userData.types === 'LabelComponent') {
									node.setText(dataDic[ids].value);
									node.repaint();
								} else {
									node.label.setText(dataDic[ids].value);
									node.label.repaint();
								}
								websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
								changeTagValueForHighChar(jsonData.value);
								break;
						}						
					}


					switch (Number(jsonData.status)) {
						case 0:
							// console.log("======进入状态====0====:")
							switch (jsonData.isalarm) {
								case "False":
									// console.log("=====进入非报警状态=====")
									if (node.userData.Tag.tag_type === 'boolean') {
										switch (jsonData.value) {
											case "False":
												switch (node.userData.types) {
													case "imageComponent":
														// console.log("测试灯关")
															//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onFalse";
														if (node.userData.onFalse.Blinking == true) {
															node.startTimer(1000);
														}

														node.setStroke(Number(node.userData.onFalse.LineWidth));
														node.setDashArray(node.userData.onFalse.LineStyle);
														node.setColor(node.userData.onFalse.LineColor);
														node.image.setPath(node.userData.onFalse.picture);
														node.repaint();
														// 表格数据
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
													case "buttonComponent":

														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onFalse";
														if (node.userData.onFalse.Blinking == true) {
															node.startTimer(1000);
														}

														node.setStroke(Number(node.userData.onFalse.LineWidth));
														node.setDashArray(node.userData.onFalse.LineStyle);
														node.setColor(node.userData.onFalse.LineColor);
														node.setBackgroundColor(node.userData.onFalse.FillColor);
														if (node.userData.onFalse.Text =="")
														 {
														 	node.setText("关闭");
														 }else{
														 	node.setText(node.userData.onFalse.Text);
														 }
														node.setFontColor(node.userData.onFalse.TextColor);
														node.repaint();

														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

														break;
													case "basicComponent":
														// console.log("矩形");
														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onFalse";
														if (node.userData.onFalse.Blinking == true) {
															node.startTimer(1000);
														}

														// 修改样式
														node.setStroke(Number(node.userData.onFalse.LineWidth));
														node.setDashArray(node.userData.onFalse.LineStyle);
														node.setColor(node.userData.onFalse.LineColor);
														node.setBackgroundColor(node.userData.onFalse.FillColor);
														node.repaint();
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
													case "LineComponent":
														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onFalse";
														if (node.userData.onFalse.Blinking == true) {
															node.startTimer(1000);
														}

														// 修改样式
														node.setStroke(Number(node.userData.onFalse.LineWidth));
														node.setDashArray(node.userData.onFalse.LineStyle);
														node.setColor(node.userData.onFalse.LineColor);
														node.repaint();
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
												}

												break;
											case "True":
												switch (node.userData.types) {
													case "imageComponent":
														console.log("测试灯开")
															//view
														node.stopTimer();
														node.userData.BlinkingType = "onTrue";
														if (node.userData.onTrue.Blinking == true) {
															node.startTimer(1000);
														}

														node.setStroke(Number(node.userData.onTrue.LineWidth));
														node.setDashArray(node.userData.onTrue.LineStyle);
														node.setColor(node.userData.onTrue.LineColor);
														node.image.setPath(node.userData.onTrue.picture);
														node.repaint();
														// 表格数据
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
													case "buttonComponent":
														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onTrue";
														if (node.userData.onTrue.Blinking == true) {
															node.startTimer(1000);
														}


														node.setStroke(Number(node.userData.onTrue.LineWidth));
														node.setDashArray(node.userData.onTrue.LineStyle);
														node.setColor(node.userData.onTrue.LineColor);
														node.setBackgroundColor(node.userData.onTrue.FillColor);
														if (node.userData.onTrue.Text =="")
														 {
														 	node.setText("打开");
														 }else{
														 	node.setText(node.userData.onTrue.Text);
														 }
														node.setFontColor(node.userData.onTrue.TextColor);
														node.repaint();
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														// 表格数据
														// websocketChangetable(jsonData.tagid, "OK");
														break;
													case "basicComponent":
														console.log("矩形");
														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onTrue";
														if (node.userData.onTrue.Blinking == true) {
															node.startTimer(1000);
														}

														// 修改样式
														node.setStroke(Number(node.userData.onTrue.LineWidth));
														node.setDashArray(node.userData.onTrue.LineStyle);
														node.setColor(node.userData.onTrue.LineColor);
														node.setBackgroundColor(node.userData.onTrue.FillColor);
														node.repaint();
														// 表格数据
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
													case "LineComponent":

														//闪烁
														node.stopTimer();
														node.userData.BlinkingType = "onTrue";
														if (node.userData.onTrue.Blinking == true) {
															node.startTimer(1000);
														}
														node.setStroke(Number(node.userData.onTrue.LineWidth));
														node.setDashArray(node.userData.onTrue.LineStyle);
														node.setColor(node.userData.onTrue.LineColor);

														node.repaint();
														// 表格数据
														websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
														break;
												}


												break;
										}
									} else {
										switch (node.userData.types) {
											case "imageComponent":
												//view
												node.stopTimer();
												node.userData.BlinkingType = "onTrue";
												if (node.userData.onTrue.Blinking == true) {
													node.startTimer(1000);
												}

												node.setStroke(Number(node.userData.onTrue.LineWidth));
												node.setDashArray(node.userData.onTrue.LineStyle);
												node.setColor(node.userData.onTrue.LineColor);
												node.image.setPath(node.userData.onTrue.picture);
												node.repaint();
												// 表格数据
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "buttonComponent":
												//闪烁

												node.stopTimer();
												node.userData.BlinkingType = "onTrue";
												if (node.userData.onTrue.Blinking == true) {
													node.startTimer(1000);
												}


												node.setStroke(Number(node.userData.onTrue.LineWidth));
												node.setDashArray(node.userData.onTrue.LineStyle);
												node.setColor(node.userData.onTrue.LineColor);
												node.setBackgroundColor(node.userData.onTrue.FillColor);
												if (node.userData.onTrue.Text =="")
												{
													node.setText(jsonData.value);
												}else{
													node.setText(node.userData.onTrue.Text);
												}
												node.setFontColor(node.userData.onTrue.TextColor);
												node.repaint();

												// 表格数据
												// console.log("=======走到了buttonComponent====")
												// console.log("****:" + jsonData.tagid);
												// console.log("****:" + jsonData.status);
												// console.log("****:" + jsonData.isalarm);
												// console.log("****:" + jsonData.value);
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "basicComponent":
												// console.log("矩形");
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onTrue";
												if (node.userData.onTrue.Blinking == true) {
													node.startTimer(1000);
												}

												// 修改样式
												node.setStroke(Number(node.userData.onTrue.LineWidth));
												node.setDashArray(node.userData.onTrue.LineStyle);
												node.setColor(node.userData.onTrue.LineColor);
												node.setBackgroundColor(node.userData.onTrue.FillColor);
												node.repaint();
												// 表格数据
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "LineComponent":

												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onTrue";
												if (node.userData.onTrue.Blinking == true) {
													node.startTimer(1000);
												}
												node.setStroke(Number(node.userData.onTrue.LineWidth));
												node.setDashArray(node.userData.onTrue.LineStyle);
												node.setColor(node.userData.onTrue.LineColor);

												node.repaint();
												// 表格数据
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
										}
										// 显示值待定
									}
									break;
								case "True":
									console.log("进入True")
									if (Number(node.userData.Tag.tag_type) == 'boolean') {
										switch (node.userData.types) {
											case "imageComponent":
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}

												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.image.setPath(node.userData.onAlarm.picture);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												break;
											case "buttonComponent":
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.setBackgroundColor(node.userData.onAlarm.FillColor);
												if (node.userData.onAlarm.Text == "") {
													node.setText("报警");
												} else {
													node.setText(node.userData.onAlarm.Text);
												}
												node.setFontColor(node.userData.onAlarm.TextColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);

												break;
											case "basicComponent":
												// console.log("矩形");
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}

												// 修改样式
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.setBackgroundColor(node.userData.onAlarm.FillColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												break;
											case "LineComponent":

												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}
												// 修改样式
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												break;
										}


									} else {
										switch (node.userData.types) {
											case "imageComponent":
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}

												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.image.setPath(node.userData.onAlarm.picture);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "buttonComponent":
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.setBackgroundColor(node.userData.onAlarm.FillColor);
												if (node.userData.onAlarm.Text == "") {
													node.setText(jsonData.value);
												} else {
													node.setText(node.userData.onAlarm.Text);
												}
												node.setFontColor(node.userData.onAlarm.TextColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "basicComponent":
												// console.log("矩形");
												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}

												// 修改样式
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.setBackgroundColor(node.userData.onAlarm.FillColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
											case "LineComponent":

												//闪烁
												node.stopTimer();
												node.userData.BlinkingType = "onAlarm";
												if (node.userData.onAlarm.Blinking == true) {
													node.startTimer(1000);
												}
												// 修改样式
												node.setStroke(Number(node.userData.onAlarm.LineWidth));
												node.setDashArray(node.userData.onAlarm.LineStyle);
												node.setColor(node.userData.onAlarm.LineColor);
												node.repaint();
												websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
												changeTagValueForHighChar(jsonData.value);
												break;
										}

										// 显示值   待定
									}

							}
							break;
						case 1:
							switch (node.userData.types) {
								case "imageComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.image.setPath(node.userData.onDisconnected.picture);

									node.repaint();
									// websocketChangetable(jsonData.tagid, "Refused");
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "buttonComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.setBackgroundColor(node.userData.onDisconnected.FillColor);
									if (node.userData.onDisconnected.Text =="")
										{
											node.setText(jsonData.value);
										}else{
											node.setText(node.userData.onDisconnected.Text);
									}
									node.setFontColor(node.userData.onDisconnected.TextColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "basicComponent":
									console.log("矩形");
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}

									// 修改样式
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.setBackgroundColor(node.userData.onDisconnected.FillColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "LineComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}

									// 修改样式
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
							}
							break;
						case 2:
							switch (node.userData.types) {
								case "imageComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.image.setPath(node.userData.onDisconnected.picture);

									node.repaint();
									// websocketChangetable(jsonData.tagid, "Refused");
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "buttonComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.setBackgroundColor(node.userData.onDisconnected.FillColor);
									if (node.userData.onDisconnected.Text =="")
										{
											node.setText(jsonData.value);
										}else{
											node.setText(node.userData.onDisconnected.Text);
									}
									node.setFontColor(node.userData.onDisconnected.TextColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "basicComponent":
									console.log("矩形");
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}

									// 修改样式
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.setBackgroundColor(node.userData.onDisconnected.FillColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
								case "LineComponent":
									//闪烁
									node.stopTimer();
									node.userData.BlinkingType = "onDisconnected";
									if (node.userData.onDisconnected.Blinking == true) {
										node.startTimer(1000);
									}

									// 修改样式
									node.setStroke(Number(node.userData.onDisconnected.LineWidth));
									node.setDashArray(node.userData.onDisconnected.LineStyle);
									node.setColor(node.userData.onDisconnected.LineColor);
									node.repaint();
									websocketChangetable(jsonData.tagid, jsonData.status, jsonData.isalarm, jsonData.value);
									break;
							}
							break;
					}




				}
			}



		}
	}

}

function doSend(message) {
	if (ws != null) {
		ws.send(JSON.stringify(message));
	}
}

function webSocketClose() {
	if (ws != null) {

		ws.close();
	}
}



function websocketChangetable(tagid, status, alarm, value) {
	$("#qu table tbody tr").find(".havetagid").each(function(index, element) {
		console.log("每个TagID为:"+$(element).text());
		if (Number($(element).text())  == Number(tagid) ) {
			var Tag_type = $(element).parent().find(".havetagtype").text() ;
			
			console.log("status:"+status);
			console.log("alarm:"+alarm)
			console.log("传回的数据:"+Tag_type);
			console.log("value:"+value)
			switch (Number(status)) {
				case 0:
					switch (alarm) {
						case "False":
						console.log('测试灯的关闭')
							if (Tag_type == 'boolean') {
							console.log('测试灯的关闭========')	
								switch (value) {
									case "False":
									// console.log("灯关");
										$(element).parent().find(".tagState").html('正常');
										$(element).parent().find(".tagsValue").html("关");
										break;
									case "True":
									// console.log("灯开");
										$(element).parent().find(".tagState").html('正常');
										$(element).parent().find(".tagsValue").html("开");
										break;
								}
							} else {
								
								$(element).parent().find(".tagState").html("");
								$(element).parent().find(".tagsValue").html(value);
								// state = '<td class = "tagState">开' + value + '</td>';
							}
							break;
						case "True":
							if (Tag_type == 'boolean') {
								$(element).parent().find(".tagState").html('<span class="warn"></span><span class="size_red">报警</span>');
								// $(element).parent().find(".tagsValue").html(value);
								switch (value) {
									case "False":
										$(element).parent().find(".tagsValue").html("关");
										break;
									case "True":
										$(element).parent().find(".tagsValue").html("开");
										break;
								}
							} else {
								$(element).parent().find(".tagState").html('<span class="warn"></span><span class="size_red">报警</span>');
								$(element).parent().find(".tagsValue").html(value);
								// state = '<td class = "tagState">' + '<span class="warn"></span><span class="size_red">' + data[i].value + '</span>' + '</td>';
								// state = '<td class = "tagState">'+data[i].value+'</td>';
							}
							break;
					}
					break;
				case 1:
					$(element).parent().find(".tagState").html('<span class="catch"></span><span class="size_yellow">通信异常</span>');
					$(element).parent().find(".tagsValue").html('--');
					break;
				case 2:
					$(element).parent().find(".tagState").html('<span class="catch"></span><span class="size_yellow">通信异常</span>')
					$(element).parent().find(".tagsValue").html('--');
					break;
			}


		}

	})
	if (TagRealTimevalue.tag_id ==Number(tagid)  )
	 {
	 		TagRealTimevalue.tag_value = value;
	 }

	 // 存储 websocket 推过来的 数据
	 for(var dic in componentIsReadonly){
	 	if (Number(componentIsReadonly[dic].tag_id) == Number(tagid))
	 	 {
	 	 	if (componentIsReadonly[dic].tag_type == "boolean") {
				switch (value) {
					case "False":
						componentIsReadonly[dic].value = 0;
						break;
					case "True":
						componentIsReadonly[dic].value = 1;
				}
			} else {
				componentIsReadonly[dic].value = value;
			}
	 	 	
	 	 	
	 	 }
	 }	
}


/**
 * [webSocket更改 实时数据展示需要的值]
 * @param  {[number]} value [传回的值]
 * 
 */
function changeTagValueForHighChar(value){
	if (webScoketTagID == tagIdForHighChar)
	 {
	 	if (!isNaN(value))
	 	{
	 		tagValueForHighChar =Number(value);
	 	}
	 	
	 }
}










 