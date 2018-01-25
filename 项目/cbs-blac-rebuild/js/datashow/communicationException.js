(function($) {
    $(window).load(function() {
        $(".div-equipment").mCustomScrollbar();
        $(".div-sonequipment").mCustomScrollbar();
    });
})(jQuery);



layui.use(['layer', 'element'], function() {
    var layer = layui.layer;
    var element = layui.element;

    var warnVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            showSecondDiv: false, //设备 子设备切换
            allEquipment: [], //所有设备
            allSonEquipment: [], //当前设备 子设备
            flag: {
                type: 1,
                id: ''
            }


        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                element.init();
                this.getAllEquipmentData();

                setInterval(function() {
                    if (_this.flag.type === 1) {
                        _this.getAllEquipmentData();
                    } else {
                        _this.commexcSonGetData(_this.flag.id);
                    }
                }, 10000)
            });

        },
        methods: {
            // 获取设备通讯状态
            getAllEquipmentData: function() {
                var _this = this;


                $.ajax({
                    url: apiurl + 'nodelog/0',
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        if (data.success) {

                            var datas = data.data.items;
                            var arr = [];
                            var length = 14;
                            var nullData = {
                                ip: '',
                                name: '',
                                status: '',
                                create_time: '',
                                iswarn: false,
                                ishide: true
                            }
                            if (data.data == null || !Array.isArray(datas)) {
                                layer.msg("无通讯状态信息");
                                _this.allSonEquipment = [];
                                for (var i = 0; i < length; i++) {
                                    _this.allSonEquipment.push(nullData);
                                }
                            } else {
                                var equDatas = datas.map(function(item) {
                                    switch (Number(item.status)) {
                                        case 1:
                                            item.status = "正常";
                                            item.iswarn = false;
                                            break;
                                        case 2:
                                            item.status = "异常";
                                            item.iswarn = true;
                                            break;
                                        default:
                                            break;
                                    }
                                    item.ishide = false;
                                    return item;
                                });

                                if (equDatas.length < length) {
                                    var num = length - equDatas.length;
                                    for (var i = 0; i < num; i++) {
                                        equDatas.push(nullData);
                                    }
                                }
                                _this.allEquipment = equDatas;
                            }
                        } else {
                            layer.msg(data.error_message)
                        }

                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });
            },
            // 获取子设备通讯状态
            commexcSonGetData: function(id) {
                this.showSecondDiv = true;
                this.flag.type = 2;
                this.flag.id = id;
                var _this = this;
                $.ajax({
                    url: apiurl + 'taglog/1' + '?node_id=' + Number(id),
                    type: 'GET',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        if (data.success) {

                            var datas = data.data.items;
                            var arr = [];
                            var length = 13;
                            var nullData = {
                                // ip: '',
                                name: '',
                                status: '',
                                create_time: '',
                                iswarn: false,
                                ishide: true
                            }
                            if (data.data == null || !Array.isArray(datas)) {
                                layer.msg("无通讯状态信息");
                                _this.allSonEquipment = [];
                                for (var i = 0; i < length; i++) {
                                    _this.allSonEquipment.push(nullData);
                                }
                            } else {
                                var equDatas = datas.map(function(item) {
                                    switch (Number(item.status)) {
                                        case 1:
                                            item.status = "正常";
                                            item.iswarn = false;
                                            break;
                                        case 2:
                                            item.status = "异常";
                                            item.iswarn = true;
                                            break;
                                        default:
                                            break;
                                    }
                                    item.ishide = false;
                                    return item;
                                });

                                if (equDatas.length < length) {
                                    var num = length - equDatas.length;
                                    for (var i = 0; i < num; i++) {
                                        equDatas.push(nullData);
                                    }
                                }
                                _this.allSonEquipment = equDatas;
                            }
                        } else {
                            layer.msg(data.error_message)
                        }

                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });


            },
            // 返回
            btnGoBack: function() {
                this.showSecondDiv = !this.showSecondDiv;
                this.flag.type = 1;
                this.flag.id = '';
            }

        }
    });

});