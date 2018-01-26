layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;
    var timeoutId; //搜索延时操作标志

    $(window).load(function() {

        $(".labels-layer-content").mCustomScrollbar();
    });




    // table checkbox单选
    form.on('checkbox(labelcheck)', function(data) {
        var node_id = Number(data.value);
        if (data.elem.checked) {
            labelVue.arrDelLabel.push(node_id);
        } else {
            var indexs = labelVue.arrDelLabel.indexOf(node_id);
            labelVue.arrDelLabel.splice(indexs, 1);
        }
        console.log(JSON.stringify(labelVue.arrDelLabel, null, 2))
    });
    //  table checkbox全选
    form.on('checkbox(allcheck)', function(data) {
        labelVue.arrDelLabel = [];
        if (data.elem.checked) {
            console.log('选中')
            $('input[name="labelchecks"]').prop("checked", 'true');
            form.render('checkbox');
            labelVue.labels.forEach(function(item) {
                if (item.id !== '') {
                    labelVue.arrDelLabel.push(item.id);
                }

            });

        } else {
            $('input[name="labelchecks"]').removeAttr("checked");
            form.render();
            labelVue.selscroll();
        }
        console.log(JSON.stringify(labelVue.arrDelLabel, null, 2))
    });

    // 数据类型 监听取值
    form.on('select(filterType)', function(data) {
        labelVue.labelType = data.value;
        switch (Number(data.value)) {
            case 1:
                labelVue.isBool = true;
                labelVue.isString = false;
                labelVue.basicDefault = true;

                labelVue.labelEnergy = false;
                if (labelVue.labelEnergy) {
                    $('.cla-energy-check').removeAttr("checked");
                }
                break;
            case 2:
            case 3:
                labelVue.isBool = false;
                labelVue.isString = false;
                labelVue.basicDefault = false;

                break;
            case 4:
                labelVue.isBool = true;
                labelVue.isString = true;
                labelVue.basicDefault = false;
                labelVue.labelEnergy = false;
                if (labelVue.labelEnergy) {
                    $('.cla-energy-check').removeAttr("checked");
                }
                break;
            default:
                break;

        }
        form.render();
        labelVue.selscroll();
        console.log('查看' + labelVue.isBool);
    });

    // 能耗数据监听
    form.on('checkbox(filterEnergy)', function(data) {
        if (data.elem.checked) {
            labelVue.labelEnergy = true;
        } else {
            labelVue.labelEnergy = false;
        }

        console.log('查看能耗：' + labelVue.labelEnergy);
    });
    //绑定节点 监听取值
    form.on('select(filterNode)', function(data) {
        labelVue.labelType = data.value;
        console.log('查看' + labelVue.labelType);
    });
    //默认值 监听取值
    form.on('select(filterlabelDefault)', function(data) {
        labelVue.labelDefaultBool = data.value;
        console.log('查看' + labelVue.labelDefaultBool);
    });

    // 只读监听
    form.on('checkbox(filterReadonly)', function(data) {
        if (data.elem.checked) {
            labelVue.labelReadonly = true;
        } else {
            labelVue.labelReadonly = false;
        }

        console.log('查看只读：' + labelVue.labelReadonly);
    });
    //采集方式 监听取值
    form.on('select(filterAcquisition)', function(data) {
        labelVue.labelAcquisition = data.value;
        if (data.value === '1') {
            labelVue.disabledAcquisitionFrequency = true;
            labelVue.labelAcquisitionFrequency = '';
        } else {
            labelVue.disabledAcquisitionFrequency = false;
        }
        console.log('查看' + labelVue.labelAcquisition);
    });

    // bool型 启用报警 监听
    form.on('checkbox(filterEnabelWarn)', function(data) {
        if (data.elem.checked) {
            labelVue.labelEnabelWarn = 1;
            labelVue.disabledBoolwarnEnabled = false;

            $('.cla-Boolwarn-sletc').removeAttr('disabled');
            form.render('select', 'filterBoolContent');

        } else {
            labelVue.labelEnabelWarn = 0;
            labelVue.disabledBoolwarnEnabled = true;
            $('.cla-Boolwarn-sletc').prop('disabled', 'disabled');
            form.render('select', 'filterBoolContent');
            labelVue.labelBoolWarnDes = ''; //报警描述置空
        }

        console.log('查看启用报警：' + labelVue.labelEnabelWarn);
    });

    //bool 报警值 监听取值
    form.on('select(filterBoolWarnValue)', function(data) {
        labelVue.labelBoolWarnValue = data.value;
        console.log('查看报警值：' + labelVue.labelBoolWarnValue);
    });
    //bool 报警界别 监听取值
    form.on('select(filterBoolWarnLevel)', function(data) {
        labelVue.labelBoolWarnLevel = data.value;
        console.log('查看报警级别：' + labelVue.labelBoolWarnLevel);
    });

    // 整数实数型 启用死区 监听
    form.on('checkbox(filterWarnSiQu)', function(data) {
        if (data.elem.checked) {
            labelVue.labelIntWarnSiQu = true;
            labelVue.disabledIntWarnSiQuVal = false;
        } else {
            console.log('未选中')
            labelVue.labelIntWarnSiQu = false;
            labelVue.disabledIntWarnSiQuVal = true;
            labelVue.labelIntWarnSiQuValue = '';
        }

        console.log('查看启用死区：' + labelVue.labelIntWarnSiQu);
    });


    //整数实数型  报警界限
    form.on('select(filterOperator)', function(data) {
        var indexs = Number(data.elem[data.elem.selectedIndex].id);
        console.log('查看：' + indexs)
        labelVue.alarm_attributes[indexs].alarm_operator = data.value;
        console.log(JSON.stringify(labelVue.alarm_attributes, null, 2));
    });
    // 监听(整数实数型)报警级别
    form.on('select(filterAlarmLevel)', function(data) {
        var indexs = Number(data.elem[data.elem.selectedIndex].id);
        labelVue.alarm_attributes[indexs].alarm_level = data.value;
        console.log(JSON.stringify(labelVue.alarm_attributes, null, 2));
    });

    // 历史数据   启用数据改变时存储 监听
    form.on('checkbox(filterHisChangeSave)', function(data) {
        if (data.elem.checked) {
            labelVue.labelHistoryChangeSave = true;
            labelVue.disabledHisSiQu = false;
        } else {
            labelVue.labelHistoryChangeSave = false;
            labelVue.disabledHisSiQu = true;
            labelVue.labelHistorySiQuVal = '';
        }

        console.log('数据改变存储：' + labelVue.labelHistoryChangeSave);
    });

    // 历史数据 启用 固定时间间隔存储 监听
    form.on('checkbox(filterHisFixSave)', function(data) {
        if (data.elem.checked) {
            labelVue.labelHistoryFixSave = true;
            labelVue.disabledHisTime = false;
        } else {
            labelVue.labelHistoryFixSave = false;
            labelVue.disabledHisTime = true;
            labelVue.labelHistoryFixSaveValue = '';
        }

        console.log('固定时间间隔:' + labelVue.labelHistoryFixSave);
    });

    //bool 固定时间间隔存储时间单位 监听取值
    form.on('select(filterHisTimeUnit)', function(data) {
        labelVue.labelHistoryTimeUnit = data.value;
        console.log('查看时间单位：' + labelVue.labelHistoryTimeUnit);
    });


    var labelVue = new Vue({
        el: '#app',
        data: {
            project: {},
            // proID: 1, //工程id
            // proLogo: '', //工程logo
            allNode: [], //所有node
            editID: '', //当前编辑标签
            arrDelLabel: [], // 批量删标签id
            labels: [], //所有标签
            searchText: '', //搜索内容
            savePage: 1, //当前第几页
            loadingShow: false, //loading

            labelName: '', //标签名称
            labelType: '1', //标签类型
            labelDescription: '', //标签描述
            labelEnergy: false, //是否是 能耗数据 0未选中
            labelNodeID: 0, //绑定节点
            labelDefaultInt: '', //默认值-数字类型
            labelDefaultBool: 1, //默认值-bool型
            labelRegister: '', //寄存器
            labelReadonly: false, // 是否只读  0未选中
            labelMaxValue: '', //最大值
            labelMinValue: '', //最小值
            labelAcquisition: '1', //采集方式 (默认主动上发1)
            labelAcquisitionFrequency: '', //采集频率
            labelChengYi: '', //乘以
            labelEnabelWarn: 0, //启用报警  (bool型 是否报警)
            labelBoolWarnValue: 1, //报警值   (bool型 报警值)
            labelBoolWarnDes: '', //报警描述   (bool型 报警描述)
            labelBoolWarnId: '', //报警id (bool型 单条报警的报警ID)
            labelBoolWarnLevel: '2', // 报警级别 (bool型 报警级别)
            labelIntWarnSiQu: false, //启用死区  (整数实数型 数据)
            labelIntWarnSiQuValue: '', // 死区值 (整数实数型 数据)
            alarm_attributes: [ //测试报警属性   (整数实数型 数据)
                // {
                //     id: 1,
                //     alarm_operator: 2,
                //     value: '1',
                //     alarm_level: '1',
                //     message: '描述描述描述'
                // }, 

            ],
            alarm_attributes_delItem: [ //被删除的已在数据库存储的报警   (整数实数型 数据)

            ],

            labelHistoryChangeSave: false, //历史数据  启用 数据改变时存储
            labelHistorySiQuVal: '', // 历史数据 死区
            labelHistoryFixSave: false, //历史数据  启用 固定时间间隔存储
            labelHistoryFixSaveValue: '', // 历史数据 固定时间间隔存储 时间
            labelHistoryTimeUnit: '1', //历史数据  时间单位

            // 显示标志
            isBool: true, // 是否是bool型
            isString: false, //是否是字符型
            basicDefault: true, //默认值显示标志*****(单独列出)
            // 显示标志

            // 禁止输入或选择标志
            disabledAcquisitionFrequency: true, //采集频率  是否允许输入
            disabledBoolwarnEnabled: true, //bool型报警是否启用
            disabledIntWarnSiQuVal: true, //整数实数型 死区值
            disabledHisSiQu: true, // 历史数据  死区
            disabledHisTime: true, //历史数据 时间

        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                // form初始化
                form.render();
                this.selscroll();
                // this.projectInfo();

                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));

                this.getAllNode();
                this.getLabelData(false, 1);
                // _this.labelEdit(1);



            })

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
            // 获取node信息
            getAllNode: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + "node",
                    type: 'get',
                    dataType: 'json',
                    success: function(result) {
                        if (result.success == true) {
                            _this.allNode = result.data.items;
                            _this.labelNodeID = _this.allNode[0].id;
                            _this.$nextTick(function() {
                                form.render('select');
                                $('.label-node-div .layui-anim-upbit').mCustomScrollbar();
                            });

                        } else {
                            layer.msg(result.error_message);
                            returnLogIn(result.error_message);
                            console.log("获取所有的节点失败:" + JSON.stringify(result, null, 2));
                        }
                    },
                    error: function(data) {
                        layer.msg(data.error_message)
                        console.log("获取所有的节点失败:" + JSON.stringify(data, null, 2));
                    }
                });
            },
            // 获取数据标签
            getLabelData: function(Issearch, page) {
                var onePageNum = 13;
                var _this = this;
                var dataUp;
                if (Issearch) {
                    dataUp = {
                        name: _this.searchText,
                        project_id: _this.project.id,
                        page: page,
                        page_item_count: onePageNum,
                    }
                } else {
                    dataUp = {
                        project_id: _this.project.id,
                        page: page,
                        page_item_count: onePageNum,
                    }
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
                        _this.loadingShow = false;
                        var datas = data.data.items;

                        var nullData = {
                            id: '',
                            name: '',
                            description: '',
                            tag_type: '',
                            node_name: '',
                            point_id: '',
                            ishide: true
                        }



                        if (data.data == null) {
                            _this.labels = [];
                            for (var i = 0; i < onePageNum; i++) {
                                _this.labels.push(nullData);
                            }
                            $(".tcdPageCode").hide();
                        } else if (data.data.items === null && data.data.pageCount > 0) {
                            console.log('123123')
                            _this.getLabelData(false, 1);
                        } else {
                            var labelDatas = datas.map(function(item) {
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

                            if (labelDatas.length < onePageNum) {
                                var num = onePageNum - labelDatas.length;
                                for (var i = 0; i < num; i++) {
                                    labelDatas.push(nullData);
                                }
                            }
                            // console.log(JSON.stringify(labelDatas, null, 2))
                            _this.labels = labelDatas;


                            _this.$nextTick(function() {
                                $('input[name="labelchecks"]').removeAttr("checked");
                                $('input[name="labelcheckall"]').removeAttr("checked");

                                form.render();
                                _this.selscroll();
                            })
                            $(".tcdPageCode").show().createPage({
                                pageCount: data.data.pageCount,
                                current: page,
                                backFn: function(p) {

                                    _this.savePage = p;
                                    if (_this.searchText === "") {
                                        _this.getLabelData(false, p);

                                    } else {
                                        _this.getLabelData(true, p);
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
            // 新建标签
            creatEditLabel: function() {
                var _this = this;
                var layer_open = layer.open({
                    title: ['新建标签'],
                    type: 1,
                    skin: 'bayax-layer-skin', //加上边框
                    area: ['800px', '600px'], //宽高
                    content: $("#creatEditLabel"), //捕获的元素,
                    shift: 2,
                    // maxmin: true,
                    resize: false,
                    btn: ['保存并继续', '保存', '放弃'],
                    success: function() {

                        _this.cleanLayData();
                        _this.editID = ''; //新建时 清空单条标签id;
                        _this.labelBoolWarnId = ''; //新建时 清空bool型报警的id;
                    },
                    yes: function(index) {
                        _this.submitMethod(false);

                    },
                    btn2: function(index) {
                        _this.submitMethod(true, layer_open);
                        return false;
                    },
                    btn3: function(index) {
                        // alert(3)
                    }
                });
            },
            // 新建提交公共方法
            submitMethod: function(flag, layers) {
                var _this = this;
                if (_this.labelName === '' || _this.labelRegister === '') {
                    layer.msg('必填项不能为空');
                } else {

                    if (Number(_this.labelAcquisition) !== 1) {
                        if (_this.labelAcquisitionFrequency === '') {
                            layer.msg('采集频率不能为空');
                            return false;
                        }
                    }

                    if (Number(_this.labelType) === 1 && Number(_this.labelEnabelWarn) === 1) {
                        if (_this.labelBoolWarnDes === '') {
                            layer.msg('报警描述不能为空');
                            return false;
                        }
                    }
                    if (Number(_this.labelType) === 2 || Number(_this.labelType) === 3) {

                        if (_this.labelMaxValue === '' && _this.labelMinValue === '') {

                        } else {
                            var max = Number(_this.labelMaxValue);
                            var min = Number(_this.labelMinValue);

                            if (max <= 999999999 && min >= -999999999 && max > min) {

                            } else {
                                layer.msg('最大值最小值不准确');
                                return false;
                            }
                        }
                        var arr = _this.alarm_attributes
                        if (Array.isArray(arr)) {
                            var flags = false;
                            for (var key in arr) {
                                console.log(key);
                                if (arr[key].value == '' || arr[key].message == '') {
                                    flags = true;
                                    break;
                                }
                            }
                            if (flags) {
                                layer.msg('界限值或报警描述不能为空');
                                return false;
                            }

                        }


                    }

                    var updata = _this.readLayData();

                    console.log(JSON.stringify(updata, null, 2))

                    $.ajax({
                        url: apiurl + 'tag',
                        type: "post",
                        dataType: "json",
                        data: updata,
                        beforeSend: function() {
                            _this.loadingShow = true;
                        },
                        complete: function() {
                            _this.loadingShow = false;
                        },
                        success: function(data) {
                            _this.loadingShow = false;
                            if (data.success) {
                                layer.msg('创建成功');

                                if (_this.searchText === '') {
                                    _this.getLabelData(false, _this.savePage);
                                } else {
                                    _this.getLabelData(true, _this.savePage);
                                }
                                if (flag) {
                                    layer.close(layers);
                                }
                                // layer.close(index);
                            } else {
                                layer.msg(data.error_message);
                            }
                        },
                        error: function(data) {
                            publicAjaxError(data);
                        }
                    });
                }
            },

            // 批量删除
            batchDelete: function() {
                var _this = this;
                if (_this.arrDelLabel.length === 0) {
                    layer.msg('至少选择一个标签');
                } else {



                    layer.confirm('确认删除所有选中的标签吗？', {
                        title: '批量删除数据标签',
                        skin: 'bayax-layer-skin',
                        success: function() {
                            $('.layui-layer-btn a').addClass('confirm');
                        },
                        btn: ['确定', '取消']
                    }, function() {
                        $.ajax({
                            url: apiurl + 'tag/?ids=' + _this.arrDelLabel.join(','),
                            type: "DELETE",
                            beforeSend: function() {
                                _this.loadingShow = true;
                            },
                            success: function(data) {

                                _this.loadingShow = false;
                                _this.arrDelLabel = [];
                                if (data.success) {
                                    // layer.close(layers);
                                    layer.msg("删除成功");
                                    if (_this.searchText === '') {
                                        _this.getLabelData(false, _this.savePage);
                                    } else {
                                        _this.getLabelData(true, _this.savePage);
                                    }
                                } else {
                                    layer.msg(data.error_message);
                                }
                            },
                            error: function(data) {
                                returnLogIn(data);
                            }
                        });
                    }, function() {

                    });
                }

            },
            // a-编辑
            labelEdit: function(id) {
                var _this = this;

                $.ajax({
                    url: apiurl + 'tag/' + id,
                    type: 'get',
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        if (data.success) {
                            console.log('标签信息:' + JSON.stringify(data, null, 2));
                            var item = data.data;
                            var layer_open = layer.open({
                                title: ['编辑标签'],
                                type: 1,
                                skin: 'bayax-layer-skin',
                                area: ['800px', '600px'], //宽高
                                content: $("#creatEditLabel"), //捕获的元素,
                                shift: 2,
                                // maxmin: true,
                                resize: false,
                                btn: ['保存', '放弃'],
                                success: function() {

                                    _this.cleanLayData();

                                    _this.labelEditDataPublicMethod(item);


                                    switch (Number(item.tag_type)) {
                                        case 1:
                                            _this.isBool = true;
                                            _this.isString = false;
                                            _this.basicDefault = true;

                                            // 默认值
                                            // _this.labelDefaultBool = item.init_data;
                                            $('.cla-boollabelDefault-sel').val(item.init_data);
                                            //报警
                                            if (item.alarm_attributes !== null) {
                                                var alarm_attributes = item.alarm_attributes[0];

                                                _this.labelBoolWarnId = alarm_attributes.id;
                                                _this.labelEnabelWarn = alarm_attributes.alarm_status;
                                                console.log(alarm_attributes)
                                                console.log('查看：' + _this.labelBoolWarnId)
                                                if (Number(_this.labelEnabelWarn) === 1) {
                                                    _this.disabledBoolwarnEnabled = false;
                                                    _this.labelBoolWarnDes = alarm_attributes.message;
                                                    _this.labelBoolWarnLevel = alarm_attributes.alarm_level;
                                                    $('.cla-enablewarn-check').prop('checked', true);
                                                    $('.cla-Boolwarn-sletc').removeAttr('disabled');
                                                    $('.cla-boolwarnval-sel').val(alarm_attributes.value);
                                                    $('.cla-boolwarnlevel-sel ').val(alarm_attributes.alarm_level);
                                                } else {
                                                    $('.cla-enablewarn-check').prop('disabled', 'disabled');
                                                    _this.disabledBoolwarnEnabled = true;
                                                    $('.cla-Boolwarn-sletc').prop('disabled', 'disabled');
                                                    _this.labelBoolWarnDes = ''; //报警描述置空
                                                }


                                            }

                                            _this.labelEditDataBoolIntMethod(item);

                                            break;
                                        case 2:
                                        case 3:
                                            _this.isBool = false;
                                            _this.isString = false;
                                            _this.basicDefault = false;

                                            // cla-energy-check
                                            //能耗数据
                                            _this.labelEnergy = item.energy_data;
                                            if (_this.labelEnergy) {
                                                $('.cla-energy-check').prop('checked', true);
                                            }
                                            // 默认值
                                            // _this.labelDefaultInt = item.init_data;

                                            // 最大值
                                            if (item.max_value == null) {
                                                _this.labelMaxValue = '';
                                            } else {
                                                _this.labelMaxValue = item.max_value;
                                            }
                                            // 最小值
                                            if (item.min_value == null) {
                                                _this.labelMinValue = '';
                                            } else {
                                                _this.labelMinValue = item.min_value;
                                            }




                                            //换算系数(乘以)
                                            _this.labelChengYi = item.multiply_by;
                                            if (_this.labelChengYi === 0) {
                                                _this.labelChengYi = '';
                                            }

                                            // 报警
                                            var alarm_attributes = item.alarm_attributes;
                                            _this.alarm_attributes = alarm_attributes;
                                            if (Array.isArray(_this.alarm_attributes)) {
                                                if (_this.alarm_attributes.length > 0) {
                                                    $('.cla-Warn-SiQu-check').removeAttr('disabled');
                                                    if (item.alarm_dead_zone) {
                                                        $('.cla-Warn-SiQu-check').prop('checked', true);
                                                        _this.labelIntWarnSiQu = true;
                                                        _this.labelIntWarnSiQuValue = item.alarm_dead_zone_value;
                                                        _this.disabledIntWarnSiQuVal = false;
                                                    } else {
                                                        _this.labelIntWarnSiQu = false;
                                                    }
                                                }
                                            }

                                            _this.labelEditDataBoolIntMethod(item);

                                            break;
                                        case 4:
                                            _this.isBool = true;
                                            _this.isString = true;
                                            _this.basicDefault = false;
                                            break;
                                        default:
                                            break;
                                    }

                                    form.render();
                                    _this.selscroll();
                                },
                                yes: function(index) {
                                    if (_this.labelName === '' || _this.labelRegister === '') {
                                        layer.msg('必填项不能为空');
                                    } else {

                                        if (Number(_this.labelAcquisition) !== 1) {
                                            if (_this.labelAcquisitionFrequency === '') {
                                                layer.msg('采集频率不能为空');
                                                return false;
                                            }
                                        }

                                        if (Number(_this.labelType) === 1 && Number(_this.labelEnabelWarn) == 1) {
                                            if (_this.labelBoolWarnDes === '') {
                                                layer.msg('报警描述不能为空');
                                                return false;
                                            }
                                        }
                                        if (Number(_this.labelType) === 2 || Number(_this.labelType) === 3) {

                                            if (_this.labelMaxValue === '' && _this.labelMinValue === '') {

                                            } else {
                                                var max = Number(_this.labelMaxValue);
                                                var min = Number(_this.labelMinValue);

                                                if (max <= 999999999 && min >= -999999999 && max > min) {

                                                } else {
                                                    layer.msg('最大值最小值不准确');
                                                    return false;
                                                }
                                            }
                                            var arr = _this.alarm_attributes
                                            if (Array.isArray(arr)) {
                                                var flags = false;
                                                for (var key in arr) {
                                                    console.log(key);
                                                    if (arr[key].value == '' || arr[key].message == '') {
                                                        flags = true;
                                                        break;
                                                    }
                                                }
                                                if (flags) {
                                                    layer.msg('界限值或报警描述不能为空');
                                                    return false;
                                                }

                                            }


                                        }



                                        var updata = _this.readLayData();
                                        updata.id = _this.editID;


                                        console.log('查看：' + _this.labelBoolWarnId)
                                        if (Number(_this.labelType) === 1 && _this.labelBoolWarnId !== '') {
                                            updata.alarm_attributes[0].id = _this.labelBoolWarnId;
                                        }
                                        console.log(JSON.stringify(updata, null, 2))

                                        $.ajax({
                                            url: apiurl + 'tag',
                                            type: "PUT",
                                            dataType: "json",
                                            data: updata,
                                            beforeSend: function() {
                                                _this.loadingShow = true;
                                            },
                                            complete: function() {
                                                _this.loadingShow = false;
                                            },
                                            success: function(data) {
                                                _this.loadingShow = false;
                                                if (data.success) {
                                                    layer.msg('编辑成功');

                                                    if (_this.searchText === '') {
                                                        _this.getLabelData(false, _this.savePage);
                                                    } else {
                                                        _this.getLabelData(true, _this.savePage);
                                                    }

                                                    layer.close(index);

                                                } else {
                                                    layer.msg(data.error_message);
                                                }
                                            },
                                            error: function(data) {
                                                publicAjaxError(data);
                                                console.log("编辑失败原因" + JSON.stringify(data, null, 2));
                                            }
                                        });





                                    }

                                },
                                btn2: function(index) {
                                    _this.cleanLayData();
                                },
                                cancel: function() {
                                    //右上角关闭回调
                                    _this.cleanLayData();

                                }
                            });

                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });

            },
            //a-编辑数据还原公共方法
            labelEditDataPublicMethod: function(item) {
                var _this = this;

                // ID
                _this.editID = item.id;
                // 名称
                _this.labelName = item.name;
                // 数据类型
                _this.labelType = item.tag_type;
                $('.cla-labelType').val(item.tag_type).prop('disabled', 'disabled');

                // 描述
                _this.labelDescription = item.description;
                // 绑定节点
                _this.labelNodeID = item.node_id;
                $('.cla-nodeid-sel').val(item.node_id);
                // 寄存器
                _this.labelRegister = item.point_id;
                // 只读               
                if (_this.labelReadonly) {
                    $('.cla-readonly-check').prop('checked', true);
                }
                _this.labelReadonly = item.is_readonly;

                // 采集频率
                _this.labelAcquisitionFrequency = item.collect_nterval;
                if (_this.labelAcquisitionFrequency === 0) {
                    _this.labelAcquisitionFrequency = '';
                }
                // 采集方式
                _this.labelAcquisition = item.collect_ode;
                $('.cla-acquisition-sel').val(_this.labelAcquisition);
                if (_this.labelAcquisition == 1) {
                    labelVue.disabledAcquisitionFrequency = true;
                    labelVue.labelAcquisitionFrequency = '';
                } else {
                    labelVue.disabledAcquisitionFrequency = false;
                }



                form.render();
                this.selscroll();


            },
            // bool型 整数实数型 公共方法
            labelEditDataBoolIntMethod: function(item) {
                // 数据改变时存储
                if (item.history_change_save) {
                    $('.cla-hischangesave-check').prop('checked', true);
                    labelVue.labelHistoryChangeSave = true;
                    labelVue.disabledHisSiQu = false;
                    labelVue.labelHistorySiQuVal = item.history_dead_zone_value;
                } else {
                    // $('.cla-hischangesave-check').prop('disabled', 'disabled');
                    labelVue.labelHistoryChangeSave = false;
                    labelVue.disabledHisSiQu = true;
                }
                // 固定时间间隔存储
                if (item.history_time) {
                    $('.cla-hisfixsave-check').prop('checked', true);
                    labelVue.labelHistoryFixSave = true;
                    labelVue.disabledHisTime = false;
                    // 时间值
                    labelVue.labelHistoryFixSaveValue = item.history_time_value;
                    // 时间单位
                    $('.cla-histimeunit-sel').val(item.history_time_unit);
                } else {
                    labelVue.labelHistoryFixSave = false;
                    labelVue.disabledHisTime = true;
                }

                form.render();
                this.selscroll();


            },
            // 清空弹窗数据
            cleanLayData: function() {
                this.editID = '';
                this.labelBoolWarnId = '';
                this.labelName = '';
                this.labelType = '1';
                $('.cla-labelType').val('1').removeAttr('disabled');


                this.isBool = true;
                this.isString = false;
                this.basicDefault = true;

                this.labelDescription = '';
                this.labelEnergy = false;
                $('.cla-energy-check').prop('checked', false);
                this.labelDefaultInt = '';
                this.labelDefaultBool = 1;
                $('.cla-boollabelDefault-sel').val('1');
                this.labelRegister = '';
                this.labelReadonly = false;
                $('.cla-readonly-check').prop('checked', false);
                this.labelMaxValue = '';
                this.labelMinValue = '';
                this.labelAcquisition = '1';

                $('.cla-acquisition-sel').val('1');
                this.labelAcquisitionFrequency = '';
                this.disabledAcquisitionFrequency = true;

                this.labelChengYi = '';

                this.labelEnabelWarn = 0;
                // $('.cla-enablewarn-check').prop('disabled', 'disabled');

                this.disabledBoolwarnEnabled = true;
                this.labelBoolWarnDes = ''; //报警描述置空
                $('.cla-Boolwarn-sletc').val('1');
                this.labelBoolWarnValue = '1';
                $('.cla-boolwarnlevel-sel').val('2');
                this.labelBoolWarnLevel = '2';
                $('.cla-boolwarnval-sel').prop('disabled', 'disabled');

                this.alarm_attributes = [];
                this.alarm_attributes_delItem = [];
                $('.cla-Warn-SiQu-check').prop('disabled', 'disabled');
                $('.cla-Warn-SiQu-check').prop('checked', false);
                this.labelIntWarnSiQu = false;
                this.disabledIntWarnSiQuVal = true;
                this.labelIntWarnSiQuValue = '';

                this.labelHistoryChangeSave = false;
                $('.cla-hischangesave-check').prop('checked', false);
                this.labelHistorySiQuVal = '';
                this.disabledHisSiQu = true;

                this.labelHistoryFixSave = false;
                $('.cla-hisfixsave-check').prop('checked', false);
                this.disabledHisTime = true;
                this.labelHistoryFixSaveValue = '';

                this.labelHistoryTimeUnit = '1';
                $('.cla-histimeunit-sel').val('1');


                form.render();
                this.selscroll();


            },
            selscroll: function() {
                $('.label-node-div-sel .layui-anim-upbit').mCustomScrollbar();
            },
            // 获取 弹窗数据(用于 新建标签或编辑标签)
            readLayData: function() {

                var _this = this;
                var readData = {
                    project_id: 1,
                    name: _this.labelName,
                    tag_type: _this.labelType,
                    description: _this.labelDescription,
                    energy_data: _this.labelEnergy, //该字段在布尔型和字符型默认fasle
                    node_id: _this.labelNodeID,
                    point_id: _this.labelRegister,
                    is_readonly: _this.labelReadonly,
                    collect_ode: _this.labelAcquisition,
                    collect_nterval: _this.labelAcquisitionFrequency,
                }

                switch (Number(_this.labelType)) {
                    case 1:
                        readData.energy_data = false; //默认false
                        // 默认值(该字段暂时不用)
                        // readData.init_data = _this.labelDefaultBool;

                        readData.alarm_attributes = [{
                            alarm_status: _this.labelEnabelWarn,
                            value: _this.labelBoolWarnValue,
                            alarm_level: _this.labelBoolWarnLevel,
                            message: _this.labelBoolWarnDes,
                            alarm_operator: 1,
                            delete: true
                        }];
                        if (_this.labelEnabelWarn) {
                            readData.alarm_attributes[0].delete = false;
                        }
                        // if (_this.labelBoolWarnId === '') {} else {
                        //     readData.alarm_attributes[0].id = _this.labelBoolWarnId;
                        // }
                        readData.history_change_save = _this.labelHistoryChangeSave;
                        readData.history_time = _this.labelHistoryFixSave;
                        readData.history_time_value = _this.labelHistoryFixSaveValue;
                        readData.history_time_unit = _this.labelHistoryTimeUnit;
                        break;
                    case 2:
                    case 3:
                        // 默认值(该字段暂时不用)
                        // readData.init_data = _this.labelDefaultInt;

                        readData.max_value = _this.labelMaxValue;
                        readData.min_value = _this.labelMinValue;
                        readData.multiply_by = _this.labelChengYi;
                        readData.alarm_attributes = _this.alarm_attributes.map(function(item) {
                            return item;
                        });
                        _this.alarm_attributes_delItem.forEach(function(ele) {
                            readData.alarm_attributes.push(ele);
                        });
                        readData.alarm_dead_zone = _this.labelIntWarnSiQu;
                        readData.alarm_dead_zone_value = _this.labelIntWarnSiQuValue;

                        readData.history_change_save = _this.labelHistoryChangeSave;
                        readData.history_dead_zone_value = _this.labelHistorySiQuVal;
                        readData.history_time = _this.labelHistoryFixSave;
                        readData.history_time_value = _this.labelHistoryFixSaveValue;
                        readData.history_time_unit = _this.labelHistoryTimeUnit;
                        break;
                    case 4:
                        readData.energy_data = false; //默认false
                        // 默认值(该字段暂时不用)
                        // readData.init_data = _this.labelDefaultInt;
                        break;
                    default:
                        break;
                }


                return readData;
            },
            // a-删除
            labelDel: function(id) {
                var _this = this;

                layer.confirm('确认删除该标签吗', {
                    title: '删除标签',
                    skin: 'bayax-layer-skin',
                    success: function() {
                        $('.layui-layer-btn a').addClass('confirm');
                    },
                    btn: ['确定', '取消']
                }, function() {
                    $.ajax({
                        url: apiurl + 'tag/?ids=' + id,
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
                                    _this.getLabelData(false, _this.savePage);
                                } else {
                                    _this.getLabelData(true, _this.savePage);
                                }
                            } else {
                                layer.msg(data.error_message);
                            }
                        },
                        error: function(data) {
                            returnLogIn(data);
                        }
                    });

                }, function() {

                });

            },
            // 搜索 标签
            searchlabels: function() {
                var _this = this;
                this.debounce(function() {
                    _this.getLabelData(true, 1);
                }, 300, {
                    leading: false
                })();

            },
            // 清空搜索
            clearSearch: function() {
                this.searchText = '';
                this.getLabelData(false, 1);
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

            // 添加报警界限
            addlimit: function() {

                if (Array.isArray(this.alarm_attributes)) {
                    console.log('是数组')
                } else {
                    var arr = this.alarm_attributes = [];
                    console.log('不是数组')
                }
                var arr = this.alarm_attributes;
                if (arr.length > 7) {
                    layer.msg('最多8条报警')
                } else {

                    arr.push({
                        // id:2,
                        alarm_operator: '2',
                        value: '',
                        alarm_level: '2',
                        message: '',
                        alarm_status: 1,
                        delete: false
                    });


                    $('.cla-Warn-SiQu-check').removeAttr('disabled');

                    this.$nextTick(function() {
                        form.render('checkbox', 'filterIntContent');
                        form.render('select', 'filterIntContent');
                    });

                }
            },
            // 删除报警界限
            alarmAttributesDel: function(item) {

                if (item.hasOwnProperty("id")) {
                    var dic = JSON.parse(JSON.stringify(item));
                    dic.delete = true;
                    this.alarm_attributes_delItem.push(dic);
                }

                var arrs = this.alarm_attributes;
                var indexs = arrs.indexOf(item);
                console.log(JSON.stringify(item, null, 2))
                arrs.splice(indexs, 1);

                if (arrs.length < 1) {
                    $('.cla-Warn-SiQu-check').prop("checked", false).prop('disabled', 'disabled');
                    this.labelIntWarnSiQu = false;
                    this.labelIntWarnSiQuValue = '';
                    this.disabledIntWarnSiQuVal = true;

                }
                form.render();
                this.selscroll();



            }

        }


    });



});