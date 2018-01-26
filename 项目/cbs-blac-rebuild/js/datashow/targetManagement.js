$('#foot').load('public.html');
$(function() {
	publicHeadfun();
	loadTargetData('day');
})

$('#tab ul li a').on('click', function() {
	loadTargetData($(this).data('type'));
})


function loadTargetData(type) {
	$.ajax({
		url: apiurl + "r=api/energy/target/list",
		type: 'post',
		dataType: 'json',
		data: {
			data: JSON.stringify({
				type: type
			})
		},
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				console.log('查看返回的数据:'+JSON.stringify(data,null,2))
				switch (type) {
					case 'day':
						$('#day_t .all_consumption').val(data.data[0].value);
						$('#day_t .one_consumption').val(data.data[1].value)
						$('#day_t .two_consumption').val(data.data[2].value)
						$('#day_t .three_consumption').val(data.data[3].value)
						$('#day_t .four_consumption').val(data.data[4].value);

						$('#day_t .all_consumption').data('id',data.data[0].id);
						$('#day_t .one_consumption').data('id',data.data[1].id);
						$('#day_t .two_consumption').data('id',data.data[2].id);
						$('#day_t .three_consumption').data('id',data.data[3].id);
						$('#day_t .four_consumption').data('id',data.data[4].id);

						$('#day_t .all_consumption').data('groupid',data.data[0].energy_group_id);
						$('#day_t .one_consumption').data('groupid',data.data[1].energy_group_id);
						$('#day_t .two_consumption').data('groupid',data.data[2].energy_group_id);
						$('#day_t .three_consumption').data('groupid',data.data[3].energy_group_id);
						$('#day_t .four_consumption').data('groupid',data.data[4].energy_group_id);
						break;
					case 'month':
						$('#mont_t .all_consumption').val(data.data[0].value);
						$('#mont_t .one_consumption').val(data.data[1].value)
						$('#mont_t .two_consumption').val(data.data[2].value)
						$('#mont_t .three_consumption').val(data.data[3].value)
						$('#mont_t .four_consumption').val(data.data[4].value);

						$('#mont_t .all_consumption').data('id',data.data[0].id);
						$('#mont_t .one_consumption').data('id',data.data[1].id);
						$('#mont_t .two_consumption').data('id',data.data[2].id);
						$('#mont_t .three_consumption').data('id',data.data[3].id);
						$('#mont_t .four_consumption').data('id',data.data[4].id);

						$('#mont_t .all_consumption').data('groupid',data.data[0].energy_group_id);
						$('#mont_t .one_consumption').data('groupid',data.data[1].energy_group_id);
						$('#mont_t .two_consumption').data('groupid',data.data[2].energy_group_id);
						$('#mont_t .three_consumption').data('groupid',data.data[3].energy_group_id);
						$('#mont_t .four_consumption').data('groupid',data.data[4].energy_group_id);
						break;
				}
			} else {
				layer.msg(data.error_message);
				returnLogIn(data.error_message);			
			}
		},
		error: function(data) {
			$(".loading").hide();
			layer.msg(data.error_message)
			console.log('失败原因:'+JSON.stringify(data.error_message))
		}
	});
}


// 日目标值保存
$('#day_t .btn_sure_consumption').on('click',function(){
	var dataurl = apiurl + "r=api/energy/target/update";
	var data = [];
	var arr = [];
	var istrue = true;
	 $('#day_t').find('input').each(function(index,element){
	 	if (Number($(element).val()) < 0 || Number($(element).val()) > 9999999) {
	 		istrue = false;
	 		return false;
	 	}
	 });
	if (istrue) {
		$('#day_t').find('input').each(function(index, element) {
			var dic = {
				id: $(element).data('id'),
				groupid: $(element).data('groupid'),
				val: $(element).val()
			};
			arr.push(dic);
		})

		for (var i = 0; i < 5; i++) {
			var data_s = {
				id: arr[i].id,
				energy_group_id: arr[i].groupid,
				type: 'day',
				value: arr[i].val
			};
			data.push(data_s);
		}
		// console.log('查看上传的数据:' + JSON.stringify(data, null, 2));
		var dataup = {
			data: JSON.stringify(data)
		}

		$.ajax({
			url: dataurl,
			type: 'post',
			dataType: 'json',
			data: dataup,
			beforeSend: function() {
				$(".loading").show();
			},
			complete: function() {
				$(".loading").hide();
			},
			success: function(data) {
				$(".loading").hide();
				if (data.success) {
					layer.msg('日目标值设定成功');
				} else {
					layer.msg('失败原因:' + data.error_message);
					// console.log('失败原因:' + data.error_message)
				}

			},
			error: function(data) {
				$(".loading").hide();
				layer.msg('失败原因:' + data.error_message);
				// console.log('失败原因:' + data.error_message)
			}
		})
	}else{
		layer.msg('请检查输入数据是否准确')
	}
	
})

// 月目标值保存
$('#mont_t .btn_sure_consumption').on('click',function(){
	var dataurl = apiurl + "r=api/energy/target/update";
	var data = [];
	var arr = [];
	var istrue = true;
	$('#mont_t').find('input').each(function(index,element){
	 	if (Number($(element).val()) < 0 || Number($(element).val()) > 9999999) {
	 		istrue = false;
	 		return false;
	 	}
	});

	if(istrue){
		$('#mont_t').find('input').each(function(index,element){
	 	var dic = {
	 		id:$(element).data('id'),
	 		groupid:$(element).data('groupid'),
	 		val:$(element).val()
	 	};
	 	arr.push(dic);
	 })


	for (var i = 0; i < 5 ; i++) {
		var data_s = 
		{
			id:arr[i].id,
			energy_group_id:arr[i].groupid,
			type:'month',
			value:arr[i].val
		};
		data.push(data_s);
	}
		// console.log('查看上传的数据:'+JSON.stringify(data,null,2));
	var dataup = {
		data:JSON.stringify(data)
	}

	$.ajax({
		url: dataurl,
		type: 'post',
		dataType: 'json',
		data: dataup,
		beforeSend: function() {
			$(".loading").show();
		},
		complete: function() {
			$(".loading").hide();
		},
		success: function(data) {
			$(".loading").hide();
			if (data.success) {
				layer.msg('月目标值设定成功');
			}else{
				layer.msg('失败原因:'+data.error_message);
				// console.log('失败原因:'+data.error_message)
			}

		},
		error:function(data){
			$(".loading").hide();
			layer.msg('失败原因:'+data.error_message);
			// console.log('失败原因:'+data.error_message)
		}
	})
	}else{
		layer.msg('请检查输入数据是否准确')
	} 
	
})