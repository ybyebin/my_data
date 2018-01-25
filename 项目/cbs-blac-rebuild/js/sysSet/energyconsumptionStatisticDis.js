layui.use(['layer'], function() {
    var layer = layui.layer;
    var layerHeader = 'font-size:18px;color:#fff;background:#3E4687;border:none;height:50px;font-weight:bold;line-height:50px;padding-left:10px'

    var statisticDisVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            ulhide: false,
            statisticsGroupData: [], //能耗统计组
            groupsName: '',
            statisticsGroupTagsData: [], //能耗统计组tags
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));




                this.getStatisticsGroupData();

            });

        },
        methods: {
            leftUlShowHide: function() {
                console.log(123123)
                this.ulhide = !this.ulhide;
                $('.energyStatistics-content-body').toggle();
            },
            getStatisticsGroupData: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + 'energyconfig',
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        console.log('查看:' + JSON.stringify(data.data, null, 2))
                        if (data.success) {
                            if (data.data.items !== null) {
                                var arr = data.data.items.map(function(ele) {
                                    if (ele.hasOwnProperty('active')) {} else {
                                        ele.active = false
                                    }
                                    return ele;
                                });

                                console.log(JSON.stringify(arr, null, 2))
                                _this.statisticsGroupData = arr;
                                _this.gettags(_this.statisticsGroupData[0])
                            } else {
                                layer.msg('未配置能耗统计');

                            }

                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                })
            },
            gettags: function(item) {
                this.statisticsGroupData.forEach(function(ele) {
                    ele.active = false;
                }, this);
                item.active = true;
                this.groupsName = item.name;
                var _this = this;
                $.ajax({
                    url: apiurl + 'energytag/' + item.id,
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        var lengths = 13;
                        if (data.success) {
                            _this.statisticsGroupTagsData = [];
                            var nulldata = {
                                name: '',
                                opratestr: '',
                                node_name: '',
                                point_id: '0',
                                ishide: true

                            }
                            var arr = [];
                            if (data.data.items !== null) {

                                arr = data.data.items.map(function(ele) {
                                    switch (Number(ele.oprate)) {
                                        case 0:
                                            ele.opratestr = '减';
                                            break;
                                        case 1:
                                            ele.opratestr = '加';
                                            break;
                                        default:
                                            break;
                                    }
                                    ele.ishide = false;
                                    return ele;
                                });
                                if (arr.length < lengths) {
                                    var i = lengths - arr.length;
                                    while (i > 0) {
                                        arr.push(nulldata);
                                        i--;
                                    }
                                }


                            } else {

                                while (lengths > 0) {
                                    arr.push(nulldata);
                                    lengths--;
                                }
                            }

                            _this.statisticsGroupTagsData = arr;

                            $(".energyStatistics-right-content").mCustomScrollbar('scrollTo', 'top');


                        } else {
                            layer.msg(data.error_message)

                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                })
            }






        }
    });
});