// 自定义控件属性
/** 
 * text 标签
 * @author
 * @extend draw2d.shape.basic.Text
 */
var textComponent = draw2d.shape.basic.Text.extend({
    NAME: "textComponent",
    init: function(attr) {
        var _this = this;
        this._super(attr);
        this.attr({
            padding: { left: 10, right: 10 },
            text: '文本',
            stroke: 0,
            fontColor: "#FFFFFF",
            fontSize: 15,
            resizeable: false,
        });


        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(textBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        var data = JSON.parse(textBasic.textData);
        data.routine.name = '文本';
        this.attr({
            userData: data
        });

        this.on("click", function() {
            textBasic.clickMethod(_this);

        });
        // 移动
        this.on("move", function() {
            console.log(123123)
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



// 文本组件
var textBasic = {
    // 自定义控件属性
    labelset: JSON.stringify({
        text: '呵呵',
        fontFamily: '微软雅黑',
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        visible: false,
    }),
    textData: JSON.stringify({
        type: "textComponent", //类型	
        custom: {
            valueType: 'textValueComponent',
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
            visible: false, //是否显示组件(setAlpha(0))
            enable: false, //组件是否可用
            accessLevel: 8, //访问等级 0~15
            hint: { //hover 说明
                flag: false, //是否显示
                hintText: '' //text
            },
            caption: { //组件标题
                flag: false, //是否显示
                capText: 'label' //内容
            },
            readOnly: false, //组件是否为只读
            unit: '' //单位
        },
        defaults: { //该属性用于存储 控件初始化时的状态
            lineWidth: 0,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            fillColor: "none",
            text: '文本',
            alpha: '',
            fontColor: '#FFFFFF',
            // unit:
            blinking: false,
        },
        onTrue: {
            lineWidth: 0,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            fillColor: "none",
            text: '1111111111',
            alpha: '',
            fontColor: '#FFFFFF',
            // unit:
            blinking: false,
        },
        onFalse: {
            lineWidth: 0,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            fillColor: "none",
            text: '',
            alpha: '',
            fontColor: '#FFFFFF',
            // unit:
            blinking: false,
        },
        onAlarm: {
            lineWidth: 0,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            fillColor: "none",
            text: '',
            alpha: '',
            fontColor: '#FFFFFF',
            // unit:
            blinking: false,
        },
        onDisconnected: {
            lineWidth: 0,
            lineColor: "#DDDDDD",
            // lineStyle: null,
            fillColor: "none",
            text: '',
            alpha: '',
            fontColor: '#FFFFFF',
            // unit:
            blinking: false,
        }
    }),
    clickMethod: function(component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.textHideDiv = true;
        // 基本
        setComponentOptions.basePublicSet(component);
        setComponentOptions.basicSet(component);
        setComponentOptions.textSet(component);

        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);

        // 标题
        setComponentOptions.componentCaption(component);
        setComponentOptions.setComponentFlagTrue();
    }
}