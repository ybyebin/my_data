/** 
 * 矩形
 * @extend draw2d.shape.basic.Rectangle
 */
// var rectangleComponent = draw2d.shape.basic.Rectangle.extend({
var rectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "rectangleComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            stroke: 0,
            bgColor: rectangle.fillColor
        }, attr));

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '矩形';
        data.custom.havepoint = true;
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },

    onTimer: function() {
        setComponentOptions.flashMethod(this);
    },

});



/** 
 * RoundedRectangle Component  圆角矩形
 * @extend draw2d.shape.basic.Rectangle
 */
// var RoundedRectangleComponent = draw2d.shape.basic.Rectangle.extend({
var RoundedRectangleComponent = draw2d.shape.node.Between.extend({
    NAME: "RoundedRectangleComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            stroke: 0,
            radius: 10,
            bgColor: rectangle.fillColor,
        }, attr));

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '圆角矩形';
        data.custom.havepoint = true;
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
})

/** 
 * Ellipse Component  椭圆
 * @extend draw2d.shape.basic.rectangle
 */
var EllipseComponent = draw2d.shape.node.Between.extend({
    NAME: "EllipseComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            stroke: 0,
            height: 30,
            radius: 25,
            bgColor: rectangle.fillColor
        }, attr));

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '椭圆';
        data.custom.havepoint = true;
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 * Polygon Component 多边形
 * @extend draw2d.shape.basic.Polygon
 */
var polygonComponent = draw2d.shape.basic.Polygon.extend({
    NAME: "polygonComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            stroke: 0,
            bgColor: rectangle.fillColor,
        }, attr));

        // var w = this.width;
        // var h = this.height;

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '多边形';
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗 
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }

});


/** 
 * BothArrow Component  [左右方向]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowHComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowHComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 50,
            height: 30,
        }, attr), setter, getter);

        this.setBackgroundColor(rectangle.fillColor); //背景颜色	


        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '水平双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            console.log(123)
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,15L20,0V10H30V0L50,15L30,30V20H20V30L0,15z");
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }

});



/** 
 * BothArrow Component  [上下方向]
 * @extend draw2d.shape.icon.Icon
 */
var BothArrowVComponent = draw2d.shape.icon.Icon.extend({
    NAME: "BothArrowVComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 30,
            height: 50
        }, attr), setter, getter);
        this.setBackgroundColor(rectangle.fillColor); //背景颜色

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '垂直双箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            // console.log(123)
            // console.log("颜色为:"+thiss.getColor().hash())
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M15,0L30,20H20V30H30L15,50L0,30H10V20H0L15,0z");
    },

    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 * forRightComponent 向右
 * @extend draw2d.shape.icon.Icon
 */
var forRightComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forRightComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor(rectangle.fillColor); //背景颜色

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '右箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            // console.log(123)
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };

    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M0,10H10V0L30,15L10,30V20H0V10z");
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 * forLeftComponent 向左
 * @extend draw2d.shape.icon.Icon
 */
var forLeftComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forLeftComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor(rectangle.fillColor); //背景颜色

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '左箭头';
        this.attr({
            userData: data
        });

        this.onDoubleClick = function() {
            // console.log(123)
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M30,20H20V30L0,15L20,0V10H30V20z");
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/**  
 * forUpComponent  向上
 * @extend draw2d.shape.icon.Icon
 */
var forUpComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forUpComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);
        this.setBackgroundColor(rectangle.fillColor); //背景颜色

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '上箭头';
        this.attr({
            userData: data
        });


        this.onDoubleClick = function() {
            console.log(123)
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,30V20H0L15,0L30,20H20V30H10z");
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 * forDownComponent  向下
 * @extend draw2d.shape.icon.Icon
 */
var forDownComponent = draw2d.shape.icon.Icon.extend({
    NAME: "forDownComponent",
    init: function(attr, setter, getter) {
        var _this = this;
        this._super($.extend({
            width: 30,
            height: 30
        }, attr), setter, getter);

        this.setBackgroundColor(rectangle.fillColor); //背景颜色

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '下箭头';
        this.attr({
            userData: data
        });



        this.onDoubleClick = function() {
            console.log(123)
        };

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },

    /**
     * @private
     * @returns
     */
    createSet: function() {
        return this.canvas.paper.path("M10,0V10H0L15,30L30,10H20V0H10z");
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  conduitCompontent  自定义管道
 */
var conduitCompontent = draw2d.shape.node.HorizontalBus.extend({
    NAME: "conduitCompontent",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            width: 100,
            height: 50,
            stroke: 0,
            alpha: 1,
            bgColor: rectangle.fillColor
        }, attr));

        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '管道';
        data.onlytype = 'conduitCompontent'; //本控件单独属性(区分自己单独标志)
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
            canvasVue.hidediv.conduitHideDiv = true;
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });

        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });

        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});
/** 
 *  conduitCompontent  自定义管道
 */
var conduitCompontentV = draw2d.shape.node.VerticalBus.extend({
    NAME: "conduitCompontentV",
    init: function(attr) {
        var _this = this;
        this._super($.extend({
            width: 50,
            height: 100,
            stroke: 0,
            bgColor: rectangle.fillColor
        }, attr));


        // 初始化 控件属性
        var data = JSON.parse(rectangle.rectangleData);
        data.routine.name = '管道';
        data.onlytype = 'conduitCompontent'; //本控件单独属性(区分自己单独标志)
        // 初始化 控件属性
        this.attr({
            userData: data
        });

        // 选中
        this.on("click", function() {
            rectangle.clickMethod(_this);
            canvasVue.hidediv.conduitHideDiv = true;
        });

        // 缩放
        this.on("resize", function() {
            setComponentOptions.componentOnResizeMethod(_this);
        });
        // 移动
        this.on("move", function() {
            setComponentOptions.componentOnMoveMethod(_this);
        });
        // 悬浮窗
        this.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});
// 基础组件
var rectangle = {
    fillColor: '#35C99D',
    // 自定义控件属性
    rectangleData: JSON.stringify({
        type: "basicComponent", //类型
        custom: {
            newCreat: true, //  用于在拖拽组件时判断(是否新拖拽的控件)
            editSatus: 'defaults', //组件正在编辑的属性(default/ontrue/onfalse/onalarm/ondisc) 
            blinkingType:'defaults',//监控画面 用于 组件闪烁 判断标志  
        },
        tag: {
            tag_id: -1,
            tag_type: -1,
            tag_name: "",
            is_readonly: false,
            bingding_status: 0, //0 默认状态,1 已经绑定,2 绑定错误
            status: 'default', //该组件绑定tag 的状态(用于监控画面)

        },
        routine: {
            name: '',
            description: '', //组件描述
            visible: false, //隐藏组件(setAlpha(0))
            enable: false, //不可用
            accessLevel: 8, //访问等级 0~15
            hint: { //hover 说明
                flag: false, //是否显示
                hintText: '' //text
            },
            readOnly: false, //组件是否为只读
        },
        defaults: { //该属性用于存储 控件初始化时的状态
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#35C99D",
            alpha: 1,
            blinking: false,
        },
        onTrue: {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#35C99D",
            alpha: 1,
            blinking: false,
        },
        onFalse: {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#35C99D",
            alpha: 1,
            blinking: false,
        },
        onAlarm: {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#35C99D",
            alpha: 1,
            blinking: false,
        },
        onDisconnected: {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#35C99D",
            alpha: 1,
            blinking: false,
        }
    }),
    // 点击方法
    clickMethod: function(component) {
        setComponentOptions.setComponentFlagFalse();

        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.basicHideDiv = true;

        // 基本(公共)
        setComponentOptions.basePublicSet(component);
        // 基本
        setComponentOptions.basicSet(component);
        // 大小
        setComponentOptions.componentSize(component);
        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);
        // 基本图形  专属方法
        setComponentOptions.rectangleSet(component);

        setComponentOptions.setComponentFlagTrue();
    },

}