new Vue({
	el: '#app',
	data: {
		username: '',
		pasword: '',
		namefocus: false,
		paswfocus: false,
		loading: false
	},
	mounted: function() {},
	methods: {
		logIn: function() {
			if (this.username === '') {
				layer.msg('用户名不能为空');
			} else if (this.pasword === '') {
				layer.msg('密码不能为空');
			} else {

				var _this = this;
				_this.loading = true;
				$.ajax({
					url: apiurl + 'login',
					type: 'put',
					dataType: 'json',
					data: {
						username: _this.username,
						password: _this.pasword
					},
					success: function(data) {
						_this.loading = false;
						if (data.success) {

							switch (Number(data.data.system_role_id)) {
								case 1:
									sessionStorage.setItem("isadmin", '1');
									break;
								case 2:
									sessionStorage.setItem("isadmin", '2');
									break;
								default:
									sessionStorage.setItem("isadmin", '1');
									break;
							}
							location.href = "engineeringManagement.html";
						} else {
							layer.msg(data.error_message);
						}
					},
					error: function(data) {
						_this.loading = false;
						layer.msg(data.error_message);
					}
				});
			}
		},
		forgetpas: function() {
			layer.open({
				title: ['提示', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
				type: 1,
				skin: 'layui-primary', //加上边框
				area: ['540px', '225px'], //宽高
				content: $("#forget-pas"), //捕获的元素,
				shift: 2,
				move: false,
			});
		}

	}
});
