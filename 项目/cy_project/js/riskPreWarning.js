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
      name: "质量风险分析",
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
    colors: ["#00a8e4", "#e9ab0d", "#e2162c"],
    title: {
      text: ""
    },
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
      "严重风险",
      "font-size:16px;color:#333;background:#f1f1f1;height:50px;font-weight:bold;line-height:50px;padding-left:30px;border:none;"
    ],
    type: 1,
    skin: "layui-primary", //加上边框
    area: ["60%"], //宽高
    content: $("#layer-for-method1"), //捕获的元素,
    move: false,
    success: function() {
      $(".layui-layer-btn a:last-child").addClass("only-two-btn-last");
    },
    btn1: function(index) {
      layer.close(layer1);
    },
    btn2: function(index) {}
  });
}