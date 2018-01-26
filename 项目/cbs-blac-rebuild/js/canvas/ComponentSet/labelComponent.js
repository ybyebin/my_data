/** 
 * lable 标签 只用于展示无触发动作
 * @author yb
 * @extend draw2d.shape.note.PostIt
 * @Data 2016/5/13 
 */
var LabelComponent = draw2d.shape.note.PostIt.extend({
    NAME: "LabelComponent",
    init: function(attr) {
        var _this = this;
        this._super(attr);
        this.attr({
            padding: { left: 10, right: 10 },
            radius: 2,
            text: '标签',
        });



        var data = {
            type: "labelComponent", //类型
            custom: {
                valueType: 'valueComponent', //显示控件绑定的 tag 的值
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
                name: 'lable',
                description: '', //组件描述
                visible: false, //是否显示组件(setAlpha(0))
                enable: false, //组件是否可用
                accessLevel: 8, //访问等级 0~15
                hint: { //hover 说明
                    flag: false, //是否显示
                    hintText: '该组件用于显示文本,没有状态属性' //text
                },
                caption: { //组件标题
                    flag: false, //是否显示
                    capText: 'label' //内容
                },
                readOnly: false, //组件是否为只读
            },

            defaults: { //该属性用于存储 控件初始化时的状态
                lineWidth: 1,
                lineColor: "#FFFFFF",
                fillColor: "#5B5B5B",
                fontColor: "#FFFFFF",
                // text:"",
                blinking: false,
            },
        };
        this.attr({
            userData: data
        });

        // this.label = new draw2d.shape.basic.Label({
        //     text: "",
        //     fontFamily: "微软雅黑"
        // });
        // this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        // this.label.setVisible(false);


        // 选中
        this.on("click", function() {
            labelBasic.clickMethod(_this);
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


// label组件
var labelBasic = {
    // 自定义控件属性
    labelData: '', //label是特殊控件只有一个  该属性直接写进组件
    clickMethod: function(component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.labelHideDiv = true;
        // 基本(公共)
        setComponentOptions.basePublicSet(component);
        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);

        setComponentOptions.labelSet(component);
        setComponentOptions.setComponentFlagTrue();
    }
}