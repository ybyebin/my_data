var monitoringVue;
layui.use(['layer', 'element', 'laydate'], function () {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;


    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function(value, date, endDate) {
            monitoringVue.trend.btnSelectTitle = '自定义';
            monitoringVue.trend.startime = value;
            $('#endtime').focus();
            console.log('查看时间:' + monitoringVue.trend.startime);

            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });
    var endtime = laydate.render({
        elem: '#endtime',
        theme: 'balck',
        showBottom: false,
        done: function(value, date, endDate) {
            var st = monitoringVue.trend.startime;
            var ed = monitoringVue.trend.endtime = value;
            monitoringVue.trend.btnSelectTitle = '自定义';
            console.log('查看时间：' + monitoringVue.trend.endtime);
            if (st != '' && ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        monitoringVue.searchTagValueHistoryTrend();
                    }
                } else {
                    monitoringVue.trend.endtime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            }
        }
    });

    // vue 组件  点名称(待用)
    Vue.component('td-name', {
        render: function (createElement) {
            var _this = this;
            return createElement('span', {
            }, _this.show.name
            );
        },
        props: {
            show: {}
        }
    });
    // vue 组件  点状态
    Vue.component('td-status', {
        render: function (createElement) {
            var _this = this;
            switch (this.show.status) {
                case null:
                case -1:
                    return createElement('span', "tag无效");
                    break;
                case 0:
                    switch (this.show.alarm) {
                        case false:
                            return createElement('span', "正常");
                            break;
                        case true:
                            return createElement('label', [
                                createElement('span', {
                                    class: ['mark', 'warn']
                                }),
                                createElement('span', {
                                    style: {
                                        color: '#fd5656',
                                    },
                                }, '报警'),
                            ]);
                            break;
                        case null:
                            return createElement('span', "正常");
                            break;
                    }
                    break;
                default:
                    return createElement('label', [
                        createElement('span', {

                            class: ['mark', 'error']
                        }),
                        createElement('span', {
                            style: {
                                color: '#f5a623',
                            },
                        }, '通信异常'),
                    ]);
                    break;
            }

        },
        props: {
            show: {}
        }
    });

    //vue 组件  点 值 
    Vue.component('td-value', {
        render: function (createElement) {
            var _this = this;
            switch (this.show.status) {
                case 0:
                    return createElement('span', this.show.value);
                    break;
                default:
                    return createElement('span', "-");
                    break;
            }
        },
        props: {
            show: {}
        }
    });
    // vue 组件  是否有趋势图
    Vue.component('td-watch', {
        render: function (createElement) {
            var _this = this;
            var id = _this.show.tag_id;
            switch (Number(this.show.trends)) {
                case 0:
                    return createElement('span', '-');
                    break;
                case 1:
                    return createElement('a', {
                        class: ['bayax-a'],
                        attrs: {
                            href: 'javascript:;'
                        },
                        on: {
                            'click': function () {
                                console.log('查看:' + id);
                                monitoringVue.trend.tagid = id;
                                // 查看趋势图
                                monitoringVue.watchTrend();
                            }
                        }
                    }, '查看');
                    break;
                default:
                    break;
            }
        },
        props: {
            show: {}
        }
    });

    // vue 组件 是否可操作
    Vue.component('td-operation', {
        render: function (createElement) {
            var _this = this;
            var id = _this.show.tag_id;

            if (this.show.status == 0) {
                if (this.show.readonly) {
                    return createElement('span', '-');
                } else {
                    return createElement('a', {
                        class: ['bayax-a'],
                        attrs: {
                            href: 'javascript:;'
                        },
                        on: {
                            'click': function () {
                                console.log('查看:' + id);
                                monitoringVue.operationClick(id);
                            }
                        }
                    }, '操作');
                }
            } else {
                return createElement('span', '-');
            }
        },
        props: {
            show: {}
        }
    });
    monitoringVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,
            canvas: '',
            monitoringGroup: [],//群组画面
            globalBtnData: [],//全局按钮
            tableTrend: {},//列表
            layerData: { //组件弹窗操作
                actionBool: '1',//bool
                acttionReal: '',//实数型
                actionString: ''//字符型
            },
            MqttOperation: {
                view_id: '',//画面ID
                mqtt: '',
                reconnectTimeout: 5000,//断开重连间隔时间
                clientID: 123,//(忘了)
                restart: false //重置标志

            },
            trend: {
                tagid:'',
                tagValue:'',
                typeFlag:true,
                realInterval:'',
                btnSelectTitle: '',
                btnSelectdata: [],
                startime: '',
                endtime: '',
            }


        },
        mounted: function () {
            // var _this = this;


            this.$nextTick(function () {
                element.init();

                bayaxInit();
                this.trend.btnSelectdata = dateData();
                this.canvasInit();
                this.loadMonitoringGroups();

                this.getTableTrend();

                // mqtt心跳
                this.sendHeadData();

            });

        },
        methods: {
            // 获取 监控群组 信息
            loadMonitoringGroups: function () {
                var _this = this;
                // $.ajax({
                //     url: apiurl + 'subsystem',
                //     type: 'get',
                //     dataType: 'json',
                //     beforeSend: function() {
                //         $(".loading").show();
                //     },
                //     complete: function() {
                //         $(".loading").hide();
                //     },
                //     success: function(data) {
                //         // console.log('菜单数据：' + JSON.stringify(data, null, 2));

                //         $(".loading").hide();
                //         if (data.success) {
                //             if (data.data.items === null || data.data.items === 0) {
                //                 layer.msg('未配置监控系统')
                //                 return;
                //             }
                //             AllGroupData = data.data.items;
                //             showAllDeviceData(data.data.items);

                //             // if (sessionStorage.getItem("device_viewid") == null) {
                //             if (data.data.items[0].view !== null) {
                //                 console.log("第一组有画面");
                //                 $('#wraplist li:first-child a').click();
                //                 console.log('查看:' + $('#demo-li0 li:first-child a').data('viewid'))
                //                 $('#demo-li0 li:first-child a').click();
                //             }


                //         } else {

                //         }
                //     },
                //     error: function(data) {
                //         publicAjaxError(data);
                //     }
                // });



                var data = {
                    "success": true,
                    "data": {
                        "pageCount": 0,
                        "items": [{
                            "project_id": 1,
                            "name": "2好嘞",
                            "view_count": 6,
                            "view": [{
                                "project_id": 1,
                                "name": "a",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 172,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "测试新建画面",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 173,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "呵呵",
                                "external_link": "234",
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 175,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "hehna",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 176,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "123",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 178,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "测试hover",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": "{\"canvas\":[{\"type\":\"rectangleComponent\",\"id\":\"34f4e8dd-bd98-96ea-33e6-dae24c964fbc\",\"x\":113,\"y\":66,\"width\":50,\"height\":50,\"alpha\":1,\"angle\":0,\"userData\":{\"type\":\"basicComponent\",\"custom\":{\"newCreat\":false,\"editSatus\":\"defaults\",\"havepoint\":true},\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"bingding_status\":0,\"status\":\"default\"},\"routine\":{\"name\":\"矩形\",\"description\":\"\",\"visible\":false,\"enable\":false,\"accessLevel\":8,\"hint\":{\"flag\":true,\"hintText\":\"123123123123\"},\"readOnly\":false},\"defaults\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onTrue\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onFalse\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onAlarm\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onDisconnected\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false}},\"cssClass\":\"rectangleComponent\",\"ports\":[{\"type\":\"draw2d.InputPort\",\"id\":\"0746c494-398b-f9d5-b93b-9c0f6b4e4eeb\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_InputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"input0\",\"port\":\"draw2d.InputPort\",\"locator\":\"draw2d.layout.locator.InputPortLocator\"},{\"type\":\"draw2d.OutputPort\",\"id\":\"b5082b4e-531d-9564-2d16-8789c2f2b128\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_OutputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"output0\",\"port\":\"draw2d.OutputPort\",\"locator\":\"draw2d.layout.locator.OutputPortLocator\"}],\"bgColor\":\"#35C99D\",\"color\":\"#000000\",\"stroke\":0,\"radius\":0,\"dasharray\":null}],\"subCanvas\":[{\"id\":\"fvrhowv8x1s0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"brdx1zd6bpk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8pstndm5j0c0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"k9d1cdrr3rk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"3dia0fkanj80000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8zjrr99u8zs0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"c4qy6kc67wo0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"5opz3pwpzyc0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"52dykgdyfwk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"50dw7cuaaig0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"2ku5if25hk60000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"art1gkcofco0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"1d54zm2lp90g000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"wlvydacbnbk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"bg37fd4kzps0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"fvlmt11uqts0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"6689z527w7k0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"d9gmuyx0vl40000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"148o0ak924m8000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8k2yacstd6w0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}}],\"bg_color\":\"#2B2F4C\"}",
                                "id": 178,
                                "create_time": "0001-01-01 00:00:00"
                            },
                            {
                                "project_id": 1,
                                "name": "adacc",
                                "external_link": null,
                                "view_group_id": 117,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": "{\"canvas\":[{\"type\":\"rectangleComponent\",\"id\":\"34f4e8dd-bd98-96ea-33e6-dae24c964fbc\",\"x\":113,\"y\":66,\"width\":50,\"height\":50,\"alpha\":1,\"angle\":0,\"userData\":{\"type\":\"basicComponent\",\"custom\":{\"newCreat\":false,\"editSatus\":\"defaults\",\"havepoint\":true},\"tag\":{\"tag_id\":193,\"tag_type\":2,\"tag_name\":\"泵\",\"is_readonly\":false,\"bingding_status\":0,\"status\":\"default\"},\"routine\":{\"name\":\"矩形\",\"description\":\"\",\"visible\":false,\"enable\":false,\"accessLevel\":8,\"hint\":{\"flag\":false,\"hintText\":\"\"},\"readOnly\":false},\"defaults\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onTrue\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onFalse\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onAlarm\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false},\"onDisconnected\":{\"lineWidth\":0,\"lineColor\":\"#000000\",\"fillColor\":\"#35C99D\",\"alpha\":1,\"blinking\":false}},\"cssClass\":\"rectangleComponent\",\"ports\":[{\"type\":\"draw2d.InputPort\",\"id\":\"0746c494-398b-f9d5-b93b-9c0f6b4e4eeb\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_InputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"input0\",\"port\":\"draw2d.InputPort\",\"locator\":\"draw2d.layout.locator.InputPortLocator\"},{\"type\":\"draw2d.OutputPort\",\"id\":\"b5082b4e-531d-9564-2d16-8789c2f2b128\",\"width\":10,\"height\":10,\"alpha\":1,\"angle\":0,\"userData\":{},\"cssClass\":\"draw2d_OutputPort\",\"bgColor\":\"#4F6870\",\"color\":\"#1B1B1B\",\"stroke\":1,\"dasharray\":null,\"maxFanOut\":9007199254740991,\"name\":\"output0\",\"port\":\"draw2d.OutputPort\",\"locator\":\"draw2d.layout.locator.OutputPortLocator\"}],\"bgColor\":\"#35C99D\",\"color\":\"#000000\",\"stroke\":0,\"radius\":0,\"dasharray\":null}],\"subCanvas\":[{\"id\":\"fvrhowv8x1s0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"brdx1zd6bpk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8pstndm5j0c0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"k9d1cdrr3rk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"3dia0fkanj80000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8zjrr99u8zs0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"c4qy6kc67wo0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"5opz3pwpzyc0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"52dykgdyfwk0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"50dw7cuaaig0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"2ku5if25hk60000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"art1gkcofco0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"1d54zm2lp90g000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"wlvydacbnbk000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"bg37fd4kzps0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"fvlmt11uqts0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"6689z527w7k0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"d9gmuyx0vl40000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"148o0ak924m8000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}},{\"id\":\"8k2yacstd6w0000\",\"name\":\"按钮\",\"tag\":{\"tag_id\":-1,\"tag_type\":-1,\"tag_name\":\"\",\"is_readonly\":false,\"tag_value\":\"\",\"bingding_status\":0,\"status\":\"default\"}}],\"bg_color\":\"#2B2F4C\"}",
                                "id": 180,
                                "create_time": "0001-01-01 00:00:00"
                            }
                            ],
                            "id": 117,
                            "create_time": "2017-11-01 18:09:27"
                        },
                        {
                            "project_id": 1,
                            "name": "2号楼",
                            "view_count": 1,
                            "view": [{
                                "project_id": 1,
                                "name": "12",
                                "external_link": null,
                                "view_group_id": 118,
                                "background_img_url": null,
                                "background_color": null,
                                "view_data": null,
                                "id": 177,
                                "create_time": "0001-01-01 00:00:00"
                            }],
                            "id": 118,
                            "create_time": "2017-09-20 11:10:11"
                        },
                        {
                            "project_id": 1,
                            "name": "空调机组",
                            "view_count": 0,
                            "view": null,
                            "id": 140,
                            "create_time": "2017-11-01 16:12:54"
                        },
                        {
                            "project_id": 1,
                            "name": "照明哥哥哥",
                            "view_count": 0,
                            "view": null,
                            "id": 141,
                            "create_time": "2017-11-01 18:17:10"
                        },
                        {
                            "project_id": 1,
                            "name": "照明",
                            "view_count": 0,
                            "view": null,
                            "id": 152,
                            "create_time": "2017-11-07 15:00:26"
                        },
                        {
                            "project_id": 1,
                            "name": "照明",
                            "view_count": 0,
                            "view": null,
                            "id": 153,
                            "create_time": "2017-11-09 15:22:23"
                        }
                        ]
                    },
                    "error_message": null
                }


                if (data.success) {
                    if (data.data.items === null) {
                        layer.msg('未配置监控系统')
                    } else {
                        var arr = data.data.items;

                        arr.forEach(function (ele, index) {
                            if (index === 0) {
                                ele.itemed = true;
                            } else {
                                ele.itemed = false;
                            }
                            var group_name = ele.name;
                            console.log(group_name)
                            console.log(group_name.indexOf("空调"))
                            if (group_name.indexOf("空调") >= 0) {
                                ele.i_type = 'kongtiao';
                            } else if (group_name.indexOf("视频") >= 0) {
                                ele.i_type = 'vedio';
                            } else if (group_name.indexOf("照明") >= 0) {
                                ele.i_type = 'zhaoming';
                            } else if (group_name.indexOf("停车场") >= 0) {
                                ele.i_type = 'tingche';
                            } else if (group_name.indexOf("风机末端") >= 0) {
                                ele.i_type = 'fengji';
                            } else if (group_name.indexOf("入侵报警") >= 0) {
                                ele.i_type = 'ruqin';
                            } else if (group_name.indexOf("环境监测") >= 0) {
                                ele.i_type = 'huanjing';
                            } else if (group_name.indexOf("风机盘管") >= 0) {
                                ele.i_type = 'fengji';
                            } else if (group_name.indexOf("电梯") >= 0) {
                                ele.i_type = 'dianti';
                            } else if (group_name.indexOf("照明") >= 0) {
                                ele.i_type = 'zhaoming';
                            } else if (group_name.indexOf("给水") >= 0) {
                                ele.i_type = 'jishui';
                            } else if (group_name.indexOf("排水") >= 0) {
                                ele.i_type = 'paishui';
                            } else {
                                ele.i_type = 'custom';
                            }

                        });



                        _this.monitoringGroup = arr;

                        this.$nextTick(function () {
                            element.init();




                        });

                    }
                }


            },
            // 获取 设备监控 画面数据
            getCanvasData: function (item) {
                var _this = this;
                this.getTableTrend(item.id);
                $('#monitortab').click();
                if (this.MqttOperation.restart) {
                    this.unsubscribeView();
                    this.MqttOperation.mqtt.disconnect();
                    this.MqttOperation.restart = false;
                } else {

                }


                this.MQTTconnect();
                // setTimeout(function () {
                //     _this.setCanvasWH();
                // }, 80);
                this.canvas.clear(); //清空画布
                this.globalBtnData = []; //清空全局按钮

                if (item.view_data === null) {
                    layer.msg('画面无数据');
                } else {
                    var canvasArr = JSON.parse(item.view_data).canvas;
                    var globalArr = JSON.parse(item.view_data).subCanvas;

                    // 还原 全局按钮 数据
                    this.globalBtnData = globalArr;

                    // 还原 canvas 数据
                    var reader = new draw2d.io.json.Reader();
                    reader.unmarshal(this.canvas, canvasArr);
                    // 初始化 canvas 组件
                    var writer = new draw2d.io.json.Writer();
                    writer.marshal(this.canvas, function (json) {
                        // console.log(JSON.stringify(json, null, 2))
                        for (var i in json) {
                            //获得ID对应的节点对象
                            var node = _this.getCanvasNode(json[i].id);
                            //  控件的 输入输出节点(隐藏)
                            if (node) {
                                console.log('type：' + JSON.stringify(node.userData, null, 2))

                                var userData = node.userData;
                                if (userData.hasOwnProperty('type')) {
                                    if (userData.type === 'basicComponent') {
                                        // 隐藏输入输出点
                                        if (userData.hasOwnProperty("onlytype")) {
                                            // 管道链接点(去掉)
                                            node.resetPorts();
                                        } else if (userData.custom.hasOwnProperty("havepoint")) {
                                            node.getOutputPort(0).setVisible(false);
                                            node.getInputPort(0).setVisible(false);
                                        }
                                    }

                                    // 隐藏组件
                                    if (userData.routine.visible) {
                                        node.setAlpha(0);
                                        if (node.image) {
                                            node.image.setAlpha(0);
                                        }
                                        if (node.label) {
                                            node.label.setAlpha(0);
                                        }
                                        if (userData.hasOwnProperty("onlytype")) {
                                            node.setVisible(false);
                                        }

                                    }

                                    // 更改标题	
                                    if (userData.routine.hasOwnProperty("caption")) {
                                        var caption = userData.routine.caption;
                                        if (caption.flag) {
                                            node.label.setVisible(true);
                                        }
                                        node.label.setText(caption.capText);
                                    }


                                    // 节点闪烁
                                    if (userData.defaults.blinking) {
                                        node.startTimer(1000);

                                    }

                                    // 图片
                                    if (node.image) {
                                        node.image.setHeight(node.getHeight());
                                        node.image.setWidth(node.getWidth());
                                    }
                                    if (userData.defaults.hasOwnProperty("picture")) {
                                        node.image.setPath(userData.defaults.picture);
                                        node.image.setHeight(node.getHeight());
                                        node.image.setWidth(node.getWidth());
                                    }
                                } else {
                                    node.setDraggable(false);
                                    node.setSelectable(false);
                                }
                            }
                        }
                    });
                }
            },

            /***************************表格方法**********************************/
            // 获取 列表与趋势图 数据
            getTableTrend: function (id) {

                var _this = this;
                var data = {
                    "success": true,
                    "data": [
                        {
                            "id": "e4dd000a-ec98-67b9-8416-26119692beb3",
                            "com_readonly": false,
                            "name": "泵0",
                            "tag_id": 193,
                            "trends": false,// 是否有趋势数据
                            "tag_type": 2,
                            "readonly": false,
                            "alarm": null,
                            "status": 0,
                            "value": '123',
                            "create_time": "0001-01-01 00:00:00"
                        },
                        {
                            "id": "123123123123123",
                            "com_readonly": false,
                            "name": "泵0",
                            "tag_id": 193,
                            "trends": false,// 是否有趋势数据
                            "tag_type": 1,
                            "readonly": false,
                            "alarm": null,
                            "status": null,
                            "value": null,
                            "create_time": "0001-01-01 00:00:00"
                        },
                        {
                            "id": "4ccfbf00-31f0-6254-17f0-6dbfdeab6097",
                            "com_readonly": false,
                            "name": "文本19",
                            "tag_id": 224,
                            "trends": true,
                            "tag_type": 3,
                            "readonly": false,
                            "alarm": null,
                            "status": null,
                            "value": null,
                            "create_time": "0001-01-01 00:00:00"
                        }
                    ],
                    "error_message": null
                }

                _this.tableTrend = {};
                data.data.forEach(function (ele) {
                    if (_this.tableTrend.hasOwnProperty(String(ele.tag_id))) {
                        _this.tableTrend[ele.tag_id].component.push({ id: ele.id });
                    } else {
                        var dicEmpty = {
                            name: ele.name,
                            tag_id: ele.tag_id,
                            trends: ele.trends,
                            tag_type: ele.tag_type,
                            readonly: ele.readonly,
                            alarm: ele.alarm,
                            status: ele.status,
                            value: ele.value,
                            component: [
                                { id: ele.id }
                            ]
                        };

                        _this.tableTrend[String(ele.tag_id)] = dicEmpty;
                    }
                });
                console.log(JSON.stringify(this.tableTrend, null, 2))

                _this.reloadCanvas({
                    type: 'table',
                    data: _this.tableTrend
                });






            },

            //操作 click
            operationClick: function (tagid) {
                var _this = this;
                var key = String(tagid);
                if (this.tableTrend.hasOwnProperty(key)) {
                    var currentTag = this.tableTrend[key];
                    if (currentTag.status === 0) {
                        var values = currentTag.value;
                        if (values == null) {
                            layer.msg('tag的值为 null')
                        } else {
                            switch (currentTag.tag_type) {
                                case 1:
                                    layer.open({
                                        title: ['操作'],
                                        type: 1,
                                        skin: 'bayax-layer-skin',
                                        area: ['300px', '200px'],
                                        content: $('#action-bool'),
                                        shift: 2,
                                        resize: false,
                                        btn: ['保存', '取消'],
                                        success: function () {
                                            if (Number(values) === 1) {
                                                _this.layerData.actionBool = '1';
                                            } else {
                                                _this.layerData.actionBool = '0';
                                            }
                                        },
                                        yes: function (index) {
                                            console.log(_this.layerData.actionBool);

                                            _this.ajaxChangeTagValue({
                                                tag_id: tagid,
                                                value: Number(_this.layerData.actionBool)
                                            });
                                        },
                                        btn2: function (index) {
                                        },
                                    });
                                    break;
                                case 2:
                                case 3:
                                    layer.open({
                                        title: ['操作'],
                                        type: 1,
                                        skin: 'bayax-layer-skin',
                                        area: ['300px', '200px'],
                                        content: $('#action-real'),
                                        shift: 2,
                                        resize: false,
                                        btn: ['保存', '取消'],
                                        success: function () {
                                            _this.layerData.acttionReal = values;
                                        },
                                        yes: function (index) {
                                            console.log(_this.layerData.acttionReal);

                                            if (_this.layerData.acttionReal === '') {
                                                layer.msg('请输入正确格式的数值')
                                            } else {
                                                _this.ajaxChangeTagValue({
                                                    tag_id: tagid,
                                                    value: Number(_this.layerData.acttionReal)
                                                });
                                            }
                                        },
                                        btn2: function (index) {

                                        },
                                    });
                                    break;
                                case 4:
                                    layer.open({
                                        title: ['操作'],
                                        type: 1,
                                        skin: 'bayax-layer-skin',
                                        area: ['300px', '200px'],
                                        content: $('#action-str'),
                                        shift: 2,
                                        resize: false,
                                        btn: ['保存', '取消'],
                                        success: function () {
                                            _this.layerData.actionString = values;
                                        },
                                        yes: function (index) {
                                            console.log(_this.layerData.actionString);
                                            _this.ajaxChangeTagValue({
                                                tag_id: tagid,
                                                value: _this.layerData.actionString
                                            });
                                        },
                                        btn2: function (index) {

                                        },
                                    });

                                    break;
                                default:
                                    layer.msg('tag类型ERROR');
                                    break;
                            }
                        }
                    } else {
                        layer.msg('当前tag状态异常,不能进行操作');
                    }
                } else {
                    layer.msg('未查询到tag')
                }
            },

            // 查看 趋势图
            watchTrend: function (id) {
                var _this = this;
                layer.open({
                    title: ['趋势图'],
                    type: 1,
                    skin: 'bayax-layer-skin',
                    area: ['80%', '80%'],
                    content: $('#trendMap'),
                    shift: 2,
                    resize: false,
                    // btn: ['保存', '取消'],
                    success: function () {

                        // 该方法 会调用 获取 历史趋势方法
                        _this.choiceTime(_this.trend.btnSelectdata[3]);

                        // 实时趋势
                        _this.searchTagValueRealTimeTrend();
                    },
                    cancel: function (index, layero) {
                        // 停止弹窗 定时器
                        clearInterval(_this.trend.realInterval);
                    }  

                });
            },

            /***************************组件方法*********************************/
            // 闪烁方法
            flashMethod: function (component) {
                component.setColor("#03A3FC");
                component.setStroke(1);
                component.setGlow(true);
                setTimeout(function () {
                    component.setGlow(false);
                    var userdata = component.getUserData();
                    var type = '';
                    switch (userdata.custom.blinkingType) {
                        case 'defaults':
                            type = 'defaults';
                            break;
                        case 'onTrue':
                            type = 'onTrue';
                            break;
                        case 'onFalse':
                            type = 'onFalse';
                            break;
                        case 'onAlarm':
                            type = 'onAlarm';
                            break;
                        case 'onDisconnected':
                            type = 'onDisconnected';
                            break;
                    }
                    component.setColor(userdata[type].lineColor);
                    component.setStroke(userdata[type].lineWidth);
                }, 500);
            },

            // hover方法
            hoverMethod: function (component, type) {
                if (type) {
                    var hint = component.userData.routine.hint;
                    if (hint.flag) {
                        if (hint.hintText != '') {
                            var e = event || window.event;
                            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                            var x = e.pageX || e.clientX + scrollX;
                            var y = e.pageY || e.clientY + scrollY;
                            y -= 195;
                            x -= 250;

                            $('#tooltips').show().text(hint.hintText).css({ 'top': y, 'left': x });
                        }
                    }
                } else {
                    $('#tooltips').hide();
                }

            },

            // 组件点击方法
            comClickMethod: function (component) {
                var _this = this;
                console.log('点击');
                console.log(JSON.stringify(component.userData.tag, null, 2));
                console.log(JSON.stringify(component.userData.routine, null, 2));
                console.log(JSON.stringify(_this.tableTrend, null, 2))
                var userData = component.userData;
                var tag = userData.tag;

                if (userData.routine.readOnly) {
                    // layer.msg('组件只读');
                } else {
                    if (tag.tag_id === -1 || tag.is_readonly) {
                        layer.msg('未绑定tag或tag只读')
                    } else {
                        var key = String(tag.tag_id);
                        if (_this.tableTrend.hasOwnProperty(key)) {
                            var currentTag = _this.tableTrend[key];
                            if (currentTag.status === 0) {
                                var values = currentTag.value;
                                if (values == null) {
                                    layer.msg('当前组件绑定tag的值为 null')
                                } else {
                                    if (tag.tag_type === currentTag.tag_type) {
                                        switch (tag.tag_type) {
                                            case 1:
                                                layer.open({
                                                    title: ['操作'],
                                                    type: 1,
                                                    skin: 'bayax-layer-skin',
                                                    area: ['300px', '200px'],
                                                    content: $('#action-bool'),
                                                    shift: 2,
                                                    resize: false,
                                                    btn: ['保存', '取消'],
                                                    success: function () {
                                                        if (Number(values) === 1) {
                                                            _this.layerData.actionBool = '1';
                                                        } else {
                                                            _this.layerData.actionBool = '0';
                                                        }
                                                    },
                                                    yes: function (index) {
                                                        console.log(_this.layerData.actionBool);

                                                        _this.ajaxChangeTagValue({
                                                            tag_id: tag.tag_id,
                                                            value: Number(_this.layerData.actionBool)
                                                        });
                                                    },
                                                    btn2: function (index) {
                                                    },
                                                });
                                                break;
                                            case 2:
                                            case 3:
                                                layer.open({
                                                    title: ['操作'],
                                                    type: 1,
                                                    skin: 'bayax-layer-skin',
                                                    area: ['300px', '200px'],
                                                    content: $('#action-real'),
                                                    shift: 2,
                                                    resize: false,
                                                    btn: ['保存', '取消'],
                                                    success: function () {
                                                        _this.layerData.acttionReal = values;
                                                    },
                                                    yes: function (index) {
                                                        console.log(_this.layerData.acttionReal);

                                                        if (_this.layerData.acttionReal === '') {
                                                            layer.msg('请输入正确格式的数值')
                                                        } else {
                                                            _this.ajaxChangeTagValue({
                                                                tag_id: tag.tag_id,
                                                                value: Number(_this.layerData.acttionReal)
                                                            });
                                                        }
                                                    },
                                                    btn2: function (index) {

                                                    },
                                                });
                                                break;
                                            case 4:
                                                layer.open({
                                                    title: ['操作'],
                                                    type: 1,
                                                    skin: 'bayax-layer-skin',
                                                    area: ['300px', '200px'],
                                                    content: $('#action-str'),
                                                    shift: 2,
                                                    resize: false,
                                                    btn: ['保存', '取消'],
                                                    success: function () {
                                                        _this.layerData.actionString = values;
                                                    },
                                                    yes: function (index) {
                                                        console.log(_this.layerData.actionString);
                                                        _this.ajaxChangeTagValue({
                                                            tag_id: tag.tag_id,
                                                            value: _this.layerData.actionString
                                                        });
                                                    },
                                                    btn2: function (index) {

                                                    },
                                                });

                                                break;
                                            default:
                                                layer.msg('tag类型ERROR');
                                                break;
                                        }
                                    } else {
                                        layer.msg('数据异常');
                                    }

                                }
                            } else {
                                layer.msg('当前tag状态异常,不能进行操作');
                            }
                        } else {
                            layer.msg('未查询到tag')
                        }

                    }
                }
            },
            // 设置组件值(未完成)
            ajaxChangeTagValue: function (data) {
                var _this = this;

                console.log(JSON.stringify(data, null, 2))

                $.ajax({
                    url: apiurl + "/tagvalue/" + data.tag_id + "?value=" + data.value,
                    type: 'put',
                    beforeSend: function () {
                        _this.loadingShow = true;
                    },
                    complete: function () {
                        _this.loadingShow = false;
                    },
                    success: function (data) {
                        if (data.success) {
                            console.log("返回的数据为:" + JSON.stringify(data, null, 2));
                            layer.msg('修改成功，等待生效');

                        } else {
                            layer.msg("修改失败:" + data.error_message)
                        }
                    },
                    error: function (data) {
                        _this.loadingShow = false;
                    }
                });
            },


            /***************************画布方法********************************/
            // canvas 初始化
            canvasInit: function () {
                var _this = this;

                var canvas = new draw2d.Canvas("canvas"); //主画布
                this.canvas = canvas;
                // 边框阴影
                var filter = canvas.paper.createFilter();
                filter.createShadow(0, 0, 3, 0.3, "#000000");
                filter.element.setAttribute("x", "-35%");
                filter.element.setAttribute("y", "-35%");


                _this.setCanvasWH();
                setTimeout(function () {
                    _this.setCanvasWH();
                }, 80);

                //全局初始化 
                // 画布自适应缩放
                window.onresize = function () {
                    _this.setCanvasWH();
                    console.log('缩放')
                    setTimeout(function () {
                        _this.setCanvasWH();
                    }, 80)
                }

                $('.scrollFullBtn').mCustomScrollbar({
                    autoHideScrollbar: true
                });

            },


            /**
             *  [更新canvas 画面]
             *  @param  {result}  [组件]
             */
            reloadCanvas: function (result) {
                var _this = this;
                var data = result.data;
                switch (result.type) {
                    case 'table':
                        for (var key in data) {
                            var value = data[key].value;
                            if (data[key].status == 0) {
                                data[key].component.forEach(function (ele) {
                                    var node = _this.getCanvasNode(ele.id);
                                    if (node) {
                                        // 是否是报警
                                        switch (data[key].alarm) {
                                            case true:
                                                _this.setComponentData(node, 'onAlarm', value);
                                                break;
                                            case false:
                                                if (data[key].tag_type === 1) {
                                                    switch (Number(value)) {
                                                        case 0:
                                                            _this.setComponentData(node, 'onFalse', value);
                                                            break;
                                                        case 1:
                                                            _this.setComponentData(node, 'onTrue', value);
                                                            break;
                                                    }
                                                } else {
                                                    _this.setComponentData(node, 'onTrue', value);
                                                }
                                                break;
                                        }

                                    }
                                });
                            } else {
                                console.log('非 正常状态')
                                data[key].component.forEach(function (ele) {
                                    var node = _this.getCanvasNode(ele.id);
                                    if (node) {
                                        _this.setComponentData(node, 'onDisconnected', '通讯异常');
                                    } else {
                                        console.log('未找到组件');
                                    }

                                });
                            }
                        }
                        break;
                    case 'mqtt':
                        var node = _this.getCanvasNode(result.com_id);
                        var value = data.value;
                        if (data.status == 0) {
                            if (node) {
                                // 是否是报警
                                switch (data.isAlarm) {
                                    case true:
                                        _this.setComponentData(node, 'onAlarm', value);
                                        break;
                                    case false:
                                        if (result.tag_type === 1) {
                                            switch (Number(value)) {
                                                case 0:
                                                    _this.setComponentData(node, 'onFalse', value);
                                                    break;
                                                case 1:
                                                    _this.setComponentData(node, 'onTrue', value);
                                                    break;
                                            }
                                        } else {
                                            _this.setComponentData(node, 'onTrue', value);
                                        }
                                        break;
                                }
                            }
                        } else {
                            if (node) {
                                _this.setComponentData(node, 'onDisconnected', '通讯异常');
                            } else {
                                console.log('未找到组件');
                            }
                        }
                        break;
                }
            },

            /**
             * [初始化 画布控件显示数据]
             * @param  {node}  [组件]
             * @param  {type}  [status类型]
             * @return {values}  [值]
             */
            setComponentData: function (node, type, values) {
                var data = {};
                var value = String(values);

                // 停止当前闪烁状态
                node.stopTimer();
                switch (type) {
                    case 'onTrue':
                        // 将当前闪烁的标志 改为  'onTrue'
                        node.userData.custom.blinkingType = "onTrue";
                        data = node.userData.onTrue;
                        break;
                    case 'onFalse':
                        node.userData.custom.blinkingType = "onFalse";
                        data = node.userData.onFalse;
                        break;
                    case 'onAlarm':
                        node.userData.custom.blinkingType = "onAlarm";
                        data = node.userData.onAlarm;
                        break;
                    case 'onDisconnected':
                        node.userData.custom.blinkingType = "onDisconnected";
                        data = node.userData.onDisconnected;
                        break;
                    default:
                        break;
                }

                if (node.userData.type === 'labelComponent') {
                    node.setText(value);
                } else {
                    if (data.blinking) {
                        node.startTimer(1000);
                    }
                    // 边框宽度
                    node.setStroke(Number(data.LineWidth));
                    node.setColor(data.LineColor);
                }


                switch (node.userData.type) {
                    case 'labelComponent':
                        break;
                    case 'lineComponent':
                        break;
                    case 'basicComponent':
                        node.setBackgroundColor(data.fillColor);
                        if (!node.userData.routine.visible) {
                            node.setAlpha(data.alpha);
                        }
                        break;
                    case 'textComponent':
                        node.setBackgroundColor(data.fillColor);
                        node.setFontColor(data.fontColor);
                        if (data.text === '') {
                            node.setText(value + node.userData.routine.unit);
                        } else {
                            node.setText(data.text);
                        }

                        break;
                    case 'defaultComponent':
                        node.image.setPath(data.picture);
                        if (node.userData.custom.showValue.flag) {
                            node.labelValue.setText(value);
                        }
                        break;
                    case 'customImageComponent':
                        node.setBackgroundColor(data.fillColor);
                        node.image.setPath(data.picture);
                        if (!node.userData.routine.visible) {
                            node.setAlpha(data.alpha);
                        }
                        break;
                }
            },

            // 在 画布中找到 node
            getCanvasNode: function (id) {
                if (id != '') {
                    var node = monitoringVue.canvas.getFigure(id);
                    var nodeLine = monitoringVue.canvas.getLine(id);
                    if (node !== null) {
                        return node;
                    } else if (nodeLine !== null) {
                        return nodeLine;
                    }
                } else {
                    return false;
                }
            },

            // 设置画布 宽高
            setCanvasWH: function () {
                var _this = this;
                var w = Number($('.canvas-div').width());
                console.log($('.canvas-div').width())

                var s = 1300 / w;
                $('#canvas').css({
                    width: w + 'px',
                    height: w * 9 / 16 + 'px'
                });

                $('.content-main-mon').css({
                    // width: w + 'px',
                    height: w * 9 / 16 + 20 + 'px'
                });
                $('.scrollFullBtn').css({
                    // width: w + 'px',
                    height: w * 9 / 16 - 20 + 'px'
                });

                this.canvas.setZoom(s);

            },
            reSetCanvasWH: function () {
                var _this = this;
                setTimeout(function () {
                    _this.setCanvasWH();
                }, 50)
            },
            /********************************全局按钮***********************************/
            globalBtnMethod:function(item){
                console.log(JSON.stringify(item,null,2))
                var tag = item.tag;
                this.ajaxChangeTagValue({
                    tag_id:tag.tag_id,
                    value:tag.tag_value
                });
            },

            /******************************MQTT***************************************/
            MQTTconnect: function () {
                var _this = this;
                this.MqttOperation.mqtt = new Paho.MQTT.Client(
                    // "demo.bayax.cn",
                    "192.168.118.153",
                    61614,
                    String(parseInt(Math.random() * 100,
                        10)));
                var options = {
                    // timeout: 3,
                    useSSL: false,
                    cleanSession: false,
                    onSuccess: function () {
                        _this.subscribeView();
                    },
                    onFailure: function (message) {
                        console.log("connect Failure");
                        // setTimeout(_this.MQTTconnect, _this.MqttOperation.reconnectTimeout);
                    }
                };

                this.MqttOperation.mqtt.onConnectionLost = this.onConnectionLost;
                this.MqttOperation.mqtt.onMessageArrived = this.onMessageArrived;
                this.MqttOperation.mqtt.connect(options);
            },
            // 订阅画布消息
            subscribeView: function () {
                console.log('连接成功');
                console.log('view_id' + this.MqttOperation.view_id)
                this.MqttOperation.restart = true;
                this.MqttOperation.mqtt.subscribe('Bayax/Push/' + this.MqttOperation.view_id);
            },
            // 取消订阅
            unsubscribeView: function () {
                console.log('取消订阅');
                this.MqttOperation.mqtt.unsubscribe('Bayax/Push/' + this.MqttOperation.view_id);
            },

            // 发送心跳包
            sendHeadData: function () {

                var _this = this;
                setInterval(function () {
                    var view_id = _this.MqttOperation.view_id;
                    if (Number(view_id) > 0 && _this.MqttOperation.mqtt) {
                        var heatMessage = new Paho.MQTT.Message(view_id);
                        heatMessage.destinationName = 'Bayax/View/' + _this.MqttOperation.clientID;
                        heatMessage.qos = 0;
                        mqtt.send(heatMessage);
                        console.log('页面id：' + view_id)
                    }
                }, 15000);
            },
            //重新链接MQTT服务器
            onConnectionLost: function (response) {
                if (this.MqttOperation.restart) {
                    console.log("手动断开:" + JSON.stringify(response, null, 2));
                } else {
                    console.log("意外断开:" + JSON.stringify(response, null, 2));
                    setTimeout(_this.MQTTconnect, _this.MqttOperation.reconnectTimeout);
                }
            },
            //接受消息
            onMessageArrived: function (messages) {
                var _this = this;
                var message = JSON.parse(messages.payloadString);
                console.log('查看MQTT返回的数据:' + JSON.stringify(message, null, 2));
                // message.tagId  message.status 0,1,2       message.isAlarm true/false  message.value
                var key = String(message.tagId);
                if (this.tableTrend.hasOwnProperty(key)) {
                    var dic = this.tableTrend[key];
                    // 更改 表格数据
                    dic.status = message.status;
                    dic.alarm = message.isAlarm;
                    dic.value = message.value;

                    //更新 canvas
                    dic.component.forEach(function (ele) {
                        _this.reloadCanvas({
                            com_id: ele.id,
                            tag_type: dic.tag_type,
                            type: 'mqtt',
                            data: message
                        });
                    });
                    // 更新  实时趋势  数值
                    if(message.tagId == this.trend.tagid){
                        if(message.status === 0){
                            var value = message.value;
                            if (!isNaN(value)) {
                                this.trend.tagValue =value;
                            }
                        }else{
                            this.trend.tagValue =null;
                        }
                       
                    }
                }
            },

            /**************************趋势图*******************************************/

            // 时间选择下拉框
            choiceTime: function (item) {
                this.trend.btnSelectTitle = item.name;
                this.trend.startime = item.startime;
                this.trend.endtime = item.endtime;

                if (item.type) {
                    this.searchTagValueHistoryTrend();
                }
                console.log(JSON.stringify(item, null, 2))
            },
            // 查询  历史趋势
            searchTagValueHistoryTrend: function () {
                var _this = this;
                var trend = this.trend;
                // ajax请求
                $.ajax({
                    url: apiurl + 'tagTrendsData/' + trend.tagid,
                    type: "GET",
                    dataType: 'json',
                    data: {
                      start_time: trend.startime,
                      end_time: trend.endtime + ' ' + '23:59:59'
                    },
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                
                      if (data.success) {
                        
                        var arr = data.data.values;
                        var highCharArr = [];
                        if (arr !== null) {
                            for (var key in arr) {
                                var temp = [];
                                temp.push(new Date(key).getTime());
                                temp.push(Number(arr[key]));
                                highCharArr.push(temp);
                            }
                            console.log("历史数据:" + JSON.stringify(highCharArr, null, 2))

                            // 生成 图表

                        }else{
                            layer.msg('无数据')
                        }
                       

                     
                      } else {
                        layer.msg("错误原因:" + data.error_message);
                        console.log("错误原因:" + JSON.stringify(data, null, 2))
                      }
                    },
                    error: function(data) {
                        _this.loadingShow = false;
                      publicAjaxError(data);
                    }
                  });








                var data = [
                    [
                      1416182400000,
                      7.204
                    ],
                    [
                      1416268800000,
                      7.058
                    ],
                    [
                      1416355200000,
                      6.961
                    ],
                    [
                      1416441600000,
                      6.947
                    ],
                    [
                      1416528000000,
                      6.975
                    ]

                  ]

                  console.log(JSON.stringify(data, null, 2))
                  Highcharts.stockChart('hisTrendContent', {

                    chart: {
                        backgroundColor: '#2B2E4B',
                        alignTicks: false,
                        type: 'spline'
                    },
                    rangeSelector: {
                        // allButtonsEnabled: true,
                        enabled: false,
                        buttonTheme: {
                            width: 60
                        },
                        selected: 2
                    },
                    title: {
                        text: '历史趋势',
                        style: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontFamily: "微软雅黑",
                            fontSize: "18px"
                        }
                    },
                    plotOptions: {
                        series: {
                            showInLegend: true
                        }
                    },
                    navigator: {
                        enabled: true,
                        xAxis: {
                            lineColor: '#555769',
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                second: '%Y-%m-%d<br/>%H:%M:%S',
                                minute: '%Y-%m-%d<br/>%H:%M',
                                hour: '%Y-%m-%d %H:00',
                                day: '%Y-%m-%d',
                                week: '%Y-%m-%d',
                                month: '%Y-%m',
                                year: '%Y-'
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0,
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            style: {
                                color: '#555769' //颜色
                            }
                        },
                        lineColor: '#555769',
                        tickColor: '#555769',
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br/>%H:%M:%S',
                            minute: '%Y-%m-%d<br/>%H:%M',
                            hour: '%Y-%m-%d %H:00',
                            day: '%Y-%m-%d',
                            week: '%Y-%m-%d',
                            month: '%Y-%m',
                            year: '%Y-'
                        }
                    },
                    yAxis: {
                        gridLineColor: '#555769',
                        opposite: false
                    },
                    credits: {
                        enabled: false
                    },

                    tooltip: {
                        formatter: function () {
                            var content = "";

                            var date = new Date(this.x);
                            content += '<span>' + date.format("yyyy-MM-dd hh:mm:ss") + '</span><br/><br/>'
                            for (var i = 0; i < this.points.length; i++) {
                                content += '<span style="color: ' + this.points[i].series.color + '">' + this.points[i].series.name + '</span>: ' + this.points[i].y;
                            };
                            return content;
                        }
                    },


                    series: [{
                        // type: 'line',
                        id: '000001',
                        name: '值',
                        data: data
                    }]
                });

            },
            // 查询  实时趋势
            searchTagValueRealTimeTrend:function(){
                var _this = this;
                var trend = this.trend;
               
                $.ajax({
                    url: apiurl + "tagvalue/" + trend.tagid,
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                         console.log(JSON.stringify(data, null, 2));
                         
                
                      if (data.success) {
                        // var length = data.values.length;
                        var arr = data.data.values;
                        var highCharArr = [];
                        if (arr === null) {
                          trend.tagValue = null;

                          highCharArr = (function () {
                            var data = [],
                                time = (new Date()).getTime(),
                                i;
                            for (i = -10; i <= 0; i += 1) {
                                data.push({
                                    x: time + i * 1000,
                                    y: 0
                                });
                            }
                            return data;
                        }());

                        } else {
                
                          for (var key in arr) {
                            var times = new Date(Date.parse(key.replace(/-/g, "/"))).getTime();
                            var realdic = {
                              x: times,
                              y: Number(arr[key])
                            }
                            highCharArr.push(realdic);
                          }

                          trend.tagValue = highCharArr[highCharArr.length -1].y;
                        }
                
                        console.log(JSON.stringify(highCharArr, null, 2))
                       

                        // 生成 图表
                
                       
                      } else {
                        layer.msg("实时数据:" + data.error_message)
                        console.log("实时数据：" + JSON.stringify(data, null, 2))
                      }
                    },
                    error: function(data) {
                      publicAjaxError(data);
                    }
                
                  });

























                






                $('#realTrendContent').highcharts({
                    chart: {
                        type: 'spline',
                        backgroundColor: '#2B2E4B',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events: {
                            load: function () {
                                // set up the updating of the chart each second
                                var series = this.series[0],
                                    chart = this;
                               trend.realInterval = setInterval(function () {
                                    var x = (new Date()).getTime(), // current time
                                        y = Math.random();
                                    series.addPoint([x, y], true, true);

                                    console.log('查看添加的数据：'+x)
                                }, 1000);
                            }
                        }
                    },
                    title: {
                        text: '实时趋势',
                        style: {
                          color: '#fff',
                          fontWeight: 'normal',
                          fontFamily: "微软雅黑",
                          fontSize: "18px"
                        }
                      },
                      xAxis: {
                        labels: {
                          style: {
                            color: '#555769'
                          }
                        },
                        lineColor: '#555769',
                        type: 'datetime',
                        dateTimeLabelFormats: {
                          second: '%Y-%m-%d<br/>%H:%M:%S',
                          minute: '%Y-%m-%d<br/>%H:%M',
                          hour: '%Y-%m-%d %H:00',
                          day: '%Y-%m-%d',
                          week: '%Y-%m-%d',
                          month: '%Y-%m',
                          year: '%Y-'
                        },
                        tickColor: '#555769',
                        tickLength: 10,
                        tickPixelInterval: null,
                        labels: {
                          formatter: function() {
                            return Highcharts.dateFormat('%H:%M:%S', this.value);
                          }
                        }
            
                      },
                      yAxis: {
                        title: {
                          text: 'Value'
                        },
                        gridLineColor: '#555769',
                        plotLines: [{
                          value: 0,
                          width: 1,
                          color: '#808080'
                        }]
                      },
                      tooltip: {
                        formatter: function() {
                          console.log('查看：' + this.x)
                            // '<b>' + this.series.name + '</b><br/>' +
            
                          return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + '<span style="color: ' + this.series.color + '">值为：</span> ' +
                            Highcharts.numberFormat(this.y, 2);
                        }
                      },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: true
                    },
                    credits: {
                        enabled: false
                      },
                    series: [{
                        color: '#f5a623',
                        name: '数据',
                        data: (function () {
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime(),
                                i;
                            for (i = -10; i <= 0; i += 1) {
                                data.push({
                                    x: time + i * 1000,
                                    y: Math.random()
                                });
                            }
                            console.log('======================'+JSON.stringify(data,null,2))
                            return data;
                        }())
                    }]
                });
            }
        }
    });

});

Highcharts.setOptions({
    global: {
        useUTC: false  
    },
    lang: {
        contextButtonTitle: "图表导出菜单",
        decimalPoint: ".",
        downloadJPEG: "下载JPEG图片",
        downloadPDF: "下载PDF文件",
        downloadPNG: "下载PNG文件",
        downloadSVG: "下载SVG文件",
        drillUpText: "返回 {series.name}",
        loading: "加载中",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        noData: "没有数据",
        numericSymbols: ["千", "兆", "G", "T", "P", "E"],
        printChart: "打印图表",
        resetZoom: "恢复缩放",
        resetZoomTitle: "恢复图表",
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        thousandsSep: ",",
        weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
    }
});
