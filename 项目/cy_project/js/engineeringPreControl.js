$(function() {
  $("#container").highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: ""
    },
    colors: ["#00a8e4", "#e9ab0d", "#e2162c"],
    tooltip: {
      headerFormat: "{series.name}<br>",
      pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>"
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        borderColor: null,
        allowPointSelect: true,
        cursor: "pointer",
        // 指示表不显示
        // dataLabels: {
        //     enabled: false
        // },
        // 指示表显示
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black"
          }
        }
      }
    },
    series: [{
      type: "pie",
      name: "安全风险分析",
      data: [
        ["一般风险", 45.0],
        ["严重风险", 26.8], {
          name: "重大风险",
          y: 12.8
            // sliced: true,
            // selected: true
        }
        // ['Safari',    8.5],

        // ['其他',   0.7]
      ]
    }]
  });
  $("#container2").highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        spacing: [100, 0, 40, 0]
      },
      credits: {
        enabled: false
      },
      colors: ["#e2162c", "#00a8e4"],
      title: {
        floating: true,
        text: " "
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black"
            }
          },
          point: {
            events: {
              mouseOver: function(e) {
                  // 鼠标滑过时动态更新标题
                  // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                  chart.setTitle({
                    text: e.target.name + "\t" + e.target.y + " %"
                  });
                }
                // click: function(e) { // 同样的可以在点击事件里处理
                //     chart.setTitle({
                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                //     });
                // }
            }
          }
        }
      },
      series: [{
        type: "pie",
        innerSize: "80%",
        name: "整改统计",
        data: [
          ["已整改", 90],
          ["未整改", 10]
        ]
      }]
    },
    function(c) {
      // 环形图圆心
      var centerY = c.series[0].center[1],
        titleHeight = parseInt(c.title.styles.fontSize);
      c.setTitle({
        y: centerY + titleHeight / 2
      });
      chart = c;
    }
  );

  $("#container3").highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: ""
    },
    colors: ["#00a8e4", "#e9ab0d", "#e2162c"],
    tooltip: {
      headerFormat: "{series.name}<br>",
      pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>"
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        borderColor: null,
        allowPointSelect: true,
        cursor: "pointer",
        // 指示表不显示
        // dataLabels: {
        //     enabled: false
        // },
        // 指示表显示
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black"
          }
        }
      }
    },
    series: [{
      type: "pie",
      name: "安全风险分析",
      data: [
        ["一般风险", 45.0],
        ["严重风险", 26.8], {
          name: "重大风险",
          y: 12.8
            // sliced: true,
            // selected: true
        }
        // ['Safari',    8.5],

        // ['其他',   0.7]
      ]
    }]
  });
});

$(function() {
  $("#containers").highcharts({
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: null
    },
    colors: ["#00a8e4", "#e9ab0d", "#e2162c"],
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收"
      ],
      crosshair: true,
      tickWidth: 0
    },
    yAxis: {
      // lineWidth: 1,

      title: {
        text: "单位:个"
          // align: 'high',
          // offset: 0,
          // text: 'Rainfall (mm)',
          // rotation: 0,
          // y: -10
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        showInLegend: false
      }
    },
    series: [{
      name: "一般风险",
      data: [80, 50, 80, 63, 80, 50, 80, 63]
    }, {
      name: "严重风险",
      data: [65, 65, 108, 56, 65, 65, 108, 56]
    }, {
      name: "重大风险性",
      data: [41, 23, 41, 65, 41, 23, 41, 65]
    }]
  });
  $("#containers2").highcharts({
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    colors: ["#00a8e4", "#e2162c"],
    subtitle: {
      text: null
    },
    // colors: ['#00a8e4', '#e9ab0d', '#e2162c'],
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "质量问题监理通知单签收"
      ],
      crosshair: true,
      tickWidth: 0
    },
    yAxis: {
      // lineWidth: 1,

      title: {
        text: "单位:个"
          //  align: 'high',
          // offset: 0,
          // // text: 'Rainfall (mm)',
          // rotation: 0,
          // y: -10
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        showInLegend: false
      }
    },
    series: [{
      name: "未整改",
      data: [80, 50, 80, 63, 80, 50, 80, 63]
    }, {
      name: "已整改",
      data: [65, 65, 108, 56, 65, 65, 108, 56]
    }]
  });
  $("#containers3").highcharts({
    chart: {
      type: "column"
    },
    title: {
      text: ""
    },
    subtitle: {
      text: null
    },
    colors: ["#00a8e4", "#e9ab0d", "#e2162c"],
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收",
        "对分包单位的资质进行核验",
        "对重点部位、关键工序核验",
        "对施工组织设计、专项...",
        "质量问题监理通知单签收"
      ],
      crosshair: true,
      tickWidth: 0
    },
    yAxis: {
      // lineWidth: 1,

      title: {
        text: "单位:个"
          //  align: 'high',
          // offset: 0,
          // // text: 'Rainfall (mm)',
          // rotation: 0,
          // y: -10
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        showInLegend: false
      }
    },
    series: [{
      name: "一般风险",
      data: [80, 50, 80, 63, 80, 50, 80, 63]
    }, {
      name: "严重风险",
      data: [65, 65, 108, 56, 65, 65, 108, 56]
    }, {
      name: "重大风险性",
      data: [41, 23, 41, 65, 41, 23, 41, 65]
    }]
  });
});

//弹窗

function method1() {
  var layer1 = layer.open({
    title: [
      "提示",
      "font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;"
    ],
    type: 1,
    skin: "layui-primary", //加上边框
    area: ["400px", "200px"], //宽高
    content: $("#layer-for-method1"), //捕获的元素,
    move: false,
    btn: ["取消", "确定"],
    success: function() {
      $(".layui-layer-btn a:last-child").addClass("only-two-btn-last");
    },
    btn1: function(index) {
      layer.close(layer1);
    },
    btn2: function(index) {}
  });
}

function method2() {
  layer.open({
    title: [
      "旁站记录",
      "font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;"
    ],
    type: 1,
    skin: "layui-primary", //加上边框
    area: ['1095px', '510px'], //宽高
    content: $("#layer-for-method2"), //捕获的元素,
    move: false,
    success: function() {

    }
  });
}

function method3() {
  layer.open({
    title: [
      "设置",
      "font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:20px;border:none;"
    ],
    type: 1,
    skin: "layui-primary", //加上边框
    area: ["60%", '600px'], //宽高
    content: $("#layer-for-method3"), //捕获的元素,
    move: false,
    btn: ["取消", "清空设置", "保存设置"],
    success: function() {
      $(".layui-layer-btn a:last-child").addClass("only-three-btn-last");
    },
    btn1: function() {
      return false;
    }
  });
}

setTimeout(function() {
  method3()
}, 1000)

var setting = {
  check: {
    enable: true,
    chkboxType: {
      "Y": "",
      "N": ""
    }
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  view: {
    showIcon: true //图标
  }

};

var zNodes = [{
  id: 1,
  pId: 0,
  name: "随意勾选 1",
  open: false,
    nocheck:true
}, {
  id: 11,
  pId: 1,
  name: "随意勾选 1-1",
  open: true,

}, {
  id: 111,
  pId: 11,
  name: "随意勾选 1-1-1"
}, {
  id: 112,
  pId: 11,
  name: "随意勾选 1-1-2"
}, {
  id: 12,
  pId: 1,
  name: "随意勾选 1-2",
  open: true
}, {
  id: 121,
  pId: 12,
  name: "随意勾选 1-2-1"
}, {
  id: 122,
  pId: 12,
  name: "随意勾选 1-2-2"
}, {
  id: 2,
  pId: 0,
  name: "随意勾选 2",
  open: false,
    nocheck:true
}, {
  id: 21,
  pId: 2,
  name: "随意勾选 2-1"
}, {
  id: 22,
  pId: 2,
  name: "随意勾选 2-2",
  open: true
}, {
  id: 221,
  pId: 22,
  name: "随意勾选 2-2-1",
  checked: true
}, {
  id: 222,
  pId: 22,
  name: "随意勾选 2-2-2"
}, {
  id: 23,
  pId: 2,
  name: "随意勾选 2-3"
}];



var code;

$(document).ready(function() {
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);

});



// 弹框评价一般，严重，重大的切换
$(function() {
  $('.tab-span-a').on('click', 'span', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
})

// 点击显示 tree
function showTree(){
  $('.trees').toggle();
}

// 点击隐藏 tree
function hideTree(){
  $('.trees').toggle();
}