/** 
 * @description [控件库]
 */

/****************************************自定义图片*******************************************/
/** 
* image 标签
* @author
* @extend draw2d.shape.basic.Image
*/
var imageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "imageComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/zidingyi.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "",
			fontFamily: "微软雅黑"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});

/*********************************************label*******************************************/
/** 
 * lable 标签 只用于展示无触发动作
 * @author yb
 * @extend draw2d.shape.note.PostIt
 * @Data 2016/5/13 
 */
var LabelComponent = draw2d.shape.note.PostIt.extend({
	NAME: "LabelComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.text = "标签";
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.label = new draw2d.shape.basic.Label({
			text: "Label",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};
		// 选中
		this.on("click", function () {
			// 无触发动作
		})
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/*****************************************line****************************************/
/** 
 * @description [直线] 
 * @extend draw2d.shape.basic.Line
 */
var LineComponent = draw2d.shape.basic.Line.extend({
	NAME: "LineComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});
/******************************************text*********************************************/

/** 
 * text 标签
 * @author yb
 * @extend draw2d.shape.basic.Text
 * @Data 2016/5/16
 */

var textComponent = draw2d.shape.basic.Text.extend({
	NAME: "textComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.text = "输入文本";
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		this.setFontSize(14);
		this.attr({
			padding: { left: 15, right: 15 }
		});

		// 添加标题
		this.label = new draw2d.shape.basic.Label({
			text: ""
			// color: "#0d0d0d",
			// fontColor: "#0d0d0d"
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});


	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/*****************************************基本组件*******************************************/
/** 
 * @description [矩形]
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "rectangleComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [圆角矩形]  
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
	NAME: "RoundedRectangleComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () { };
	},


	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

})

/** 
 * @description [椭圆]  
 * @extend draw2d.shape.basic.Rectangle 
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
	NAME: "EllipseComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);
		// this.setRadius(25);
		// this.setHeight(30);
		this.getOutputPort(0).setVisible(false);
		this.getInputPort(0).setVisible(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () { };
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [多边形]  
 * @extend draw2d.shape.basic.Polygon
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
	NAME: "polygonComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () { };
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});


/** 
 * @description [右箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({
	NAME: "forRightComponent",
	init: function (attr, setter, getter) {
		var _this = this;

		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () { };
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [左箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({
	NAME: "forLeftComponent",
	init: function (attr, setter, getter) {
		var _this = this;
		
		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		var thiss = this;
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");

	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [上箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({
	NAME: "forUpComponent",
	init: function (attr, setter, getter) {
		var _this = this;

		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () { };
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [下箭头]
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({
	NAME: "forDownComponent",
	init: function (attr, setter, getter) {
		var _this = this;

		this._super($.extend({
			width: 30,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [水平双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({
	NAME: "BothArrowHComponent",
	init: function (attr, setter, getter) {
		var _this = this;

		this._super($.extend({
			width: 50,
			height: 30
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [竖直双箭头]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({
	NAME: "BothArrowVComponent",
	init: function (attr, setter, getter) {
		var _this = this;

		this._super($.extend({
			width: 30,
			height: 50
		}, attr), setter, getter);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},

	/**
	 * @private
	 * @returns
	 */
	createSet: function () {
		return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
	},
	onTimer: function () {

	}
});


// 管道
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
	NAME: "conduitCompontent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
})

var conduitCompontentV = draw2d.shape.node.HorizontalBus.extend({
	NAME: "conduitCompontentV",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		// hover
		this.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

		// dbclick
		this.onDoubleClick = function () {};
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
})
/****************************************默认组件********************************************/

/** 
 * @description [开关]
 * @extend draw2d.shape.basic.Rectangle
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "switchComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/switch1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "开关",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [管道]
 * @extend draw2d.shape.basic.Rectangle
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pipingComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/piping1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "管道",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [报警提示灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "WarninglampComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Warninglamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "报警提示灯",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);



		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});

/** 
 * @description [送风机]
 * @extend draw2d.shape.basic.Rectangle
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "blowerfanComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Blowerfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "送风机标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});

	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});


/** 
 * @description [排风机]
 * @extend draw2d.shape.basic.Rectangle
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "exhaustfanComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Exhaustfan1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "排风机标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});


/** 
 * @description [泵]
 * @extend draw2d.shape.basic.Rectangle
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "bengComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/beng1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "泵标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}

});



/** 
 * @description [电动两通阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricTwoWayValveComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve1-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动两通阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电磁阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "SolenoidValveComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve2-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电磁阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电动碟阀]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricButterflyValvesComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/valve3-1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电动蝶阀标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [空气过滤器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirFiltrationComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airfiltration1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气过滤器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [空气加热器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirHeatingComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Airheating1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气加热器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [空气冷却器]
 * @extend draw2d.shape.basic.Rectangle
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "AirCoolerComponent",
	init: function (attr) {
		var _this = this;
		
		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Aircooler1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "空气冷却器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [加湿器]
 * @extend draw2d.shape.basic.Rectangle
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "HumidifierComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidifier1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "加湿器标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [温控面板]
 * @extend draw2d.shape.basic.Rectangle
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "controlPanelComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/controlpanel1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温控面板标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [荧光灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "FluorescentLampComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Fluorescentlamp1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "荧光灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [LED灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "LEDComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/LED1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "LED灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [白炽灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "IncandescentComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Incandescent1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "白炽灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [金卤灯]
 * @extend draw2d.shape.basic.Rectangle
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "MetalHalideComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Metalhalide1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "金卤灯标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [温度]
 * @extend draw2d.shape.basic.Rectangle
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "temperatureComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/temperature1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "温度标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "温度",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});
/** 
 * @description [湿度]
 * @extend draw2d.shape.basic.Rectangle
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "humidityComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/humidity1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "湿度标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "湿度",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom());

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [压力]
 * @extend draw2d.shape.basic.Rectangle
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "pressureComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/pressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压力标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "压力",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [压差]
 * @extend draw2d.shape.basic.Rectangle
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "differentialPressureComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/differentialpressure1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "压差标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "压差",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [液位]
 * @extend draw2d.shape.basic.Rectangle
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "liquidComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/liquid1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液位标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "液位",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [电流]
 * @extend draw2d.shape.basic.Rectangle
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "electricComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/electric1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电流标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "电流",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [电压]
 * @extend draw2d.shape.basic.Rectangle
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "VoltageComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Voltage1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "电压组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "电压",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [频率]
 * @extend draw2d.shape.basic.Rectangle
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "frequencyComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/frequency1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "频率组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);


		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "频率",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [有功功率]
 * @extend draw2d.shape.basic.Rectangle
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "activePowerComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/activepower1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "有功功率组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "有功功率",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [用电量]
 * @extend draw2d.shape.basic.Rectangle
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "ElectricityConsumptionComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Electricityconsumption1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "用电量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "用电量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [液体流量]
 * @extend draw2d.shape.basic.Rectangle
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "levelComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/level1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "液体流量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "液体流量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [气体流量]
 * @extend draw2d.shape.basic.Rectangle
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "GasComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Gas1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "气体流量组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// 控件显示的数值
		this.labelValue = new draw2d.shape.basic.Label({
			text: "气体流量",
		});
		this.labelValue.fontSize = 5;
		this.labelValue.setStroke(0);
		this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [广播]
 * @extend draw2d.shape.basic.Rectangle
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "BroadcastComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/Broadcast1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "广播组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});



/** 
 * @description [枪机]
 * @extend draw2d.shape.basic.Rectangle
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "monitoringComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/monitoring1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "枪机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [球机]
 * @extend draw2d.shape.basic.Rectangle
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "qiujiComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/qiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "球机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [高球机]
 * @extend draw2d.shape.basic.Rectangle
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "highqiujiComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/highqiuji1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "高球机组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


/** 
 * @description [门禁]
 * @extend draw2d.shape.basic.Rectangle
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "EntranceGuardComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/menjin1.png",
			width: 36,
			height: 36
		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

		this.label = new draw2d.shape.basic.Label({
			text: "门禁组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});

/** 
 * @description [探测器]
 * @extend draw2d.shape.basic.Rectangle
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
	NAME: "detectorComponent",
	init: function (attr) {
		var _this = this;

		this._super(attr);
		this.setResizeable(false);
		this.setSelectable(false);
		this.setDraggable(false);

		this.image = new draw2d.shape.basic.Image({
			path: "images/icon/icon/tance1.png",
			width: 36,
			height: 36,

		});
		this.add(this.image, new draw2d.layout.locator.CenterLocator(this));
		this.image.setRotationAngle(90);


		this.label = new draw2d.shape.basic.Label({
			text: "探测器组价组件标题",
		});
		this.add(this.label, new draw2d.layout.locator.TopLocator(this));
		this.label.setVisible(false);

		// hover
		this.image.onMouseEnter = function () {
			monitoringVue.hoverMethod(_this, true);
		};
		this.image.onMouseLeave = function () {
			monitoringVue.hoverMethod(_this, false);
		};

		// click
		this.image.on("click", function () {
			monitoringVue.comClickMethod(_this, false);
		});
	},
	onTimer: function () {
		monitoringVue.flashMethod(this);
	}
});


