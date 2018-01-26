var layer,
    canvasVue;

layui.use(['layer', 'element'], function() {
    // var layer = layui.layer;
    layer = layui.layer;
    var element = layui.element;
    var timeoutId; //搜索延时操作标志
    canvasVue = new Vue({
        el: '#app',
        data: {
            loadingShow: false, //loading
            showHideFlag: {
                attrdiv: false, //组件 和 全局按钮 属性框 切换
            },
            // 画布属性
            canvas: {
                view_id: sessionStorage.getItem("view_id"),
                view_name: '',
                group_name: sessionStorage.getItem("viewGroupeName"),
                width: '',
                height: '',
                bgColor: { //背景颜色
                    color: '#2B2F4C',
                    colorData: [],
                    bgimage: 'none'
                },
                setDefault: false,
                default: {
                    bgcolor: '#2B2F4C',
                    bgimage: 'none'
                }
            },
            componentData: {
                flag: false, //vue watch内容是否执行标志
                id: '',
                flashTime: 1000 //闪烁间隔
            },

            // 无属性隐藏
            hidediv: {
                // 基本类型
                basicHideDiv: false,
                // 直线 无属性隐藏
                lineHideDiv: false,
                // label
                labelHideDiv: false,
                // img
                imgHideDiv: false,
                // safe
                safeHideDiv: false,
                // text
                textHideDiv: false,
                // 摄像地址(特殊-单独列出来)
                vlcUrlHideDiv: true,
                //管道(特殊-单独列出来)
                conduitHideDiv: false,

            },
            // 边框下拉框数据
            borderData: {
                borderWidth: [0, 1, 2, 3, 4, 5],
                // borderStyle: [{
                //     name: '默认',
                //     data: ''
                // },
                // {
                //     name: '-',
                //     data: '-'
                // },
                // {
                //     name: '.',
                //     data: '.'
                // },
                // {
                //     name: '-.',
                //     data: '-.'
                // },
                // {
                //     name: '-..',
                //     data: '-..'
                // },

                // ],
                colorData: [{
                        color: '#F5A623',
                        colorstyle: 'background-color:#F5A623',
                        active: false
                    },
                    {
                        color: '#7ED321',
                        colorstyle: 'background-color:#7ED321',
                        active: false
                    },
                    {
                        color: '#F57373',
                        colorstyle: 'background-color:#F57373',
                        active: false
                    },

                    {
                        color: '#35C99D',
                        colorstyle: 'background-color:#35C99D',
                        active: false
                    },
                    {
                        color: '#000000',
                        colorstyle: 'background-color:#000000',
                        active: false
                    },
                    {
                        color: '#999999',
                        colorstyle: 'background-color:#999999',
                        active: false
                    },
                    {
                        color: '#FFFFFF',
                        colorstyle: 'background-color:#FFFFFF',
                        active: false
                    },
                    {
                        color: '#4A4A4A',
                        colorstyle: 'background-color:#4A4A4A',
                        active: false
                    },
                    {
                        color: '#03A3FC',
                        colorstyle: 'background-color:#03A3FC',
                        active: false
                    },
                    {
                        color: '#DDDDDD',
                        colorstyle: 'background-color:#DDDDDD',
                        active: false
                    }



                ],


            },

            // 基本属性
            routine: {
                name: '',
                description: '',
                width: '',
                height: '',
                offx: '',
                offy: '',
                rotationAngle: '',

                horizontal: false, //水平(直线属性)
                vertical: false, //垂直(直线属性)

                title: false, //显示标题
                titledata: {
                    text: '', //标题内容
                    disabled: true // 不可输入
                },

                hover: false, //显示说明
                hoverdata: {
                    text: '', //说明内容
                    disabled: true // 不可输入
                },
                visible: false, //隐藏组件
                enable: false, //不可用
                accessLevel: { //访问等级(备用)
                    level: '0',
                    levelData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                }

            },
            // Data
            datas: {
                vlcUrl: '',
                tag: {
                    tagname: '',
                    isrighttag: {
                        // rights: true,
                        worry: false
                    },
                },
                readonly: false,

            },
            // defaults
            defaults: {
                borderWidth: '',
                // borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },

                fontSize: '',
                fontUnit: '', //单位
                fontText: '', //内容
                fontColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                setAlpha: false, //设置背景透明
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            ontrue: {
                borderWidth: '',
                // borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                fontText: '',
                fontColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                setAlpha: false, //设置背景透明
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            onfalse: {
                borderWidth: 0,
                // borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                fontText: '',
                fontColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                setAlpha: false, //设置背景透明
                picture: '', //图片地址
                flashing: false, //闪烁
            },
            onalarm: {
                borderWidth: '',
                // borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                setAlpha: false, //设置背景透明
                picture: '', //图片地址
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                fontText: '',
                fontColor: {
                    color: '',
                    colorData: [],
                },
                flashing: false, //闪烁
            },
            ondisc: {
                borderWidth: '',
                // borderStyle: '默认',
                borderColor: {
                    color: '',
                    colorData: [],
                },
                alpha: '', //透明度
                setAlpha: false, //设置背景透明
                picture: '', //图片地址
                fillColor: { //填充颜色
                    color: '',
                    colorData: [],
                },
                fontText: '',
                fontColor: {
                    color: '',
                    colorData: [],
                },
                flashing: false, //闪烁
            },
            checkeds: true,
            // 全局按钮
            globalBtnData: {
                btndata: [],
                attr: {
                    current: '', //当前正在编辑的按钮
                    name: '',
                    tag_name: '',
                    boolean: 'true', //开关型数据
                    num: '', //实数型数据
                },
                flag: {
                    alreadybind: true,
                    isBoolean: true,
                }
            },
            bindTag: {
                // alreadylayer: false, //tag弹窗是否弹出标志
                checkRadio: '', //被选中的tag
                type: '', //区分是 组件还是全局按钮   component/globalbtn
                labels: [],
                searchText: '',

            },
            // checkRadio: '',
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                // 自定义下拉群组 初始化
                bayaxInit();
                basicSet.init();
                this.setColorData();


                // canvas 初始化
                canvasSet.allCanvasinit(type);
                // 设置 画布宽高
                canvasSet.setCanvasWH();

                setTimeout(function() {
                    $('#gbtn-value-false').prop('checked', true)
                }, 2000)

                // this.setComTag();


                // this.bindTag.labels = [{
                //         id: 1,
                //         name: '测试',
                //         tag_type: '整数',
                //         description: '123123',
                //         node_name: '12312',
                //         point_id: '123123'


                //     },
                //     {
                //         id: 2,
                //         name: '测试2',
                //         tag_type: '整数2',
                //         description: '123123',
                //         node_name: '12312',
                //         point_id: '123123'


                //     },
                //     {
                //         id: 3,
                //         name: '测试2',
                //         tag_type: '整数2',
                //         description: '123123',
                //         node_name: '12312',
                //         point_id: '123123'


                //     }, {
                //         id: 4,
                //         name: '测试2',
                //         tag_type: '整数2',
                //         description: '123123',
                //         node_name: '12312',
                //         point_id: '123123'


                //     }
                // ]

            });

        },
        methods: {
            // 访问等级选择
            setAccessLevel: function(item) {
                this.routine.accessLevel.level = item;
            },
            // defaults 边框宽度
            setDefaultBorderWidth: function(item) {
                this.defaults.borderWidth = item;
            },
            // defaults 边框样式
            // setStyleBorderStyle: function (item) {
            //     this.defaults.borderStyle = item.name;
            // },
            // defaults 边框颜色
            setDefaultBorderColor: function(item) {
                var borderColor = this.defaults.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // defaults 填充颜色
            setDefaultFillColor: function(item) {
                var fillColor = this.defaults.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
                this.defaults.setAlpha = false;
            },
            // defaults 字体颜色
            setDefaultFontColor: function(item) {
                var fontColor = this.defaults.fontColor;
                fontColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fontColor.color = item.color;
            },

            // style 上传image图片
            upImageStyle: function() {
                $('#imageFileStyle').click();
            },


            // ontrue 边框宽度
            setOnTrueBorderWidth: function(item) {
                this.ontrue.borderWidth = item;
            },
            // ontrue 边框样式
            // setOnTrueBorderStyle: function (item) {
            //     this.ontrue.borderStyle = item.name;
            // },
            // ontrue 边框颜色
            setOnTrueBorderColor: function(item) {
                var borderColor = this.ontrue.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // ontrue 填充颜色
            setOnTrueFillColor: function(item) {
                var fillColor = this.ontrue.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
                this.ontrue.setAlpha = false;
            },

            // ontrue 字体颜色
            setOnTrueFontColor: function(item) {
                var fontColor = this.ontrue.fontColor;
                fontColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fontColor.color = item.color;
            },

            // ontrue 上传image图片
            upImageOnTrue: function() {
                $('#imageFileOnTrue').click();
            },



            // onfalse 边框宽度
            setOnFalseBorderWidth: function(item) {
                this.onfalse.borderWidth = item;
            },
            // onfalse 边框样式
            // setOnFalseBorderStyle: function (item) {
            //     this.onfalse.borderStyle = item.name;
            // },
            // onfalse 边框颜色
            setOnFalseBorderColor: function(item) {
                var borderColor = this.onfalse.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // onfalse 填充颜色
            setOnFalseFillColor: function(item) {
                var fillColor = this.onfalse.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
                this.onfalse.setAlpha = false;
            },

            // onfalse 字体颜色
            setOnFalseFontColor: function(item) {
                var fontColor = this.onfalse.fontColor;
                fontColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fontColor.color = item.color;
            },

            // onfalse 上传image图片
            upImageOnFalse: function() {
                $('#imageFileOnFalse').click();
            },


            // onalarm 边框宽度
            setOnAlarmBorderWidth: function(item) {
                this.onalarm.borderWidth = item;
            },
            // onalarm 边框样式
            // setOnAlarmBorderStyle: function (item) {
            //     this.onalarm.borderStyle = item.name;
            // },
            // onalarm 边框颜色
            setOnAlarmBorderColor: function(item) {
                var borderColor = this.onalarm.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // onalarm 填充颜色
            setOnAlarmFillColor: function(item) {
                var fillColor = this.onalarm.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
                this.onalarm.setAlpha = false;
            },
            // onalarm 字体颜色
            setOnAlarmFontColor: function(item) {
                var fontColor = this.onalarm.fontColor;
                fontColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fontColor.color = item.color;
            },

            // onalarm 上传image图片
            upImageOnAlarm: function() {
                $('#imageFileOnAlarm').click();
            },


            // ondisc 边框宽度
            setOnDiscBorderWidth: function(item) {
                this.ondisc.borderWidth = item;
                console.log('边框宽度:' + item)
            },
            // ondisc 边框样式
            // setOnDiscBorderStyle: function (item) {
            //     this.ondisc.borderStyle = item.name;
            // },
            // ondisc 边框颜色
            setOnDiscBorderColor: function(item) {
                var borderColor = this.ondisc.borderColor;
                borderColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                borderColor.color = item.color;
            },
            // ondisc 填充颜色
            setOnDiscFillColor: function(item) {
                var fillColor = this.ondisc.fillColor;
                fillColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fillColor.color = item.color;
                this.ondisc.setAlpha = false;
            },

            // ondisc 字体颜色
            setOnDiscFontColor: function(item) {
                var fontColor = this.ondisc.fontColor;
                fontColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                fontColor.color = item.color;
            },

            // ondisc 上传image图片
            upImageOnDisc: function() {
                $('#imageFileOnDisc').click();
            },







            // 处理color 数据
            setColorData: function() {
                var strColor = JSON.stringify(this.borderData.colorData.map(function(item) {
                    return item;
                }));
                this.defaults.borderColor.colorData = JSON.parse(strColor);
                this.defaults.fillColor.colorData = JSON.parse(strColor);
                this.defaults.fontColor.colorData = JSON.parse(strColor);

                this.ontrue.borderColor.colorData = JSON.parse(strColor);
                this.ontrue.fillColor.colorData = JSON.parse(strColor);
                this.ontrue.fontColor.colorData = JSON.parse(strColor);

                this.onfalse.borderColor.colorData = JSON.parse(strColor);
                this.onfalse.fillColor.colorData = JSON.parse(strColor);
                this.onfalse.fontColor.colorData = JSON.parse(strColor);

                this.onalarm.borderColor.colorData = JSON.parse(strColor);
                this.onalarm.fillColor.colorData = JSON.parse(strColor);
                this.onalarm.fontColor.colorData = JSON.parse(strColor);

                this.ondisc.borderColor.colorData = JSON.parse(strColor);
                this.ondisc.fillColor.colorData = JSON.parse(strColor);
                this.ondisc.fontColor.colorData = JSON.parse(strColor);


                this.canvas.bgColor.colorData = JSON.parse(strColor);

                // console.log(JSON.stringify(this.defaults.borderColor.colorData));
            },
            // 重置属性框
            resetAttr: function() {
                var clas = 'collapsed';
                $('.attr-content-titles').removeClass(clas);
                $('.reset-title').addClass(clas);

                $('.reset-content').hide();
                $('.routine,.data-div').show();

                setTimeout(function() {
                    $(".layui-tabscroll-item").mCustomScrollbar('scrollTo', 'top');
                }, 90);

                var dic = this.hidediv;
                dic.basicHideDiv = false;
                dic.lineHideDiv = false;
                dic.labelHideDiv = false;
                dic.imgHideDiv = false;
                dic.safeHideDiv = false;
                dic.textHideDiv = false;
                dic.vlcUrlHideDiv = true;
                dic.conduitHideDiv = false;

                var routine = this.routine;
                var datas = this.datas;
                var defaults = this.defaults;
                var ontrue = this.ontrue;
                var onfalse = this.onfalse;
                var onalarm = this.onalarm;
                var ondisc = this.ondisc;
                routine.name = '';
                routine.description = '';
                routine.width = '';
                routine.height = '';
                routine.offx = '';
                routine.offy = '';
                routine.rotationAngle = '';
                // routine.horizontal = false;
                // routine.vertical = false;
                routine.title = false;
                routine.titledata.text = '';
                routine.titledata.disabled = true;
                routine.hover = false;
                routine.hover.text = '';
                routine.hover.disabled = true;

                routine.visible = false;
                routine.enable = false;
                routine.accessLevel.level = 0;

                datas.vlcUrl = '';
                datas.tag.tagname = '';
                // datas.tag.isrighttag = right;
                datas.readonly = false;

                defaults.borderWidth = 0;
                // defaults.borderStyle = '默认';
                defaults.fontSize = '';
                defaults.fontUnit = '';
                defaults.fontText = '';
                defaults.alpha = '';
                defaults.setAlpha = false;
                defaults.picture = '';
                defaults.flashing = false;

                ontrue.borderWidth = 0;
                // ontrue.borderStyle = '默认';
                ontrue.fontText = '';
                ontrue.alpha = '';
                ontrue.setAlpha = false;
                ontrue.picture = '';
                ontrue.flashing = false;

                onfalse.borderWidth = 0;
                // onfalse.borderStyle = '默认';
                onfalse.fontText = '';
                onfalse.alpha = '';
                onfalse.setAlpha = false;
                onfalse.picture = '';
                onfalse.flashing = false;

                onalarm.borderWidth = 0;
                // onalarm.borderStyle = '默认';
                onalarm.fontText = '';
                onalarm.alpha = '';
                onalarm.setAlpha = false;
                onalarm.picture = '';
                onalarm.flashing = false;

                ondisc.borderWidth = 0;
                // ondisc.borderStyle = '默认';
                ondisc.fontText = '';
                ondisc.alpha = '';
                ondisc.setAlpha = false;
                ondisc.picture = '';
                ondisc.flashing = false;



            },

            // 画布背景颜色
            setCanvasBgColor: function(item) {
                var bgColor = this.canvas.bgColor;
                bgColor.colorData.forEach(function(ele) {
                    ele.active = false;
                });
                item.active = true;
                bgColor.color = item.color;
                canvasVue.canvas.setDefault = false;

            },
            // 上传canvas背景图片
            upCanvasbgImage: function() {
                $('#fileCanvasImage').click();
            },


            // ==================全局按钮===================
            // 添加全局按钮
            addGlobalBtn: function() {
                var id = Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36)
                var dic = {
                    id: id,
                    name: '按钮',
                    tag: {
                        tag_id: -1,
                        tag_type: -1,
                        tag_name: '',
                        is_readonly: false,
                        tag_value: '', //设定值 用于监控画面更改绑定的tag的值
                        bingding_status: 0, //0 默认状态,1 已经绑定,2 绑定错误
                        status: 'default', //该组件绑定tag 的状态(用于监控画面)	     
                    }
                };
                this.globalBtnData.btndata.push(dic);
                console.log(JSON.stringify(dic, null, 2))

            },
            // 删除全局按钮
            deleteGlobalBtn: function(item) {
                var arrs = this.globalBtnData.btndata;
                var indexs = arrs.indexOf(item);
                console.log(JSON.stringify(item, null, 2))
                arrs.splice(indexs, 1);
            },
            // 设置全局按钮属性
            setGlobalBtnAttr: function(item) {
                console.log(JSON.stringify(item, null, 2))

                setComponentOptions.setComponentFlagFalse();
                this.showHideFlag.attrdiv = true;
                var attr = this.globalBtnData.attr;
                attr.current = item;
                attr.name = item.name;
                attr.tag_name = item.tag.tag_name;
                if (item.tag.bingding_status === 1) {

                    this.globalBtnData.flag.alreadybind = true;
                    if (item.tag.tag_type === 1) {
                        // 开关型
                        this.globalBtnData.flag.isBoolean = true;
                        if (item.tag.tag_value == 'true') {
                            console.log('点击：' + 'true')
                            this.globalBtnData.attr.boolean = 'true';
                        } else {
                            console.log('点击：' + 'true')
                            this.globalBtnData.attr.boolean = 'false';
                        }
                    } else {
                        // 非开关型
                        this.globalBtnData.flag.isBoolean = false;

                        attr.num = item.tag.tag_value;
                    }


                } else {
                    this.globalBtnData.flag.alreadybind = false;
                }


                setComponentOptions.setComponentFlagTrue();

            },

            // 设置全局按钮绑定tag
            setBtnTag: function() {
                basicSet.bindTag.globalBtnbindTag();
            },
            // 设置组件绑定Tag
            setComTag: function() {
                basicSet.bindTag.combindTag();
            },
            // 搜索tag方法
            getLabelData: function(page) {
                var onePageNum = 8;
                var _this = this;
                var dataUp = {
                    name: _this.bindTag.searchText,
                    // project_id: _this.project.id,
                    page: page,
                    page_item_count: onePageNum,
                };


                $.ajax({
                    url: apiurl + 'tag',
                    type: 'get',
                    dataType: 'json',
                    data: dataUp,
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {

                        console.log('tag数据:' + JSON.stringify(data, null, 2));

                        _this.loadingShow = false;


                        var nullData = {
                            id: '',
                            name: '',
                            description: '',
                            tag_type: '',
                            node_name: '',
                            point_id: '',
                            type: '',
                            ishide: true,
                        }



                        if (data.data == null || data.data.items == null) {
                            console.log('无数据')
                            _this.bindTag.labels = [];
                            for (var i = 0; i < onePageNum; i++) {
                                _this.bindTag.labels.push(nullData);
                            }
                            $(".tcdPageCode").hide();
                            $('.havedata').hide();
                            $('.noData').show();
                        } else {
                            console.log('有数据')
                            var datas = data.data.items;
                            var labelDatas = datas.map(function(item) {
                                item.type = item.tag_type;
                                item.ishide = false;
                                switch (Number(item.tag_type)) {
                                    case 1:
                                        item.tag_type = "开关型";
                                        break;
                                    case 2:
                                        item.tag_type = "整数型";
                                        break;
                                    case 3:
                                        item.tag_type = "实数型";
                                        break;
                                    case 4:
                                        item.tag_type = "字符型";
                                        break;
                                }
                                return item;
                            });
                            console.log('数据labelDatas:' + JSON.stringify(labelDatas))
                            if (labelDatas.length < onePageNum) {
                                var num = onePageNum - labelDatas.length;
                                for (var i = 0; i < num; i++) {
                                    labelDatas.push(nullData);
                                }
                            }
                            console.log(JSON.stringify(labelDatas, null, 2));

                            _this.bindTag.labels = labelDatas;
                            $('.havedata').show();
                            $('.noData').hide();
                            $(".tcdPageCode").show().createPage({
                                pageCount: data.data.pageCount,
                                current: page,
                                backFn: function(p) {
                                    _this.getLabelData(p);
                                }
                            });
                        }
                    },
                    error: function(data) {
                        _this.loadingShow = false;
                        returnLogIn(data);
                    }
                });

            },
            // 搜索Tag
            searchtags: function(page) {
                console.log(this.bindTag.searchText);

                var _this = this;
                this.debounce(function() {
                    _this.getLabelData(page);

                }, 300, {
                    leading: false
                })();



            },
            // 清除搜索框
            cleanSearchVal: function() {
                this.bindTag.searchText = '';

            },
            // 搜索延时
            debounce: function(fn, delay, options) {

                if (!options) {
                    options = {};
                }
                var leadingExc = false;

                return function() {
                    var that = this,
                        args = arguments;
                    if (!leadingExc && !(options.leading === false)) {
                        fn.apply(that, args);
                    }
                    leadingExc = true;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(function() {
                        if (!(options.trailing === false)) {
                            fn.apply(that, args);
                        }
                        leadingExc = false;
                    }, delay);
                }
            },

        }
    })

    // 名称
    canvasVue.$watch('routine.name', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('旧值:' + oldVal);
            console.log('新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.userData.routine.name = newVal;
                console.log('查看组件名称：' + node.getUserData().routine.name)
            }
        }
    });
    // 描述
    canvasVue.$watch('routine.description', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('描述旧值:' + oldVal);
            console.log('描述新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.userData.routine.description = newVal;
                console.log('查看组件描述：' + node.getUserData().routine.description)
            }
        }
    });

    //尺寸-width
    canvasVue.$watch('routine.width', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('宽度旧值:' + oldVal);
            console.log('宽度新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (Number(newVal) < 5) {
                    layer.msg('最小为5');
                    return;
                }
                if (node.isResizeable()) {
                    node.setWidth(newVal);
                    // node.repaint();
                } else {
                    layer.msg('该控件不支持缩放');
                }
            }
        }
    });

    //尺寸-height
    canvasVue.$watch('routine.height', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('高度旧值:' + oldVal);
            console.log('高度新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (Number(newVal) < 5) {
                    layer.msg('最小为5');
                    return;
                }
                if (node.isResizeable()) {
                    node.setHeight(newVal);
                    // node.repaint();
                } else {
                    layer.msg('该控件不支持缩放');
                }
            }
        }
    });

    //位置-X
    canvasVue.$watch('routine.offx', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('X旧值:' + oldVal);
            console.log('X新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal === '') {
                    node.setX(0);
                } else {
                    node.setX(newVal);
                }

            }
        }
    });
    //位置-Y
    canvasVue.$watch('routine.offy', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('Y旧值:' + oldVal);
            console.log('Y新值:' + newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal === '') {
                    node.setX(0);
                } else {
                    node.setY(newVal);
                }
            }
        }
    });


    // 直线水平
    canvasVue.$watch('routine.horizontal', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('直线水平旧值:' + oldVal);
            console.log('直线水平新值:' + newVal);
            if (newVal) {
                var node = canvasSet.getNodeFromCanvas();
                if (node) {
                    var arr = node.getVertices();
                    console.log("直线数据:" + JSON.stringify(arr, null, 2))
                    if (arr.data[1].x === arr.data[0].x) {
                        layer.msg('直线已垂直不能水平');
                        this.routine.horizontal = false;
                    } else {
                        arr.data[1].y = arr.data[0].y;
                        node.setVertices(arr);
                    }
                }


            }


        }
    });

    // 直线垂直
    canvasVue.$watch('routine.vertical', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log('直线垂直旧值:' + oldVal);
            console.log('直线垂直新值:' + newVal);
            if (newVal) {
                var node = canvasSet.getNodeFromCanvas();
                if (node) {
                    var arr = node.getVertices();
                    console.log("直线数据:" + JSON.stringify(arr, null, 2))
                    if (arr.data[1].y === arr.data[0].y) {
                        layer.msg('直线已水平不能垂直');
                        this.routine.vertical = false;
                    } else {
                        arr.data[1].x = arr.data[0].x;
                        node.setVertices(arr);
                    }
                }

            }
        }
    });
    // 旋转角度
    canvasVue.$watch('routine.rotationAngle', function(newVal, oldVal) {

        if (this.componentData.flag) {
            console.log('角度旧值:' + oldVal);
            console.log('角度新值：' + newVal);
            console.log(Number(newVal))
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var value = Number(newVal);
                if (value >= -359 && value <= 359) {
                    node.setRotationAngle(value);
                }
            }

        }
    });

    // hover监控
    canvasVue.$watch('routine.hover', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            console.log(newVal);

            if (node) {
                if (newVal) {
                    this.routine.hoverdata.disabled = false;
                    node.userData.routine.hint.flag = true;
                } else {
                    this.routine.hoverdata.disabled = true;
                    node.userData.routine.hint.flag = false;
                }
            }
        }
    });
    // hover 内容
    canvasVue.$watch('routine.hoverdata.text', function(newVal, oldVal) {
        console.log('新值:' + newVal);
        console.log('旧值:' + newVal);
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.userData.routine.hint.hintText = newVal;
            }
        }
    });
    // 标题
    canvasVue.$watch('routine.title', function(newVal, oldVal) {

        if (this.componentData.flag) {
            // console.log('旧值:' + oldVal);
            console.log(newVal);
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    this.routine.titledata.disabled = false;
                    node.userData.routine.caption.flag = true;
                    node.label.setVisible(true);
                    node.label.setText(node.userData.routine.caption.capText);
                } else {
                    this.routine.titledata.disabled = true;
                    node.userData.routine.caption.flag = false;
                    node.label.setVisible(false);

                }
            }

        }
    });
    // 标题内容
    canvasVue.$watch('routine.titledata.text', function(newVal, oldVal) {
        console.log(newVal)
        if (this.componentData.flag) {

            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.label.setText(newVal);
                node.userData.routine.caption.capText = newVal;
            }

        }
    });

    // 隐藏组件
    canvasVue.$watch('routine.visible', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            console.log(newVal);

            if (node) {
                if (newVal) {
                    // node.setAlpha(0);
                    node.userData.routine.visible = true;
                    layer.msg('本组件运行时不可见');
                    // if (node.image) {
                    //     node.image.setAlpha(0);
                    // }
                    // if (node.label) {
                    //     node.label.setAlpha(0);
                    // }
                    // if(node.userData.onlytype){
                    //     // if (node.userData.onlytype === 'conduitCompontent') {
                    //         node.setVisible(false);
                    //     // }
                    // }

                } else {
                    // node.setAlpha(1);
                    node.userData.routine.visible = false;
                    // if (node.image) {
                    //     node.image.setAlpha(1);
                    // }
                    // if (node.label) {
                    //     node.label.setAlpha(1);
                    // }                   
                    // if(node.userData.onlytype){
                    //     // if (node.userData.onlytype === 'conduitCompontent') {
                    //         node.setVisible(true);
                    //     // }
                    // }

                }
            }
        }
    });
    // 不可用
    canvasVue.$watch('routine.enable', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            console.log(newVal);

            if (node) {
                if (newVal) {
                    node.userData.routine.enable = true;
                } else {
                    node.userData.routine.enable = false;
                }
            }
        }
    });

    // 访问等级
    canvasVue.$watch('routine.accessLevel.level', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.userData.routine.accessLevel = newVal;
            }
        }
    });
    // 摄像地址
    canvasVue.$watch('datas.vlcUrl', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.userData.routine.vlcurl = newVal;
            }
        }
    });


    // tag地址 (待定)
    canvasVue.$watch('datas.tag.tagname', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {

            }
        }
    });

    // data  只读
    canvasVue.$watch('datas.readonly', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.userData.routine.readOnly = true;
                } else {
                    node.userData.routine.readOnly = false;
                }
            }
        }
    });


    // default -边框宽度
    canvasVue.$watch('defaults.borderWidth', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setStroke(newVal);
                node.userData.defaults.lineWidth = newVal;
            }
        }
    });

    // default -边框颜色
    canvasVue.$watch('defaults.borderColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setColor(newVal);
                node.userData.defaults.lineColor = newVal;
            }
        }
    });

    // default -填充颜色
    canvasVue.$watch('defaults.fillColor.color', function(newVal, oldVal) {
        console.log('监控改变之前:'+oldVal);
        console.log('监控改变之后:'+newVal);
       
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setBackgroundColor(newVal);
                node.userData.defaults.fillColor = newVal;
            }
        }
    });

    // default -透明度
    canvasVue.$watch('defaults.alpha', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var num = Number(newVal);
                if (num >= 0 && num <= 1) {
                    node.setAlpha(num);
                    node.userData.defaults.alpha = num;
                } else {
                    node.setAlpha(1);
                    node.userData.defaults.alpha = 1;
                    layer.msg('透明度范围 0~1');
                }

            }
        }
    });

     // default -设置透明
     canvasVue.$watch('defaults.setAlpha', function(newVal, oldVal) {
         console.log('透明改变了查看:'+newVal);
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.setBackgroundColor('none');
                    this.defaults.fillColor.color = 'none';
                    this.defaults.fillColor.colorData.forEach(function(ele) {
                        ele.active = false;   
                    });
                } 
            }
        }
    });



    // defaults -文本内容
    canvasVue.$watch('defaults.fontText', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setText(newVal);
                node.userData.defaults.text= newVal;
            }
        }
    });
    // defaults -字体大小
    canvasVue.$watch('defaults.fontSize', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (!isNaN(Number(newVal))) {
                    if (newVal === '') {
                        node.setFontSize(14);
                    } else {
                        node.setFontSize(Number(newVal));
                    }
                } else {
                    node.setFontSize(14);
                }
            }
        }
    });




    // default -文本颜色
    canvasVue.$watch('defaults.fontColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setFontColor(newVal);
                node.userData.defaults.fontColor = newVal;
            }
        }
    });



    // default -闪烁
    canvasVue.$watch('defaults.flashing', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.startTimer(canvasVue.componentData.flashTime);
                    node.userData.defaults.blinking = true;
                } else {
                    node.stopTimer();
                    node.userData.defaults.blinking = false;
                }
            }
        }
    });



    // ontrue -边框宽度
    canvasVue.$watch('ontrue.borderWidth', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setStroke(newVal)
                node.userData.onTrue.lineWidth = newVal;
            }
        }
    });

    // ontrue -边框颜色
    canvasVue.$watch('ontrue.borderColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setColor(newVal);
                node.userData.onTrue.lineColor = newVal;
            }
        }
    });

    // ontrue -填充颜色
    canvasVue.$watch('ontrue.fillColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setBackgroundColor(newVal);
                node.userData.onTrue.fillColor = newVal;
            }
        }
    });

     // ontrue -文本内容
     canvasVue.$watch('ontrue.fontText', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                console.log()
                node.setText(newVal);
                node.userData.onTrue.text = newVal;
            }
        }
    });

    // ontrue -文本颜色
    canvasVue.$watch('ontrue.fontColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setFontColor(newVal)
                node.userData.onTrue.fontColor = newVal;
            }
        }
    });



    // ontrue -透明度
    canvasVue.$watch('ontrue.alpha', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var num = Number(newVal);
                if (num >= 0 && num <= 1) {
                    node.setAlpha(num);
                    node.userData.onTrue.alpha = num;
                } else {
                    node.setAlpha(1);
                    node.userData.onTrue.alpha = 1;
                    layer.msg('透明度范围 0~1');
                }

            }
        }
    });

     // ontrue -设置透明
     canvasVue.$watch('ontrue.setAlpha', function(newVal, oldVal) {
        console.log('查看:'+newVal);
       if (this.componentData.flag) {
           var node = canvasSet.getNodeFromCanvas();
           if (node) {
               if (newVal) {
                   node.setBackgroundColor('none');
                   this.ontrue.fillColor.color = 'none';
                   this.ontrue.fillColor.colorData.forEach(function(ele) {
                    ele.active = false;   
                });
               } 
           }
       }
   });

    // ontrue -闪烁
    canvasVue.$watch('ontrue.flashing', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.startTimer(canvasVue.componentData.flashTime);
                    node.userData.onTrue.blinking = true;
                } else {
                    node.stopTimer();
                    node.userData.onTrue.blinking = false;
                }
            }
        }
    });



    // onfalse -边框宽度
    canvasVue.$watch('onfalse.borderWidth', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setStroke(newVal)
                node.userData.onFalse.lineWidth = newVal;
            }
        }
    });

    // onfalse -边框颜色
    canvasVue.$watch('onfalse.borderColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setColor(newVal)
                node.userData.onFalse.lineColor = newVal;
            }
        }
    });

    // onfalse -填充颜色
    canvasVue.$watch('onfalse.fillColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setBackgroundColor(newVal)
                node.userData.onFalse.fillColor = newVal;
            }
        }
    });


    // onfalse -文本内容
    canvasVue.$watch('onfalse.fontText', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                console.log()
                node.setText(newVal);
                node.userData.onFalse.text = newVal;
            }
        }
    });

    // onfalse -文本颜色
    canvasVue.$watch('onfalse.fontColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setFontColor(newVal)
                node.userData.onFalse.fontColor = newVal;
            }
        }
    });

    // onfalse -透明度
    canvasVue.$watch('onfalse.alpha', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var num = Number(newVal);
                if (num >= 0 && num <= 1) {
                    node.setAlpha(num)
                    node.userData.onFalse.alpha = num;
                } else {
                    node.setAlpha(1);
                    node.userData.onFalse.alpha = 1;
                    layer.msg('透明度范围 0~1');
                }

            }
        }
    });

     // onfalse -设置透明
     canvasVue.$watch('onfalse.setAlpha', function(newVal, oldVal) {
        console.log('查看:'+newVal);
       if (this.componentData.flag) {
           var node = canvasSet.getNodeFromCanvas();
           if (node) {
               if (newVal) {
                   node.setBackgroundColor('none');
                   this.onfalse.fillColor.color = 'none';
                   this.onfalse.fillColor.colorData.forEach(function(ele) {
                    ele.active = false;   
                });
               } 
           }
       }
   });

    // onfalse -闪烁
    canvasVue.$watch('onfalse.flashing', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.startTimer(canvasVue.componentData.flashTime);
                    node.userData.onFalse.blinking = true;
                } else {
                    node.stopTimer();
                    node.userData.onFalse.blinking = false;
                }
            }
        }
    });



    // onalarm -边框宽度
    canvasVue.$watch('onalarm.borderWidth', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setStroke(newVal)
                node.userData.onAlarm.lineWidth = newVal;
            }
        }
    });

    // onalarm -边框颜色
    canvasVue.$watch('onalarm.borderColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setColor(newVal)
                node.userData.onAlarm.lineColor = newVal;
            }
        }
    });

    // onalarm -填充颜色
    canvasVue.$watch('onalarm.fillColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setBackgroundColor(newVal)
                node.userData.onAlarm.fillColor = newVal;
            }
        }
    });

     // onalarm -文本内容
     canvasVue.$watch('onalarm.fontText', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                console.log()
                node.setText(newVal);
                node.userData.onAlarm.text = newVal;
            }
        }
    });

    // onalarm -文本颜色
    canvasVue.$watch('onalarm.fontColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setFontColor(newVal)
                node.userData.onAlarm.fontColor = newVal;
            }
        }
    });

    // onalarm -透明度
    canvasVue.$watch('onalarm.alpha', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var num = Number(newVal);
                if (num >= 0 && num <= 1) {
                    node.setAlpha(num)
                    node.userData.onAlarm.alpha = num;
                } else {
                    node.setAlpha(1);
                    node.userData.onAlarm.alpha = 1;
                    layer.msg('透明度范围 0~1');
                }

            }
        }
    });


     // onalarm -设置透明
     canvasVue.$watch('onalarm.setAlpha', function(newVal, oldVal) {
        console.log('查看:'+newVal);
       if (this.componentData.flag) {
           var node = canvasSet.getNodeFromCanvas();
           if (node) {
               if (newVal) {
                   node.setBackgroundColor('none');
                   this.onalarm.fillColor.color = 'none';
                   this.onalarm.fillColor.colorData.forEach(function(ele) {
                    ele.active = false;   
                });
               } 
           }
       }
   });

    // onalarm -闪烁
    canvasVue.$watch('onalarm.flashing', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.startTimer(canvasVue.componentData.flashTime);
                    node.userData.onAlarm.blinking = true;
                } else {
                    node.stopTimer();
                    node.userData.onAlarm.blinking = false;
                }
            }
        }
    });


    // ondisc -边框宽度
    canvasVue.$watch('ondisc.borderWidth', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setStroke(newVal)
                node.userData.onDisconnected.lineWidth = newVal;
            }
        }
    });

    // ondisc -边框颜色
    canvasVue.$watch('ondisc.borderColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setColor(newVal)
                node.userData.onDisconnected.lineColor = newVal;
            }
        }
    });

    // ondisc -填充颜色
    canvasVue.$watch('ondisc.fillColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setBackgroundColor(newVal)
                node.userData.onDisconnected.fillColor = newVal;
            }
        }
    });

     // ondisc -文本内容
     canvasVue.$watch('ondisc.fontText', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                console.log()
                node.setText(newVal);
                node.userData.onDisconnected.text = newVal;
            }
        }
    });

    // ondisc -文本颜色
    canvasVue.$watch('ondisc.fontColor.color', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                node.setFontColor(newVal)
                node.userData.onDisconnected.fontColor = newVal;
            }
        }
    });

    // ondisc -透明度
    canvasVue.$watch('ondisc.alpha', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                var num = Number(newVal);
                if (num >= 0 && num <= 1) {
                    node.setAlpha(num)
                    node.userData.onDisconnected.alpha = num;
                } else {
                    node.setAlpha(1);
                    node.userData.onDisconnected.alpha = 1;
                    layer.msg('透明度范围 0~1');
                }

            }
        }
    });

     // ondisc -设置透明
     canvasVue.$watch('ondisc.setAlpha', function(newVal, oldVal) {
        console.log('查看:'+newVal);
       if (this.componentData.flag) {
           var node = canvasSet.getNodeFromCanvas();
           if (node) {
               if (newVal) {
                   node.setBackgroundColor('none');
                   this.ondisc.fillColor.color = 'none';
                   this.ondisc.fillColor.colorData.forEach(function(ele) {
                    ele.active = false;   
                });
               } 
           }
       }
   });

    // ondisc -闪烁
    canvasVue.$watch('ondisc.flashing', function(newVal, oldVal) {
        if (this.componentData.flag) {
            var node = canvasSet.getNodeFromCanvas();
            if (node) {
                if (newVal) {
                    node.startTimer(canvasVue.componentData.flashTime);
                    node.userData.onDisconnected.blinking = true;
                } else {
                    node.stopTimer();
                    node.userData.onDisconnected.blinking = false;
                }
            }
        }
    });


    // canvas 背景颜色
    canvasVue.$watch('canvas.bgColor.color', function(newVal, oldVal) {
        $('#canvas').css({
            'background-color': newVal
        });
    });

    // canvas 背景图片
    canvasVue.$watch('canvas.bgColor.bgimage', function(newVal, oldVal) {
        $('#canvas').css({
            'background-image': 'url(' + newVal + ')'
        });
    });


    // canvas 恢复默认
    canvasVue.$watch('canvas.setDefault', function(newVal, oldVal) {
        if (newVal) {

            console.log(newVal)
                // var canvas = canvasVue.canvas;
            var bgColor = canvasVue.canvas.bgColor;
            var color = canvasVue.canvas.default.bgcolor;
            var flag = true;

            bgColor.colorData.forEach(function(ele) {
                ele.active = false;
                if (ele.color === color) {
                    ele.active = true;
                    flag = false;
                }
            });
            if (flag) {
                bgColor.colorData.shift();
                bgColor.colorData.push({
                    color: color,
                    colorstyle: 'background-color:' + color,
                    active: true
                });
            }

            $('#canvas').css({
                'background-color': color,
                'background-image': canvasVue.canvas.default.bgimage
            });

            bgColor.bgimage = 'none';
            bgColor.color = color;
        }
    });




    // 全局按钮名称
    canvasVue.$watch('globalBtnData.attr.name', function(newVal, oldVal) {
        if (this.componentData.flag) {
            this.globalBtnData.attr.current.name = newVal;
            console.log(JSON.stringify(canvasVue.globalBtnData.attr.current, null, 2))
        }

    });

    // 开关型 全局按钮 默认值设定
    canvasVue.$watch('globalBtnData.attr.boolean', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log(newVal);
            this.globalBtnData.attr.current.tag.tag_value = newVal;

        }
    });

    // 非开关型 全局按钮 默认值设定
    canvasVue.$watch('globalBtnData.attr.num', function(newVal, oldVal) {
        if (this.componentData.flag) {
            console.log(newVal);
            this.globalBtnData.attr.current.tag.tag_value = newVal;
        }
    });


})