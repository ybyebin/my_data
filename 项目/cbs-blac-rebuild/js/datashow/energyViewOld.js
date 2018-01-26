/*
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-04 16:27:55
 * @version $Id$
 */

$('#foot').load('public.html');
var enetgy_url = "/index.php?r="
var enetgy_urls = "/index.php"



$(document).ready(function() {
  rightTree("tree");
  // leftList(1);
  window.onresize = function() {
    initScrollerA("tree"); //此时重新加载滚动条
    initScrollerA("leftNames");
  }
  initScrollerA("tree"); //如果在点击【查询】时调用了，这里就不用再调用了
  initScrollerA("leftNames");
  //树动态绑定事件
  // $("#tree input.skin-square-green").on('ifUnchecked ifChecked', function() {
  //   checkTree('tree');

  // });
});



// $(function() {
//   publicHeadfun();
//   bindListener();
//   days();

//   var checkin = $('#selectTime').datepicker({
//     format: 'yyyy-mm-dd'
//   }).on('changeDate', function(ev) {
//     if (ev.date.valueOf() > checkout.date.valueOf()) {
//       var newDate = new Date(ev.date)
//       newDate.setDate(newDate.getDate() + 1);
//       checkout.setValue(newDate);
//     }
//     checkin.hide();
//     $('#endTime')[0].focus();

//     $("#compare .addTime").html("");
//     $("#compare1 .addTime").html("");

//   }).data('datepicker');

//   var checkout = $('#endTime').datepicker({
//     format: 'yyyy-mm-dd'

//   }).on('changeDate', function(ev) {
//     var isYes = checkEndTime("selectTime", "endTime", 1);
//     if (!isYes) {
//       $("#endTime").val("");
//       layer.msg("结束时间需晚于开始时间");
//     }
//     if (compareYear(checkin.date, 10) <= ev.date.toLocaleDateString()) {

//       layer.msg("超过统计时间限制");
//       $("#endTime").val("");
//     }
//     var start = $("#selectTime").val();
//     var end = $("#endTime").val();
//     if (start != "" && end != "") {
//       $(".getshi a").removeClass("active").addClass("hide");
//       var cha = checkEndTime(start, end, 2);
//       cha += 1;
//       if (cha == 1 || cha == 0) {

//         $(".getshi a:eq(0)").removeClass('hide').addClass('active');
//       } else if (cha > 1 && cha <= 7) {
//         $(".getshi a:eq(0)").removeClass('hide').addClass('active');
//         $(".getshi a:eq(1)").removeClass('hide');
//       } else if (cha > 7 && cha <= 30) {
//         $(".getshi a:eq(1)").removeClass('hide').addClass('active');
//       } else if (cha > 30 && cha <= 180) {
//         $(".getshi a:eq(1)").removeClass('hide').addClass('active');
//         $(".getshi a:eq(2)").removeClass('hide');
//       } else if (cha > 180 && cha <= 365) {
//         $(".getshi a:eq(2)").removeClass('hide').addClass('active');
//       } else {
//         $(".getshi a:eq(2)").removeClass('hide').addClass('active');
//         $(".getshi a:eq(3)").removeClass('hide');
//       }
//     }
//     checkout.hide();

//     SelectData(1);
//     $("#compare .addTime").html("");
//     $("#compare1 .addTime").html("");
//   }).data('datepicker');


//   $(".addTime").delegate('change click', 'input', function(e) {
//     checkTime();
//   });

//   //初始化时间框
//   initTime();



//   //时间选择改变
//   $("#slectFen ul li a").click(function() {
//     var iszdy = false;
//     var txt = $(this).text();
//     var value = $(this).attr("rel");
//     $(".getshi a").removeClass("active").addClass("hide");
//     if (value == 1 || value == 2) {
//       $("#selectTime").val($(this).attr('value'));
//       $("#endTime").val($(this).attr('value'));
//       $(".getshi a:eq(0)").removeClass('hide').addClass('active');

//     } else if (value == 3 || value == 4 || value == 5) {
//       if (value == 3 || value == 4) {
//         $(".getshi a:eq(0)").removeClass('hide').addClass('active');
//         $(".getshi a:eq(1)").removeClass('hide');
//       } else if (value == 5) {
//         $(".getshi a:eq(1)").removeClass('hide').addClass('active');
//       }

//       $("#selectTime").val($(this).attr('value'));
//       $("#endTime").val(compareDate(1, 0));

//     } else if (value == 6 || value == 7 || value == 8) {
//       $("#selectTime").val($(this).attr('value'));
//       if (value == 6) {
//         counts = 1;
//       } else if (value == 7) {
//         counts = 2;
//       } else if (value == 8) {
//         counts = 3;
//       }

//       $(".getshi a:eq(1)").removeClass('hide').addClass('active');
//       $(".getshi a:eq(2)").removeClass('hide');
//       $("#endTime").val(getCurrentMonthLastForSelect($(this).attr('value')));
//     } else if (value == 9) {

//       // $("#selectTime").val("");
//       // $("#endTime").val("");

//       // $('#selectTime')[0].focus();
//       // iszdy = true;
//       $(".getshi a:eq(1)").removeClass('hide').addClass('active');
//     }
//     $("#compare .addTime").html("");
//     $("#compare1 .addTime").html("");
//     $("#slectFen button .txt").html(txt).attr('rel', value);
//     // if (!iszdy) {
//     SelectData(1);
//     // }

//   });

//   /*操作按钮*/
//   $("#fen_select ul li a,#bao_select ul li a").click(function() {
//     var par = $(this).parents(".selcts");
//     var txt = $(this).text();
//     $(par).find("button .txt").html(txt);
//     var value = $(this).attr("rel");
//   });

//   $(".addTime").delegate("change", "input", function() {
//     checkTime();
//   });



//   //能耗报表类型选择
//   $("#selectBao li a").click(function() {
//     var txt = $(this).text();
//     var value = $(this).attr("rel");
//     $("#selectInput input").hide();
//     if (value == 1) {
//       $("#bao_day").show();
//       var newdata = new Date().format("yyyy-MM-dd");
//       $("#bao_day").val(newdata);

//     } else if (value == 2) {
//       $("#bao_month").show();
//       var newdata = new Date().format("yyyy-MM");
//       $("#bao_month").val(newdata);

//     } else {
//       $("#bao_year").show();
//       var newdata = new Date().format("yyyy");
//       $("#bao_year").val(newdata);
//     }



//     $("#selectBao button .txt").html(txt).attr('rel', value);
//     BaoTableList();

//   })


//   //树离开点击其他地方隐藏树
//   $(document).bind("click", function(e) {
//     var target = $(e.target);
//     if (target.closest(".tongji").length == 0) {
//       if (!$("#tongji").is(":hidden")) {
//         SelectData(1);
//       }
//       if (!$("#tongjis").is(":hidden")) {
//         SelectData(2);
//       }
//       $(".tongji").hide();

//     }
//   });


//   $(document).keyup(function(event) {
//     switch (event.keyCode) {
//       case 27:
//         $("#tab_border header").hide();
//       case 96:
//         $("#tab_border header").hide();
//     }
//   });

// })



// 点击选中
function SelectActive(obj, type) {
  if (type == 1) //导航条
  {
    $(".navbar-nav li").removeClass("active");
    $(obj).addClass("active");
  } else if (type == 2) //页面左边列表
  {
    $("#leftNames aside li").removeClass("active");
    $(obj).addClass("active");
    check_tree(1, $(obj).attr("ids"));
  } else { //页面左边列表
    $("#bao_leftNames aside li").removeClass("active");
    $(obj).addClass("active");
    check_tree(2, $(obj).attr("ids"));
  }

}





//自定义选择时间
function showValue(type) {
  $(".addTime").css("visibility", "visible");
  var start = $("#selectTime").val();
  var end = $("#endTime").val();
  if (start != "" && end != "") {

    $("#selectType .txt").html("自定义").attr("rel", 9);
  } else {
    // $("#selectType .txt").html("最近7天").attr("rel", 4);
  }

}
//选择统计对象
function showObj(type) {
  if (type == 1) {
    if ($("#tongji").is(":hidden")) {
      $("#tongji").slideDown();
    } else {
      $("#tongji").slideUp();
    }
  } else {
    if ($("#tongjis").is(":hidden")) {
      $("#tongjis").slideDown();
    } else {
      $("#tongjis").slideUp();
    }
  }

}



//全屏显示table
function All() {
  if ($("#tab_border").is(':hidden')) {
    layer.msg('报表为空');
  } else {
    var docelem = document.getElementById('tab_border');
    $("#tab_border header").show();
    if (docelem.requestFullscreen) {
      docelem.requestFullscreen();
    } else if (docelem.webkitRequestFullscreen) {
      docelem.webkitRequestFullscreen();
    } else if (docelem.mozRequestFullScreen) {
      docelem.mozRequestFullScreen();
    } else if (docelem.msRequestFullscreen) {
      docelem.msRequestFullscreen();
    }
    docelem.style.height = "100%";
    docelem.style.width = "100%";
  }

}

// 退出全屏时 隐藏 表格头部
document.addEventListener("fullscreenchange", function(e) {
  console.log("fullscreenchange", e);
});
// document.addEventListener("mozfullscreenchange", function(e) {
//   console.log("mozfullscreenchange ", e);
// });
// document.addEventListener("webkitfullscreenchange", function(e) {

//   console.log("webkitfullscreenchange", JSON.stringify(e,null,2));
// });
// document.addEventListener("msfullscreenchange", function(e) {
//   console.log("msfullscreenchange", e);
// });

document.addEventListener("webkitfullscreenchange", function(e) {
  console.log("fullscreenchange", e);
  console.log(document.webkitIsFullScreen)
  var aa = (document.webkitIsFullScreen) ? false : true;
  if (aa) {
    $("#tab_border header").hide();
  }
});

//退出全屏
function exitFullscreen() {
  var de = document;
  if (de.exitFullscreen) {
    de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen();
  }
  $("#tab_border header").hide();
}　



//删除div
function del(type) {

  var ids = type == 1 ? $("#leftNames li.active").attr("ids") : $("#bao_leftNames li.active").attr("ids");
  if (ids === undefined) {
    if (type === 1) {
      layer.msg('未选择任何自定义图表');
    } else {
      layer.msg('未选择任何自定义报表');
    }

  } else {
    layer.confirm('<h4 style="color:#fff">您确认要删除该项目？</h4><p><small style="color:#fff">删除后不可恢复</small></p>', {
      btn: ['取消', '删除'], //按钮
      area: ['1000px'], //宽高
      shade: 0,
      title: false,
      move: false,
      shift: 2,
      skin: 'layui-primary',
      closeBtn: 0
    }, function(index) {
      layer.close(index);
    }, function(index) {
      if (type == 1) //能耗分析删除
      {
        Del(type);
        layer.close(index);
      } else if (type == 2) //能耗报表删除
      {
        Del(type);
        layer.close(index);

      }
    });
  }


}


/**
 * [ 另存为 ]
 * @param  {[type]} type   [description]
 * @param  {[type]} name   [description]
 * @param  {[type]} string ["另存为""]
 * @return {[type]}        [description]
 */
function otherSave(type, name, string) {
  var title, status = false;
  $("#" + name + "").val("");
  if (type == 1) {
    title = $("#fen_select button .txt").html();

  } else {

    title = $("#bao_select button .txt").html();
  }

  layer.open({
    title: ['' + string + '', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
    type: 1,
    skin: 'layui-primary', //加上边框
    area: ['1000px', '240px'], //宽高
    content: $("#otherSave"), //捕获的元素,
    shift: 2,
    move: false,
    btn: ['确定', '取消'],
    yes: function(index, layero) {
      var _r;

      if (RegeMatch($("#fieldName"))) {
        if (!status) {
          if (type == 1) //能耗分析
          {
            if (fileName_s("fieldName", 1)) {
              _r = "EnergyGraphConfig"; //创建
              var flag = getdata();
              if (flag === 2) {
                layer.msg('不允许重复时间段');
              } else if (flag === 1) {
                layer.msg('不允许保存重复的tag')
              } else {
                $.ajax({
                  type: "post",
                  url: apiurl + _r + '',
                  dataType: 'json',
                  data: getdata(),
                  success: function(result) {
                    if (result.success) {
                      $("#leftNames aside").remove("aside");
                      leftList(1);
                      $("#leftNames aside li").removeClass("active");
                      $('#leftNames aside li[ids="' + result.data.id + '"]').css('border-right', '2px solid red');

                      layer.close(index);
                      layer.msg("保存成功");

                    } else {
                      layer.alert(result.error_message, {
                        title: ['错误信息'],
                        skin: 'lay-alert',
                        move: false
                      });

                    }
                  }
                });
              }

            }

          } else if (type == 2) //能耗报表
          {
            if (fileName_s("fieldName", 2)) {


              _r = 'EnergyReportConfig'; //创建
              $.ajax({
                type: "post",
                url: apiurl + _r,
                dataType: 'json',
                data: reportData(),
                success: function(result) {
                  if (result.success) {
                    $("#bao_leftNames aside").remove("aside");
                    leftList(2);
                    $("#bao_leftNames aside li").removeClass("active");
                    $('#bao_leftNames aside li[ids="' + result.data.id + '"]').css('border-right', '2px solid red');
                    layer.close(index);
                    layer.msg("保存成功");

                  } else {
                    layer.alert(result.error_message, {
                      title: ['错误信息'],
                      skin: 'lay-alert',
                      move: false
                    });

                  }
                }
              });
            }
          }
        }
      } else {
        layer.msg('指定的组名称格式错误')
      }


      // status=true;
    },
    btn2: function(index, layero) {


    }
  });
}


//对比历史数据
function compares() {

  if ($("#selectTime").val() != "" && $("#endTime").val() != "") {
    //判断时间
    var isYes = checkEndTime("selectTime", "endTime", 1);
    if (!isYes) {
      layer.msg("结束时间需晚于开始时间");
      $("#endTime").val("");
      return;

    }
   
    var ids = judgeCompare();
    $(".addTime div").show();
    // $(".addTime").css("background","red")
    var index = layer.open({
      title: ['对比历史数据', 'font-size:18px;color:#fff;background:#3E4687;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;'],
      type: 1,
      skin: 'layui-compare', //加上边框
      area: ['935px', 'auto'], //宽高
      content: $('#' + ids + ''),
      shift: 2,
      btn: ['确定', '取消'],
      yes: function(index, layero) {

        switch (ids) {
          case "compare":
            var absolute_history_time_isNull = false;
            $("#compare div.historyInputCom").each(function(index, element) {
              var arr = $(element).find("input");
              if (arr) {
                if ($(arr[0]).val() == "" || $(arr[1]).val() == "") {
                  absolute_history_time_isNull = true;
                  return false;
                }

              }

            });

            if (absolute_history_time_isNull) {
              layer.msg("对比历史时间段不能为空")
            } else {
              loadHighcharData("screening", "screening", "screening", ids); //这里 只用到了comids
              layer.close(index);
            }
            break;
          case "compare1":
            loadHighcharData("screening", "screening", "screening", ids); //这里 只用到了comids
            layer.close(index);
            break;
        }


      },
      btn2: function(index, layero) {

        layer.close(index);
      }
    });


   
  } else {
    layer.msg("时间不能为空");
  }

}
/**
 * [判断日期: 相对/绝对]
 * @return {[string]} [compare1/compare]
 */
function judgeCompare() {
  var ids;
  var types = $("#selectType .txt").attr('rel');
  if (types == 9) {
    ids = "compare";
    $("#zi_start").html($("#selectTime").val());
    $("#zi_end").html($("#endTime").val());
  } else {
    ids = "compare1";
    $("#time_txt").html($("#slectFen .txt").html());
    $("#time_start").html($("#selectTime").val());
    $("#time_end").html($("#endTime").val());
  }
  return ids;
}

function dickey(dic) {
  for (var key in dic) {
    return key;
  }
}

function loadHighcharData(screening, id, tag_taggroup, com) {

  var statistic_type = $(".getshi a.active").attr("id");
  var charname = $(".getpic a.active").attr("id");
  var chardatetype = statistic_type;
  var graph_type = "1";
  if (charname == 'pie') {
    graph_type = "2";
  }
  // tagType  string  数据标签类型（1： tag，2： tagGroup）

  var tagId = null;
  var tagType = null;
  var history = [];
  var lent = 0;
  var onedic = {}; //检查是否存在重复
  switch (screening) {
    case "screening":
      $.each($("#tree input[class*='skin-square-green']:checked"), function(index, item) {
        tagId = $(this).attr("ids");
        if ($(this).attr("id").split("-").length == 3) {
          tagType = 2;
        } else {
          tagType = 1;
        }

      });
      break;
    case "select":
      tagId = id;
      tagType = tag_taggroup;
      break;
  }

  if (tagId != null) {

    switch (com) {
      case "compare":
        var firstTime = {
          start_time: $("#selectTime").val(),
          end_time: $("#endTime").val() + ' 23:59:59'
        }
        history.push(firstTime);

        $("#compare div.historyInputCom").each(function(index, element) {

          var arr = $(element).find("input");
          if (arr) {

            if ($(arr[0]).val() != "" && $(arr[1]).val() != "") {
              var dic = {
                start_time: $(arr[0]).val(),
                end_time: $(arr[1]).val() + ' 23:59:59'
              }
              history.push(dic);
              lent += 1;
              // alert($(arr[0]).val())
              onedic[$(arr[0]).val()] = $(arr[1]).val();
            }

          }

        });
        break;
      case "compare1":
        var firstTime = {
          start_time: $("#selectTime").val(),
          "end_time": $("#endTime").val() + ' 23:59:59'
        }
        history.push(firstTime);
        $("#compare1 div.historyInputCom1").each(function(index, element) {

          var arr = $(element).find("span.historyCom1Span");
          if (arr) {
            var dic = {
              start_time: $(arr[0]).text(),
              end_time: $(arr[1]).text() + ' 23:59:59'
            }
            history.push(dic);
            lent += 1;
            onedic[$(arr[0]).text()] = $(arr[0]).text();
          }

        });
        break;
    }

    var jsonlength = 0;
    for (var jskey in onedic) {
      jsonlength += 1;
    }
    if (jsonlength === lent) {
      var datas = {
        graph_type: graph_type,
        statistics_type: statistic_type,
        history: history,
        id_type: tagType,
        id: tagId
      }
      console.log('获取图标数据查看上传的数据:' + JSON.stringify(datas, null, 2));
      var _r = "HistoryDataTimesContrast";
      var colors = ["#A4CD52", "#E7706F", "#9B77B3", "#4CB3E3", "#9B77B3", "#477B36", "#EABE43", "#135083", "#8B6527", "#B3CE59", "#E8767B", "#9980AF", "#5CB1E1", "#A977AB", "#427A46", "#D7AA5E", "#3B507B", "#3B507B", "#996725", "#C0D060", "#EA7D86", "#9789AA", "#67AEDE", "#B576A2", "#3C7856", "#C2956F", "#594F73", "#A66922", "#CDD065", "#EC8392", "#9491A3", "#71ABDB", "#C07698", "#347667", "#AF817C", "#714F6A", "#B46B1F", "#D9D06D", "#ED8A9F", "#91989A", "#7AA7D7", "#CA758E", "#2D7477", "#9C6D84", "#864E61", "#C06C1C", "#E4CF73", "#EE91AB", "#8D9E90", "#83A4D4", "#D57484", "#237286", "#895989", "#9A4C59", "#CC6E19", "#EECE79", "#F098B7", "#89A584", "#8BA0D1", "#DE717A", "#1D7095", "#75468E", "#AC494F", "#D86F14", "#F7CC7F", "#FFA2CB", "#85AB77", "#919BCD", "#E7706F", "#E7706F", "#1A6DA3", "#62328F", "#62328F", "#BC4746", "#E47113"];
      $.ajax({
        type: "put",
        url: apiurl + _r,
        dataType: 'json',
        data: datas,
        beforeSend: function() {
          $(".loading").show();
        },
        success: function(result) {
          $(".loading").hide();
          isHistoryData = true;
          if (charname == 'pie') {
            if (result.success) {
              var seriesdata = "[";

              if (result.success) {
                var j = 0;
                for (var keypie in result.data) {
                  var values = result.data[keypie];
                  if (Number(values) < 0) {
                    values = 0;
                  }
                  seriesdata += '{name:"' + keypie + '",y:' + values + ',color:"' + colors[j] + '"},';
                  j++;
                }

                seriesdata = seriesdata.substring(0, seriesdata.length - 1);
                seriesdata += "]";

              }
            } else {
              seriesdata = "[无能耗数据]";
            }
          } else {
            if (result.success) {
              var mainKey = dickey(result.data);
              var returndata = "[";
              var areadata = "[";
              var i = 0;
              for (var key in result.data) {
                returndata += "{name:'" + result.data[key].name + "',marker:{enabled:true,radius:3},color:'" + colors[i] + "',data:[";
                areadata += "{name:'" + result.data[key].name + "',color:'" + colors[i] + "',data:[";
                var datename = "";

                if (!isEmptyObject(result.data[key].values)) {
                  var data_key_values = result.data[key].values;
                  for (var keys in data_key_values) {
                    switch (chardatetype) {
                      case "hour":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/" + keys.substring(6, 8) + " " + keys.substring(8, 10) + ":00:00";
                        break;
                      case "day":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/" + keys.substring(6, 8) + " 00:00:00";
                        break;
                      case "month":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/01 00:00:00";
                        break;
                      case "year":
                        datename = keys.substring(0, 4) + "/01/01 00:00:00";
                        break;
                    }


                    var datestr = (new Date(datename));
                    datestr = datestr.getTime() + 60 * 60 * 8 * 1000;
                    returndata += "[" + datestr + "," + data_key_values[keys] + "],";
                    areadata += "[" + datestr + "," + data_key_values[keys] + "],";

                  }
                } else {
                  returndata += "]";
                  areadata += "]";
                }
                // console.log(result.data[key]);
                returndata = returndata.substring(0, returndata.length - 1) + "]},";
                areadata = areadata.substring(0, areadata.length - 1) + "]},";
                i++;
              }
              returndata = returndata.substring(0, returndata.length - 1) + "]";
              areadata = areadata.substring(0, areadata.length - 1) + "]";
              var mainKey = dickey(result.data);
              var textReturndata = eval('(' + returndata + ')');
              var textAreadata = eval('(' + areadata + ')');
              // 
              // textReturndata 数据转换
              for (var dic in textReturndata) {
                if (textReturndata[dic].name == mainKey) {
                  for (var dics in textReturndata) { //
                    for (var dicss in textReturndata[dics].data) {

                      if (textReturndata[dic].data[dicss]) {
                        textReturndata[dics].data[dicss][0] = textReturndata[dic].data[dicss][0];
                      }

                    }
                  }
                }
              }
              // textAreadata 数据转换
              for (var dic in textAreadata) {
                if (textAreadata[dic].name == mainKey) {
                  for (var dics in textAreadata) { //
                    for (var dicss in textAreadata[dics].data) {

                      if (textAreadata[dic].data[dicss]) {
                        textAreadata[dics].data[dicss][0] = textAreadata[dic].data[dicss][0];
                      }

                    }
                  }
                }
              }



            } else {
              returndata = "[无能耗数据]";
              areadata = "[无能耗数据]";
            }
          }
          console.log('returndata:' + JSON.stringify(returndata, null, 2));
          console.log('seriesdata:' + seriesdata);
          console.log('seriesdata:' + JSON.stringify(seriesdata, null, 2))
          if (charname == 'column' || charname == 'spline') {
            $('#lineCharts').highcharts('StockChart', {
              chart: {
                backgroundColor: '#1C203F',
                alignTicks: true,
                type: '' + charname + ''
              },
              tooltip: {
                type: 'datetime',
                dateTimeLabelFormats: {
                  second: '%Y-%m-%d<br/>%H:%M:%S',
                  minute: '%Y-%m-%d<br/>%H:%M',
                  hour: '%Y-%m-%d %H:00',
                  day: '%Y-%m-%d',
                  week: '%Y-%m-%d',
                  month: '%Y-%m',
                  year: '%Y-'
                },
                shared: true
              },
              rangeSelector: {
                allButtonsEnabled: true,
                enabled: false,
                buttonTheme: {
                  width: 60
                },
                selected: 2
              },
              navigator: {
                enabled: true,
                xAxis: {
                  labels: {
                    style: {
                      color: '#fff'
                    }
                  },
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H点',
                    day: '%Y年%m月%d日',
                    week: '%e. %b',
                    month: '%Y年%m月',
                    year: '%Y年'
                  }
                }
              },
              title: {
                text: ''
              },
              legend: {
                symbolHeight: 12,
                symbolWidth: 18,
                symbolRadius: 0,
                itemStyle: {
                  color: '#ffffff'
                },
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: true,
                labelFormatter: function() { //图例的内容
                  //return this.name;//默认返回的内容
                  var msg;
                  msg = '<a title="' + this.name + '">';
                  if (this.name.length > 10) {
                    msg += (this.name).substring(0, 5);
                    msg += '...';
                    msg += (this.name).substring(this.name.length - 5, this.name.length);
                  } else {
                    msg += this.name;
                  }
                  msg += '</a>';
                  return msg;
                }
              },
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                lineColor: '#555769',
                type: 'datetime',
                dateTimeLabelFormats: {
                  second: '%Y-%m-%d<br/>%H:%M:%S',
                  minute: '%Y-%m-%d<br/>%H:%M',
                  hour: '%Y-%m-%d %H:00',
                  day: '%Y-%m-%d',
                  week: '%Y-%m-%d',
                  month: '%Y-%m',
                  year: '%Y-'
                }
              },
              yAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                gridLineColor: '#555769',
                opposite: false,
                title: {
                  style: {
                    color: '#ffffff'
                  },
                  text: '耗电量(kWh)'
                }
              },

              series: returndata == "[无能耗数据]" ? null : textReturndata
                // series:textReturndata
            })
          } else if (charname == 'pie') {

            $('#lineCharts').highcharts({
              chart: {
                backgroundColor: '#1C203F',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
              },
              title: {
                text: ''
              },
              tooltip: {
                pointFormat: '{series.name} : <b>{point.percentage:.1f}% ({point.y})</b>'
              },
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#fff',
                      "fontWeight": "bold",
                      "textOutline": "none"
                    }
                  }
                }
              },
              series: [{
                type: 'pie',
                name: '占比',
                data: seriesdata == "[无能耗数据]" ? null : eval('(' + seriesdata + ')')
              }]
            });

          } else if (charname == 'area') {
            $('#lineCharts').highcharts('StockChart', {
              chart: {
                backgroundColor: '#1C203F',
                type: 'column'
              },
              tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                shared: true
              },
              rangeSelector: {
                allButtonsEnabled: true,
                enabled: false,
                buttonTheme: {
                  width: 60
                },
                selected: 2
              },
              navigator: {
                enabled: true,
                xAxis: {
                  labels: {
                    style: {
                      color: '#fff'
                    }
                  },
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H点',
                    day: '%Y年%m月%d日',
                    week: '%e. %b',
                    month: '%Y年%m月',
                    year: '%Y年'
                  }
                }
              },
              title: {
                text: ''
              },
              legend: {
                symbolHeight: 12,
                symbolWidth: 18,
                symbolRadius: 0,
                itemStyle: {
                  color: '#ffffff'
                },
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: true,
                labelFormatter: function() { //图例的内容
                  //return this.name;//默认返回的内容
                  var msg;
                  msg = '<a title="' + this.name + '">';
                  if (this.name.length > 10) {
                    msg += (this.name).substring(0, 5);
                    msg += '...';
                    msg += (this.name).substring(this.name.length - 5, this.name.length);
                  } else {
                    msg += this.name;
                  }
                  msg += '</a>';
                  return msg;
                }
              },
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                lineColor: '#555769',
                type: 'datetime',
                dateTimeLabelFormats: {
                  second: '%Y-%m-%d<br/>%H:%M:%S',
                  minute: '%Y-%m-%d<br/>%H:%M',
                  hour: '%Y-%m-%d %H:00',
                  day: '%Y-%m-%d',
                  week: '%Y-%m-%d',
                  month: '%Y-%m',
                  year: '%Y-'
                }
              },
              yAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                gridLineColor: '#555769',
                opposite: false,
                title: {
                  style: {
                    color: '#ffffff'
                  },
                  text: '耗电量(kWh)'
                }
              },
              plotOptions: {
                column: {
                  stacking: 'normal'
                }
              },
              series: areadata == "[无能耗数据]" ? null : textAreadata
                // series: textAreadata
            })
          }
        },
        complete: function() {
          $(".loading").hide();
        },
        error: function(data) {
          publicAjaxError(data);
        }
      });
    } else {
      layer.msg('时间段不能重复');
    }



  }



}


//动态添加行
var i = 0;
var creatediv = function() {
  var msg = "";
  //获取选择类型
  var types = $("#selectType .txt").attr('rel');
  var adds = types == 9 ? "compare" : "compare1";

  var ids = $("#" + adds + " .addTime").find("div[id^='timeDiv']").length;

  if (ids <= 8) {
    //获取最前面一条div的id
    var ida = $("#" + adds + " .addTime div").attr('id');
    // var ida = $("#" + adds + " .addTime").children()..length;

    if (ida != undefined) {
      i = Number(ida.substring(7)) + 1;
    } else {
      i = 1;
    }

    $("#" + adds + " .addTime").find("#timediv");
    var parentdiv = "";

    if (types == 9) {
      parentdiv = $('<div class = "historyInputCom"><span class="timetext">对比时间段' + "" + '</span><span class="times"><input  type="text" data-format="yyyy-mm-dd" class="form-controls form-control datepicker" id="start' + i + '" onclick="checkTime(1,' + i + ')"  onchange="checkTimeforZidingyiHistory(1,' + i + ')" readonly="readonly"></span><lable class="spare">至</lable><span class="times"><input type="text" data-format="yyyy-mm-dd" class="form-controls form-control datepicker" id="end' + i + '"  onclick="checkTime(2,' + i + ')" onchange="checkTime(2,' + i + ')"  readonly="readonly"></span><span class="img"><img src="images/icon/delete.png"></span></div>'); //创建一个父div
    } else {

      //先获取下来类型
      if (types == 1 || types == 2) {
        msg = "天";
      }
      if (types == 3 || types == 4 || types == 5) {
        msg += "个";
        if (types == 3) {
          msg += "3";
        } else if (types == 4) {
          msg += "7";
        } else if (types == 5) {
          msg += "30";
        }
        msg += "天";
      }
      if (types == 6 || types == 7 || types == 8) {

        msg = "个月";
      }
      parentdiv = $('<div class = "historyInputCom1"><span class="timetext">对比时间段' + "" + '</span><span class="times">之前的第</span><section class="btn-group downselect"><button aria-expanded="false" data-toggle="dropdown" class="btn  btn-border dropdown-toggle" type="button" id="days' + i + '" style="width:95px;margin-left:0px" onclick="selectDrown(' + i + ',' + types + ')"><span class="txt" rel="1">1</span><span class="carets sarrow"></span><span class="sr-only"></span></button><ul role="menu" class="dropdown-menu  dropList dropList' + i + '"><li><a href="#" rel="1" class="selected">1</a></li><li><a href="#" rel="2">2</a></li><li><a href="#" rel="3">3</a></li><li><a href="#" rel="4">4</a></li><li><a href="#" rel="5">5</a></li><li><a href="#" rel="6">6</a></li><li><a href="#" rel="7">7</a></li><li><a href="#" rel="8">8</a></li><li class="9"><a href="#" rel="9">9</a></li></ul></section><lable class="spare" style="padding-left:0px;">' + msg + '</lable><span class="times historyCom1Span" id="tians_' + i + '"></span><span class="spare">至</span><span class="times historyCom1Span" id="tiane_' + i + '"></span><span class="img"><img src="images/icon/delete.png"></span></div>');
    }
    parentdiv.attr('id', 'timeDiv' + i + ''); //给父div设置id
    parentdiv.addClass('parentdiv'); //添加css样式

    if (i == 1) {
      parentdiv.appendTo($("#" + adds + " .addTime"));
    }
    if (i != 1) {
      // 
      $("#" + adds + " .addTime div[id=timeDiv" + (i - 1) + "]").before(parentdiv);

    }

    $("#" + adds + "").parent().height($("#" + adds + "").parent().height() + 47);

  } else {

    layer.msg("不能超过9个时间段");
    i = 0;
  }

  bindListener(adds);
  if (types == 9) {

    ULTRA_SETTINGS.otherScripts();

  } else {

    // initAdd(types, i);
    initAddreletiveAdd(types, i);
  }

  $(".addTime").show();
  $(".addTime div").show;

}


// 用来绑定事件(使用unbind避免重复绑定)
function bindListener(ids) {
  $("div[id^=timeDiv] .img").unbind().click(function() {
    i = i - 2;
    $(this).parent().remove();
    $("#" + ids + "").parent().height($("#" + ids + "").parent().height() - 45);

  })
}



function selectDrown(obj, type) {

  

  $(".downselect .dropList" + obj + " li a").one("click", function() {

    var txt = $(this).text();
    var value = $(this).attr("rel");
   

    initAddreletiveAdd(type, obj, value);

    $(".downselect #days" + obj + " .txt").html(txt).attr('rel', value);

   
    $(".downselect .dropList" + obj + " li a").unbind("click");
  });

}



function initTime() {
  //初始化时间框
  $("#selectTime").val(compareDate(1, 6));
  $("#endTime").val(compareDate(1, 0));
  $("#bao_day").val(getToday());
  $("#bao_month").val(getMonth());
  $("#bao_year").val(getYear());

}

// 修复 相对历史数据对比  添加月份的bug
function initAddreletiveAdd(type, conts, selecti) {
  var n = 1;
  var c = 0;
  if (selecti) {
    n = Number(selecti);
  }
  type = Number(type);
  if (type == 1 || type == 2) {
    if (type == 1) {
      $("#tians_" + conts + "").html(compareDate(1, n));
      $("#tiane_" + conts + "").html(compareDate(1, n));
    } else {
      $("#tians_" + conts + "").html(compareDate(1, n + 1));
      $("#tiane_" + conts + "").html(compareDate(1, n + 1));
    }

  } else if (type == 3 || type == 4 || type == 5) {
    if (type == 3) {
      c = 3;
    } else if (type == 4) {
      c = 7;
    } else if (type == 5) {
      c = 30;
    }
    $("#tians_" + conts + "").html(compareDate(1, c * n + c - 1));
    $("#tiane_" + conts + "").html(compareDate(1, c * n));
  } else if (type == 6 || type == 7 || type == 8) {
    c = 1;
    if (type == 6) {
      console.log('c*n:' + (c * n + 1))
      $("#tians_" + conts + "").html(getCurrentMonthFirst(c * n + 1));
      $("#tiane_" + conts + "").html(getCurrentMonthLastForSelect(compareDate(3, c * n + 1)));
    } else if (type == 7) {

      $("#tians_" + conts + "").html(getCurrentMonthFirst(c * n + 2));
      $("#tiane_" + conts + "").html(getCurrentMonthLastForSelect(compareDate(3, c * n + 2)));
    } else if (type == 8) {
      $("#tians_" + conts + "").html(getCurrentMonthFirst(c * n + 3));
      $("#tiane_" + conts + "").html(getCurrentMonthLastForSelect(compareDate(3, c * n + 3)));
    }

  }

}


//添加时间段时 时间初始化
/*type 下拉框选择的类型 conts 定位到id的值  selecti 添加的时间段里面下拉框选中的值*/
function initAdd(type, conts, selecti) {

  var n = 1;
  var c = 0;
  if (selecti) {
    n = Number(selecti);
  }
  type = Number(type);
  if (type == 1 || type == 2) {
    if (type == 1) {
      $("#tians_" + conts + "").html(compareDate(1, n));
      $("#tiane_" + conts + "").html(compareDate(1, n));
    } else {
      $("#tians_" + conts + "").html(compareDate(1, n + 1));
      $("#tiane_" + conts + "").html(compareDate(1, n + 1));
    }

  } else if (type == 3 || type == 4 || type == 5) {
    if (type == 3) {
      c = 3;
    } else if (type == 4) {
      c = 7;
    } else if (type == 5) {
      c = 30;
    }
    $("#tians_" + conts + "").html(compareDate(1, c * n + c));
    $("#tiane_" + conts + "").html(compareDate(1, c * n + 1));
  } else if (type == 6 || type == 7 || type == 8) {
    // if (type == 6) {
    //   c = 1;
    // } else if (type == 7) {
    //   c = 2;
    // } else if (type == 8) {
    //   c = 3;
    // }
    c = 1;
    // 
    // alert(getCurrentMonthFirst(c * n + 1))
    $("#tians_" + conts + "").html(getCurrentMonthFirst(c * n + 1));
    $("#tiane_" + conts + "").html(getCurrentMonthLast(compareDate(2, c * n + 1)));
  }

}

/**
 * [自定义时间  历史记录对比时间选择]
 * @param  {[type]} type [description]
 * @param  {[type]} a    [description]
 * @return {[type]}      [description]
 */
function checkTimeforZidingyiHistory(type, a) {
  var checkins, checkouts;
  var add = checkEndTime($("#zi_start").html(), $("#zi_end").html(), 2); //步长
  var starts = $("#start" + a + "").val(); //开始时间
  var ends = $("#end" + a + "").val(); //结束时间

  checkins = $("#start" + a + "").datepicker().on('changeDate', function(ev) {
    starts = $("#start" + a + "").val();
    $("#end" + a + "").val(FormatDate(CutDays(parseDate(starts), add, 1), "yyyy-MM-dd"));
    var cha = checkEndTime("start" + a + "", "end" + a + "", 1);
  });

}


//自定义时间验证
function checkTime(type, a) {
  var checkins, checkouts;
  var add = checkEndTime($("#zi_start").html(), $("#zi_end").html(), 2); //步长
  var starts = $("#start" + a + "").val(); //开始时间
  var ends = $("#end" + a + "").val(); //结束时间

  if (ends != "" && type == 1) {
    checkins = $("#start" + a + "").datepicker().on('changeDate', function(ev) {
      starts = $("#start" + a + "").val();
      $("#end" + a + "").val(FormatDate(CutDays(parseDate(starts), add, 1), "yyyy-MM-dd"));
      var cha = checkEndTime("start" + a + "", "end" + a + "", 1);
      if (!cha) {
        layer.msg("结束时间需晚于开始时间");
        $("#end" + a + "").val("");

      }
      var same = checkEndTime(starts, $("#end" + a + "").val(), 2); //取差值
      if (same != add) {
        layer.msg("步长不一致");
        $("#end" + a + "").val("");
      }
      //    $("#end" + a + "")[0].focus();
    });

  } else {

    checkouts = $("#end" + a + "").datepicker().on('changeDate', function(ev) {
      ends = $("#end" + a + "").val();
      $("#start" + a + "").val(FormatDate(CutDays(parseDate(ends), add), "yyyy-MM-dd"));
      var start = new Date($("#start" + a + "").val().replace("-", "/").replace("-", "/"));
      starts = $("#start" + a + "").val();
      //先判断结束时间是否小于开始时间
      var cha = checkEndTime("start" + a + "", "end" + a + "", 1);
      if (!cha) {
        layer.msg("结束时间需晚于开始时间");
        $("#end" + a + "").val("");
      }
      if (compareYear(start, 10) <= ev.date.toLocaleDateString()) {
        $("#end" + a + "").val("");
        layer.msg("超过统计时间限制");
      }
      //判断步长是否一致
      var same = checkEndTime(starts, ends, 2);
      if (same != add) {
        layer.msg("步长不一致");
        $("#end" + a + "").val("");
      }
    });
  }

}



/**
 * @AuthorHTL
 * @DateTime  2016-07-07T10:17:35+0800
 * @param     {时间 20161212}
 * @return    {[yyyy-MM-dd]}
 */
function formatDate(date) {
  var time = date.substring(0, 4) + '-';
  time += date.substring(4, 6) + '-';
  time += date.substring(6, 8);
  return time;
}



//获取树的个数
function checkTree(name, type) {
  var arr = new Array();
  var ids = ""; //选择的框的ID值
  var b = $("#" + name + " input[class*='skin-square-green']:checked").length;
  if (!type) {
    $(".getpic a").removeClass("active").addClass("hide");
    if (b == 0) {
      $(".getpic a").removeClass('hide');
      $("#history").removeClass("btnborder_disabled").removeAttr('disabled');
    } else if (b == 1) {
      $(".getpic a").removeClass('hide');
      // $(".getpic a:eq(0)").addClass('active');
      $("#history").removeClass("btnborder_disabled").removeAttr('disabled');
    } else {
      $("#history").addClass("btnborder_disabled").attr('disabled', 'disabled');
      if (b <= 16) {
        $(".getpic a").removeClass('hide');
        // $(".getpic a:eq(0)").addClass('active');
      }
      if (b > 16) {
        $(".getpic a").removeClass('hide');
        // $(".getpic a:gt(1)").removeClass('hide');
        // $(".getpic a:eq(2)").addClass('active');
      }
    }
  }
  if (b > 64) {
    $("#" + name + " .icheckbox_square-green']").on('ifUnchecked', function(event) {
      $("#" + name + " input[class*='skin-square-green']").iCheck('uncheck');
    });
  }
  $.each($("#" + name + " input[class*='skin-square-green']:checked"), function(index, item) {
    ids += $(this).attr("id") + ",";
  })
  arr[0] = b;
  arr[1] = ids;
  return arr;
  //return b;
}

//清空搜索选中样式
function clearSelection(ids) {
  $('#' + ids + ' label').each(function() //遍历
    {
      $(this).find('.highlight').each(function() //找到所有highlight属性的元素；
        {
          $(this).replaceWith($(this).html()); //将他们的属性去掉；
        });
    });
}

//搜索选中高亮
function highlight(ida, idb) {
  //一开始就取消全部选框 一开始折叠

  $("#" + idb + " .f1 div[class*='in']").removeClass("in");
  //$(".tree .skin-square-green").iCheck("uncheck");
  clearSelection(idb); //先清空一下上次高亮显示的内容；
  var searchText = $('#' + ida + '').val(); //获取你输入的关键字；
  var regExp = new RegExp(searchText, 'g'); //创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了；

  var content = $("#" + idb + " label").text();
  if (!regExp.test(content)) {
    layer.msg("没有找到符合你条件的数据！");
    return;
  } else {
    $('#' + idb + ' label').each(function() //遍历div；
      {

        var html = $(this).html();
        var newHtml = html.replace(regExp, '<span class="highlight">' + searchText + '</span>'); //将找到的关键字替换，加上highlight属性；
        if (newHtml.indexOf("highlight") != -1) {
          if ($(this).parents("h4").hasClass("panel-title")) //2级里面匹配 展开
          {
            var a = $(this).parents("h4 a").attr('href');
            $("" + a + "").addClass("in").css("height", "");
          } else { //子集里面匹配  展开
            var ids = $(this).parents(".panel-collapse").attr('id');
            $("#" + ids + "").addClass("in").css("height", "");


            //设置堂兄弟下面的input选中
            // $(this).siblings().find("input").iCheck('check');
          }

        }
        $(this).html(newHtml); //更新div；
      });
  }

}

/*公共的内容开始*/
//页面左边的列表
function leftList(type) {
  var _r = "";
  if (type == 1) {
    _r = "EnergyGraphConfig";
  } else if (type == 2) {
    _r = "EnergyReportConfig";
  }
  $.ajax({
    type: "GET",
    url: apiurl + _r,
    success: function(result) {
      console.log('数据：' + JSON.stringify(result, null, 2))
      if (result.success) {
        if (result.data.items === null) {
          var title = type == 1 ? "自定义图表" : "自定义报表";
          var action = type == 1 ? 2 : 3;
          var html = '<aside class="aside"><h4>' + title + '</h4><hr/><ul>';
          html += '无数据';
          html += '</ul></aside>';
        } else {
          var title = type == 1 ? "自定义图表" : "自定义报表";
          var action = type == 1 ? 2 : 3;
          var html = '<aside class="aside"><h4>' + title + '</h4><hr/><ul>';
          $.each(result.data.items, function(index, item) {
            html += '<li onclick="SelectActive(this,' + action + ')" ids="' + item.id + '" ><span><a style="font-size:14px;">' + item.name + '</a></span></li>';
          })
          html += '</ul></aside>';
        }

      } else {
        var title = type == 1 ? "自定义图表" : "自定义报表";
        var action = type == 1 ? 2 : 3;
        var html = '<aside class="aside"><h4>' + title + '</h4><hr/><ul>';
        html += result.error_message;
        html += '</ul></aside>';

      }
      var ids = type == 1 ? "leftNames" : "bao_leftNames";
      $("#" + ids + " .mCSB_container").append(html);
      $("#" + ids + "").mCustomScrollbar({
        scrollButtons: {
          enable: false
        }
      });
    },
    error: function(data) {
      returnLogIn(data);
    }
  })

}


//树的清空筛选条件
function clearCheck(type) {
  if (type == 1) {
    $('#tree input').iCheck('uncheck');
    clearSelection('tree');
    $("#history").removeClass("btnborder_disabled").removeAttr('disabled');
  } else {
    $('#trees input').iCheck('uncheck');
    clearSelection("trees");
  }

}


//统计对象搜索
function getTree(ida, idb) {
  var txt = $("#" + ida + "").val();
  if (txt) {
    highlight(ida, idb); //点击search时，执行highlight函数；
  } else {
    layer.msg("请输入统计对象名称");
  }
}

/**
 * [选择统计对象 所有点初始化]
 * @param  {[type]} ids [tree(能耗分析)/trees(能耗报表)]
 * @return {[type]}     [description]
 */
function rightTree(ids) {
  var _r = "api/project/info";
  $.ajax({
    type: "GET",
    url: apiurl + 'project',
    success: function(results) {
      $(".loading").show();
      if (results.success) {
        $.ajax({
          type: "GET",
          url: apiurl + 'EnergyConfigClassification/0',
          complete: function() {
            $(".loading").hide();
          },
          success: function(result) {
            $(".loading").hide();
            // console.log('请求到的分组数据:' + JSON.stringify(result, null, 2));
            if (result.data.items === null) {
              return;
            }
            var html = "";
            if (result.success) {
              html += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a href="#' + ids + '-' + results.data.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle" aria-expanded="true  pointGroups-name">' + results.data.name + '</a></h4></div>';
              html += '<div class="panel-collapse collapse in" id="' + ids + '-' + results.data.id + '" aria-expanded="false" ><div class="panel-body">';
              $.each(result.data.items, function(index, item) {

                var a, tag, level;
                if (item.hide_tag) {
                  tag = false;
                } else {
                  tag = true;
                }
                if (item.next_level) {
                  level = true;
                } else {
                  level = false;
                }

                if (level === false && tag === false) {
                  a = '';
                } else {
                  a = 'add'
                };


                html += '<div class="panel panel-default"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title">';
                if (a === '') {
                  html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="true">';
                } else {
                  html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="false">';
                }


                html += '<input  type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="bayaxcheckbox fu" ids="' + item.id + '" ><label class="checkbox-i" for="'+ids + '-' + item.id + '-' + index+'"></label> <label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                html += '<div class="panel-collapse collapse in" id="' + ids + '-s' + item.id + '" aria-expanded="true">';

                if (item.next_level) {
                  $.each(item.next_level, function(index, item) {
                    var a, tag, level;
                    if (item.hide_tag) {
                      tag = false;
                    } else {
                      tag = true;
                    }
                    if (item.next_level) {
                      level = true;
                    } else {
                      level = false;
                    }

                    if (level === false && tag === false) {
                      a = '';
                    } else {
                      a = 'add'
                    };
                    html += '<div class="panel panel-default" ><div class="panel-heading fang" style="margin-left: 23px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                    if (a === '') {
                      html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                    } else {
                      html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                    }
                    html += '<input tabindex="5" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="skin-square-green fu" ids="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                    html += '<div class="panel-collapse collapse " id="' + ids + '-s' + item.id + '" aria-expanded="false" style="height: 0px;">';


                    if (item.next_level) {
                      $.each(item.next_level, function(index, item) {
                        var a, tag, level;
                        if (item.hide_tag) {
                          tag = false;
                        } else {
                          tag = true;
                        }
                        if (item.next_level) {
                          level = true;
                        } else {
                          level = false;
                        }

                        if (level === false && tag === false) {
                          a = '';
                        } else {
                          a = 'add'
                        };
                        html += '<div class="panel panel-default" style="padding-left:30px;"><div class="panel-heading fang" style="padding-left:45px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                        if (a === '') {
                          html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        } else {
                          html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                        }
                        html += '<input tabindex="5" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="skin-square-green fu" ids="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                        html += '<div class="panel-collapse collapse " id="' + ids + '-s' + item.id + '" aria-expanded="false" style="height: 0px;padding-left:45px;">';

                        if (item.hide_tag === 0) {} else {
                          var tags = item.tag_list;
                          if (tags !== null) {
                            $.each(tags, function(indexs, items) {
                              html += '<div class="panel-body tree-msg" style="padding-left:40px;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                            })
                          }

                        }
                        html += '</div>';

                      });
                    }
                    if (item.next_level.length === 0) {
                      if (item.hide_tag === 0) {} else {
                        console.log('第二层子元素展示');
                        var tags = item.tag_list;
                        if (tags !== null) {
                          $.each(tags, function(indexs, items) {
                            html += '<div class="panel-body tree-msg" style="padding-left:53px;;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                          })
                        }

                      }
                    }

                    html += '</div>';
                  });
                }
                if (item.next_level.length === 0) {
                  if (item.hide_tag === 0) {} else {
                    console.log('第一层子元素展示');
                    var tags = item.tag_list;
                    if (tags !== null) {
                      $.each(tags, function(indexs, items) {
                        html += '<div class="panel-body tree-msg" style=";margin-left: 25px;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                      })
                    }

                  }
                }


                html += '</div>';

              })
              html += '</div></div></div>';
              // console.log("查看:" + html)
              $("#" + ids + " .mCSB_container").append(html);
              $("#" + ids + "").mCustomScrollbar("scrollTo");
              // ULTRA_SETTINGS.iCheck();
              // 
              // if ($.isFunction($.fn.iCheck)) {
              //   $('#' + ids + ' input.skin-square-green').iCheck({
              //     checkboxClass: 'icheckbox_square-green',
              //     radioClass: 'iradio_square-green',
              //     increaseArea: '20%'
              //   });

              // }

              // $('.one-step').click();
            }

          }
        })
      } else {
        html = result.error_message;

      }
    },
    error: function(results) {
      publicAjaxError(results);
    }
  })

}


//树的筛选按钮
function SelectData(type) {

  if (type == 1) {

    $("#compare .addTime").html("");
    $("#compare1 .addTime").html("");

    $(".getpic a").removeClass("active");
    var arr = checkTree('tree');
    var treenodecount = arr[0];
    var ids = arr[1];
    if (treenodecount == 0) {
      $("#lineCharts").html("");
      var spanwarn = '<span id="sTitle" class="sTitle">统计对象为空</span>'
      $("#lineCharts").append(spanwarn);
    }

    if (treenodecount > 0 && treenodecount <= 16) {
      $(".getpic a:eq(0)").addClass('active');
      isHistoryData = false;
      bindCharts(treenodecount, ids);

    } else if (treenodecount != 0) {
      layer.msg("请选择不超过16条统计对象进行对比")
    }
    //  else if (treenodecount > 16 && treenodecount <= 64) {
    //   $(".getpic a:eq(2)").addClass('active');
    //   isHistoryData = false;
    //   bindCharts(treenodecount, ids);

    // }
    $(".tongji").hide();
  } else {
    BaoTableList();
  }

}
//树的筛选按钮+ 历史记录对比
/**
 * [SelectDataHistory description]
 * @param {[type]} type         [类型]
 * @param {[type]} id           [历史数据对比  点的ID]
 * @param {[type]} tag_taggroup [点 是 tag/taggroup]
 * @param {[type]} com          [绝对/相对]
 */
function SelectDataHistory(type, id, tag_taggroup, com) {
  if (type == 1) {
    $(".getpic a").removeClass("active");
    var arr = checkTree('tree');
    var treenodecount = arr[0];
    var ids = arr[1];
    if (treenodecount > 0 && treenodecount <= 16) {
      $(".getpic a:eq(0)").addClass('active');
      // bindCharts(treenodecount, ids);
      loadHighcharData("select", id, tag_taggroup, com);

    }
    //  else if (treenodecount > 16 && treenodecount <= 64) {
    //   $(".getpic a:eq(2)").addClass('active');
    //   // bindCharts(treenodecount, ids);
    //   loadHighcharData("select",id,tag_taggroup,com);
    // }
    $(".tongji").hide();
  } else {
    BaoTableList();
  }

}


/**
 * @Author
 * @DateTime 2016-07-06T10:42:44+0800
 * @param    {删除类型：1、能耗分析删除 2、能耗报表删除}
 */
function Del(type) {

  //选中的报表项

  var ids = type == 1 ? $("#leftNames li.active").attr("ids") : $("#bao_leftNames li.active").attr("ids");
  var _r;
  if (type == 1) {
    _r = "EnergyGraphConfig/"; //删除
  } else {
    _r = "EnergyReportConfig/"; //删除
  }
  $.ajax({
    url: apiurl + _r + ids,
    type: "DELETE",
    beforeSend: function() {
      $(".loading").show();
    },
    complete: function() {
      $(".loading").hide();
    },
    success: function(result) {
      $(".loading").hide();
      if (result.success) {
        if (type == 1) {
          $("#leftNames aside").remove("aside");
          leftList(1);
          $("#leftNames aside li").removeClass("active");
          $('#lineCharts').highcharts().destroy();
          $("#lineCharts").html("");
          var spanwarn = '<span id="sTitle" class="sTitle">请选择统计对象生成图表</span>'
          $("#lineCharts").append(spanwarn);

          var names = type == 1 ? "tree" : "trees";
          $("#" + names + " input[class*='skin-square-green']").iCheck('uncheck'); //取消之前选中的
        } else {
          $("#bao_leftNames aside").remove("aside");
          leftList(2);
          $("#bao_leftNames aside li").removeClass("active");

          $("#noloud span.kong").text("请选择统计对象生成报表");
          $("#noloud").show();
          $("#tab_border").hide();


          var names = type == 1 ? "tree" : "trees";
          $("#" + names + " input[class*='skin-square-green']").iCheck('uncheck'); //取消之前选中的
        }

        layer.msg("删除成功");
      } else {
        layer.msg("请选择要删除的图表");

      }
    },
    error: function(data) {
      publicAjaxError(data);
    }
  })
}

//声明对象
// function Objfu(id, name, selected, tags) 
function Objfu(id, selected, tags) {
  this.id = id;
  // this.name = name;
  this.selected = selected;
  this.tags = tags;
}
// function Objzi(id, name, oprate) 
function Objzi(id, oprate) {
  this.id = id;
  // this.name = name;
  this.oprate = oprate;
}

function Dictionary() {
  this.data = new Array();
  this.put = function(key, value) {
    this.data[key] = value;
  };
}


//  能源分析保存、更新获取参数
function getdata(v) {
  var type, lengths, length_unit = 'none',
    start_time = null,
    end_time = null,
    relative_history = "[]",
    absolute_history = "[]";
  var tag_id_tree = [];

  var repeat_flag = true;
  // var hcount_flag;

  if ($("#slectFen button .txt").attr("rel") != 9) //"type":"1",（1：相对-除自定义以外、2：绝对-自定义）
  {
    type = 1;
    var stype = Number($("#slectFen button .txt").attr("rel"));
    switch (stype) {
      case 1:
        {
          length_unit = "day";
          lengths = 0;
          break;
        }
      case 2:
        {
          length_unit = "day";
          lengths = -1;
          break;
        }
      case 3:
        {
          length_unit = "day";
          lengths = -3;
          break;
        }
      case 4:
        {
          length_unit = "day";
          lengths = -7;
          break;
        }
      case 5:
        {
          length_unit = "day";
          lengths = -30;
          break;
        }
      case 6:
        {
          length_unit = "month";
          lengths = -1;
          break;
        }
      case 7:
        {
          length_unit = "month";
          lengths = -2;
          break;
        }
      case 8:
        {
          length_unit = "month";
          lengths = -3;
          break;
        }
    }
    if (checkTree('tree', 1)[0] <= 1) {
      var dic = {};
      relative_history = "[";
      var hcount = $("#compare1 .addTime div").length;
      for (var i = 1; i < hcount + 1; i++) {
        var dickey = $("#compare1 .addTime #days" + i + " .txt").attr("rel");
        relative_history += '{"day":-' + $("#compare1 .addTime #days" + i + " .txt").attr("rel") + '}';
        if (i != hcount) {
          relative_history += ",";
        }

        dic[dickey] = dickey;

      }
      relative_history += "]";

      var lengthss = 0;
      for (var j in dic) {
        lengthss += 1;
      }
      if (lengthss !== hcount) {
        repeat_flag = false;
      }
      console.log(JSON.stringify(JSON.parse(relative_history), null, 2))

    }
  } else {
    type = 2;
    start_time = $("#selectTime").val();
    end_time = $("#endTime").val();
    if (checkTree('tree', 1)[0] <= 1) {
      var dic = {};
      var hcount = $("#compare .addTime div").length;
      absolute_history = "[";
      for (var i = 1; i <= hcount; i++) {
        var start = $("#start" + i + "").val();
        var end = $("#end" + i + "").val();
        if (start != "" && end != "") {
          start = start.replace(new RegExp(/(-)/g), '');
          end = end.replace(new RegExp(/(-)/g), '');

          absolute_history += '{"start":' + start + ',"end":' + end + '}';
          dic[start] = start;
          if (i != hcount) {
            absolute_history += ',';
          }
        }
      }
      absolute_history += "]";
      var lengthss = 0;
      for (var j in dic) {
        lengthss += 1;
      }
      if (lengthss !== JSON.parse(absolute_history).length) {
        repeat_flag = false;
      }

    }
  }
  $.each($("#tree input[class*='skin-square-green']:checked"), function(index, item) {
    if ($(this).hasClass("fu")) {
      var par = $(this).attr("id").split("-");
      var pname = $(this).parent().next().html();
      // tag_id_tree.push(new Objfu($(this).attr("ids"), pname, 1, null));
      tag_id_tree.push(new Objfu($(this).attr("ids"), 1, null));
    } else {
      var ids = $(this).attr("id").split("-");;
      var pid = ids[1]; //父类ID
      var status = 0;
      if (tag_id_tree.length > 0) {
        var zid = $(this).attr("ids");
        var zname = $(this).parent().next().html();
        var zop = $(this).attr("oprate");
        var zi = [];
        $.each(tag_id_tree, function(index, ite) {

          if (ite.id == pid) {
            status = 1;
            if (tag_id_tree[index]["tags"] == null) {
              // zi.push(new Objzi(zid, zname, zop));
              zi.push(new Objzi(zid, zop));
              tag_id_tree[index]["tags"] = zi;
            } else {
              // tag_id_tree[index]["tags"].push(new Objzi(zid, zname, zop));
              tag_id_tree[index]["tags"].push(new Objzi(zid, zop));
            }
            return false;
          }

        })
      }
      if (status == 0) //父类没有勾选
      {
        var zi = [];
        var par = $(this).attr("id").split("-");
        var pname = $("#tree input[class~='fu'][id*='" + par[0] + "-" + par[1] + "']").parent().next().html();
        // zi.push(new Objzi($(this).attr("ids"), $(this).parent().next().html(), $(this).attr("oprate")));
        zi.push(new Objzi($(this).attr("ids"), $(this).attr("oprate")));
        // tag_id_tree.push(new Objfu(par[1], pname, 0, zi));
        tag_id_tree.push(new Objfu(par[1], 0, zi));
      }
    }

  });
  if (v) { //更新
    var ids = $("#leftNames aside li.active").attr("ids");
    var name = $("#leftNames aside li.active a").html();
    datas = {
      id: ids,
      name: name,
      date_type: type,
      length_unit: length_unit,
      lengths: lengths,
      start_time: start_time,
      end_time: end_time,
      relative_history: relative_history,
      absolute_history: absolute_history,
      tag_id_tree: JSON.stringify(tag_id_tree)
    }
  } else { //添加
    var name = $("#fieldName").val();
    datas = {
      name: name,
      date_type: type,
      length_unit: length_unit,
      lengths: lengths,
      start_time: start_time,
      end_time: end_time,
      relative_history: relative_history,
      absolute_history: absolute_history,
      tag_id_tree: JSON.stringify(tag_id_tree)
    }

  }

  console.log('查看数据:' + JSON.stringify(datas))

  console.log('查看数据:' + JSON.stringify(tag_id_tree, null, 2))


  var tagtreedic = {};
  var tagtreearr1 = [];
  var tagtreearr2 = [];

  for (var i = 0; i < tag_id_tree.length; i++) {
    var thistree = tag_id_tree[i].tags;
    console.log(thistree)
    if (thistree !== null) {
      console.log(thistree.length)
      for (var j = 0; j < thistree.length; j++) {
        tagtreedic[thistree[j].id] = thistree[j].id;
        tagtreearr1.push(thistree[j].id);
      }
    }

  }
  for (var m in tagtreedic) {
    tagtreearr2.push(m);
  }

  if (tagtreearr2.length !== tagtreearr1.length) {
    return 1;
  }

  if (repeat_flag) {
    return datas;
  } else {
    return 2;
  }

}
/**
 * @Author
 * @DateTime 2016-07-06T10:42:44+0800
 * @param    {保存类型：1、能耗分析 2、能耗报表}
 */
function save(type) {
  var datas, _r, ids;
  if (type == 1) {
    //没有选中
    if (!$("#leftNames aside li").hasClass("active")) {
      //弹出保存框
      otherSave(1, 'fieldName', '保存');
    } else { //更新
      _r = "EnergyGraphConfig";

      var flag = getdata(1);
      if (flag === 2) {
        layer.msg('不允许重复时间段');
      } else if (flag === 1) {
        layer.msg('不允许保存重复的tag')
      } else {
        $.ajax({
          type: "PUT",
          url: apiurl + _r,
          dataType: 'json',
          data: flag,
          success: function(result) {
            if (result.success) {
              layer.msg("更新成功");
            } else {
              layer.alert(result.error_message, {
                title: ['错误信息'],
                skin: 'lay-alert',
                move: false
              });

            }
          }
        });
      }


    }
  } else {
    //没有选中
    if (!$("#bao_leftNames aside li").hasClass("active")) {
      //弹出保存框
      otherSave(2, 'fieldName', '保存');
    } else { //更新
      console.log("新建能耗报表上传的数据:" + JSON.stringify(reportData(1), null, 2))
      var status = false;
      _r = "EnergyReportConfig";
      if (!status) {
        $.ajax({
          type: "PUT",
          url: apiurl + _r,
          dataType: 'json',
          data: reportData(1),
          success: function(result) {
            if (result.success) {
              layer.msg("更新成功");
            } else {
              layer.alert(result.error_message, {
                title: ['错误信息'],
                skin: 'lay-alert',
                move: false
              });

            }
          }
        });
        status = true;
      }
    }

  }
}

//能耗报表参数
function reportData(v) {
  var type, id, name, date, tag_id_tree = [];
  var datas;
  var stype = Number($("#selectBao button .txt").attr("rel"));
  switch (stype) {
    case 1:
      {
        type = "day";
        date = $("#bao_day").val();
        break;
      }
    case 2:
      {
        type = "month";
        date = $("#bao_month").val();
        break;
      }
    case 3:
      {
        type = "year";
        date = $("#bao_year").val() + '-01';
        break;
      }
  }
  $.each($("#trees input[class*='skin-square-green']:checked"), function(index, item) {
    if ($(this).hasClass("fu")) {
      var par = $(this).attr("id").split("-");
      var pname = $(this).parent().next().html();
      // tag_id_tree.push(new Objfu($(this).attr("ids"), pname, 1, null));
      tag_id_tree.push(new Objfu($(this).attr("ids"), 1, null));
    } else {
      var ids = $(this).attr("id").split("-");;
      var pid = ids[1]; //父类ID
      var status = 0;
      if (tag_id_tree.length > 0) {
        var zid = $(this).attr("ids");
        var zname = $(this).parent().next().html();
        var zop = $(this).attr("oprate");
        var zi = [];
        $.each(tag_id_tree, function(index, ite) {
          if (ite.id == pid) {
            status = 1;
            if (tag_id_tree[index]["tags"] == null) {
              // zi.push(new Objzi(zid, zname, zop));
              zi.push(new Objzi(zid, zop));
              tag_id_tree[index]["tags"] = zi;
            } else {
              // tag_id_tree[index]["tags"].push(new Objzi(zid, zname, zop));
              tag_id_tree[index]["tags"].push(new Objzi(zid, zop));
            }
            return false;
          }

        })
      }
      if (status == 0) //父类没有勾选
      {
        var zi = [];
        var par = $(this).attr("id").split("-");
        var pname = $("#tree input[class~='fu'][id*='" + par[0] + "-" + par[1] + "']").parent().next().html();
        // zi.push(new Objzi($(this).attr("ids"), $(this).parent().next().html(), $(this).attr("oprate")));
        zi.push(new Objzi($(this).attr("ids"), $(this).attr("oprate")));


        // tag_id_tree.push(new Objfu(par[1], pname, 0, zi));
        tag_id_tree.push(new Objfu(par[1], 0, zi));
      }
    }
  });

  if (v) { //更新
    id = $("#bao_leftNames aside li.active").attr("ids");
    name = $("#bao_leftNames aside li.active a").html();
    datas = {
      id: id,
      name: name,
      statistics_type: type,
      date: date,
      tag_id_tree: JSON.stringify(tag_id_tree)
    }
  } else { //保存
    name = $("#fieldName").val();
    datas = {
      name: name,
      statistics_type: type,
      date: date,
      tag_id_tree: JSON.stringify(tag_id_tree)
    }
  }
  return datas;
}
/**
 * @Author 循环对比树 重新绑定数据
 * @DateTime 2016-07-06T10:42:44+0800
 * @param    {类型：1、能耗分析 2、能耗报表}
 */
var isHistoryData = false; //是否是 历史数据对比的标志
var history_ids;

function check_tree(type, ids) {
  //获取oprate属性值 $("#aa").attr("oprate");
  $(".loading").show();
  $(".addTime").html("");
  var datas, _r;
  if (type == 1) {
    _r = 'EnergyGraphConfig/';
    // datas = {
    //   id: ids,
    //   r: _r
    // }
  } else {
    _r = "EnergyReportConfig/";
    // datas = {
    //   id: ids,
    //   r: _r
    // }
  }
  $.ajax({
    type: "GET",
    url: apiurl + _r + ids,
    success: function(result) {
      $(".loading").hide();
      console.log('查看:' + JSON.stringify(result, null, 2));
      var names = type == 1 ? "tree" : "trees";
      if (result.success) {
        $("#" + names + " input[class*='skin-square-green']").iCheck('uncheck'); //取消之前选中的
        if (result.data.tag_id_tree !== null) {
          $.each(JSON.parse(result.data.tag_id_tree), function(index, item) {
            var selected = item.selected;
            if (selected == 1) //父元素被选中
            {
              $("a[href='#" + names + "-s" + item.id + "']").find(".skin-square-green").iCheck('check');

            }
            if (item.tags) //有子类
            {
              //父类展开
              $("#" + names + "-s" + item.id + "").addClass("in").css("height", "");
              $.each(item.tags, function(index, items) {
                //如果要给oprate重新赋值 $("#"+names+"-"+item.id+"").find("input[ids='"+items.id+"']").attr("oprate",items.oprate).iCheck('check');
                $("#" + names + "-s" + item.id + "").find("input[ids='" + items.id + "']").iCheck('check');
              })

            }
          })
        }

        if (type == 1) {
          /** 下拉框赋值以及开始时间和结束时间赋值 **/
          if (result.data.date_type == 1) //相对时间
          {

            var lengths = result.data.lengths;
            $(".getshi a").removeClass("active").addClass("hide");
            switch (result.data.length_unit) {
              case "day":
                {
                  if (lengths == 0) {
                    $("#slectFen button .txt").html("今天").attr("rel", "1");
                    $("#selectTime").val(FormatDate(new Date(), "yyyy-MM-dd"));
                    $("#endTime").val(FormatDate(new Date(), "yyyy-MM-dd"));
                    $(".getshi a:eq(0)").removeClass('hide').addClass('active');
                  } else if (lengths == -1) {
                    $("#slectFen button .txt").html("昨天").attr("rel", "2");
                    $("#selectTime").val(compareDate(1, 1));
                    $("#endTime").val(compareDate(1, 1));
                    $(".getshi a:eq(0)").removeClass('hide').addClass('active');
                  } else if (lengths == -3) {
                    $("#slectFen button .txt").html("最近3天").attr("rel", "3");
                    $("#selectTime").val(compareDate(1, 2));
                    $("#endTime").val(compareDate(1, 0));

                    $(".getshi a:eq(0)").removeClass('hide').addClass('active');
                    $(".getshi a:eq(1)").removeClass('hide');

                  } else if (lengths == -7) {
                    $("#slectFen button .txt").html("最近7天").attr("rel", "4");
                    $("#selectTime").val(compareDate(1, 6));
                    $("#endTime").val(compareDate(1, 0));

                    $(".getshi a:eq(0)").removeClass('hide').addClass('active');
                    $(".getshi a:eq(1)").removeClass('hide');
                  } else if (lengths == -30) {
                    $("#slectFen button .txt").html("最近30天").attr("rel", "5");
                    $("#selectTime").val(compareDate(1, 29));
                    $("#endTime").val(compareDate(1, 0));
                    $(".getshi a:eq(1)").removeClass('hide').addClass('active');
                  }
                  break;
                }
              case "month":
                {
                  if (lengths == -1) {
                    $("#slectFen button .txt").html(compareDate(2, 1) + "月").attr("rel", "6");
                    var nowdate = new Date();
                    var nowMonth = Number(nowdate.getMonth() + 1);
                    if (nowMonth === 1) {
                      $("#selectTime").val((nowdate.getFullYear() - 1) + '-' + compareDate(2, 1) + '-01');
                    } else {
                      $("#selectTime").val(nowdate.getFullYear() + '-' + compareDate(2, 1) + '-01');
                    }

                    var aa = compareDate(2, 1);
                    $("#endTime").val(getCurrentMonthLastForSelect($("#selectTime").val()));
                    $(".getshi a:eq(1)").removeClass('hide').addClass('active');
                    $(".getshi a:eq(2)").removeClass('hide');
                  } else if (lengths == -2) {
                    var nowdate = new Date();
                    var nowMonth = Number(nowdate.getMonth() + 1);
                    if (nowMonth === 1 || nowMonth === 2) {
                      $("#selectTime").val((nowdate.getFullYear() - 1) + '-' + compareDate(2, 2) + '-01');
                    } else {
                      $("#selectTime").val(nowdate.getFullYear() + '-' + compareDate(2, 2) + '-01');
                    }
                    $("#slectFen button .txt").html(compareDate(2, 2) + "月").attr("rel", "7");
                    var aa = compareDate(2, 2);
                    $("#endTime").val(getCurrentMonthLastForSelect($("#selectTime").val()));
                    $(".getshi a:eq(1)").removeClass('hide').addClass('active');
                    $(".getshi a:eq(2)").removeClass('hide');
                  } else if (lengths == -3) {
                    var nowdate = new Date();
                    var nowMonth = Number(nowdate.getMonth() + 1);
                    if (nowMonth === 1 || nowMonth === 2 || nowMonth === 3) {
                      $("#selectTime").val((nowdate.getFullYear() - 1) + '-' + compareDate(2, 3) + '-01');
                    } else {
                      $("#selectTime").val(nowdate.getFullYear() + '-' + compareDate(2, 3) + '-01');
                    }
                    $("#slectFen button .txt").html(compareDate(2, 3) + "月").attr("rel", "8");
                    var aa = compareDate(2, 3);
                    $("#endTime").val(getCurrentMonthLastForSelect($("#selectTime").val()));
                    $(".getshi a:eq(1)").removeClass('hide').addClass('active');
                    $(".getshi a:eq(2)").removeClass('hide');
                  }
                  break;
                }
            }
          } else { //绝对时间

            $("#selectTime").val(result.data.start_time.substring(0, 10));
            $("#endTime").val(result.data.end_time.substring(0, 10));
            $("#slectFen button .txt").html("自定义").attr("rel", "9");


            var start = $("#selectTime").val();
            var end = $("#endTime").val();
            if (start != "" && end != "") {
              $(".getshi a").removeClass("active").addClass("hide");
              var cha = checkEndTime(start, end, 2);
              if (cha == 1 || cha == 0) {

                $(".getshi a:eq(0)").removeClass('hide').addClass('active');
              } else if (cha > 1 && cha <= 7) {
                $(".getshi a:eq(0)").removeClass('hide').addClass('active');
                $(".getshi a:eq(1)").removeClass('hide');
              } else if (cha > 7 && cha <= 30) {
                $(".getshi a:eq(1)").removeClass('hide').addClass('active');
              } else if (cha > 30 && cha <= 180) {
                $(".getshi a:eq(1)").removeClass('hide').addClass('active');
                $(".getshi a:eq(2)").removeClass('hide');
              } else if (cha > 180 && cha <= 365) {
                $(".getshi a:eq(2)").removeClass('hide').addClass('active');
              } else {
                $(".getshi a:eq(2)").removeClass('hide').addClass('active');
                $(".getshi a:eq(3)").removeClass('hide');
              }
            }



          }
          // if (result.data.absolute_history != "" && result.data.absolute_history != null) {
          //   getHistory(result.data.absolute_history, 1, result.data.length_unit);
          // }
          // if (result.data.relative_history != "" && result.data.relative_history != null) {
          //   getHistory(result.data.relative_history, 2, result.data.length_unit);
          // }
          // 
          // 
          // 
          var absolute_historys = JSON.parse(result.data.absolute_history);
          var relative_historys = JSON.parse(result.data.relative_history);
          var tag_id_trees = JSON.parse(result.data.tag_id_tree);
          if (absolute_historys.length !== 0 && relative_historys.length === 0) {
            getHistory(absolute_historys, 1, result.data.length_unit);
          }
          if (relative_historys.length !== 0 && absolute_historys.length === 0) {
            getHistory(relative_historys, 2, result.data.length_unit);
          }

          if (absolute_historys.length !== 0 || relative_historys.length !== 0) {
            isHistoryData = true;
            if (tag_id_trees.length === 0) {
              $("#lineCharts").html("");
              var spanwarn = '<span id="sTitle" class="sTitle">统计对象为空</span>'
              $("#lineCharts").append(spanwarn);
            } else {
              if (absolute_historys.length !== 0) {

                if (tag_id_trees[0].selected == 0) {
                  SelectDataHistory(1, tag_id_trees[0].tags[0].id, 1, "compare"); // 1:单独tag. compare:绝对时间
                } else {
                  // alert("组节点")
                  SelectDataHistory(1, tag_id_trees[0].id, 2, "compare"); // 2:tagGroup. compare1:相对时间
                }


              } else {
                if (tag_id_trees[0].selected == 0) {
                  SelectDataHistory(1, tag_id_trees[0].tags[0].id, 1, "compare1"); // 1:单独tag. compare:绝对时间
                } else {
                  SelectDataHistory(1, tag_id_trees[0].id, 2, "compare1"); // 2:tagGroup. compare1:相对时间
                }

              }

            }

          } else {
            isHistoryData = false;
            if (tag_id_trees.length == 0) {
              $("#lineCharts").html("");
              var spanwarn = '<span id="sTitle" class="sTitle">统计对象为空</span>'
              $("#lineCharts").append(spanwarn);
            } else {
              SelectData(1);
            }
          }

        } else {
          var stype = result.data.statistics_type;
          var time = result.data.date.substring(0, 10);
          var tag_id_treess = JSON.parse(result.data.tag_id_tree);
          $("#selectInput input").hide();

          switch (stype) {
            case "day":
              $("#selectTypes .txt").attr("rel");
              $("#selectTypes .txt").html("日报").attr("rel", "1");;
              $("#bao_day").val(time).show();
              break;
            case "month":
              $("#selectTypes .txt").attr("rel");
              $("#selectTypes .txt").html("月报").attr("rel", "2");
              $("#bao_month").val(time.substring(0, 7)).show();
              break;
            case "year":
              $("#selectTypes .txt").attr("rel");
              $("#selectTypes .txt").html("年报").attr("rel", "3");
              $("#bao_year").val(time.substring(0, 4)).show();
              break;
          }
          if (tag_id_treess.length !== 0) {
            BaoTableList(); //绑定表格数据
          } else {
            $("#noloud span.kong").text("统计对象为空");
            $("#tab_border").hide();
            $("#noloud").show();
          }


        }
      } else {
        // returnLogIn(result.error_message);
      }
    },
    error: function(data) {
      publicAjaxError(data);
    }
  })
}

/**
 * @AuthorHTL
 * @DateTime  2016-07-07T15:15:14+0800
 * @return    {对比历史记录赋值}
 */
function getHistory(data, type, unit) {



  var types = $("#selectType .txt").attr('rel');
  var msg = "";
  //先获取下来类型
  if (types == 1 || types == 2) {
    msg = "天";
  }
  if (types == 3 || types == 4 || types == 5) {
    msg += "个";
    if (types == 3) {
      msg += "3";
    } else if (types == 4) {
      msg += "7";
    } else if (types == 5) {
      msg += "30";
    }
    msg += "天";
  }
  if (types == 6 || types == 7 || types == 8) {

    msg = "个月";
  }


  // var msg = "";
  // var un = unit == "day" ? "天" : "月";
  if (type == 1) //绝对时间
  {
    var types = $("#selectType .txt").attr('rel');
    var htmls = "";
    i = data.length;
    $.each(data, function(index, item) {
      var strat = formatDate(String(item.start));
      var end = formatDate(String(item.end));
      htmls = $('<div class = "historyInputCom" id="timeDiv' + i + '"><span class="timetext">对比时间段' + "" + '</span><span class="times"><input type="text" data-format="yyyy-mm-dd" class="form-controls form-control datepicker" id="start' + i + '" onclick="checkTime(1,' + i + ')"  onchange="checkTime(1,' + i + ')" readonly="readonly" value="' + strat + '"></span><lable class="spare">至</lable><span class="times"><input type="text" data-format="yyyy-mm-dd" class="form-controls form-control datepicker" id="end' + i + '"  onclick="checkTime(2,' + i + ')" onchange="checkTime(2,' + i + ')"  readonly="readonly" value="' + end + '"></span><span class="img"><img src="images/icon/delete.png"></span></div>'); //创建一个父div
      htmls.appendTo($("#compare .addTime"));
      bindListener("compare");
      ULTRA_SETTINGS.otherScripts();
      i--;
    })
  } else { //相对时间
    // var types = $("#selectType .txt").attr('rel');
    var htmls = "";
    i = data.length;
    $.each(data, function(index, item) {
      htmls = $('<div class="historyInputCom1"  id="timeDiv' + i + '"><span class="timetext">对比时间段' + "" + '</span><span class="times">之前的第</span><section class="btn-group downselect"><button aria-expanded="false" data-toggle="dropdown" class="btn  btn-border dropdown-toggle" type="button" id="days' + i + '" style="width:95px;margin-left:0px" onclick="selectDrown(' + i + ',' + types + ')"><span class="txt" rel="' + Math.abs(item.day) + '">' + Math.abs(item.day) + '</span><span class="carets sarrow"></span><span class="sr-only"></span></button><ul role="menu" class="dropdown-menu  dropList dropList' + i + '"><li><a href="#" rel="1" class="selected">1</a></li><li><a href="#" rel="2">2</a></li><li><a href="#" rel="3">3</a></li><li><a href="#" rel="4">4</a></li><li><a href="#" rel="5">5</a></li><li><a href="#" rel="6">6</a></li><li><a href="#" rel="7">7</a></li><li><a href="#" rel="8">8</a></li><li class="9"><a href="#" rel="9">9</a></li></ul></section><lable class="spare" style="padding-left:0px;">' + msg + '</lable><span class="times historyCom1Span" id="tians_' + i + '"></span><span class="spare">至</span><span class="times historyCom1Span" id="tiane_' + i + '"></span><span class="img"><img src="images/icon/delete.png"></span></div>');
      // parentdiv = $('<div class = "historyInputCom1"><span class="timetext">对比时间段' + "" + '</span><span class="times">之前的第</span>                 <section class="btn-group downselect"><button aria-expanded="false" data-toggle="dropdown" class="btn  btn-border dropdown-toggle" type="button" id="days' + i + '" style="width:95px;margin-left:0px" onclick="selectDrown(' + i + ',' + types + ')"><span class="txt" rel="1">1</span><span class="carets sarrow"></span><span class="sr-only"></span></button><ul role="menu" class="dropdown-menu  dropList dropList' + i + '"><li><a href="#" rel="1" class="selected">1</a></li><li><a href="#" rel="2">2</a></li><li><a href="#" rel="3">3</a></li><li><a href="#" rel="4">4</a></li><li><a href="#" rel="5">5</a></li><li><a href="#" rel="6">6</a></li><li><a href="#" rel="7">7</a></li><li><a href="#" rel="8">8</a></li><li class="9"><a href="#" rel="9">9</a></li></ul></section><lable class="spare" style="padding-left:0px;">' + msg + '</lable><span class="times historyCom1Span" id="tians_' + i + '"></span><span class="spare">至</span><span class="times historyCom1Span" id="tiane_' + i + '"></span><span class="img"><img src="../images/icon/delete.png"></span></div>');

      htmls.appendTo($("#compare1 .addTime"));
      // initAdd(types, i, Math.abs(item.day));

      initAddreletiveAdd(types, i, Math.abs(item.day));

      bindListener("compare1");
      i--;
    })


  }
}

/*公共内容结束*/


/*能耗分析开始*/

//能耗分析 选择图表类型
function selectCharts(obj) {
  $(".getpic a").removeClass("active");
  var arr = checkTree('tree');
  var ids = arr[1]
  var treenodecount = arr[0];
  if (treenodecount == 0) {
    $("#lineCharts").html("");
    var spanwarn = '<span id="sTitle" class="sTitle">统计对象为空</span>'
    $("#lineCharts").append(spanwarn);
  }
  if (treenodecount > 0 && treenodecount <= 16) {
    $(obj).addClass("active");

    if (isHistoryData == true) {
      var comids = judgeCompare();
      loadHighcharData("screening", "screening", "screening", comids);
    }
    if (isHistoryData == false) {
      bindCharts(treenodecount, ids);
    }
  } else if (treenodecount != 0) {
    layer.msg("请选择不超过16条统计对象进行对比")
  }
}

//能耗分析 选择时间类型
function selectDate(obj) {

  $(".getshi a").removeClass("active");
  $(obj).addClass("active");
  var treenodecount = checkTree('tree', 1)[0];

  if (treenodecount == 0) {
    $("#lineCharts").html("");
    var spanwarn = '<span id="sTitle" class="sTitle">统计对象为空</span>'
    $("#lineCharts").append(spanwarn);
  }
  if (treenodecount > 0 && treenodecount <= 16) {
    if (isHistoryData == true) {
      var comids = judgeCompare();
      loadHighcharData("screening", "screening", "screening", comids);
    }
    if (isHistoryData == false) {
      bindCharts(treenodecount);
    }

  } else if (treenodecount != 0) {
    layer.msg("请选择不超过16条统计对象进行对比")
  }
  $("lineCharts").html("NTD026");



}

//能耗分析 绑定图表内容
function bindCharts(treenodecount, ids) {
  var chardatetype = $(".getshi a.active").attr("id");
  var charname = $(".getpic a.active").attr("id");
  // alert(charname);
  var graph_type = "1";
  if (charname == 'pie') {
    graph_type = "2";
  }
  var _r = "HistoryDataTagsContrast";
  var statistic_type = chardatetype;
  var start_time = $("#selectTime").val();
  var end_time = $("#endTime").val();

  var tagGroups = [];
  var tags = [];
  $.each($("#tree input[class*='skin-square-green']:checked"), function(index, item) {

    if ($(this).attr("id").split("-").length == 3) {
      tagGroups.push($(this).attr("ids"));
    } else {
      tags.push($(this).attr("ids"));
    }

  });
  var colors = ["#A4CD52", "#E7706F", "#9B77B3", "#4CB3E3", "#9B77B3", "#477B36", "#EABE43", "#135083", "#8B6527", "#B3CE59", "#E8767B", "#9980AF", "#5CB1E1", "#A977AB", "#427A46", "#D7AA5E", "#3B507B", "#3B507B", "#996725", "#C0D060", "#EA7D86", "#9789AA", "#67AEDE", "#B576A2", "#3C7856", "#C2956F", "#594F73", "#A66922", "#CDD065", "#EC8392", "#9491A3", "#71ABDB", "#C07698", "#347667", "#AF817C", "#714F6A", "#B46B1F", "#D9D06D", "#ED8A9F", "#91989A", "#7AA7D7", "#CA758E", "#2D7477", "#9C6D84", "#864E61", "#C06C1C", "#E4CF73", "#EE91AB", "#8D9E90", "#83A4D4", "#D57484", "#237286", "#895989", "#9A4C59", "#CC6E19", "#EECE79", "#F098B7", "#89A584", "#8BA0D1", "#DE717A", "#1D7095", "#75468E", "#AC494F", "#D86F14", "#F7CC7F", "#FFA2CB", "#85AB77", "#919BCD", "#E7706F", "#E7706F", "#1A6DA3", "#62328F", "#62328F", "#BC4746", "#E47113"];
  datas = {
    // r: _r,
    graph_type: graph_type,
    statistics_type: statistic_type,
    start_time: start_time,
    end_time: end_time + ' 23:59:59',
    energy_group_ids: tagGroups,
    tag_ids: tags
  }
  var tagdic = {};
  for (var tagkey in tags) {
    tagdic[tags[tagkey]] = tags[tagkey];
  }
  var tagarr = [];
  for (var tagkeys in tagdic) {
    tagarr.push(tagkeys)
  }
  console.log(JSON.stringify(tags))
  console.log(JSON.stringify(tagarr))
  if (tags.length !== tagarr.length) {
    layer.msg('筛选tag重复')
  } else {
    console.log('上传的数据:' + JSON.stringify(datas, null, 2))
    $.ajax({
      type: "PUT",
      url: apiurl + _r,
      dataType: 'json',
      data: datas,
      beforeSend: function() {
        $(".loading").show();
      },
      complete: function() {
        $(".loading").hide();
      },
      success: function(result) {
        console.log('请求的数据:' + JSON.stringify(result, null, 2))
        if (result.success) {
          if (charname == 'pie') {
            if (result.success) {
              var seriesdata = "[";

              if (result.success) {
                var j = 0;
                for (var keypie in result.data) {
                  var values = result.data[keypie];
                  if (Number(values) < 0) {
                    values = 0;
                  }
                  seriesdata += '{name:"' + keypie + '",y:' + values + ',color:"' + colors[j] + '"},';
                  j++;
                }

                seriesdata = seriesdata.substring(0, seriesdata.length - 1);
                seriesdata += "]";
              }
            } else {
              seriesdata = "[无能耗数据]";
            }
          } else {
            if (result.success) {
              var returndata = "[";
              var areadata = "[";
              var i = 0;
              for (var key in result.data) {
                returndata += "{name:'" + result.data[key].name + "',marker:{enabled:true,radius:3},color:'" + colors[i] + "',data:[";
                areadata += "{name:'" + result.data[key].name + "',color:'" + colors[i] + "',data:[";
                var datename = "";
                if (!isEmptyObject(result.data[key].values)) {
                  var data_key_values = result.data[key].values;
                  for (var keys in data_key_values) {
                    switch (chardatetype) {
                      case "hour":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/" + keys.substring(6, 8) + " " + keys.substring(8, 10) + ":00:00";
                        break;
                      case "day":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/" + keys.substring(6, 8) + " 00:00:00";
                        break;
                      case "month":
                        datename = keys.substring(0, 4) + "/" + keys.substring(4, 6) + "/01 00:00:00";
                        break;
                      case "year":
                        datename = keys.substring(0, 4) + "/01/01 00:00:00";
                        break;
                    }


                    var datestr = (new Date(datename));
                    datestr = datestr.getTime() + 60 * 60 * 8 * 1000;
                    returndata += "[" + datestr + "," + data_key_values[keys] + "],";
                    areadata += "[" + datestr + "," + data_key_values[keys] + "],";

                  }
                } else {
                  returndata += "]";
                  areadata += "]";
                }
                // console.log(result.data[key]);
                returndata = returndata.substring(0, returndata.length - 1) + "]},";
                areadata = areadata.substring(0, areadata.length - 1) + "]},";
                i++;
              }
              returndata = returndata.substring(0, returndata.length - 1) + "]";
              areadata = areadata.substring(0, areadata.length - 1) + "]";

            } else {
              returndata = "[无能耗数据]";
              areadata = "[无能耗数据]";
            }
          }
          console.log('returndata:' + JSON.stringify(returndata))
          if (charname == 'column' || charname == 'spline') {
            $('#lineCharts').highcharts('StockChart', {
              chart: {
                backgroundColor: '#1C203F',
                alignTicks: true,
                type: '' + charname + ''
              },
              tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                shared: true
              },
              rangeSelector: {
                allButtonsEnabled: true,
                enabled: false,
                buttonTheme: {
                  width: 60
                },
                selected: 2
              },
              navigator: {
                enabled: true,
                xAxis: {
                  labels: {
                    style: {
                      color: '#fff'
                    }
                  },
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H点',
                    day: '%Y年%m月%d日',
                    week: '%e. %b',
                    month: '%Y年%m月',
                    year: '%Y年'
                  }
                }
              },
              title: {
                text: ''
              },
              legend: {
                symbolHeight: 12,
                symbolWidth: 18,
                symbolRadius: 0,
                itemStyle: {
                  color: '#ffffff'
                },
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: true,
                labelFormatter: function() { //图例的内容
                  //return this.name;//默认返回的内容
                  var msg;
                  msg = '<a title="' + this.name + '">';
                  if (this.name.length > 10) {
                    msg += (this.name).substring(0, 5);
                    msg += '...';
                    msg += (this.name).substring(this.name.length - 5, this.name.length);
                  } else {
                    msg += this.name;
                  }
                  msg += '</a>';
                  return msg;
                }
              },
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                lineColor: '#555769',
                type: 'datetime',
                dateTimeLabelFormats: {
                  second: '%Y-%m-%d<br/>%H:%M:%S',
                  minute: '%Y-%m-%d<br/>%H:%M',
                  hour: '%Y-%m-%d %H:00',
                  day: '%Y-%m-%d',
                  week: '%Y-%m-%d',
                  month: '%Y-%m',
                  year: '%Y-'
                }
              },
              yAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                gridLineColor: '#555769',
                opposite: false,
                title: {
                  style: {
                    color: '#ffffff'
                  },
                  text: '耗电量(kWh)'
                }
              },

              series: returndata == "[无能耗数据]" ? null : eval('(' + returndata + ')')
            })
          } else if (charname == 'pie') {
            // var jsonpie = "";
            // if (treenodecount > 1) {
            //   jsonpie = '{"success":true,"data":[{"tag1":100,"tag2":90,"tag3":100,"tag4":90,"tag5":100,"tag6":90,"tag7":100,"tag8":90,"tag9":100,"tag10":90,"tag11":100,"tag12":90,"tag13":100,"tag14":90,"tag15":100,"tag16":90}]}';
            // } else {
            //   jsonpie = '{"success":true,"data":[{"20160601-20160602":100,"20160603-20160604":90,"20160605-20160606":100,"20160607-20160608":90,"20160609-20160610":100,"20160611-20160612":90,"20160613-20160614":100,"20160615-20160616":90,"20160617-20160618":100}]}';
            // }
            // var resultpie = eval("(" + jsonpie + ")");
            // var seriesdata = "[";
            // if (resultpie.success) {
            //   var j = 0;
            //   for (var keypie in resultpie.data[0]) {
            //     seriesdata += '{name:"' + keypie + '",y:' + resultpie.data[0][keypie] + ',color:"' + colors[j] + '"},';
            //     j++;
            //   }

            //   seriesdata = seriesdata.substring(0, seriesdata.length - 1);
            //   seriesdata += "]";
            $('#lineCharts').highcharts({
              chart: {
                backgroundColor: '#1C203F',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
              },
              title: {
                text: ''
              },
              exporting: {
                enabled: false
              },
              tooltip: {
                pointFormat: '{series.name} : <b>{point.percentage:.1f}% ({point.y})</b>'
              },
              credits: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#fff',
                      "fontWeight": "bold",
                      "textOutline": "none"
                    }
                  }
                }
              },
              series: [{
                type: 'pie',
                name: '占比',
                data: seriesdata == "[无能耗数据]" ? null : eval('(' + seriesdata + ')')
              }]
            });

          } else if (charname == 'area') {
            $('#lineCharts').highcharts('StockChart', {
              chart: {
                backgroundColor: '#1C203F',
                type: 'column'
              },
              tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                shared: true
              },
              rangeSelector: {
                allButtonsEnabled: true,
                enabled: false,
                buttonTheme: {
                  width: 60
                },
                selected: 2
              },
              navigator: {
                enabled: true,
                xAxis: {
                  labels: {
                    style: {
                      color: '#fff'
                    }
                  },
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H点',
                    day: '%Y年%m月%d日',
                    week: '%e. %b',
                    month: '%Y年%m月',
                    year: '%Y年'
                  }
                }
              },
              title: {
                text: ''
              },
              legend: {
                symbolHeight: 12,
                symbolWidth: 18,
                symbolRadius: 0,
                itemStyle: {
                  color: '#ffffff'
                },
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: true,
                labelFormatter: function() { //图例的内容
                  //return this.name;//默认返回的内容
                  var msg;
                  msg = '<a title="' + this.name + '">';
                  if (this.name.length > 10) {
                    msg += (this.name).substring(0, 5);
                    msg += '...';
                    msg += (this.name).substring(this.name.length - 5, this.name.length);
                  } else {
                    msg += this.name;
                  }
                  msg += '</a>';
                  return msg;
                }
              },
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                lineColor: '#555769',
                type: 'datetime',
                dateTimeLabelFormats: {
                  second: '%Y-%m-%d<br/>%H:%M:%S',
                  minute: '%Y-%m-%d<br/>%H:%M',
                  hour: '%Y-%m-%d %H:00',
                  day: '%Y-%m-%d',
                  week: '%Y-%m-%d',
                  month: '%Y-%m',
                  year: '%Y-'
                }
              },
              yAxis: {
                labels: {
                  style: {
                    color: '#ffffff' //颜色
                  }
                },
                gridLineColor: '#555769',
                opposite: false,
                title: {
                  style: {
                    color: '#ffffff'
                  },
                  text: '耗电量(kWh)'
                }
              },
              plotOptions: {
                column: {
                  stacking: 'normal'
                }
              },
              series: areadata == "[无能耗数据]" ? null : eval('(' + areadata + ')')
            })
          }
        } else {
          $("#lineCharts").html("");
          var spanwarn = '<span id="sTitle" class="sTitle">无能耗数据</span>'
          $("#lineCharts").append(spanwarn);
        }

      },
      error: function(data) {

        $("#lineCharts").html("");
        publicAjaxError(data);
      }
    });
  }



}

//判断对象是否为空
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
/*能耗分析结束*/


//表格内容
function table_content(type, times) {
  var html = "";
  html += "<tr>";
  html += "<th>名称</th>";
  if (type == 1) //天
  {
    for (var i = 0; i < 24; i++) {
      html += "<th>" + i + "时</th>";
    }
  } else if (type == 2) //月
  {

    if (times) {
      var tims = times.split("-");
      times = getMothCount(tims[0], tims[1]);
      for (var i = 1; i < times + 1; i++) {
        html += "<th>" + i + "号</th>";
      }
    }
  } else if (type == 3) //年
  {
    for (var i = 1; i < 13; i++) {
      html += "<th>" + i + "月</th>";
    }
  }
  html += "</tr>";
  $("#baoList thead").html(html);

}



/*能耗报表开始*/

//能耗报表页初始化
function initData(type) {
  if (type == 2) {
    //判断是否加载过
    var lowd = $("#bao_leftNames").html() == "" ? false : true;
    if (!lowd) //没有加载过
    {

      leftList(2);
      rightTree("trees");
      window.onresize = function() {
        initScrollerA("trees"); //此时重新加载滚动条
        // initScrollerAs(); //此时重新加载滚动条
        initScrollerA("bao_leftNames");

      }
      initScrollerA("trees"); //此时重新加载滚动条
      initScrollerA("bao_leftNames");

      $("#trees input.skin-square-green").on('ifUnchecked ifChecked', function() {
        checkTree('trees', 1);
      });
      $("#tab_border").css("opacity", "0");


    }
  }
}

//表格列表
function BaoTableList() {
  //获取下拉框选择的时间类型
  var selectType = $("#selectTypes .txt").attr("rel");
  var tree = checkTree('trees', 1);
  var conts = tree[0];
  var result = "";
  var html = "";
  var times = "";
  var type = "";
  if (conts <= 0) {
    $("#noloud span.kong").text("未选择任何对象");
    $("#noloud").show();
    $("#tab_border").hide();
    $("#tongjis").hide();
    return;
  }
  switch (selectType) {
    case '1':
      times = $("#bao_day").val();
      type = "day";
      break;
    case '2':
      times = $("#bao_month").val();
      type = "month";
      break;
    case '3':
      times = $("#bao_year").val();
      type = "year";
      break;
  }
  var tagGroups = [];
  var tags = [];
  $.each($("#trees input[class*='skin-square-green']:checked"), function(index, item) {
    if ($(this).attr("id").split("-").length == 3) {
      tagGroups.push($(this).attr("ids"));
    } else {
      tags.push($(this).attr("ids"));
    }

  });
  var datas = {
    statistics_type: type,
    start_time: times,
    energy_group_ids: tagGroups,
    tag_ids: tags
  };

  var _r = "energyreportdata";
  $.ajax({
    type: "GET",
    url: apiurl + _r,
    dataType: 'json',
    data: datas,
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(result) {
      $(".loading").hide();
      if (result.success) {
        var dataIsNull = true;
        for (var key in result.data) {
          if (!isEmptyObject(result.data[key])) {
            dataIsNull = false;
            break;
          }
        }

        if (dataIsNull) {
          $("#noloud span.kong").text("暂无数据");
          $("#noloud").show();
          $("#tab_border").hide();
        } else {
          if (selectType == 2) {
            table_content(selectType, times);
          } else {
            table_content(selectType);
          }
          var baodata = result.data;
          for (var key in baodata) {
            html += "<tr><td>" + baodata[key].name + "</td>";
            for (var keys in baodata[key].values) {
              html += "<td>" + baodata[key].values[keys] + "</td>";
            }
            html += "</tr>";
          }

          $("#tab_border").css("opacity", "1");
          $("#noloud").hide();
          $("#tab_border").show();
          $("#baoList tbody").html(html);
          // initScrollerAs();


        }


      } else {
        $("#noloud span.kong").text("暂无数据");
        $("#tab_border").hide();
        $("#noloud").show();

      }

    },
    complete: function() {
      $(".loading").hide();
    },
    error: function(data) {
      publicAjaxError(data);
    }
  });
  $("#tongjis").hide();



}
//时间改变 绑定数据
function changeTime() {
  var checkDay = $("#bao_day").datepicker().on('changeDate', function(ev) {
    BaoTableList();
  });
  var checkMonth = $("#bao_month").datepicker().on('changeDate', function(ev) {
    BaoTableList();
  });
  var checkMonth = $("#bao_year").datepicker().on('changeDate', function(ev) {
    BaoTableList();
  });
}



/**
 * [时间格式化函数]
 * @param  {[type]} format [data]
 * @return {[type]}        [description]
 */
Date.prototype.format = function(format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
};



/**
 * [判断字符串是否合法]
 * @param {[type]} thiss [description]
 * @param {[type]} span  [description]
 */
function RegeMatch(thiss) {
  var pattern = new RegExp(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\-_]/g);
  if (thiss.val() != "" && thiss != null) {
    if (pattern.test(thiss.val())) {
      return false;
    } else {
      return true;
    }
  }
}



//验证文件格式
function fileName_s(name, type) {

  var val = $("#" + name + "").val();
  var len = 0;
  var reg = "[`~\\\\!@#\$%\^&\*\(\)_\+<>\?\？:\"{},，。！\.\/;'\[\\]]";
  var pattern = new RegExp(reg);
  if (val) {
    if (pattern.test(val)) {
      //有非法字符
      $("#" + name + "").next().html("不能输入特殊字符").show();
      return false;
    } else {
      //判断字符长度
      for (var i = 0; i < val.length; i++) {
        if (val.charCodeAt(i) > 127 || val.charCodeAt(i) == 94) {
          len += 2;
        } else {
          len++;
        }
      }
      if (len > 64) {
        // $("#" + name + "").next().html("输入超过规定长度").show();
        layer.msg('输入超过规定长度');
        return false;
      }
    }
    if (type == 1) {
      var status = true;
      $("#leftNames ul").find("li span a").each(function() {
        if ($(this).html() == val) {
          status = false;
          return false;
        }
      })
      if (!status) {
        // $("#" + name + "").next().html("该名称已经存在").show();
        layer.msg('该名称已经存在');
        return false;
      }
    } else {
      var status = true;
      $("#bao_leftNames ul").find("li span a").each(function() {
        if ($(this).html() == val) {
          status = false;
          return false;
        }

      })
      if (!status) {
        $("#" + name + "").next().html("该名称已经存在").show();
        return false;
      }
    }
    $("#" + name + "").next().hide();
    return true;
  }

}



// 导出excel

function exportss() {

  var fileName;
  switch (Number($("#selectBao button .txt").attr('rel'))) {
    case 1:
      fileName = $("#bao_day").val();
      break;
    case 2:
      fileName = $("#bao_month").val();
      break;
    case 3:
      fileName = $("#bao_year").val();
      break;
  }

  tableExport('baoList', fileName, 'csv');
}