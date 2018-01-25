layui.use(['layer'], function() {
    var layer = layui.layer;

    var nodeVue = new Vue({
        el: '#app',
        data: {
            project: {},

            loadingShow: false,
            sysGroups: [{ //新建子系统数据
                    name: '空调机组',
                    type: false
                },
                {
                    name: '视频监控',
                    type: false
                },
                {
                    name: '照明',
                    type: false
                },
                {
                    name: '停车场',
                    type: false
                },
                {
                    name: '风机末端',
                    type: false
                },
                {
                    name: '自定义',
                    type: true
                },
            ],
            sysGroupsData: [{
                name: '123',
                view_count: 0

            }], //已存在的全部系统
            sysName: '', //系统名称
            isRightName: true,
            nameWarnStr: '', //名称错误内容
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {

                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));

                $('.bayax-btn').on('click', function(e) {
                    console.log()
                    var str = '.' + $(this).data('for')
                    var oEvent = e || event;
                    $(str).toggle();
                    oEvent.stopPropagation(); //阻止事件冒泡，否则事件会冒泡到下面的文档点击事件 
                });

                this.graphicImageGetData();
            });

        },
        methods: {

            graphicImageGetData: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + 'subsystem',
                    type: 'get',
                    dataType: 'json',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        var datas = data.data.items;
                        var onePageNum = 12;
                        if (data.success) {
                            var dic = {
                                name: '',
                                view_count: '',
                                id: '',
                                ishide: true
                            }
                            if (data.data == null || !Array.isArray(datas)) {
                                for (var i = 0; i < onePageNum; i++) {
                                    _this.sysGroupsData.push(dic);
                                }
                            } else {
                                var grapsDatas = datas.map(function(item) {
                                    item.ishide = false;
                                    return item;
                                });

                                if (grapsDatas.length < onePageNum) {
                                    var num = onePageNum - grapsDatas.length;
                                    for (var i = 0; i < num; i++) {
                                        grapsDatas.push(dic);
                                    }
                                }
                                _this.sysGroupsData = grapsDatas;
                            }


                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });
            },

            //新建子系统点击方法
            creatSysLiClick: function(item) {
                var _this = this;
                if (item.type) {
                    console.log('自定义');
                    var layer_open = layer.open({
                        title: ['新建子系统'],
                        type: 1,
                        skin: 'bayax-layer-skin',
                        area: ['500px', '200px'], //宽高
                        content: $("#creatsys"), //捕获的元素,
                        shift: 2,
                        resize: false,
                        btn: ['保存', '取消'],
                        success: function() {
                            _this.sysName = '';
                            _this.isRightName = true;
                            _this.nameWarnStr = '';
                        },
                        yes: function(index) {

                            if (_this.isRightName) {
                                _this.creatSys(_this.sysName)
                            } else {
                                layer.msg('名称输入不准确')
                            }


                        },
                        btn2: function(index) {

                        }
                    });
                } else {
                    console.log('随便')
                    this.creatSys(item.name);
                }
            },
            // 新建子系统提交方法
            creatSys: function(name) {
                var _this = this;
                $.ajax({
                    url: apiurl + 'subsystem',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        project_id: 1,
                        name: name
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

                            layer.msg("新建成功");
                            _this.graphicImageGetData();
                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        _this.loadingShow = false;
                        publicAjaxError(data);
                    }
                })
            },
            // 重命名
            sysReName: function(item) {
                var _this = this;

                var layer_open = layer.open({
                    title: ['重命名'],
                    type: 1,
                    skin: 'bayax-layer-skin',
                    area: ['500px', '200px'], //宽高
                    content: $("#creatsys"), //捕获的元素,
                    shift: 2,
                    resize: false,
                    btn: ['保存', '取消'],
                    success: function() {
                        _this.sysName = '';
                        _this.isRightName = true;
                        _this.nameWarnStr = '';
                    },
                    yes: function(index) {

                        if (_this.isRightName) {
                            $.ajax({
                                url: apiurl + 'subsystem',
                                type: 'put',
                                dataType: 'json',
                                data: {
                                    project_id: 1,
                                    id: item.id,
                                    name: _this.sysName
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
                                        layer.close(layer_open);
                                        layer.msg('更改成功');
                                        _this.graphicImageGetData();
                                    } else {
                                        layer.msg(data.error_message);
                                        console.log('更改失败原因:' + JSON.stringify(data, null, 2))
                                    }
                                },
                                error: function(data) {
                                    publicAjaxError(data);
                                }
                            });
                        } else {
                            layer.msg('名称输入不准确')
                        }


                    },
                    btn2: function(index) {

                    }
                });

            },
            // 删除子系统
            sysDelete: function(item) {
                var _this = this;
                console.log(123123123)
                if (item.view_count > 0) {
                    layer.msg('画面个数不为零，不能删除')
                } else {


                    layer.confirm('确认删除该系统吗', {
                        title: '确认删除',
                        skin: 'bayax-layer-skin',
                        success: function() {
                            $('.layui-layer-btn a').addClass('confirm');
                        },
                        btn: ['确定', '取消']
                    }, function(index) {
                        $.ajax({
                            url: apiurl + 'subsystem/' + item.id,
                            type: 'DELETE',
                            beforeSend: function() {
                                _this.loadingShow = true;
                            },
                            complete: function() {
                                _this.loadingShow = false;
                            },
                            success: function(data) {
                                _this.loadingShow = false;
                                if (data.success) {
                                    layer.msg('删除成功');
                                    _this.graphicImageGetData();
                                    layer.close(index);
                                } else {
                                    layer.msg(data.error_message);

                                }
                            },
                            error: function(data) {
                                publicAjaxError(data);
                            }
                        });
                    }, function() {

                    });




                }
            },

            getImgView: function(item) {
                if (item.id != '') {
                    sessionStorage.setItem("viewGroupeId", item.id);
                    sessionStorage.setItem("viewGroupeName", item.name);
                    window.location.href = "graphicImagesView.html";
                }
            },


            /**
             * [判断子系统名称是否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            sysNameRegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (val == '') {
                    return 1;
                } else if (pattern.test(val)) {
                    return 2;
                } else {
                    return 3;
                }
            },
            // 子系统名称
            sysNameOnInput: function() {
                var isRightInput = this.sysNameRegeMatch(this.sysName);
                switch (isRightInput) {
                    case 1:
                        this.isRightName = false;
                        this.nameWarnStr = '不能为空';
                        break;
                    case 2:
                        this.isRightName = false;
                        this.nameWarnStr = '输入不合法';
                        break;
                    case 3:
                        this.isRightName = true;
                        break;
                    default:
                        break;
                }
            },


        }
    });
});