layui.use(['layer', 'element', 'laydate'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;


    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function(value, date, endDate) {
            warnVue.btnSelectTitle = '自定义';
            warnVue.startime = value;
            $('#endtime').focus();
            console.log('查看时间:' + warnVue.startime);

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
            var st = warnVue.startime;
            var ed = warnVue.endtime = value;
            warnVue.btnSelectTitle = '自定义';
            console.log('查看时间：' + warnVue.endtime);
            if (st != '' && ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        warnVue.getWarnLog(1);
                    }
                } else {
                    warnVue.endtime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            }
        }
    });



    var warnVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            loadingShow: false,
            flags: true, //点击报警日志 请求数据标志(仅用于第一次点击)
            warnData: [], //报警数据
            warnLogData: [], //报警日志数据
            btnSelectTitle: '',
            btnSelectdata: [],
            startime: '',
            endtime: '',


        },
        mounted: function() {
            var _this = this;


            this.$nextTick(function() {
                bayaxInit();
                this.btnSelectdata = dateData();
                console.log(JSON.stringify(this.btnSelectdata, null, 2));


                // this.getWarnData(1);
                // this.test();
            });

        },
        methods: {
            // 下拉按钮选择时间
            choiceTime: function(item) {
                this.btnSelectTitle = item.name;
                this.startime = item.startime;
                this.endtime = item.endtime;

                if (item.type) {
                    this.getWarnLog(1);
                }
                console.log(JSON.stringify(item, null, 2))
            },
            // 获取报警数据
            getWarnData: function(page) {
                var _this = this;
                var nums = 13;
                var dataUp = ['page=' + page, 'page_item_count=' + nums].join("&");
                console.log(dataUp);
                $.ajax({
                    url: apiurl + 'alarmvalue/0?' + dataUp,
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    success: function(data) {
                        _this.loadingShow = false;

                        if (data.success) {
                            var result = data.data.items;
                            if (result == null) {
                                result = [];
                            }
                            var arr = result.map(function(item) {
                                switch (item.alarm_level) {
                                    case 0:
                                        item.alarm_level = "无";
                                        break;
                                    case 1:
                                        item.alarm_level = "低";
                                        break;
                                    case 2:
                                        item.alarm_level = "中";
                                        break;
                                    case 3:
                                        item.alarm_level = "高";
                                        break;
                                }

                                if (item.description === null) {
                                    item.description = '无';
                                }

                                switch (item.alarm_value) {
                                    case 'True':
                                        item.actual_value = "True";
                                        break;
                                    case 'False':
                                        item.actual_value = "False";
                                        break;

                                }
                                item.a_ishide = false;
                                item.span_ishide = true;
                                return item;
                            })

                            var length = arr.length;
                            if (length < nums) {
                                for (var i = 0; i < nums - length; i++) {
                                    arr.push({
                                        id: '',
                                        alarm_level: '',
                                        alarm_time: '',
                                        description: '',
                                        tag_name: '',
                                        alarm_value: '',
                                        actual_value: '',
                                        alarm_status: "",
                                        a_ishide: true,
                                        span_ishide: true
                                    });
                                }
                            }
                            _this.warnData = arr;
                            if (data.data.pageCount === 0) {
                                layer.msg('无数据');
                                $('.tcdPageCode-warn').hide();

                            } else {

                                $('.tcdPageCode-warn').show().createPage({
                                    pageCount: data.data.pageCount,
                                    current: page,
                                    backFn: function(p) {
                                        _this.getWarnData(p);
                                    }
                                });
                            }
                            console.log(JSON.stringify(_this.warnData, null, 2));


                        } else {
                            layer.msg(data.error_message);
                            console.log("错误原因" + JSON.stringify(data, null, 2));
                        }







                    },
                    error: function(data) {

                        layer.msg(data.error_message);
                        returnLogIn(data);
                    }
                });


            },
            //确认报警
            sureWarn: function(item) {
                var _this = this;
                var change = true;
                var status = '';
                switch (Number(item.alarm_status)) {
                    case 1:
                        status = 3;
                        break;
                    case 2:
                        status = 4;
                        break;
                    default:
                        layer.msg('报警状态错误');
                        change = false;
                        break;
                }

                if (change) {
                    $.ajax({
                        url: apiurl + 'alarmvalue?' + ['id=' + item.id, 'status=' + status].join("&"),
                        type: 'PUT',
                        beforeSend: function() {
                            _this.loadingShow = true;
                        },
                        complete: function() {
                            _this.loadingShow = false;
                        },
                        success: function(data) {
                            _this.loadingShow = false;
                            if (data.success) {
                                console.log("数据:" + JSON.stringify(data, null, 2));

                                if (data.data) {
                                    item.a_ishide = !item.a_ishide;
                                    item.span_ishide = !item.span_ishide;
                                }

                            } else {
                                layer.msg(data.error_message);
                                console.log("失败原因:" + JSON.stringify(data))
                            }
                        },
                        error: function(data) {
                            layer.msg(data.error_message);
                            returnLogIn(data);
                        }
                    });
                }


            },
            getWarnLog: function(page) {
                var _this = this;
                var nums = 12;
                $.ajax({
                    url: apiurl + 'alarmlog?' + ['page=' + page, 'page_item_count=' + nums, 'from_time=' + _this.startime, 'end_time=' + _this.endtime + ' 23:59:59'].join("&"),
                    type: 'GET',
                    dataType: 'json',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;

                        if (data.success) {
                            console.log("报警日志数据====:" + JSON.stringify(data, null, 2))

                            if (data.success) {
                                var result = data.data.items;
                                if (result == null) {
                                    result = [];
                                }
                                var arr = result.map(function(item) {
                                    switch (item.alarm_level) {
                                        case 0:
                                            item.alarm_level = "无";
                                            break;
                                        case 1:
                                            item.alarm_level = "低";
                                            break;
                                        case 2:
                                            item.alarm_level = "中";
                                            break;
                                        case 3:
                                            item.alarm_level = "高";
                                            break;
                                    }
                                    switch (item.alarm_status) {
                                        case 1:
                                            item.alarm_status = "未确认且未恢复";
                                            break;
                                        case 2:
                                            item.alarm_status = "未确认但已恢复";
                                            break;
                                        case 3:
                                            item.alarm_status = "已确认但未恢复";
                                            break;
                                        case 4:
                                            item.alarm_status = "已确认且已恢复";
                                            break;
                                    }

                                    if (item.description === null) {
                                        item.description = '无';
                                    }

                                    switch (item.alarm_value) {
                                        case 'True':
                                            item.actual_value = "True";
                                            break;
                                        case 'False':
                                            item.actual_value = "False";
                                            break;

                                    }

                                    if (item.confirm_time === null) {
                                        item.confirm_time = '无';
                                    }
                                    if (item.description === null) {
                                        item.description = '无';
                                    }
                                    return item;
                                })

                                var length = arr.length;
                                if (length < nums) {
                                    for (var i = 0; i < nums - length; i++) {
                                        arr.push({
                                            id: '',
                                            alarm_level: '',
                                            alarm_time: '',
                                            description: '',
                                            tag_name: '',
                                            alarm_value: '',
                                            actual_value: '',
                                            alarm_status: "",
                                            confirm_time: ''

                                        });
                                    }
                                }
                                _this.warnLogData = arr;
                                if (data.data.pageCount === 0) {
                                    layer.msg('无数据');
                                    $('.tcdPageCode-log').hide();

                                } else {

                                    $('.tcdPageCode-log').show().createPage({
                                        pageCount: data.data.pageCount,
                                        current: page,
                                        backFn: function(p) {
                                            _this.getWarnLog(p);
                                        }
                                    });
                                }
                                console.log(JSON.stringify(_this.getWarnLog, null, 2));


                            } else {
                                layer.msg(data.error_message);
                                console.log("错误原因" + JSON.stringify(data, null, 2));
                            }






                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        $(".loading").hide();
                        layer.msg(data.error_message);
                        returnLogIn(data);
                    }
                });
            },

            // 导出报警日志
            exportWarnLog: function() {
                var st = this.startime;
                var ed = this.endtime;
                if (st != '' && ed != '') {
                    if (bayaxCompareDate(st, ed, 1)) {

                        if (compareYear(new Date(st), 10) <= ed) {
                            layer.msg("超过统计时间限制");
                        } else {
                            // 可以导出


                            $.ajax({
                                url: apiurl + 'alarmlog?' + ['from_time=' + st, 'end_time=' + ed + ' 23:59:59', 'report_name="报警日志"'].join("&"),
                                type: 'PUT',
                                success: function(data) {
                                    if (data.success) {
                                        window.location.href = '../' + data.data;
                                    } else {
                                        layer.msg(data.error_message);
                                    }
                                },
                                error: function(data) {
                                    layer.msg(data.error_message);
                                    returnLogIn(data);
                                }
                            });
                        }
                    } else {
                        layer.msg("结束时间需晚于开始时间");
                    }
                } else {
                    layer.msg('起止时间不能为空');
                }
            },
            // 报警日志 tab 点击
            warnlogClick: function() {
                if (this.flags) {
                    this.choiceTime(this.btnSelectdata[3]);
                    this.flags = false;
                }
            }


            // test: function() {
            //     var page = 2;
            //     var _this = this;
            //     var nums = 12;
            //     var data = {
            //         "success": true,
            //         "data": {
            //             "pageCount": 10,
            //             "items": [{
            //                 id: '',
            //                 alarm_level: '',
            //                 alarm_time: '',
            //                 description: '',
            //                 tag_name: '123',
            //                 alarm_value: '',
            //                 actual_value: '',
            //                 alarm_status: '',
            //                 confirm_time: '123123'
            //             }, {
            //                 id: '',
            //                 alarm_level: '123',
            //                 alarm_time: '123',
            //                 description: '456',
            //                 tag_name: '',
            //                 alarm_value: '123',
            //                 actual_value: '123',
            //                 alarm_status: '',
            //                 confirm_time: '123123'
            //             }]
            //         },
            //         "error_message": null
            //     }

            //     if (data.success) {
            //         var result = data.data.items;
            //         if (result == null) {
            //             result = [];
            //         }
            //         var arr = result.map(function(item) {
            //             switch (item.alarm_level) {
            //                 case 0:
            //                     item.alarm_level = "无";
            //                     break;
            //                 case 1:
            //                     item.alarm_level = "低";
            //                     break;
            //                 case 2:
            //                     item.alarm_level = "中";
            //                     break;
            //                 case 3:
            //                     item.alarm_level = "高";
            //                     break;
            //             }

            //             if (item.description === null) {
            //                 item.description = '无';
            //             }

            //             switch (item.alarm_value) {
            //                 case 'True':
            //                     item.actual_value = "True";
            //                     break;
            //                 case 'False':
            //                     item.actual_value = "False";
            //                     break;

            //             }
            //             return item;
            //         })

            //         var length = arr.length;
            //         if (length < nums) {
            //             for (var i = 0; i < nums - length; i++) {
            //                 arr.push({
            //                     id: '',
            //                     alarm_level: '',
            //                     alarm_time: '',
            //                     description: '',
            //                     tag_name: '',
            //                     alarm_value: '',
            //                     actual_value: '',
            //                     alarm_status: "",
            //                     confirm_time: ''

            //                 });
            //             }
            //         }
            //         _this.warnLogData = arr;
            //         if (data.data.pageCount === 0) {
            //             layer.msg('无数据');
            //             $('.tcdPageCode-warn').hide();

            //         } else {

            //             $('.tcdPageCode-log').show().createPage({
            //                 pageCount: data.data.pageCount,
            //                 current: page,
            //                 backFn: function(p) {
            //                     _this.getWarnData(p);
            //                 }
            //             });
            //         }
            //         console.log(JSON.stringify(_this.warnData, null, 2));


            //     } else {
            //         layer.msg(data.error_message);
            //         console.log("错误原因" + JSON.stringify(data, null, 2));
            //     }

            // }




        }
    });

});