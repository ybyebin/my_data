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

