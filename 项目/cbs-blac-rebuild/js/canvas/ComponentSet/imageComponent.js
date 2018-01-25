/** 
 * image 标签
 * @author
 * @extend draw2d.shape.basic.Image
 */
var imageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "imageComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(imgBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl + "zidingyi.png";
        this.image = new draw2d.shape.basic.Image({
            path: imgBaseUrl,
            width: imgBasic.width,
            height: imgBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        this.label = new draw2d.shape.basic.Label({
            text: "",
            fontFamily: "微软雅黑"
        });
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));
        this.label.setVisible(false);
        var data = {
            type: "customImageComponent", //类型
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
                caption: { //组件标题
                    flag: false, //是否显示
                    capText: '自定义图片控件' //内容
                },
                readOnly: false, //组件是否为只读
            },


            defaults: { //该属性用于存储 控件初始化时的状态
                lineWidth: 0,
                lineColor: imgBasic.lineColor,
                fillColor: imgBasic.fillColor,
                blinking: false,
                alpha: 0,
                picture: imgBaseUrl
            },
            onTrue: {
                lineWidth: 0,
                lineColor: imgBasic.lineColor,
                fillColor: imgBasic.fillColor,
                alpha: 0,
                blinking: false,
                picture: imgBaseUrl
            },
            onFalse: {
                lineWidth: 0,
                lineColor: imgBasic.lineColor,
                fillColor: imgBasic.fillColor,
                alpha: 0,
                blinking: false,
                picture: imgBaseUrl
            },
            onAlarm: {
                lineWidth: 0,
                lineColor: imgBasic.lineColor,
                fillColor: imgBasic.fillColor,
                alpha: 0,
                blinking: false,
                picture: imgBaseUrl
            },
            onDisconnected: {
                lineWidth: 0,
                lineColor: imgBasic.lineColor,
                fillColor: imgBasic.fillColor,
                alpha: 0,
                blinking: false,
                picture: imgBaseUrl
            }
        };
        this.attr({
            userData: data
        });


        // this.on("click", function () {
        //     imgBasic.clickMethod(_this);
        // });

        this.image.on("click", function() {
            imgBasic.clickMethod(_this);
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
        this.image.onMouseEnter = function() {
            setComponentOptions.showTooltips(_this);
        };
        this.image.onMouseLeave = function() {
            setComponentOptions.hideTooltips();
        };

        /**
         *	双击方法----forexample--选择图片
         */
        this.on("dblclick", function() {});
    },

    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }

})



// 自定义图片组件
var imgBasic = {
    // 自定义控件属性
    lineColor: '#000000',
    fillColor: '#35C99D',
    width: 36,
    height: 36,
    defaultset: JSON.stringify({
        bgColor: '#35C99D',
        width: 36,
        height: 36,
        stroke: 0,
        alpha: 0
    }),


    imgData: '', //img是特殊控件只有一个  该属性直接写进组件
    clickMethod: function(component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.imgHideDiv = true;
        // 基本
        setComponentOptions.basePublicSet(component);
        setComponentOptions.basicSet(component);
        // 大小
        setComponentOptions.componentSize(component);
        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);
        // 标题
        setComponentOptions.componentCaption(component);

        // 此处调用 基本图形方法设置(透明度和填充颜色)
        setComponentOptions.rectangleSet(component);
        // 图片url
        setComponentOptions.imageSet(component);


        setComponentOptions.setComponentFlagTrue();
    }
}