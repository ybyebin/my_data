$(function() {
	// var loading = $('.progress');
	for (var i = 0; i <= 2; i++) {
		(function(i) {
			setTimeout(function() {
				var widths = 18 * (i+0.5+Math.random()) + '%';
				contentp.css('width', widths)
				if (i === 2) {
					$('.section').hide();
					$('.first').show();
				}

			}, i * 1000);
		})(i);
	}
});

// 
// 
// 
// 

var h = $('.loadbg').height();

console.log(h)
var contentp = $('.content');
switch(Number(h)){
	case 41:
	contentp.addClass('content41');
	break;
	case 46:
	contentp.addClass('content46');
	break;
		case 48:
		contentp.addClass('content48');
	break;
		case 53:
		contentp.addClass('content53');
		$('.bar').addClass('bar53');
	break;
		case 66:
		contentp.addClass('content66');
		$('.bar').addClass('bar66');
	break;

}

var data = [
	'ws01.png',
	// 'ws02.png',
	// 'ws03.png',
	// 'ws04.png',
	// 'ws05.png',
	// 'ws06.png',
	// 'ws07.png',
	'ws08.png',
	// 'ws09.png',
	// 'ws10.png',
	// 'ws11.png',
	// 'ws12.png',
	'ws13.png',
	// 'ws14.png',
	'ws39.png',
	// 'ws15.png',
	// 'ws16.png',
	// 'ws17.png',
	// 'ws18.png',
	// 'ws19.png',
	// 'ws20.png',
	// 'ws21.png',
	// 'ws22.png',
	// 'ws23.png',
	// 'ws24.png',
	// 'ws25.png',
	// 'ws26.png',
	// 'ws27.png',
	// 'ws28.png',
	// 'ws29.png',
	// 'ws30.png',
	// 'ws31.png',
	// 'ws32.png',
	// 'ws33.png',
	// 'ws34.png',
	// 'ws35.png',
	// 'ws36.png',
	// 'ws37.png',
	// 'ws38.png',
	
];



var hong = [
	'0',
	// '1',
	'2',
	// '3',
	// '4',
	// '5',
	// '6',
	'7',
	// '8',
	'9',
	// '10',
	// '11',
	// '12',
	// '13',
	// '14',
	// '15',
	// '16',
	// '17',
];
var srcs = 'data:image/png;base64,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'
var hand1 = '<img class="pulse1" src="' + srcs + '">';
var hand2 = '<img class="pulse2" src="' + srcs + '">';
var hand3 = ' <img class="pulse3" src="' + srcs + '">';
$('#second').append(hand1);
$('#fourth').append(hand2);
$('#six').append(hand3);

var downsrc = 'data:image/png;base64,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';
$('#down-game1,#down-game2').prop('src', downsrc);


var AD = {
	clickNum: 0,
	img_url: 'images/wash01/',
	delayTime: 700, //动画开始延时时间
	showTime: 200, //切换图片时间单位
	nextPageTime: 400, //动画完胜切换页面延时,
	moveMax: 35, //最大移动距离
	amiStartTime:600,
	changePage: function() {
		$('.section').hide();
		$('.second').show();
	},
	// downGame:function(){ //这里添加下载地址
	// 	ExitApi.exit();
	// }

}





$('#play-again').on('click',function(){
	$('.section').hide();
	$('.first').show();
	$('.yellows').removeClass('yellow-ani');
	$('.reds').removeClass('red-ani');
	$('.flash').removeClass('red-ani');
	$('.fflash3').removeClass('purple-ani');
	// $('.pulse1 ,.pulse2 ,.pulse3').show();
	// $('.f-flash .f-flash3 .f-flash7 .f-flash7-h').prop('src', 'images/zi/17.png');

	$('#hm-wash-seven').prop('src', 'images/shower/0.png');
	$('.fruit-div').hide();
	$('.btn-div-t').hide();
	$('.allshow').hide();

	AD.clickNum += 1;
})






$('#first').on('click', function() {
	AD.changePage();
});


function getDom(str) {
	return document.getElementById(str);
}


function hong1(obj) {
	var startX, endX, left;
	var objs = $('#' + obj);
	function mousedowns() {
		objs.bind('mousedown', function(e) {
			// 鼠标按下捕获此时位置
			var e = e || event;
			e.preventDefault();
			startX = e.pageX;
			left = objs.offset().left;
			console.log('left:' + left)
			console.log('位置：' + startX)
				//鼠标按下,绑定鼠标移动事件
			objs.bind('mousemove', function(e) {
				var e = e || event;
				e.preventDefault();
				console.log('123:' + e.pageX)
				endX = e.pageX;
				var chas = endX- startX;
				var cha = (endX- startX) / 5;
				console.log('cha:'+chas)
				var lefts = 40 + cha;
				if (chas > 0 && chas < AD.moveMax) {
					objs.css({
						"margin-left": lefts + '%'
					});
				}
				console.log('left:' + objs.offset().left)

			});
		});
	}

	function mouseups(){
		objs.bind('mouseup mouseleave', function(e) {
			objs.unbind('mousemove');
			console.log('手离开')
				//该div的子标签
			var chaX = endX - Number(startX);
			if (chaX > 8 && chaX < 90) {
				pageTwoOperation();
				objs.css({
					'margin-left': '40%'
				});
			} else {
				objs.css({
					'margin-left': '40%'
				})
			}
			startX = endX =left = 0;
		});
	}
	mousedowns();
	mouseups();
}



function green(obj) {
	var startY, endY, top;
	var objs = $('#' + obj);
	function mousedowns() {
		objs.bind('mousedown', function(e) {
			// 鼠标按下捕获此时位置
			var e = e || event;
			e.preventDefault()  
			startY = e.pageY;
			top = objs.offset().top;
			console.log('left:' + top)
			console.log('位置：' + startY)
				//鼠标按下,绑定鼠标移动事件
			objs.bind('mousemove', function(e) {
				var e = e || event;
				e.preventDefault();
				console.log('123:' + e.pageX)
				endY = e.pageY;
				var cha = (endY - startY) / 5;
				// console.log('cha:'+cha)
				var tops = 114.2 + cha;
				if (cha > 0 && cha < AD.moveMax) {
					objs.css({
						"margin-top": tops + '%'
					});
				}
				console.log('left:' + objs.offset().left)

			});
		});
	}

	function mouseups(){
		objs.bind('mouseup mouseleave', function(e) {
			objs.unbind('mousemove');
			console.log('手离开')
				//该div的子标签
			var chaX = endY - Number(startY);
			if (chaX > 8 && chaX < 90) {
				pageFourOperation();
				objs.css({
					'margin-top': '114.2%'
				});
			} else {
				objs.css({
					'margin-top': '114.2%'
				})
			}
			startY = endY = top = 0;
		});
	}
	mousedowns();
	mouseups();
}

function cai(obj) {
	var startY, endY, top;
	var objs = $('#' + obj);
	function mousedowns() {
		objs.bind('mousedown', function(e) {
			// 鼠标按下捕获此时位置
			var e = e || event;
			e.preventDefault()  
			startY = e.pageY;
			top = objs.offset().top;
			console.log('left:' + top)
			console.log('位置：' + startY)
				//鼠标按下,绑定鼠标移动事件
			objs.bind('mousemove', function(e) {
				var e = e || event;
				e.preventDefault();
				console.log('123:' + e.pageX)
				endY = e.pageY;
				var cha = (endY - startY) / 5;
				// console.log('cha:'+cha)
				var tops = 114.2 + cha;
				if (cha > 0 && cha < AD.moveMax) {
					objs.css({
						"margin-top": tops + '%'
					});
				}
				console.log('left:' + objs.offset().left)

			});
		});
	}

	function mouseups(){
		objs.bind('mouseup mouseleave', function(e) {
			objs.unbind('mousemove');
			console.log('手离开')
				//该div的子标签
			var chaX = endY - Number(startY);
			if (chaX > 8 && chaX < 90) {
				pageSixOpertion();
				objs.css({
					'margin-top': '114.2%'
				});
			} else {
				objs.css({
					'margin-top': '114.2%'
				})
			}
			startY = endY = top = 0;
		});
	}
	mousedowns();
	mouseups();
}








// 红色
function moveHong(obj) {
	var startX, endX, left;
	var objs = $('#'+obj);
	function touchStart(event) {

		var touch = event.touches[0];
		startX = touch.pageX;
		left = $('#' + obj).offset().left;
		// objs.css('z-index',String(20+AD.clickNum+1));
	}
		function touchMove(event) {
			var touch = event.touches[0];
			endX = touch.pageX;
			var chaX = endX - Number(startX);
			var m = parseInt(chaX / 5);
			var lefts = 40 + m;
			if (chaX > 0 && chaX < AD.moveMax) {
				objs.css({
					"margin-left": lefts + '%'
				});
			}
		}

	function touchEnd(event) {
		var chaX = endX - Number(startX);
		if (chaX > 5 && chaX < 90) {
			pageTwoOperation();
			objs.css({
				'margin-left': '40%'
			});
		} else {
			objs.css({
				'margin-left': '40%'
			})
		}
		startX = endX =left = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}

function moveGreenTwo(obj) {
	var  startY, endY, top;
	var objs = $('#'+obj);

	function touchStart(event) {

		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;

	}
	function touchMove(event) {
		var touch = event.touches[0];
		
		endY = touch.pageY;
	
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114.2 + m;
				if (chaY > 0 && chaY < AD.moveMax) {
					objs.css({
						"margin-top": tops + '%'
					});
				}
	}

	function touchEnd(event) {
		var chaY = endY - Number(startY);
		console.log('=====' + chaY)
		if (chaY > 5 && chaY < 90) {
			pageFourOperation();
			$('#' + obj).css({
				'margin-top': '114.2%'
			});
			
		} else {
			$('#' + obj).css({
				'margin-top': '114.2%'
			})
		}
		startY = endY = top = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}

// 彩虹
function moveCai(obj) {
	var startY, endY, top;
	var objs = $('#'+obj);
	function touchStart(event) {
		var touch = event.touches[0];
		startY = touch.pageY;
		top = $('#' + obj).offset().top;

		// objs.css('z-index',String(20+AD.clickNum+1));
	}

	function touchMove(event) {
		var touch = event.touches[0];
		endY = touch.pageY;
		var chaY = endY - Number(startY);
		var m = parseInt(chaY / 3);
		var tops = 114.2 + m;
		if (chaY > 0 && chaY < AD.moveMax) {
			$('#' + obj).css({
				'margin-top': tops + "%",
			})
		}
	}

	function touchEnd(event) {
		var chaY = endY - Number(startY);
		if (chaY > 5 && chaY < 90) {
			pageSixOpertion()
			$('#' + obj).css({
				'margin-top': '114.2%'
			})

		} else {
			$('#' + obj).css({
				'margin-top': '114.2%'
			})
		}
		 startY  = endY = top  = 0;
	}
	var doms =  getDom(obj);
	doms.addEventListener("touchstart", touchStart, false);
	doms.addEventListener("touchmove", touchMove, false);
	doms.addEventListener("touchend", touchEnd, false);
}

hong1('f-move-1');
green('ff-move-1');
cai('fs-move-1');
moveHong('f-move-1');
moveGreenTwo('ff-move-1');
moveCai('fs-move-1');



// 阻止默认事件(水果切换)
function stopMove(id) {
	document.getElementById(id).addEventListener("touchstart", function(e) {
		e.preventDefault();
	}, false);
}
stopMove("second");
stopMove("fourth");
stopMove("six");




// 页面2 水果切换 触发操作
function pageTwoOperation() {
	$('.section').hide();
	$('.third').show();
	// $('#change-f-2').addClass('slideInLeft');
	// $('#change-f-1').addClass('slideInLeft2');
	var hong_img = $('.flash');
	var xz = $('#hm-wash');
	setTimeout(function() {
		console.log(hong.length)
		hong_img.addClass('red-ani');
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					xz.prop('src', AD.img_url + data[i - 1]);
					if (i === hong.length-1) {
						setTimeout(function(){
							$('.section').hide();
							$('.fourth').show();
						},AD.nextPageTime)
						
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}
// 页面4 水果切换 触发操作
function pageFourOperation() {
	$('.section').hide();
	$('.five').show();
	// $('#change-five-2').addClass('slideInUp');
	// $('#change-five-1').addClass(' slideInUps');
	var zi_img = $('.fflash3');
	var xz = $('#hm-wash2');
	// 此处 复用 hong
	setTimeout(function() {
		zi_img.addClass('purple-ani');
		for (var i = 1; i < hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					
					xz.prop('src', AD.img_url + data[i - 1]);
					if (i === hong.length-1) {
						setTimeout(function(){
							$('.section').hide();
							$('.six').show();
						},AD.nextPageTime)
						
					
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}
// 页面6 水果切换 触发操作
function pageSixOpertion(){
	$('.section').hide();
	$('.seven').show();
	var huang_img = $('.yellows');
	var hong_img = $('.reds');
	setTimeout(function() {
		hong_img.addClass('red-ani');
		huang_img.addClass('yellow-ani');
		
		for (var i = 1; i <= hong.length; i++) {
			(function(i) {
				setTimeout(function() {
					$('#hm-wash-seven').prop('src', 'images/shower/' + hong[i - 1] + '.png');
					if (i === hong.length) {
						setTimeout(function() {
							$('.allshow').show();
							// $('.')
							if (AD.clickNum === 3) {
								$('.btn-div').hide();
								$('.clicka2').css('display','block');
								$('#down-game2').show();
							}else{
								$('.btn-div').show();
								$('.clicka1').css('display','block');
								$('#down-game1').show();
							}
						}, AD.nextPageTime)
					}
				}, i * AD.showTime);
			})(i);
		}
	}, AD.amiStartTime)
}
