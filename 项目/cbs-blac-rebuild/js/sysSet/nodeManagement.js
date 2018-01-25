layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;

    // var upload = layui.upload;
    // var $ = layui.jquery;
    var timeoutId; //搜索延时操作标志
    form.on('checkbox(nodecheck)', function(data) {
        var node_id = Number(data.value);
        if (data.elem.checked) {
            nodeVue.arrDelNode.push(node_id);
        } else {
            var indexs = nodeVue.arrDelNode.indexOf(node_id);
            nodeVue.arrDelNode.splice(indexs, 1);
        }
        console.log(JSON.stringify(nodeVue.arrDelNode, null, 2))
    });
    form.on('checkbox(allcheck)', function(data) {
        nodeVue.arrDelNode = [];
        if (data.elem.checked) {
            console.log('选中')
            $('input[name="nodecheck"]').prop("checked", 'true');
            form.render('checkbox');
            nodeVue.nodes.forEach(function(item) {
                nodeVue.arrDelNode.push(item.id);
            });

        } else {
            $('input[name="nodecheck"]').removeAttr("checked");
            form.render();
        }
        console.log(JSON.stringify(nodeVue.arrDelNode, null, 2))
    });



    var nodeVue = new Vue({
        el: '#app',
        data: {
            project: {},
            // proID: 1,
            // proLogo: '',
            editID: 1, //当前编辑节点
            arrDelNode: [], // 批量删除节点id
            nodes: [], //所有node
            searchText: '', //搜索内容
            savePage: 1, //当前第几页
            loadingShow: false, //loading
            nodeName: '', //节点名称
            isRightName: true,
            nameWarnStr: '', //名称错误内容
            nodeMac: '', //mac地址
            isRightMac: true,
            macWarnStr: '', //Mac地址错误内容
            nodeTime: '', //超时时间
            isRightTime: true,
            timeWarnStr: '', //超时时间 错误内容
            nodeDes: '', //描述
            isRightDes: true,
            desWarnStr: '', //描述错误提示
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                form.render('checkbox');
                // this.projectInfo();
                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));

                this.getNodeData(false, 1);




            });

        },
        methods: {
            // 工程信息
            // projectInfo: function() {
            //     var _this = this;
            //     $.ajax({
            //         url: apiurl + 'project',
            //         type: 'get',
            //         dataType: 'json',
            //         success: function(data) {
            //             if (data.success) {
            //                 var data = data.data;
            //                 console.log(JSON.stringify(data, null, 2));
            //                 _this.proID = data.id;
            //                 _this.proLogo = data.logo_path;
            //             } else {
            //                 layer.msg(data.error_message);
            //             }
            //         },
            //         error: function(data) {
            //             layer.msg(data.error_message);
            //             returnLogIn(data);
            //         }
            //     });
            // },
            // 获取node
            getNodeData: function(Issearch, page) {
                var onePageNum = 13;
                var _this = this;
                var dataUp;
                if (Issearch) {
                    dataUp = {
                        name: _this.searchText,
                        project_id: _this.project.proID,
                        page: page,
                        page_item_count: onePageNum,
                    }
                } else {
                    dataUp = {
                        project_id: _this.project.proID,
                        page: page,
                        page_item_count: onePageNum,
                    }
                };
                $.ajax({
                    url: apiurl + 'node',
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
                        _this.loadingShow = false;
                        var datas = data.data.items;
                        var nullData = {
                            id: '',
                            name: '',
                            address: '',
                            timeout: '',
                            description: '',
                            ishide: true
                        }
                        if (data.data == null || !Array.isArray(datas)) {
                            _this.nodes = [];
                            for (var i = 0; i < onePageNum; i++) {
                                _this.nodes.push(nullData);
                            }
                            $(".tcdPageCode").hide();
                        } else {
                            var nodeDatas = datas.map(function(item) {
                                item.ishide = false;
                                return item;
                            });

                            if (nodeDatas.length < onePageNum) {
                                var num = onePageNum - nodeDatas.length;
                                for (var i = 0; i < num; i++) {
                                    nodeDatas.push(nullData);
                                }
                            }
                            _this.nodes = nodeDatas;
                            _this.$nextTick(function() {
                                $('input[name="nodecheck"]').removeAttr("checked");
                                $('input[name="nodecheckall"]').removeAttr("checked");
                                form.render();
                            })
                            $(".tcdPageCode").show().createPage({
                                pageCount: data.data.pageCount,
                                current: page,
                                backFn: function(p) {

                                    _this.savePage = p;
                                    if (_this.searchText === "") {
                                        _this.getNodeData(false, p);

                                    } else {
                                        _this.getNodeData(true, p);
                                    }
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
            // 新建节点
            creatEditNode: function() {
                var _this = this;

                var layer_open = layer.open({
                    title: ['新建节点'],
                    type: 1,
                    skin: 'bayax-layer-skin',
                    area: ['700px', '500px'], //宽高
                    content: $("#creatEditNode"), //捕获的元素,
                    shift: 2,
                    resize: false,
                    btn: ['确定', '放弃'],
                    success: function() {
                        _this.nodeName = '';
                        _this.isRightName = true;
                        _this.nodeMac = '';
                        _this.isRightMac = true;
                        _this.nodeTime = '';
                        _this.isRightTime = true;
                        _this.nodeDes = '';
                        _this.isRightDes = true;
                    },
                    yes: function(index) {

                        if (_this.nodeName !== '' && _this.nodeMac !== '' && _this.nodeTime !== '' && _this.isRightName && _this.isRightMac && _this.isRightTime && _this.isRightDes) {
                            $.ajax({
                                url: apiurl + 'node',
                                type: 'post',
                                dataType: 'json',
                                data: {
                                    project_id: _this.project.proID,
                                    name: _this.nodeName,
                                    address: _this.nodeMac,
                                    timeout: Number(_this.nodeTime),
                                    description: _this.nodeDes
                                },
                                beforeSend: function() {
                                    _this.loadingShow = true;
                                },
                                success: function(data) {
                                    _this.loadingShow = false;
                                    if (data.success) {
                                        if (_this.searchText === '') {
                                            _this.getNodeData(false, _this.savePage);
                                        } else {
                                            _this.getNodeData(true, _this.savePage);
                                        }
                                        layer.close(layer_open);
                                        layer.msg("创建成功");

                                    } else {
                                        console.log("创建失败" + JSON.stringify(data, null, 2));
                                        layer.msg(data.error_message);

                                    }
                                },
                                error: function(data) {
                                    returnLogIn(data);
                                }
                            });
                        } else {
                            layer.msg('请检查输入是否准确');
                        }

                    },
                    btn2: function(index) {

                    }
                });
            },
            // 批量删除
            batchDelete: function() {
                var _this = this;
                if (_this.arrDelNode.length === 0) {
                    layer.msg('至少选择一个节点');
                } else {

                    layer.confirm('确认删除所有选中的节点吗', {
                        title: '删除节点',
                        skin: 'bayax-layer-skin',
                        success: function() {
                            $('.layui-layer-btn a').addClass('confirm');
                        },
                        btn: ['确定', '取消'] //按钮
                    }, function(index) {
                        $.ajax({
                            url: apiurl + 'node/?ids=' + _this.arrDelNode.join(','),
                            type: "DELETE",
                            beforeSend: function() {
                                _this.loadingShow = true;
                            },
                            success: function(data) {

                                _this.loadingShow = false;
                                _this.arrDelNode = [];
                                if (data.success) {
                                    // layer.close(layers);
                                    layer.msg("删除成功");
                                    if (_this.searchText === '') {
                                        _this.getNodeData(false, _this.savePage);
                                    } else {
                                        _this.getNodeData(true, _this.savePage);
                                    }
                                } else {
                                    layer.msg(data.error_message);
                                }
                            },
                            error: function(data) {
                                returnLogIn(data);
                            }
                        });

                    }, function() {});
                }

            },
            // a-编辑
            nodeEdit: function(item) {
                var _this = this;
                var layer_open = layer.open({
                    title: ['编辑节点'],
                    type: 1,
                    skin: 'bayax-layer-skin', //加上边框
                    area: ['700px', '500px'], //宽高
                    content: $("#creatEditNode"), //捕获的元素,
                    shift: 2,
                    resize: false,
                    btn: ['确定', '放弃'],
                    success: function() {
                        _this.editID = item.id;
                        _this.nodeName = item.name;
                        _this.isRightName = true;
                        _this.nodeMac = item.address;
                        _this.isRightMac = true;
                        _this.nodeTime = item.timeout;
                        _this.isRightTime = true;
                        if (item.description == null) {
                            _this.nodeDes = '';
                        } else {
                            _this.nodeDes = item.description;
                        }

                        _this.isRightDes = true;
                    },
                    yes: function(index) {
                        if (_this.nodeName !== '' && _this.nodeMac !== '' && _this.nodeTime !== '' && _this.isRightName && _this.isRightMac && _this.isRightTime && _this.isRightDes) {
                            $.ajax({
                                url: apiurl + 'node',
                                type: 'PUT',
                                dataType: 'json',
                                data: {
                                    project_id: _this.project.proID,
                                    id: _this.editID,
                                    name: _this.nodeName,
                                    address: _this.nodeMac,
                                    timeout: Number(_this.nodeTime),
                                    description: _this.nodeDes
                                },
                                beforeSend: function() {
                                    _this.loadingShow = true;
                                },

                                success: function(data) {
                                    _this.loadingShow = false;
                                    if (data.success) {
                                        if (_this.searchText === '') {
                                            _this.getNodeData(false, _this.savePage);
                                        } else {
                                            _this.getNodeData(true, _this.savePage);
                                        }
                                        layer.close(layer_open);
                                        layer.msg('修改成功');

                                    } else {
                                        layer.msg(data.error_message);
                                    }

                                },
                                error: function(data) {
                                    returnLogIn(data);
                                }
                            });
                        } else {
                            layer.msg('请检查输入是否准确');
                        }

                    },
                    btn2: function(index) {

                    }
                });
            },
            // a-删除
            nodeDel: function(id) {
                var _this = this;



                layer.confirm('确认删除该节点吗', {
                    title: '删除节点',
                    skin: 'bayax-layer-skin',
                    success: function(index) {
                        console.log(index);
                        $('.layui-layer-btn a').addClass('confirm');
                    },
                    btn: ['确定', '取消'] //按钮
                }, function(index) {
                    $.ajax({
                        url: apiurl + 'node/?ids=' + id,
                        type: "DELETE",
                        beforeSend: function() {
                            _this.loadingShow = true;
                        },
                        success: function(data) {
                            _this.loadingShow = false;
                            if (data.success) {
                                // layer.close(layers);
                                layer.msg("删除成功");
                                if (_this.searchText === '') {
                                    _this.getNodeData(false, _this.savePage);
                                } else {
                                    _this.getNodeData(true, _this.savePage);
                                }
                            } else {
                                layer.msg(data.error_message);
                            }
                        },
                        error: function(data) {
                            returnLogIn(data);
                        }
                    });
                }, function() {});


            },
            // 搜索 node
            searchNode: function() {
                var _this = this;
                this.debounce(function() {
                    _this.getNodeData(true, 1);
                }, 300, {
                    leading: false
                })();


            },
            // 清空搜索
            clearSearch: function() {
                this.searchText = '';
                this.getNodeData(false, 1);
            },

            /**
             * [判断节点名称是否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            nodeNameRegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (val == '') {
                    return 1;
                } else if (pattern.test(val)) {
                    return 2;
                } else if (val.replace(/[^\x00-\xff]/g, "**").length > 60) {
                    return 3;
                } else {
                    return 4;
                }
            },
            // 节点名称
            nodeNameOnInput: function() {
                var isRightInput = this.nodeNameRegeMatch(this.nodeName);
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
                        this.isRightName = false;
                        this.nameWarnStr = '字符超出限制';
                        break;
                    case 4:
                        this.isRightName = true;
                        break;
                    default:
                        break;
                }
            },
            nodeNameOnBlur: function() {
                this.nodeNameOnInput();
            },

            /**
             * [判断mac地址是否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            nodeMacRegeMatch: function(val) {
                // var pattern = new RegExp( /[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}/);
                var pattern = /[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}/;
                if (val == '') {
                    return 1;
                } else if (!pattern.test(val)) {
                    return 2;
                } else {
                    return 4;
                }
            },
            //mac地址
            nodeMacOnInput: function() {
                // 输入时不判断
            },
            nodeMacOnBlur: function() {
                var isRightInput = this.nodeMacRegeMatch(this.nodeMac);
                switch (isRightInput) {
                    case 1:
                        this.isRightMac = false;
                        this.macWarnStr = '不能为空';
                        break;
                    case 2:
                        this.isRightMac = false;
                        this.macWarnStr = '地址格式不正确';
                        break;
                    case 4:
                        this.isRightMac = true;
                        break;
                    default:
                        break;
                }
            },

            /**
             * [判断超时时间是否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            nodeTimeRegeMatch: function(val) {
                var pattern = new RegExp(/[^0-9]/g);
                if (val == '') {
                    return 1;
                } else if (pattern.test(val)) {
                    return 2;
                } else if (Number(val) < 0 || Number(val) > 3600) {
                    return 3;
                } else {
                    return 4;
                }
            },
            // 超时时间
            nodeTimeOnInput: function() {
                var isRightInput = this.nodeTimeRegeMatch(this.nodeTime);
                switch (isRightInput) {
                    case 1:
                        this.isRightTime = false;
                        this.timeWarnStr = '不能为空';
                        break;
                    case 2:
                        this.isRightTime = false;
                        this.timeWarnStr = '输入不合法';
                        break;
                    case 3:
                        this.isRightTime = false;
                        this.timeWarnStr = '超出限制';
                        break;
                    case 4:
                        this.isRightTime = true;
                        break;
                    default:
                        break;
                }
            },
            nodeTimeOnBlur: function() {
                this.nodeTimeOnInput();
            },
            /**
             * [判断描述是否合法]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            nodeDesRegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (pattern.test(val)) {
                    return 2;
                } else if (val.replace(/[^\x00-\xff]/g, "**").length > 60) {
                    return 3;
                } else {
                    return 4;
                }
            },
            // 描述
            nodeDesOnInput: function() {
                var isRightInput = this.nodeDesRegeMatch(this.nodeDes);
                switch (isRightInput) {
                    case 1:
                        this.isRightDes = false;
                        this.desWarnStr = '不能为空';
                        break;
                    case 2:
                        this.isRightDes = false;
                        this.desWarnStr = '输入不合法';
                        break;
                    case 3:
                        this.isRightDes = false;
                        this.desWarnStr = '字符超出限制';
                        break;
                    case 4:
                        this.isRightDes = true;
                        break;
                    default:
                        break;
                }
            },
            nodeDesOnBlur: function() {
                this.nodeDesOnInput();
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
            }
        }
    });

});