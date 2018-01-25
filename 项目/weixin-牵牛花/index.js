$('#instrumentType').change(function() {
  getInstrumentNumber(sessionStorage.getItem('zzid'), $(this).val());
});

// 调查仪类型查询
function getInstrumentType(id) {
  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'InstrumentType',
      station_admin_id: id
    },
    success: function(data) {
      console.log('调查仪类型：' + data);
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2))
      if (result.success) {
        var arr = result.data;
        var op = '';
        $('#instrumentType').html('');
        for (var i = 0; i < arr.length; i++) {
          op += '<option class="instrumentType" value="' + arr[i].sn_type_id + '">' + arr[i].type_name + '</option>'
        }
        $('#instrumentType').append(op);
     

      } else {
        console.log(result.data.msg)
      }
    },
    error: function() {}
  });
}
// 调查仪编号查询
function getInstrumentNumber(zzid, id, value) {
  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'InstrumentNumber',
      station_admin_id: zzid,
      type_id: id
    },
    success: function(data) {
      console.log('调查仪编号：' + data)
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2))
      if (result.success) {
        var dic = result.data;
        $('#instrumentNumber').html('');
        var op = '';
        for (var key in dic) {
          op += '<option class="instrumentNum" value="' + dic[key].sn_bh + '">' + dic[key].sn_bh + '</option>'
        }
        $('#instrumentNumber').append(op);
      } else {
        $('#instrumentNumber').html('');
        alert(result.data.msg)
      }
    },
    error: function() {}
  });
}

// 站长信息查询
function zzMessage(id) {
  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'zzmessage',
      station_admin_id: id
    },
    success: function(data) {
      console.log('站长信息查询：' + data);
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2))
      if (result.success) {
        var arr = result.data.info[0];
        var address = '';
        if (arr.province !== null) {
          address += (arr.province + ' ');
        }
        if (arr.city !== null) {
          address += (arr.city + ' ');
        }
        if (arr.country !== null) {
          address += arr.country;
        }
        $('#z-address').val(address);
        $('#z-number').val(arr.station_bh);
        $('#z-name').val(arr.station_name);


      } else {
        console.log(result.data.msg)
      }
    },
    error: function() {}
  });
}

// 样本户编号获取
function sampleNum(id) {
  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'sampleNum',
      station_admin_id: id
    },
    success: function(data) {
      console.log('样本户编号获取：' + data);
      var result = JSON.parse(data);
      if (result.success) {
        $('#sample-num').val(result.data.sample_number);
      } else {
      }
    },
    error: function() {}
  });
}
// 上传用户信息
function uploadSampleMessage() {
  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'upsample',
      station_admin_id: sessionStorage.getItem('zzid'),
      dcy_bh: $('#instrumentNumber').val(), //调查仪编号
      dcy_lx: $('#instrumentType').val(), //调查仪类型
      sample_number: $('#sample-num').val(), //样本户编号
      name: $('#user-name').val(),
      job: $('#user-job').val(),
      age: $('#user-age').val(),
      income: $('#user-money').val(), //收入
      gender: $('#user-sex').val() //性别

    },
    success: function(data) {
      console.log(data);
      var result = JSON.parse(data);
      switch (result.status) {
        case 1:
          alert('新增成功');
          break;
        case 2:
          alert('更新成功');
          break;
        default:
          if (result.status > 200) {
            alert('更新失败');
          } else {
            alert('新增失败');
          }
          break;
      }

    },
    error: function() {}
  });
}

//查询样本户信息
function searchSampleMessage() {

  $.ajax({
    url: "Interface.php",
    type: "post",
    data: {
      type: 'searchsample',
      station_admin_id: sessionStorage.getItem('zzid'),
      dcy_bh: $('#search-number').val() //调查仪编号
    },
    success: function(data) {
      console.log(data);
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 2))
      if (result.success) {
        var datas = result.data;

        var address = '';
        if (datas.station_province !== null) {
          address += (datas.station_province + ' ');
        }
        if (datas.station_city !== null) {
          address += (datas.station_city + ' ');
        }
        if (datas.station_country !== null) {
          address += datas.station_country;
        }

        $('#z-address').val(address);
        $('#z-number').val(datas.gzz_bh);
        $('#z-name').val(datas.gzz_name);
        $('#instrumentType').val(datas.dcy_type);
        $('#sample-num').val(datas.ybh_bh);
        $('#user-name').val(datas.name);
        $('#user-job').val(datas.job);
        $('#user-age').val(datas.age);
        $('#user-money').val(datas.income);
        $('#instrumentNumber').val(datas.dcy_name)
        if (datas.gender == 1) {
          $('#user-sex').val(datas.gender);
        } else {
          $('#user-sex').val('2');
        }



      } else {
        alert(result.data.msg);
      }
    },
    error: function() {}
  });
}



// 添加提交
$('#btn-sure-adduser').on('click', function() {

  if ($('#instrumentType').val() === '') {
    alert('调查仪类型不能为空')
  } else {
    if ($('#instrumentNumber').val() === '') {
      alert('调查仪编号不能为空')
    } else {
      var flag = true;
      var zz_flag = true;

      $('input[name="zzxinxi"]').each(function(index, ele) {
        if ($(ele).val() === '') {
          zz_flag = false;
          return false;
        }
      });
      $('input[name="user"]').each(function(index, ele) {
        if ($(ele).val() === '') {
          flag = false;
          return false;
        }
      });

      if (flag && zz_flag) {
        var ages = Number($('#user-age').val());
        var money = Number($('#user-money').val());
        if (ages === 0 || ages > 150) {
          alert('年龄范围为 1~150');
        } else {
          if (money > 100000000) {
            alert('收入范围为0~100000000');
          } else {
            uploadSampleMessage();
          }
        }
      } else {
        alert('信息未填写完整')
      }
    }
  }


});

// 搜索提交
$('#btn-search').on('click', function() {
  var num = $('#search-number').val();
  if (num !== '') {
    searchSampleMessage();
  }
});


// 取消
$('#btn-cancle-adduser').on('click', function() {
  window.location.href="userManagement.html";
});