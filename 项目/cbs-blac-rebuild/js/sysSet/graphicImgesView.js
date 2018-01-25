layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;

    // 是否启用外链
    form.on('checkbox(useOtherLinkCheck)', function(data) {
        if (data.elem.checked) {
            ViewsVue.creatViewData.otherLinkCheck = true;
            ViewsVue.creatViewData.linkvalDisabled = false;
        } else {
            ViewsVue.creatViewData.otherLinkCheck = false;
            ViewsVue.creatViewData.linkvalDisabled = true;
            ViewsVue.creatViewData.linkval = '';
        }
    });


    var ViewsVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            headData: {
                id: '',
                name: ''
            },
            sysGroupsData: [], //已存在的全部系统
            // 重命名数据
            changeViewNameData: {
                sysName: '', //画面名称名称
                isRightName: true,
                nameWarnStr: '', //名称错误内容
            },
            // 新建画面
            creatViewData: {
                viewName: '', //画面名称名称
                isRightName: true,
                nameWarnStr: '', //名称错误内容
                otherLinkCheck: false,
                linkval: '',
                linkvalDisabled: true
            }

        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));
                this.headData.name = sessionStorage.getItem("viewGroupeName");
                this.headData.id = sessionStorage.getItem("viewGroupeId");
                this.graphicImageViewsGetData();
            });

        },
        methods: {
            // 获取子系统全部画面
            graphicImageViewsGetData: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + 'view',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        view_group_id: this.headData.id
                    },
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        console.log("获取到的一组画面数据:" + JSON.stringify(data, null, 2));
                        _this.loadingShow = false;
                        var datas = data.data.items;
                        var onePageNum = 12;
                        if (data.success) {
                            var dic = {
                                name: '',
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
            // 返回子系统
            goSubsys: function() {
                window.location.href = 'graphicImages.html';
            },
            //新建画面
            creatNewViews: function() {
                var _this = this;
                console.log('自定义');
                var layer_open = layer.open({
                    title: ['新建画面'],
                    type: 1,
                    skin: 'bayax-layer-skin',
                    area: ['550px', '250px'], //宽高
                    content: $("#creatViews"), //捕获的元素,
                    shift: 2,
                    resize: false,
                    btn: ['保存', '取消'],
                    success: function() {
                        _this.creatViewData.viewName = '';
                        _this.creatViewData.isRightName = true;
                        _this.creatViewData.nameWarnStr = '';
                        $('.view-linkcheck').prop('checked', false);
                        _this.creatViewData.otherLinkCheck = false;
                        _this.creatViewData.linkvalDisabled = true;
                        _this.creatViewData.linkval = '';
                        form.render();

                    },
                    yes: function(index) {

                        if (_this.creatViewData.isRightName) {
                            if (_this.creatViewData.viewName != '') {
                                _this.creatViews(layer_open);
                            } else {
                                layer.msg('名称不能为空');
                            }

                        } else {
                            layer.msg('名称输入不准确')
                        }
                    },
                    btn2: function(index) {

                    }
                });

            },
            // 新建画面提交方法
            creatViews: function(obj) {
                var _this = this;
                var dataup = {};

                if (this.creatViewData.otherLinkCheck) {
                    if (this.creatViewData.linkval === '') {
                        layer.msg('外链地址不能为空');
                        return false;
                    } else {
                        dataup = {
                            project_id: 1,
                            view_group_id: this.headData.id,
                            name: this.creatViewData.viewName,
                            external_link: this.creatViewData.linkval
                        }
                    }
                } else {
                    dataup = {
                        project_id: 1,
                        view_group_id: this.headData.id,
                        name: this.creatViewData.viewName,
                    }
                }

                console.log('测试')
                $.ajax({
                    url: apiurl + 'view',
                    type: 'post',
                    dataType: 'json',
                    data: dataup,
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        if (data.success) {

                            if (_this.creatViewData.otherLinkCheck) {
                                layer.close(obj);
                                _this.graphicImageViewsGetData();
                            } else {
                                if (typeof(Storage) !== "undefined") {
                                    console.log("新建画面的ID:" + data.data.id);
                                    sessionStorage.setItem("view_id", data.data.id);
                                    sessionStorage.setItem("view_name", _this.creatViewData.viewName);
                                    window.location.href = "draw2dCavas.html";
                                }
                            }
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
            viewReName: function(item) {
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
                        _this.changeViewNameData.sysName = '';
                        _this.changeViewNameData.isRightName = true;
                        _this.changeViewNameData.nameWarnStr = '';
                    },
                    yes: function(index) {

                        if (_this.changeViewNameData.isRightName) {
                            if (_this.changeViewNameData.sysName != '') {
                                $.ajax({
                                    url: apiurl + 'view/0',
                                    type: 'PUT',
                                    dataType: 'json',
                                    data: {
                                        id: item.id,
                                        name: _this.changeViewNameData.sysName,
                                        external_link: ''
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
                                            _this.graphicImageViewsGetData();
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
                                layer.msg('名称不能为空')
                            }

                        } else {
                            layer.msg('名称输入不准确')
                        }


                    },
                    btn2: function(index) {

                    }
                });

            },
            // 删除画面
            viewDelete: function(item) {
                var _this = this;
                // console.log(123123123)

                layer.confirm('确认删除该画面吗？', {
                    title: '确认删除',
                    skin: 'bayax-layer-skin',
                    success: function() {
                        $('.layui-layer-btn a').addClass('confirm');
                    },
                    btn: ['确定', '取消']
                }, function(index) {
                    $.ajax({
                        url: apiurl + 'view/' + item.id,
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
                                _this.graphicImageViewsGetData();
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



            },
            // 编辑画面
            sysEditViews: function(item) {
                if (typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("view_id", item.id);
                    window.location.href = "draw2dCavas.html";
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
                var isRightInput = this.sysNameRegeMatch(this.changeViewNameData.sysName);
                switch (isRightInput) {
                    case 1:
                        this.changeViewNameData.isRightName = false;
                        this.changeViewNameData.nameWarnStr = '不能为空';
                        break;
                    case 2:
                        this.changeViewNameData.isRightName = false;
                        this.changeViewNameData.nameWarnStr = '输入不合法';
                        break;
                    case 3:
                        this.changeViewNameData.isRightName = true;
                        break;
                    default:
                        break;
                }
            },
            // 子系统名称
            sysViewNameOnInput: function() {
                var isRightInput = this.sysNameRegeMatch(this.creatViewData.viewName);
                switch (isRightInput) {
                    case 1:
                        this.creatViewData.isRightName = false;
                        this.creatViewData.nameWarnStr = '不能为空';
                        break;
                    case 2:
                        this.creatViewData.isRightName = false;
                        this.creatViewData.nameWarnStr = '输入不合法';
                        break;
                    case 3:
                        this.creatViewData.isRightName = true;
                        break;
                    default:
                        break;
                }
            },


        }
    });
});