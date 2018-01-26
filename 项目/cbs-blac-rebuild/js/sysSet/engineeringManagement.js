var enManagementVue;
layui.use(['layer', 'form'], function() {
    var layer = layui.layer;
    var form = layui.form;
    enManagementVue = new Vue({
        el: '#app',
        data: {
            project: {
                proID: 1,
                proLogo: '',
                proName: ''
            },
            isDisplayShow: false,
            isEditShow: false,
            proID: '',
            proLogo: '', //工程Logo
            proLogoShow: '', //工程logo展示
            proLogoEdit: '', //工程logo编辑
            showProName: '', //展示- 工程名称
            showProLanguage: '', //工程语言
            proName: '', //编辑-工程名称
            isRightName: false,
            warnStr: '', //警告内容
            language: '1', //selete 
            languageCopy: '1', //暂存(解决 编辑-取消-未保存后 语言重置问题)
            loadingShow: false //loading


        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.projectInfo();
            })
        },
        methods: {
            projectInfo: function() {
                var _this = this;
                $.ajax({
                    url: apiurl + 'project',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        if (data.success) {
                            var data = data.data;

                            // 工程信息统一存储
                            sessionStorage.setItem('bayax_proMsg', JSON.stringify(data));
                            // sessionStorage.setItem('bayax_proID', data.id);
                            // sessionStorage.setItem('bayax_proName', data.name);
                            // sessionStorage.setItem('bayax_logo', data.logo_path);


                            console.log(JSON.stringify(data, null, 2));
                            _this.proID = data.id;
                            _this.proLogo = data.logo_path;
                            _this.proLogoShow = data.logo_path;
                            _this.proLogoEdit = data.logo_path;
                            _this.showProName = data.name;
                            _this.proName = data.name;
                            switch (Number(data.locale)) {
                                case 1:
                                    _this.showProLanguage = '中文';
                                    _this.language = '1';
                                    _this.languageCopy = '1';
                                    break;
                                case 2:
                                    _this.showProLanguage = '英文';
                                    _this.language = '2';
                                    _this.languageCopy = '2';
                                    break;
                                case 3:
                                    _this.showProLanguage = '日文';
                                    _this.language = '3';
                                    _this.languageCopy = '3';
                                    break;
                            }

                        } else {
                            layer.msg(data.error_message);
                        }
                    },
                    error: function(data) {
                        layer.msg(data.error_message);
                        // returnLogIn(data);
                    }
                });
            },
            edit: function() {
                this.isDisplayShow = !this.isDisplayShow;
                this.isEditShow = !this.isEditShow;

                this.proName = this.showProName;
                this.proLogoEdit = this.proLogoShow;
                $('#sel-labguage').val(this.languageCopy);
                layui.form.render('select');
            },
            cancelEdit: function() {
                this.isDisplayShow = !this.isDisplayShow;
                this.isEditShow = !this.isEditShow;

            },
            // 保存
            saveProMsg: function() {
                var _this = this;
                if (!_this.isRightName) {
                    $.ajax({
                        url: apiurl + 'project',
                        type: 'put',
                        dataType: 'json',
                        data: {
                            id: _this.proID,
                            name: _this.proName,
                            logo_path: _this.proLogoEdit,
                            locale: _this.language
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
                                layer.msg('修改成功');
                                _this.projectInfo();
                                _this.isDisplayShow = !_this.isDisplayShow;
                                _this.isEditShow = !_this.isEditShow;
                            } else {
                                layer.msg(data.error_message);
                                console.log('修改失败原因' + JSON.stringify(data, null, 2))
                            }
                        },
                        error: function(data) {
                            // publicAjaxError(data);

                        }
                    });
                } else {
                    layer.msg('检查数据是否准确');
                }

            },
            /**
             * [判断字符串是否合法 -提示]
             * @param {[type]} val [字符串]
             * return 1:字符串为空 2：不合法 3:字符超出限制 4：合法
             */
            RegeMatch: function(val) {
                var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
                if (val == '') {
                    return 1;
                } else if (pattern.test(val)) {
                    return 2;
                } else if (val.replace(/[^\x00-\xff]/g, "**").length > 20) {
                    return 3;
                } else {
                    return 4;
                }
            },
            proNameOnInput: function() {
                this.isRightName;
                var isRightInput = this.RegeMatch(this.proName);
                switch (isRightInput) {
                    case 1:
                        this.isRightName = true;
                        this.warnStr = '不能为空';
                        break;
                    case 2:
                        this.isRightName = true;
                        this.warnStr = '输入不合法';
                        break;
                    case 3:
                        this.isRightName = true;
                        this.warnStr = '字符超出限制';
                        break;
                    case 4:
                        this.isRightName = false;
                        break;
                    default:
                        break;
                }
            },
            proNameOnBlur: function() {
                this.proNameOnInput();
            },
            upImg: function() {
                $('#imageFileField-logo').val('').click();
            }

        }
    });



    // 选择语言
    form.on('select(filter)', function(data) {
        enManagementVue.language = data.value;
        console.log(enManagementVue.language);
    });
    //普通图片上传

});



function showPreview(source) {
    var file = source.files[0];
    if (file == null) {
        return;
    }
    if (!/image\/\w+/.test(file.type)) {
        alert('请确保文件为图像类型');
        return false;
    }
    if (window.FileReader) {
        var fr = new FileReader();
        fr.readAsDataURL(file);

        fr.onload = function(e) {
            $.ajax({
                url: apiurl + 'fileupload',
                type: 'post',
                dataType: 'json',
                data: {
                    data: e.target.result
                },
                beforeSend: function() {
                    enManagementVue.loadingShow = true;
                },
                complete: function() {
                    enManagementVue.loadingShow = false;
                },
                success: function(data) {
                    enManagementVue.loadingShow = false;
                    if (data.success) {
                        console.log('查看上传返回的数据:' + JSON.stringify(data, null, 2));
                        enManagementVue.proLogoEdit = data.data;
                    } else {
                        layer.msg(data.error_message);
                    }
                },
                error: function(data) {
                    publicAjaxError(data);
                }

            })
        };
    }
}