layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;
    var layerHeader = 'font-size:18px;color:#fff;background:#3E4687;border:none;height:50px;font-weight:bold;line-height:50px;padding-left:10px'

    // 编辑用户  权限
    form.on('checkbox(powerCheck)', function(data) {
        var sys_id = Number(data.value);
        var arr = userSetVue.editViewGroup;
        if (data.elem.checked) {
            arr.push(sys_id);
        } else {
            var indexs = arr.indexOf(sys_id);
            arr.splice(indexs, 1);
        }
        console.log(JSON.stringify(arr, null, 2))
    });
    // 编辑用户 角色监听取值
    form.on('select(editRoleSel)', function(data) {
        userSetVue.editPersonData.system_role_id = data.value;
        console.log('查看编辑角色：' + userSetVue.editPersonData.system_role_id);
    });

    // 新增用户  权限
    form.on('checkbox(addpowerCheck)', function(data) {
        var sys_id = Number(data.value);
        var arr = userSetVue.addViewGroup;
        if (data.elem.checked) {
            arr.push(sys_id);
        } else {
            var indexs = arr.indexOf(sys_id);
            arr.splice(indexs, 1);
        }
        console.log(JSON.stringify(arr, null, 2))
    });

    // 新增用户 角色监听取值
    form.on('select(addRoleSel)', function(data) {
        userSetVue.addPersonData.system_role_id = data.value;
        console.log('查看编辑角色：' + userSetVue.addPersonData.system_role_id);
    });

    var userSetVue = new Vue({
        el: '#app',
        data: {
            project: {},
            loadingShow: false,
            divHideShow: {
                showDiv: true,
                editDiv: false,
                addDiv: false
            },
            quanxianNumbers: 10, //权限数量
            graphicImage: [], //子系统列表数据
            userData: [], //全部用户信息
            personData: {}, //单个用户信息
            editPersonIndex: 0, //编辑用户的 序列(用于处理状态)
            editViewGroup: [], //编辑权限
            editPersonData: { //编辑用户 保存的数据
                project_id: 1,
                username: '',
                password: '',
                sure_password: '',
                system_role_id: '',
                full_name: '',
                employee_id: '',
                user_view_group: [],
            },
            addViewGroup: [], //新增权限
            addPersonData: { //添加用户 保存的数据
                project_id: 1,
                username: '',
                password: '',
                sure_password: '',
                system_role_id: '',
                full_name: '',
                employee_id: '',
                user_view_group: [],
            },

            userViewGroup: [], //单个用户的子系统权限

        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                form.render();
                this.getGraphicImageGetData();
                this.getUserMessage(0);
                this.project = JSON.parse(sessionStorage.getItem('bayax_proMsg'));
            });

        },
        methods: {
            // 获取子系统列表
            getGraphicImageGetData: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + 'subsystem',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        if (data.success) {
                            // console.log('查看全部子系统：' + JSON.stringify(data))
                            _this.graphicImage = data.data.items;


                            _this.$nextTick(function() {
                                form.render();
                            });
                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);

                    }
                });
            },
            // 获取全部用户信息
            getUserMessage: function(index) {
                var _this = this;
                var numbers = 14;
                $.ajax({
                    url: apiurl + 'usermanage',
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
                        if (data.success) {
                            console.log("用户数据:" + JSON.stringify(data, null, 2));
                            var nulldic = {
                                id: '',
                                username: '',
                                role: '',
                                full_name: '',
                                employee_id: '',
                                last_login_time: '',
                                seletcs: false
                            }
                            if (data.data == null || data.data.items == null) {
                                _this.userData = [];
                                for (var i = 0; i < numbers; i++) {
                                    _this.nodes.push(nulldic);
                                }
                            } else {
                                var userdatas = data.data.items;
                                var len = userdatas.length;
                                if (len < numbers) {
                                    for (var i = 0; i < numbers - len; i++) {
                                        userdatas.push(nulldic);
                                    }
                                }
                                _this.userData = userdatas.map(function(ele) {
                                    switch (Number(ele.system_role_id)) {
                                        case 1:
                                            ele.role = '管理员';
                                            break;
                                        case 2:
                                            ele.role = '普通'
                                            break;
                                        default:
                                            ele.role = ''
                                            break;
                                    }
                                    ele.seletcs = false;
                                    return ele;
                                });
                                // if (type) {
                                _this.getOneUserMes(_this.userData[index], index);
                                // }

                                console.log(JSON.stringify(_this.userData, null, 2))
                            }


                            // addUserMessageToTable(data.data.items);
                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        publicAjaxError(data);
                    }
                })
            },
            // 获取单个用户信息
            getOneUserMes: function(item, index) {
                var _this = this;
                if (item.id != '') {

                    this.divHideShow.showDiv = true;
                    this.divHideShow.editDiv = false;
                    this.divHideShow.addDiv = false;
                    this.editPersonIndex = index;
                    this.userData.forEach(function(element) {
                        element.seletcs = false;
                    }, this);
                    item.seletcs = true;

                    $.ajax({
                        url: apiurl + 'usermanage/id',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            id: item.id
                        },
                        beforeSend: function() {
                            _this.loadingShow = true;
                        },
                        complete: function() {
                            _this.loadingShow = false;
                        },
                        success: function(result) {
                            _this.loadingShow = false;
                            console.log('用户详细信息:' + JSON.stringify(result, null, 2));
                            if (result.success) {

                                _this.personData = result.data;
                                switch (Number(_this.personData.system_role_id)) {
                                    case 1:
                                        _this.personData.role = '管理员';
                                        break;
                                    case 2:
                                        _this.personData.role = '普通';
                                        break;
                                    default:
                                        _this.personData.role = '';
                                        break;
                                }
                                var len = 0;
                                if (_this.personData.user_view_group == null) {

                                } else {
                                    len = _this.personData.user_view_group.length;
                                }

                                if (len < _this.quanxianNumbers) {
                                    var dic = {
                                        id: '',
                                        name: '',
                                        ishide: true

                                    }
                                    for (var i = 0; i < _this.quanxianNumbers - len; i++) {
                                        _this.personData.user_view_group.push(dic)
                                    }
                                }


                                _this.$nextTick(function() {
                                    form.render();
                                })
                            } else {
                                layer.msg(result.error_message);

                            }
                        },
                        error: function(data) {
                            _this.loadingShow = false;
                            publicAjaxError(data);
                        }
                    });

                }
            },
            // 编辑用户
            userMsgEdit: function() {
                this.divHideShow.showDiv = false;
                this.divHideShow.editDiv = true;
                this.divHideShow.addDiv = false;
                $('.powerCheck').removeAttr("checked");
                $('.edit-role').val(this.personData.system_role_id);
                this.editViewGroup = [];
                this.editPersonData.id = this.personData.id;
                this.editPersonData.password = '';
                this.editPersonData.sure_password = '';
                this.editPersonData.username = this.personData.username;
                this.editPersonData.system_role_id = this.personData.system_role_id;
                this.editPersonData.full_name = this.personData.full_name;
                this.editPersonData.employee_id = this.personData.employee_id;
                this.$nextTick(function() {
                    form.render();
                });

            },
            // 删除用户
            userMsgEdl: function() {
                var _this = this;
                layer.confirm('确认删除该用户', {
                    title: '删除用户',
                    skin: 'bayax-layer-skin',
                    success: function() {
                        $('.layui-layer-btn a').addClass('confirm');
                    },
                    btn: ['确定', '取消']
                }, function() {
                    $.ajax({
                        url: apiurl + 'usermanage/' + _this.personData.id,
                        type: 'DELETE',
                        beforeSend: function() {
                            _this.loadingShow = true;
                        },
                        success: function(data) {
                            _this.loadingShow = false;
                            if (data.success) {
                                layer.msg("删除成功");
                                _this.getUserMessage(0);
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
            //编辑保存用户
            editSaveUser: function() {
                var dic = this.editPersonData;
                var name = dic.username,
                    pas = dic.password,
                    sure_pas = dic.sure_password,
                    full_name = dic.full_name,
                    employ_id = dic.employee_id;

                if (name !== "" && pas != "" && sure_pas !== "") {
                    if (pas === sure_pas) {
                        if (this.RegeMatchTwo(name) && this.RegeMatchTwo(pas) && this.RegeMatchTwo(sure_pas) && this.RegeMatchTwo(full_name) && this.RegeMatchTwo(employ_id)) {
                            var _this = this;
                            var view_group = [];
                            this.editViewGroup.forEach(function(ele) {
                                view_group.push({
                                    id: ele
                                })
                            });
                            this.editPersonData.user_view_group = view_group;

                            console.log(JSON.stringify(this.editPersonData, null, 2))

                            $.ajax({
                                url: apiurl + 'usermanage/0',
                                type: 'PUT',
                                dataType: 'json',
                                data: _this.editPersonData,
                                beforeSend: function() {
                                    _this.loadingShow = true;
                                },
                                complete: function() {
                                    _this.loadingShow = false;
                                },
                                success: function(data) {
                                    _this.loadingShow = false;
                                    if (data.success) {
                                        layer.msg("修改成功");
                                        _this.getUserMessage(_this.editPersonIndex);
                                        _this.divHideShow.showDiv = true;
                                        _this.divHideShow.editDiv = false;
                                        _this.divHideShow.addDiv = false;
                                    } else {
                                        layer.msg(data.error_message);
                                    }
                                },
                                error: function(data) {
                                    _this.loadingShow = false;
                                    publicAjaxError(data)
                                }
                            })
                        } else {
                            layer.msg('输入信息不能包含特殊字符');
                        }
                    } else {
                        layer.msg("两次输入的密码不一致,请重新输入");
                    }
                } else {
                    layer.msg("请确认信息填写完整")
                }


            },
            // 取消编辑
            editCancel: function() {
                this.divHideShow.showDiv = true;
                this.divHideShow.editDiv = false;
                this.divHideShow.addDiv = false;
                this.editPersonData = { //添加新建 保存的数据
                    project_id: 1,
                    username: '',
                    password: '',
                    sure_password: '',
                    system_role_id: '',
                    full_name: '',
                    employee_id: '',
                    user_view_group: [],
                }
                this.editViewGroup = [];
            },
            // 新建用户
            addUser: function() {
                this.divHideShow.showDiv = false;
                this.divHideShow.editDiv = false;
                this.divHideShow.addDiv = true;

                this.addPersonData = { //添加新建 保存的数据
                    project_id: 1,
                    username: '',
                    password: '',
                    sure_password: '',
                    system_role_id: '2',
                    full_name: '',
                    employee_id: '',
                    user_view_group: [],
                }

                $('.addpowerCheck').removeAttr("checked");
                this.addViewGroup = [];
                $('.add-role').val('2');
                this.$nextTick(function() {
                    form.render();
                });
            },
            //新建保存用户
            addSaveUser: function() {

                var dic = this.addPersonData;
                var name = dic.username,
                    pas = dic.password,
                    sure_pas = dic.sure_password,
                    full_name = dic.full_name,
                    employ_id = dic.employee_id;

                if (name !== "" && pas != "" && sure_pas !== "") {
                    if (pas === sure_pas) {
                        if (this.RegeMatchTwo(name) && this.RegeMatchTwo(pas) && this.RegeMatchTwo(sure_pas) && this.RegeMatchTwo(full_name) && this.RegeMatchTwo(employ_id)) {
                            var _this = this;
                            var view_group = [];
                            this.addViewGroup.forEach(function(ele) {
                                view_group.push({
                                    id: ele
                                })
                            });
                            _this.addPersonData.user_view_group = view_group;

                            console.log(JSON.stringify(_this.addPersonData, null, 2));
                            $.ajax({
                                url: apiurl + 'usermanage',
                                type: 'post',
                                dataType: 'json',
                                data: _this.addPersonData,
                                beforeSend: function() {
                                    _this.loadingShow = true;
                                },
                                complete: function() {
                                    _this.loadingShow = false;
                                },
                                success: function(data) {
                                    _this.loadingShow = false;
                                    if (data.success) {
                                        layer.msg("创建成功");
                                        _this.getUserMessage(0);
                                        _this.divHideShow.showDiv = true;
                                        _this.divHideShow.editDiv = false;
                                        _this.divHideShow.addDiv = false;

                                    } else {
                                        layer.msg(data.error_message);
                                        returnLogIn(data.error_message);
                                    }
                                },
                                error: function(data) {
                                    _this.loadingShow = false;
                                    publicAjaxError(data);
                                }
                            });
                        } else {
                            layer.msg('输入信息不能包含特殊字符');
                        }
                    } else {
                        layer.msg("两次输入的密码不一致,请重新输入");
                    }
                } else {
                    layer.msg("请确认信息填写完整")
                }











            },
            // 取消新建
            addCancel: function() {
                this.divHideShow.showDiv = true;
                this.divHideShow.editDiv = false;
                this.divHideShow.addDiv = false;
            },
            /**
             * [判断字符串是否合法]
             * @param {[type]} thiss [description]
             * @param {[type]} span  [description]
             */
            RegeMatchTwo: function(str) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\\]/g);
                if (pattern.test(str)) {
                    return false;
                } else {
                    return true;
                }
            }


        }
    });

});