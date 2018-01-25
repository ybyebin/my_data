layui.use(['layer', 'element', 'laydate'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var laydate = layui.laydate;



    var startime = laydate.render({
        elem: '#startime',
        theme: 'balck',
        showBottom: false,
        done: function(value, date, endDate) {
            logVue.btnSelectTitle = '自定义';
            logVue.startime = value;
            $('#endtime').focus();

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
            var st = logVue.startime;
            var ed = logVue.endtime = value;
            logVue.btnSelectTitle = '自定义';
            // console.log('查看时间：' + warnVue.endtime);
            if (st != '' && ed != '') {
                if (bayaxCompareDate(st, ed, 1)) {

                    if (compareYear(new Date(st), 10) <= value) {
                        layer.msg("超过统计时间限制");
                    } else {
                        logVue.commExcLoadData(1);
                    }
                } else {
                    logVue.endtime = '';
                    layer.msg("结束时间需晚于开始时间");
                }
            }
        }
    });

    var logVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            showSecondDiv: false, //设备 子设备切换

            // 下拉按钮数据
            btnSelectTitle: '',
            btnSelectdata: [],
            startime: '',
            endtime: '',
            // 日志
            commlogData: [],

        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                element.init();
                bayaxInit();
                this.btnSelectdata = dateData();

                this.choiceTime(this.btnSelectdata[2]);

            });

        },
        methods: {
            // 下拉按钮选择时间
            choiceTime: function(item) {
                this.btnSelectTitle = item.name;
                this.startime = item.startime;
                this.endtime = item.endtime;

                if (item.type) {
                    this.commExcLoadData(1);
                }
                console.log(JSON.stringify(item, null, 2))
            },
            // 获取异常日志
            commExcLoadData: function(page) {
                var _this = this;
                var dataUp = [
                    'start_time=' + this.startime,
                    'end_time=' + this.endtime + ' 23:59:59',
                    'page=' + page,
                    'page_item_count=13'
                ];
                console.log('上传的数据' + JSON.stringify(dataUp, null, 2));
                $.ajax({
                    url: apiurl + 'NodeLog/1?' + dataUp.join('&'),
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        if (data.success) {

                            var datas = data.data.items;
                            var arr = [];
                            var length = 13;
                            var nullData = {
                                ip: '',
                                name: '',
                                status: '',
                                create_time: '',
                            }
                            if (data.data == null || !Array.isArray(datas)) {
                                layer.msg("无通讯状态信息");
                                _this.commlogData = [];
                                $(".tcdPageCode").hide();
                                for (var i = 0; i < length; i++) {
                                    _this.commlogData.push(nullData);
                                }
                            } else {
                                var equDatas = datas.map(function(item) {
                                    switch (Number(item.status)) {
                                        case 1:
                                            item.status = "正常";
                                            break;
                                        case 2:
                                            item.status = "异常";
                                            break;
                                        default:
                                            break;
                                    }
                                    return item;
                                });

                                if (equDatas.length < length) {
                                    var num = length - equDatas.length;
                                    for (var i = 0; i < num; i++) {
                                        equDatas.push(nullData);
                                    }
                                }
                                _this.commlogData = equDatas;

                                $(".tcdPageCode").show().createPage({
                                    pageCount: data.data.pageCount,
                                    current: page,
                                    backFn: function(p) {

                                        _this.commExcLoadData(p);
                                    }
                                });
                            }
                        } else {
                            layer.msg(data.error_message)
                        }
                    },
                    error: function(result) {

                        layer.msg(result.error_message);
                        returnLogIn(result);
                    }
                });

            },



            // 导出日志
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
                                url: apiurl + 'nodeLog?start_time=' + st + '&end_time=' + ed + '&name=通信异常日志',
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
            }
        }
    });

});