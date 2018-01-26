layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;
    var timeoutId; //搜索延时操作标志

    // 是否隐藏数据标签
    form.on('checkbox(filterShowTags)', function(data) {

        if (data.elem.checked) {
            statisticEditVue.activeGroup.showTags = 1;
        } else {
            statisticEditVue.activeGroup.showTags = 0;
        }

    });

    // 弹窗勾选数据标签
    form.on('checkbox(filterlayertags)', function(data) {
        var ids = data.value;
        var arrhave = statisticEditVue.layerData.alreadyHave;
        var arrcheck = statisticEditVue.layerData.alreadyHaveForCheck;
        var arrSearchcheck = statisticEditVue.layerData.searchDataForCheck;
        console.log(JSON.stringify(arrSearchcheck, null, 2))
        if (data.elem.checked) {
            console.log(JSON.stringify(arrSearchcheck[(ids)]))
            arrhave.push(arrSearchcheck[ids]);
            arrcheck[ids] = arrSearchcheck[ids];

        } else {
            for (var i = 0; i < arrhave.length; i++) {
                if (ids == arrhave[i].tag_id) {
                    var item = arrhave[i];
                    var indexs = arrhave.indexOf(item);
                    console.log(JSON.stringify(item, null, 2))
                    arrhave.splice(indexs, 1);
                    delete arrcheck[ids];
                    break;
                }
            }
        }

    });


    var statisticEditVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            ulhide: false,
            newGroups: {
                addGroups: false, //添加群组操作位置是否显示的标志
                newGroupsNameVal: '', //群组名称
                flags: false, //标志, (添加群组时要求必须走弹窗过程才允许保存)
            },
            operationFlags: true, //添加 和 重命名 不能共存的标志

            statisticsGroupData: [], //能耗统计组

            activeGroup: { //单个群组 数据暂存用于添加和保存
                id: '',
                showTags: 0,
            },
            statisticsGroupTagsData: [], //能耗统计组tags

            layerData: { // 弹窗的 数据
                searchText: '', //搜索
                alreadyHave: [], //已有的tags
                alreadyHaveForCheck: {}, //已存在的tags 用于在勾选时做数据对比
                searchData: [], //搜索到的tags
                searchDataForCheck: {}, //搜索到的tags 用于在勾选时做数据对比
                showPage: true //有数据时 显示分页
            }

        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {

                form.render();
                this.getStatisticsGroupData();
                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));
                // this.addtagsMethod();


                _this.$nextTick(function() {
                    form.render();
                })

            });

        },
        methods: {
            leftUlShowHide: function() {
                console.log(123123)
                this.ulhide = !this.ulhide;
                $('.energyStatistics-content-body').toggle();
            },
            // 获取群组
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
                                        ele.active = false;
                                        ele.divIsHide = true; //true 代表name 显示
                                        ele.divhover = false; //false 是否调整内边距(适应布局)
                                        ele.operationIsHide = true; //true 代表  rename按钮不显示
                                        ele.renameVal = ''; //input 值
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
            // 群组 相关操作

            // 添加新群组
            creatNewGroups: function() {
                if (!this.newGroups.addGroups) {
                    if (this.operationFlags) {
                        $(".energyStatistics-content-body").mCustomScrollbar('scrollTo', 'top');
                        this.operationFlags = false; //更改标志  不能进行重名了
                        this.newGroups.addGroups = true;
                        this.newGroups.newGroupsNameVal = '';
                        this.newGroups.flags = false;

                        // 清空tags数据 及 保存按钮保存的数据
                        this.activeGroup.id = '';
                        this.activeGroup.showTags = "0";

                        this.statisticsGroupData.forEach(function(ele) {
                            ele.active = false;
                        }, this);


                        this.statisticsGroupTagsData = [];
                        var nulldata = {
                            name: '',
                            opratestr: '',
                            node_name: '',
                            point_id: '0',
                            ishide: true
                        }
                        var i = 11;
                        while (i > 0) {
                            this.statisticsGroupTagsData.push(nulldata);
                            i--;
                        }


                    } else {
                        layer.msg('存在重命名未取消或未完成')
                    }
                }


            },
            // 取消添加新群组
            cancleCreatNewGroups: function() {
                this.operationFlags = true; //更改标志  可以进行重名了
                this.newGroups.addGroups = false;
                this.newGroups.flags = false;
                this.gettags(this.statisticsGroupData[0]);
            },
            //确认添加新群组
            sureCreatNewGroups: function() {
                console.log('添加新租');
                if (this.newGroups.newGroupsNameVal != '') {
                    this.newGroups.flags = true; //(点击确认代表 知道新建群组要通过弹窗)
                    this.addtagsMethod(false);
                } else {
                    layer.msg('组名不能为空')
                }

            },
            // hover
            showRename: function(item) {
                item.divhover = true;
                item.operationIsHide = false;
            },
            // no-hover
            hideRename: function(item) {
                item.divhover = false;
                item.operationIsHide = true;
            },
            // 重命名
            rename: function(item) {
                if (this.operationFlags) {
                    this.operationFlags = false; //更改标志 不能添加群组
                    item.divIsHide = false;
                    item.renameVal = '';
                } else {
                    layer.msg('存在添加群组未取消或未完成')
                }

            },
            // 删除组
            deleteGroup: function(item) {
                var _this = this;
                layer.confirm('确认删除该组吗？', {
                    title: '提示',
                    skin: 'bayax-layer-skin',
                    success: function() {
                        $('.layui-layer-btn a').addClass('confirm');
                    },
                    btn: ['确定', '取消']
                }, function(index) {
                    $.ajax({
                        url: apiurl + 'energyconfig/' + item.id,
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
                                var indexs = _this.statisticsGroupData.indexOf(item);
                                console.log(index)
                                _this.statisticsGroupData.splice(indexs, 1);

                                _this.gettags(_this.statisticsGroupData[0]);
                                layer.close(index)
                            } else {
                                layer.msg(data.error_message);
                            }
                        },
                        error: function(data) {
                            publicAjaxError(data);
                        }
                    })
                }, function() {

                });
            },
            focusinput: function() {
                // 用于阻止 input获取焦点时 点击到  li
            },
            // 确认重命名
            sureRename: function(item) {
                var _this = this;
                var val = item.renameVal;
                if (val != '') {
                    if (this.RegeMatch(val)) {
                        $.ajax({
                            url: apiurl + 'energyconfig/0',
                            type: 'PUT',
                            dataType: 'json',
                            data: {
                                id: item.id,
                                name: val
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
                                    layer.msg('更改成功');
                                    _this.operationFlags = true; //更改标志 可以添加群组
                                    item.divIsHide = true;
                                    item.name = val;
                                } else {
                                    layer.msg(data.error_message);
                                }
                            },
                            error: function(data) {
                                publicAjaxError(data);
                            }
                        });
                    } else {
                        layer.msg('指定的组名称格式错误');
                    }
                } else {
                    layer.msg('名称不能为空');
                }
            },
            RegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (val != "") {
                    if (pattern.test(val)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            // 取消重命名
            cancelRename: function(item) {
                this.operationFlags = true; //更改标志 可以添加群组
                item.divIsHide = true;
            },


            // 获取群组tags
            gettags: function(item) {
                var _this = this;
                // this.operationFlags = true; //更改标志 可以添加群组
                // item.divIsHide = true;

                this.operationFlags = true; //更改标志  可以进行重名了
                this.newGroups.addGroups = false;
                this.newGroups.flags = false;



                this.statisticsGroupData.forEach(function(ele) {
                    ele.active = false;
                    ele.divIsHide = true;
                }, this);
                item.active = true;
                // this.groupsName = item.name;
                console.log('查看数据：' + JSON.stringify(item, null, 2))

                this.activeGroup.id = item.id;
                this.activeGroup.showTags = item.hide_tag;
                if (this.activeGroup.showTags) {
                    $('.showstags').prop('checked', true);
                } else {
                    $('.showstags').prop('checked', false);
                }
                form.render();

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
                        var lengths = 11;
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
            },
            // 删除一个tag
            deleteThisTags: function(item) {
                var arr = this.statisticsGroupTagsData;
                var indexs = arr.indexOf(item);
                console.log(JSON.stringify(item, null, 2))
                arr.splice(indexs, 1);

                if (this.statisticsGroupTagsData.length < 11) {
                    var nulldata = {
                        name: '',
                        opratestr: '',
                        node_name: '',
                        point_id: '0',
                        ishide: true

                    }
                    arr.push(nulldata);
                }


            },

            // 保存
            saveOrCreatgroup: function() {
                var _this = this;

                var dic = {
                    data: {
                        hide_tag: this.activeGroup.showTags,
                    }
                };
                if (this.activeGroup.id != '') {
                    layer.msg('更新')
                    dic.url = apiurl + 'energyconfig/1';
                    dic.urltype = 'PUT';
                    dic.optype = 'edit'; //更新
                    dic.data.id = this.activeGroup.id;
                    dic.data.tag_list = this.methodForSaveOrCreatgroup();
                } else {
                    if (this.newGroups.newGroupsNameVal == '') {
                        layer.msg('组名不能为空');
                        return false;
                    } else if (this.newGroups.flags) {
                        layer.msg('添加群组');
                        dic.url = apiurl + 'energyconfig';
                        dic.urltype = 'POST';
                        dic.optype = 'add';
                        dic.data.tag_list = this.methodForSaveOrCreatgroup();
                        dic.data.name = this.newGroups.newGroupsNameVal;
                    } else {
                        layer.msg('未确认添加群组');
                        return false;
                    }
                }
                console.log('查看上传的数据：' + JSON.stringify(dic, null, 2))
                $.ajax({
                    url: dic.url,
                    type: dic.urltype,
                    dataType: 'json',
                    data: dic.data,
                    beforeSend: function() {
                        _this.loadingShow = true;
                    },
                    complete: function() {
                        _this.loadingShow = false;
                    },
                    success: function(data) {
                        _this.loadingShow = false;
                        if (data.success) {
                            if (dic.optype === 'edit') {
                                layer.msg('数据更新成功');
                            } else {
                                layer.msg('创建成功');

                            }

                            _this.getStatisticsGroupData();

                        } else {
                            layer.msg(data.error_message);

                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                });






            },
            // 更新或新增tag数据处理
            methodForSaveOrCreatgroup: function() {
                var arr = [];
                this.statisticsGroupTagsData.forEach(function(ele) {
                    console.log(JSON.stringify(ele, null, 2))
                    if (ele.name != '') {
                        var dic = {
                            tag_id: ele.tag_id,
                            oprate: Number(ele.oprate)
                        }
                        arr.push(dic);
                    }
                });
                return arr;
            },

            // 添加数据标签方法
            addtagsMethod: function(type) {
                var _this = this;
                layer.open({
                    title: ['添加数据标签'],
                    type: 1,
                    skin: 'bayax-layer-skin',
                    area: ['1080px', '625px'], //宽高
                    content: $("#layer-add-tags"), //捕获的元素,
                    shift: 2,
                    resize: false,
                    btn: ['确定', '取消'],
                    success: function() {
                        // type=== true 代表  按钮调用该方法
                        // type=== false 代表  添加群组时 调用此方法
                        console.log('类型：' + type)

                        _this.layerData.showPage = false;
                        _this.layerData.searchText = '';
                        if (type) {
                            _this.layerData.alreadyHave = [];
                            _this.layerData.alreadyHaveForCheck = {};

                            _this.statisticsGroupTagsData.forEach(function(ele) {
                                if (ele.hasOwnProperty('tag_id')) {
                                    var dic1 = JSON.parse(JSON.stringify(ele));
                                    _this.layerData.alreadyHave.push(dic1);
                                    _this.layerData.alreadyHaveForCheck[ele.tag_id] = dic1;
                                }
                            })
                        } else {
                            _this.statisticsGroupData.forEach(function(ele) {
                                ele.active = false;
                            }, this);


                            _this.activeGroup.id = '';
                            _this.activeGroup.showTags = 0;
                            $('.showstags').prop('checked', false);
                            form.render();
                            _this.layerData.alreadyHave = [];
                            _this.layerData.alreadyHaveForCheck = {};
                        }


                    },
                    yes: function(index) {
                        var lengths = 11;
                        var nulldata = {
                            name: '',
                            opratestr: '',
                            node_name: '',
                            point_id: '0',
                            ishide: true

                        }
                        var arr = _this.layerData.alreadyHave.map(function(ele) {
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


                        _this.statisticsGroupTagsData = arr;

                        $(".energyStatistics-right-content").mCustomScrollbar('scrollTo', 'top');
                        layer.close(index);


                    },
                    btn2: function(index) {

                    }
                });
            },
            // 弹窗  删除右边已有的标签
            layerRightADel: function(item) {
                var id = item.tag_id;
                var layerData = this.layerData;
                var arr = layerData.alreadyHave;
                var indexs = arr.indexOf(item);
                console.log(JSON.stringify(item, null, 2))
                arr.splice(indexs, 1);
                delete layerData.alreadyHaveForCheck[id];

                for (var i = 0; i < layerData.searchData.length; i++) {
                    if (layerData.searchData[i].tag_id == id) {
                        $('#' + id).prop('checked', false);
                        break;
                    }
                }
                form.render();

            },
            // 弹窗 搜索
            searchtags: function(page) {
                var _this = this;
                var lengths = 8;
                this.debounce(function() {
                    if (_this.layerData.searchText != '') {
                        var updatas = ['name=' + _this.layerData.searchText, 'page=' + page, 'page_item_count=8'];
                        $.ajax({
                            url: apiurl + 'energytag?' + updatas.join('&'),
                            type: 'GET',
                            success: function(data) {
                                console.log(JSON.stringify(data, null, 2))
                                if (data.success) {
                                    _this.layerData.searchData = [];
                                    var result = data.data;
                                    var arr = []
                                    var nulldata = {
                                        name: '',
                                        id: '',
                                        tag_type: '',
                                        point_id: '',
                                        ishide: true
                                    }

                                    if (result.items && result.items.length > 0) {
                                        _this.layerData.showPage = true;
                                        _this.layerData.searchDataForCheck = {};
                                        arr = result.items.map(function(ele) {
                                            ele.ishide = false;
                                            ele.oprate = '1';
                                            return ele;
                                        });
                                        console.log('查看数据：' + JSON.stringify(arr, null, 2))
                                        arr.forEach(function(ele) {
                                            var dic1 = JSON.parse(JSON.stringify(ele));
                                            console.log(JSON.stringify(dic1, null, 2))
                                            _this.layerData.searchDataForCheck[ele.tag_id] = dic1;
                                        });
                                        console.log('遍历完的数据：' + JSON.stringify(_this.layerData.searchDataForCheck, null, 2))

                                        if (arr.length < lengths) {
                                            var i = lengths - arr.length;
                                            while (i > 0) {
                                                arr.push(nulldata);
                                                i--;
                                            }
                                        }

                                        _this.layerData.searchData = arr;


                                        $(".tcdPageCode").createPage({
                                            pageCount: result.pageCount,
                                            current: page,
                                            backFn: function(p) {
                                                _this.searchtags(p);
                                            }
                                        });

                                        _this.$nextTick(function() {
                                            console.log(JSON.stringify(_this.layerData.searchData, null, 2))
                                            _this.layerData.searchData.forEach(function(ele) {
                                                console.log(ele.tag_id)
                                                if (_this.layerData.alreadyHaveForCheck.hasOwnProperty(String(ele.tag_id))) {

                                                    console.log('ele:' + ele.tag_id)
                                                    $('#' + ele.tag_id).prop('checked', true);
                                                } else {

                                                    $('#' + ele.tag_id).prop('checked', false);
                                                }
                                            });

                                            form.render();
                                        });

                                    } else {
                                        _this.layerData.showPage = false;
                                    }

                                } else {
                                    layer.msg(data.error_message);
                                }
                            },
                            error: function(data) {
                                publicAjaxError(data);
                            }
                        });
                    } else {
                        _this.cleanSearchVal();
                    }

                }, 300, {
                    leading: false
                })();
            },
            // 清除搜索
            cleanSearchVal: function() {
                this.layerData.showPage = false;
                this.layerData.searchText = '';
                return false;
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