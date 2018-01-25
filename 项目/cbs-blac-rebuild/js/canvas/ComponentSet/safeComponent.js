/** 
 *  switchComponent  开关
 */
var switchComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "switchComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "switch1.png",
            urlTwo: imgBaseUrl + 'switch2.png',
            urlThree: imgBaseUrl + 'switch3.png',
            urlFour: imgBaseUrl + 'switch4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '开关');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }

});

/** 
 *  pipingComponent  管道
 */
var pipingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pipingComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        //图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "piping1.png",
            urlTwo: imgBaseUrl + 'piping2.png',
            urlThree: imgBaseUrl + 'piping3.png',
            urlFour: imgBaseUrl + 'piping4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '管道');
        this.attr({
            userData: data
        });
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  WarninglampComponent  报警提示灯
 */
var WarninglampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "WarninglampComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Warninglamp1.png",
            urlTwo: imgBaseUrl + 'Warninglamp2.png',
            urlThree: imgBaseUrl + 'Warninglamp3.png',
            urlFour: imgBaseUrl + 'Warninglamp4.png'
        }

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '报警提示灯');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  blowerfanComponent  送风机
 */
var blowerfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "blowerfanComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Blowerfan1.png",
            urlTwo: imgBaseUrl + 'Blowerfan2.png',
            urlThree: imgBaseUrl + 'Blowerfan3.png',
            urlFour: imgBaseUrl + 'Blowerfan4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '送风机');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  exhaustfanComponent  排风机
 */
var exhaustfanComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "exhaustfanComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Exhaustfan1.png",
            urlTwo: imgBaseUrl + 'Exhaustfan2.png',
            urlThree: imgBaseUrl + 'Exhaustfan3.png',
            urlFour: imgBaseUrl + 'Exhaustfan4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '排风机');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  bengComponent  泵
 */
var bengComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "bengComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "beng1.png",
            urlTwo: imgBaseUrl + 'beng2.png',
            urlThree: imgBaseUrl + 'beng3.png',
            urlFour: imgBaseUrl + 'beng4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '泵');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  ElectricTwoWayValveComponent  电动两通阀
 */
var ElectricTwoWayValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricTwoWayValveComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "valve1-1.png",
            urlTwo: imgBaseUrl + 'valve1-2.png',
            urlThree: imgBaseUrl + 'valve1-3.png',
            urlFour: imgBaseUrl + 'valve1-4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '电动两通阀');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  SolenoidValveComponent  电磁阀
 */
var SolenoidValveComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "SolenoidValveComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "valve2-1.png",
            urlTwo: imgBaseUrl + 'valve2-2.png',
            urlThree: imgBaseUrl + 'valve2-3.png',
            urlFour: imgBaseUrl + 'valve2-4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '电磁阀');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  ElectricButterflyValvesComponent  电动蝶阀
 */
var ElectricButterflyValvesComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricButterflyValvesComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "valve3-1.png",
            urlTwo: imgBaseUrl + 'valve3-2.png',
            urlThree: imgBaseUrl + 'valve3-3.png',
            urlFour: imgBaseUrl + 'valve3-4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '电动蝶阀');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  AirFiltrationComponent  空气过滤器
 */
var AirFiltrationComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirFiltrationComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Airfiltration1.png",
            urlTwo: imgBaseUrl + 'Airfiltration2.png',
            urlThree: imgBaseUrl + 'Airfiltration3.png',
            urlFour: imgBaseUrl + 'Airfiltration4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '空气过滤器');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  AirHeatingComponent  空气加热器
 */
var AirHeatingComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirHeatingComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Airheating1.png",
            urlTwo: imgBaseUrl + 'Airheating2.png',
            urlThree: imgBaseUrl + 'Airheating3.png',
            urlFour: imgBaseUrl + 'Airheating4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '空气加热器');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  AirCoolerComponent  空气冷却器
 */
var AirCoolerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "AirCoolerComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Aircooler1.png",
            urlTwo: imgBaseUrl + 'Aircooler2.png',
            urlThree: imgBaseUrl + 'Aircooler3.png',
            urlFour: imgBaseUrl + 'Aircooler4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '空气冷却器');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  HumidifierComponent  加湿器
 */
var HumidifierComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "HumidifierComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "humidifier1.png",
            urlTwo: imgBaseUrl + 'humidifier2.png',
            urlThree: imgBaseUrl + 'humidifier3.png',
            urlFour: imgBaseUrl + 'humidifier4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '加湿器');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  controlPanelComponent  温控面板
 */
var controlPanelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "controlPanelComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "controlpanel1.png",
            urlTwo: imgBaseUrl + 'controlpanel2.png',
            urlThree: imgBaseUrl + 'controlpanel3.png',
            urlFour: imgBaseUrl + 'controlpanel4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '温控面板');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);

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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  FluorescentLampComponent  荧光灯
 */
var FluorescentLampComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "FluorescentLampComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Fluorescentlamp1.png",
            urlTwo: imgBaseUrl + 'Fluorescentlamp2.png',
            urlThree: imgBaseUrl + 'Fluorescentlamp3.png',
            urlFour: imgBaseUrl + 'Fluorescentlamp4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '荧光灯');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  LEDComponent  LED灯
 */
var LEDComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "LEDComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "LED1.png",
            urlTwo: imgBaseUrl + 'LED2.png',
            urlThree: imgBaseUrl + 'LED3.png',
            urlFour: imgBaseUrl + 'LED4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, 'LED灯');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);

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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  IncandescentComponent  白炽灯
 */
var IncandescentComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "IncandescentComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Incandescent1.png",
            urlTwo: imgBaseUrl + 'Incandescent2.png',
            urlThree: imgBaseUrl + 'Incandescent3.png',
            urlFour: imgBaseUrl + 'Incandescent4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '白炽灯');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  MetalHalideComponent  金卤灯
 */
var MetalHalideComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "MetalHalideComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Metalhalide1.png",
            urlTwo: imgBaseUrl + 'Metalhalide2.png',
            urlThree: imgBaseUrl + 'Metalhalide3.png',
            urlFour: imgBaseUrl + 'Metalhalide4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '金卤灯');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  temperatureComponent  温度
 */
var temperatureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "temperatureComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "temperature1.png",
            urlTwo: imgBaseUrl + 'temperature2.png',
            urlThree: imgBaseUrl + 'temperature3.png',
            urlFour: imgBaseUrl + 'temperature4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "温度",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '温度');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});
/** 
 *  humidityComponent  湿度
 */
var humidityComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "humidityComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "humidity1.png",
            urlTwo: imgBaseUrl + 'humidity2.png',
            urlThree: imgBaseUrl + 'humidity3.png',
            urlFour: imgBaseUrl + 'humidity4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "湿度",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '湿度');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);

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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  pressureComponent  压力
 */
var pressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "pressureComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "pressure1.png",
            urlTwo: imgBaseUrl + 'pressure2.png',
            urlThree: imgBaseUrl + 'pressure3.png',
            urlFour: imgBaseUrl + 'pressure4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "压力",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '压力');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  differentialPressureComponent  压差
 */
var differentialPressureComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "differentialPressureComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "differentialpressure1.png",
            urlTwo: imgBaseUrl + 'differentialpressure2.png',
            urlThree: imgBaseUrl + 'differentialpressure3.png',
            urlFour: imgBaseUrl + 'differentialpressure4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "压差",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '压差');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);

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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  liquidComponent  液位
 */
var liquidComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "liquidComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "liquid1.png",
            urlTwo: imgBaseUrl + 'liquid2.png',
            urlThree: imgBaseUrl + 'liquid3.png',
            urlFour: imgBaseUrl + 'liquid4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "液位",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '液位');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  electricComponent  电流
 */
var electricComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "electricComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "humidity1.png",
            urlTwo: imgBaseUrl + 'humidity2.png',
            urlThree: imgBaseUrl + 'humidity3.png',
            urlFour: imgBaseUrl + 'humidity4.png'
        };


        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "电流",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '电流');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  VoltageComponent  电压
 */
var VoltageComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "VoltageComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Voltage1.png",
            urlTwo: imgBaseUrl + 'Voltage2.png',
            urlThree: imgBaseUrl + 'Voltage3.png',
            urlFour: imgBaseUrl + 'Voltage4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "电压",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '电压');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  frequencyComponent  频率
 */
var frequencyComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "frequencyComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "frequency1.png",
            urlTwo: imgBaseUrl + 'frequency2.png',
            urlThree: imgBaseUrl + 'frequency3.png',
            urlFour: imgBaseUrl + 'frequency4.png'
        };


        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "频率",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '频率');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  activePowerComponent  有功功率
 */
var activePowerComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "activePowerComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));


        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "activepower1.png",
            urlTwo: imgBaseUrl + 'activepower2.png',
            urlThree: imgBaseUrl + 'activepower3.png',
            urlFour: imgBaseUrl + 'activepower4.png'
        };


        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "有功功率",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '有功功率');
        this.attr({
            userData: data
        });

        // 选中 
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  ElectricityConsumptionComponent  用电量
 */
var ElectricityConsumptionComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "ElectricityConsumptionComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));


        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Electricityconsumption1.png",
            urlTwo: imgBaseUrl + 'Electricityconsumption2.png',
            urlThree: imgBaseUrl + 'Electricityconsumption3.png',
            urlFour: imgBaseUrl + 'Electricityconsumption4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "用电量",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '用电量');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);

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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  levelComponent  液体流量
 */
var levelComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "levelComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "level1.png",
            urlTwo: imgBaseUrl + 'level2.png',
            urlThree: imgBaseUrl + 'level3.png',
            urlFour: imgBaseUrl + 'level4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "液体流量",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '液体流量');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  GasComponent  气体流量
 */
var GasComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "GasComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));


        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Gas1.png",
            urlTwo: imgBaseUrl + 'Gas2.png',
            urlThree: imgBaseUrl + 'Gas3.png',
            urlFour: imgBaseUrl + 'Gas4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 添加组件显示信息
        this.labelValue = new draw2d.shape.basic.Label({
            text: "气体流量",
            stroke: 0,
        });
        this.add(this.labelValue, new draw2d.layout.locator.CenterLocatorCustom(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.custom.showValue.flag = true;
        data = safeBasic.setImageUrl(data, imageData, '气体流量');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



/** 
 *  BroadcastComponent  广播
 */
var BroadcastComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "BroadcastComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "Broadcast1.png",
            urlTwo: imgBaseUrl + 'Broadcast2.png',
            urlThree: imgBaseUrl + 'Broadcast3.png',
            urlFour: imgBaseUrl + 'Broadcast4.png'
        };


        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));

        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '广播');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  monitoringComponent  枪机
 */
var monitoringComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "monitoringComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "monitoring1.png",
            urlTwo: imgBaseUrl + 'monitoring2.png',
            urlThree: imgBaseUrl + 'monitoring3.png',
            urlFour: imgBaseUrl + 'monitoring4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.vlcurl = '';
        data = safeBasic.setImageUrl(data, imageData, '枪机');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  qiujiComponent  球机
 */

var qiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "qiujiComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "qiuji1.png",
            urlTwo: imgBaseUrl + 'qiuji2.png',
            urlThree: imgBaseUrl + 'qiuji3.png',
            urlFour: imgBaseUrl + 'qiuji4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.vlcurl = '';
        data = safeBasic.setImageUrl(data, imageData, '球机');
        this.attr({
            userData: data
        });

        // 选中   
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
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
    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  highqiujiComponent  高球机
 */
var highqiujiComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "highqiujiComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "highqiuji1.png",
            urlTwo: imgBaseUrl + 'highqiuji2.png',
            urlThree: imgBaseUrl + 'highqiuji3.png',
            urlFour: imgBaseUrl + 'highqiuji4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));


        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data.routine.vlcurl = '';
        data = safeBasic.setImageUrl(data, imageData, '高球机');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
            safeBasic.vlcValue(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});


/** 
 *  EntranceGuardComponent  门禁
 */
var EntranceGuardComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "EntranceGuardComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));

        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "menjin1.png",
            urlTwo: imgBaseUrl + 'menjin2.png',
            urlThree: imgBaseUrl + 'menjin3.png',
            urlFour: imgBaseUrl + 'menjin4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '门禁');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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

    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});

/** 
 *  detectorComponent  探测器
 */
var detectorComponent = draw2d.shape.basic.Rectangle.extend({
    NAME: "detectorComponent",
    init: function(attr) {
        var _this = this;
        this._super($.extend(JSON.parse(safeBasic.defaultset), attr));


        // 图片数据
        var imgBaseUrl = setComponentOptions.imageBaseUrl;
        var imageData = {
            urlOne: imgBaseUrl + "tance1.png",
            urlTwo: imgBaseUrl + 'tance2.png',
            urlThree: imgBaseUrl + 'tance3.png',
            urlFour: imgBaseUrl + 'tance4.png'
        };

        // 添加图片
        this.image = new draw2d.shape.basic.Image({
            path: imageData.urlOne,
            width: safeBasic.width,
            height: safeBasic.height
        });
        this.add(this.image, new draw2d.layout.locator.CenterLocator(this));

        // 添加标题
        this.label = new draw2d.shape.basic.Label(JSON.parse(safeBasic.labelset));
        this.add(this.label, new draw2d.layout.locator.TopLocator(this));



        // 初始化 控件属性
        var data = JSON.parse(safeBasic.safeData);
        data = safeBasic.setImageUrl(data, imageData, '探测器');
        this.attr({
            userData: data
        });

        // 选中
        this.image.on("click", function() {
            safeBasic.clickMethod(_this);
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


    },
    onTimer: function() {
        setComponentOptions.flashMethod(this);
    }
});



// 默认组件(系统默认提供)
var safeBasic = {
    // 自定义控件属性
    width: 36,
    height: 36,
    defaultset: JSON.stringify({
        bgColor: '#FFFFFF',
        resizeable: false,
        width: 36,
        height: 36,
        stroke: 0,
    }),

    labelset: JSON.stringify({
        text: '呵呵',
        fontFamily: '微软雅黑',
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        visible: false,
    }),

    safeData: JSON.stringify({
        type: "defaultComponent", //类型
        custom: {
            newCreat: true, //  用于在拖拽组件时判断(是否新拖拽的控件)            
            editSatus: 'defaults', //组件正在编辑的属性(default/ontrue/onfalse/onalarm/ondisc)  
            blinkingType:'defaults',//监控画面 用于 组件闪烁 判断标志  
            showValue: { //是否是显示数值的默认控件
                flag: false,
                value: '' //(如果启用 showValue属性)显示控件绑定的tag的值
            }
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
                capText: 'label' //内容
            },
            readOnly: false, //组件是否为只读
        },
        defaults: { //该属性用于存储 控件初始化时的状态
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onTrue: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onFalse: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onAlarm: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            blinking: false,
            picture: ''
        },
        onDisconnected: {
            lineWidth: 0,
            lineColor: "#000000",
            // lineStyle: null,
            blinking: false,
            picture: ''
        }
    }),
    clickMethod: function(component) {
        setComponentOptions.setComponentFlagFalse();
        //重置属性框
        canvasVue.resetAttr();
        // 隐藏该控件没有的属性
        canvasVue.hidediv.safeHideDiv = true;
        // 基本
        setComponentOptions.basePublicSet(component);
        setComponentOptions.basicSet(component);
        
        // 默认图片
        setComponentOptions.safeSet(component);

        // 大小
        setComponentOptions.componentSize(component);

        // 位置 旋转角度
        setComponentOptions.componentOffsetAndAngle(component);

        // 标题
        setComponentOptions.componentCaption(component);

        setComponentOptions.setComponentFlagTrue();
    },
    // 设置视频地址
    vlcValue: function(component) {
        canvasVue.hidediv.vlcUrlHideDiv = false;
    },
    // 设置控件名称和图片
    setImageUrl: function(data, imageData, name) {
        data.routine.name = name;
        data.defaults.picture = imageData.urlOne;
        data.onTrue.picture = imageData.urlOne;
        data.onFalse.picture = imageData.urlTwo;
        data.onAlarm.picture = imageData.urlThree;
        data.onDisconnected.picture = imageData.urlFour;
        return data;

    }
}