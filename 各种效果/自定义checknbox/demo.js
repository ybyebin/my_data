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


                html += '<div class="panel panel-default"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title" style="background:red">';
                html += '<label style="background:blue;float:left"><input  type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="bayaxcheckbox fu" ids="' + item.id + '" ><label class="checkbox-i" for="' + ids + '-' + item.id + '-' + index + '"></label></label>'
                if (a === '') {
                  html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="true">';
                } else {
                  html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="false">';
                }


                html += ' <label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                html += '<div class="panel-collapse collapse in" id="' + ids + '-s' + item.id + '" aria-expanded="true">';

                // if (item.next_level) {
                //   $.each(item.next_level, function(index, item) {
                //     var a, tag, level;
                //     if (item.hide_tag) {
                //       tag = false;
                //     } else {
                //       tag = true;
                //     }
                //     if (item.next_level) {
                //       level = true;
                //     } else {
                //       level = false;
                //     }

                //     if (level === false && tag === false) {
                //       a = '';
                //     } else {
                //       a = 'add'
                //     };
                //     html += '<div class="panel panel-default" ><div class="panel-heading fang" style="margin-left: 23px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                //     if (a === '') {
                //       html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                //     } else {
                //       html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                //     }
                //     html += '<input tabindex="5" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="skin-square-green fu" ids="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                //     html += '<div class="panel-collapse collapse " id="' + ids + '-s' + item.id + '" aria-expanded="false" style="height: 0px;">';


                //     if (item.next_level) {
                //       $.each(item.next_level, function(index, item) {
                //         var a, tag, level;
                //         if (item.hide_tag) {
                //           tag = false;
                //         } else {
                //           tag = true;
                //         }
                //         if (item.next_level) {
                //           level = true;
                //         } else {
                //           level = false;
                //         }

                //         if (level === false && tag === false) {
                //           a = '';
                //         } else {
                //           a = 'add'
                //         };
                //         html += '<div class="panel panel-default" style="padding-left:30px;"><div class="panel-heading fang" style="padding-left:45px;padding-top:5px;padding-right:0;"><h4 class="panel-title ">';
                //         if (a === '') {
                //           html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                //         } else {
                //           html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed ' + a + ' pointGroups-a" aria-expanded="false">';
                //         }
                //         html += '<input tabindex="5" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="skin-square-green fu" ids="' + item.id + '" ><label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
                //         html += '<div class="panel-collapse collapse " id="' + ids + '-s' + item.id + '" aria-expanded="false" style="height: 0px;padding-left:45px;">';

                //         if (item.hide_tag === 0) {} else {
                //           var tags = item.tag_list;
                //           if (tags !== null) {
                //             $.each(tags, function(indexs, items) {
                //               html += '<div class="panel-body tree-msg" style="padding-left:40px;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                //             })
                //           }

                //         }
                //         html += '</div>';

                //       });
                //     }
                //     if (item.next_level.length === 0) {
                //       if (item.hide_tag === 0) {} else {
                //         console.log('第二层子元素展示');
                //         var tags = item.tag_list;
                //         if (tags !== null) {
                //           $.each(tags, function(indexs, items) {
                //             html += '<div class="panel-body tree-msg" style="padding-left:53px;;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                //           })
                //         }

                //       }
                //     }

                //     html += '</div>';
                //   });
                // }
                // if (item.next_level.length === 0) {
                //   if (item.hide_tag === 0) {} else {
                //     console.log('第一层子元素展示');
                //     var tags = item.tag_list;
                //     if (tags !== null) {
                //       $.each(tags, function(indexs, items) {
                //         html += '<div class="panel-body tree-msg" style=";margin-left: 25px;padding-top:5px;padding-bottom:5px;"><a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ><label class="form-label pointGroups-label-son">' + items.name + '</label></a></div>';
                //       })
                //     }

                //   }
                // }


                html += '</div>';

              })
              html += '</div></div></div>';
              // console.log("查看:" + html)
              $("#" + ids + " .mCSB_container").append(html);
              $("#" + ids + "").mCustomScrollbar("scrollTo");

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


var results = {
  "success": true,
  "data": {
    "logo_path": "/AppData/FileUpload/ProjectImgs/636324416532863356.png",
    "locale": "1",
    "name": "智能建筑系统",
    "id": 1,
    "create_time": "0001-01-01 00:00:00"
  },
  "error_message": null
};

var result = {
  "success": true,
  "data": {
    "pageCount": 0,
    "items": [{
      "next_level": [],
      "project_id": 1,
      "name": "能耗11",
      "tag_id_tree": null,
      "hide_tag": 1,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 1836,
        "oprate": 1,
        "name": "能耗1001",
        "node_name": "能耗02",
        "point_id": 1,
        "group_id": 55,
        "id": 2792,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1837,
        "oprate": 1,
        "name": "能耗1002",
        "node_name": "能耗02",
        "point_id": 2,
        "group_id": 55,
        "id": 2793,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1838,
        "oprate": 1,
        "name": "能耗1003",
        "node_name": "能耗02",
        "point_id": 3,
        "group_id": 55,
        "id": 2794,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1839,
        "oprate": 1,
        "name": "能耗1004",
        "node_name": "能耗02",
        "point_id": 4,
        "group_id": 55,
        "id": 2795,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1840,
        "oprate": 1,
        "name": "能耗1005",
        "node_name": "能耗02",
        "point_id": 5,
        "group_id": 55,
        "id": 2796,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1841,
        "oprate": 1,
        "name": "能耗1006",
        "node_name": "能耗02",
        "point_id": 6,
        "group_id": 55,
        "id": 2797,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1842,
        "oprate": 1,
        "name": "能耗1007",
        "node_name": "能耗02",
        "point_id": 7,
        "group_id": 55,
        "id": 2798,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1843,
        "oprate": 1,
        "name": "能耗1008",
        "node_name": "能耗02",
        "point_id": 8,
        "group_id": 55,
        "id": 2799,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1844,
        "oprate": 1,
        "name": "能耗1009",
        "node_name": "能耗02",
        "point_id": 9,
        "group_id": 55,
        "id": 2800,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1845,
        "oprate": 1,
        "name": "能耗1010",
        "node_name": "能耗02",
        "point_id": 10,
        "group_id": 55,
        "id": 2801,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1846,
        "oprate": 1,
        "name": "能耗1011",
        "node_name": "能耗02",
        "point_id": 11,
        "group_id": 55,
        "id": 2802,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1847,
        "oprate": 1,
        "name": "能耗1012",
        "node_name": "能耗02",
        "point_id": 12,
        "group_id": 55,
        "id": 2803,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1848,
        "oprate": 1,
        "name": "能耗1013",
        "node_name": "能耗02",
        "point_id": 13,
        "group_id": 55,
        "id": 2804,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1849,
        "oprate": 1,
        "name": "能耗1014",
        "node_name": "能耗02",
        "point_id": 14,
        "group_id": 55,
        "id": 2805,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1850,
        "oprate": 1,
        "name": "能耗1015",
        "node_name": "能耗02",
        "point_id": 15,
        "group_id": 55,
        "id": 2806,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1851,
        "oprate": 1,
        "name": "能耗1016",
        "node_name": "能耗02",
        "point_id": 16,
        "group_id": 55,
        "id": 2807,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1852,
        "oprate": 1,
        "name": "能耗1017",
        "node_name": "能耗02",
        "point_id": 17,
        "group_id": 55,
        "id": 2808,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1853,
        "oprate": 1,
        "name": "能耗1018",
        "node_name": "能耗02",
        "point_id": 18,
        "group_id": 55,
        "id": 2809,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1854,
        "oprate": 1,
        "name": "能耗1019",
        "node_name": "能耗02",
        "point_id": 19,
        "group_id": 55,
        "id": 2810,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1855,
        "oprate": 1,
        "name": "能耗1020",
        "node_name": "能耗02",
        "point_id": 20,
        "group_id": 55,
        "id": 2811,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1856,
        "oprate": 1,
        "name": "能耗1021",
        "node_name": "能耗02",
        "point_id": 21,
        "group_id": 55,
        "id": 2812,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1857,
        "oprate": 1,
        "name": "能耗1022",
        "node_name": "能耗02",
        "point_id": 22,
        "group_id": 55,
        "id": 2813,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1858,
        "oprate": 1,
        "name": "能耗1023",
        "node_name": "能耗02",
        "point_id": 23,
        "group_id": 55,
        "id": 2814,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1859,
        "oprate": 1,
        "name": "能耗1024",
        "node_name": "能耗02",
        "point_id": 24,
        "group_id": 55,
        "id": 2815,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1860,
        "oprate": 1,
        "name": "能耗1025",
        "node_name": "能耗02",
        "point_id": 25,
        "group_id": 55,
        "id": 2816,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1861,
        "oprate": 1,
        "name": "能耗1026",
        "node_name": "能耗02",
        "point_id": 26,
        "group_id": 55,
        "id": 2817,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1862,
        "oprate": 1,
        "name": "能耗1027",
        "node_name": "能耗02",
        "point_id": 27,
        "group_id": 55,
        "id": 2818,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1863,
        "oprate": 1,
        "name": "能耗1028",
        "node_name": "能耗02",
        "point_id": 28,
        "group_id": 55,
        "id": 2819,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1864,
        "oprate": 1,
        "name": "能耗1029",
        "node_name": "能耗02",
        "point_id": 29,
        "group_id": 55,
        "id": 2820,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1865,
        "oprate": 1,
        "name": "能耗1030",
        "node_name": "能耗02",
        "point_id": 30,
        "group_id": 55,
        "id": 2821,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1866,
        "oprate": 1,
        "name": "能耗1031",
        "node_name": "能耗02",
        "point_id": 31,
        "group_id": 55,
        "id": 2822,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1867,
        "oprate": 1,
        "name": "能耗1032",
        "node_name": "能耗02",
        "point_id": 32,
        "group_id": 55,
        "id": 2823,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1868,
        "oprate": 1,
        "name": "能耗1033",
        "node_name": "能耗02",
        "point_id": 33,
        "group_id": 55,
        "id": 2824,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1869,
        "oprate": 1,
        "name": "能耗1034",
        "node_name": "能耗02",
        "point_id": 34,
        "group_id": 55,
        "id": 2825,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1870,
        "oprate": 1,
        "name": "能耗1035",
        "node_name": "能耗02",
        "point_id": 35,
        "group_id": 55,
        "id": 2826,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1871,
        "oprate": 1,
        "name": "能耗1036",
        "node_name": "能耗02",
        "point_id": 36,
        "group_id": 55,
        "id": 2827,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1872,
        "oprate": 1,
        "name": "能耗1037",
        "node_name": "能耗02",
        "point_id": 37,
        "group_id": 55,
        "id": 2828,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1873,
        "oprate": 1,
        "name": "能耗1038",
        "node_name": "能耗02",
        "point_id": 38,
        "group_id": 55,
        "id": 2829,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1874,
        "oprate": 1,
        "name": "能耗1039",
        "node_name": "能耗02",
        "point_id": 39,
        "group_id": 55,
        "id": 2830,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1876,
        "oprate": 1,
        "name": "能耗1041",
        "node_name": "能耗02",
        "point_id": 41,
        "group_id": 55,
        "id": 2831,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1875,
        "oprate": 1,
        "name": "能耗1040",
        "node_name": "能耗02",
        "point_id": 40,
        "group_id": 55,
        "id": 2832,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1877,
        "oprate": 1,
        "name": "能耗1042",
        "node_name": "能耗02",
        "point_id": 42,
        "group_id": 55,
        "id": 2833,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1878,
        "oprate": 1,
        "name": "能耗1043",
        "node_name": "能耗02",
        "point_id": 43,
        "group_id": 55,
        "id": 2834,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1879,
        "oprate": 1,
        "name": "能耗1044",
        "node_name": "能耗02",
        "point_id": 44,
        "group_id": 55,
        "id": 2835,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1880,
        "oprate": 1,
        "name": "能耗1045",
        "node_name": "能耗02",
        "point_id": 45,
        "group_id": 55,
        "id": 2836,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1881,
        "oprate": 1,
        "name": "能耗1046",
        "node_name": "能耗02",
        "point_id": 46,
        "group_id": 55,
        "id": 2837,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1883,
        "oprate": 1,
        "name": "能耗1048",
        "node_name": "能耗02",
        "point_id": 48,
        "group_id": 55,
        "id": 2838,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1882,
        "oprate": 1,
        "name": "能耗1047",
        "node_name": "能耗02",
        "point_id": 47,
        "group_id": 55,
        "id": 2839,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1884,
        "oprate": 1,
        "name": "能耗1049",
        "node_name": "能耗02",
        "point_id": 49,
        "group_id": 55,
        "id": 2840,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1886,
        "oprate": 1,
        "name": "能耗1051",
        "node_name": "能耗02",
        "point_id": 51,
        "group_id": 55,
        "id": 2841,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1885,
        "oprate": 1,
        "name": "能耗1050",
        "node_name": "能耗02",
        "point_id": 50,
        "group_id": 55,
        "id": 2842,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1887,
        "oprate": 1,
        "name": "能耗1052",
        "node_name": "能耗02",
        "point_id": 52,
        "group_id": 55,
        "id": 2843,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1888,
        "oprate": 1,
        "name": "能耗1053",
        "node_name": "能耗02",
        "point_id": 53,
        "group_id": 55,
        "id": 2844,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1889,
        "oprate": 1,
        "name": "能耗1054",
        "node_name": "能耗02",
        "point_id": 54,
        "group_id": 55,
        "id": 2845,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1890,
        "oprate": 1,
        "name": "能耗1055",
        "node_name": "能耗02",
        "point_id": 55,
        "group_id": 55,
        "id": 2846,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1891,
        "oprate": 1,
        "name": "能耗1056",
        "node_name": "能耗02",
        "point_id": 56,
        "group_id": 55,
        "id": 2847,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1892,
        "oprate": 1,
        "name": "能耗1057",
        "node_name": "能耗02",
        "point_id": 57,
        "group_id": 55,
        "id": 2848,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1893,
        "oprate": 1,
        "name": "能耗1058",
        "node_name": "能耗02",
        "point_id": 58,
        "group_id": 55,
        "id": 2849,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1894,
        "oprate": 1,
        "name": "能耗1059",
        "node_name": "能耗02",
        "point_id": 59,
        "group_id": 55,
        "id": 2850,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1895,
        "oprate": 1,
        "name": "能耗1060",
        "node_name": "能耗02",
        "point_id": 60,
        "group_id": 55,
        "id": 2851,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1902,
        "oprate": 1,
        "name": "能耗1067",
        "node_name": "能耗02",
        "point_id": 67,
        "group_id": 55,
        "id": 2852,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1903,
        "oprate": 1,
        "name": "能耗1068",
        "node_name": "能耗02",
        "point_id": 68,
        "group_id": 55,
        "id": 2853,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1899,
        "oprate": 1,
        "name": "能耗1064",
        "node_name": "能耗02",
        "point_id": 64,
        "group_id": 55,
        "id": 2854,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1897,
        "oprate": 1,
        "name": "能耗1062",
        "node_name": "能耗02",
        "point_id": 62,
        "group_id": 55,
        "id": 2855,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1896,
        "oprate": 1,
        "name": "能耗1061",
        "node_name": "能耗02",
        "point_id": 61,
        "group_id": 55,
        "id": 2856,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1898,
        "oprate": 1,
        "name": "能耗1063",
        "node_name": "能耗02",
        "point_id": 63,
        "group_id": 55,
        "id": 2857,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1900,
        "oprate": 1,
        "name": "能耗1065",
        "node_name": "能耗02",
        "point_id": 65,
        "group_id": 55,
        "id": 2858,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1901,
        "oprate": 1,
        "name": "能耗1066",
        "node_name": "能耗02",
        "point_id": 66,
        "group_id": 55,
        "id": 2859,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1911,
        "oprate": 1,
        "name": "能耗1076",
        "node_name": "能耗02",
        "point_id": 76,
        "group_id": 55,
        "id": 2860,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1908,
        "oprate": 1,
        "name": "能耗1073",
        "node_name": "能耗02",
        "point_id": 73,
        "group_id": 55,
        "id": 2861,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1906,
        "oprate": 1,
        "name": "能耗1071",
        "node_name": "能耗02",
        "point_id": 71,
        "group_id": 55,
        "id": 2862,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1905,
        "oprate": 1,
        "name": "能耗1070",
        "node_name": "能耗02",
        "point_id": 70,
        "group_id": 55,
        "id": 2863,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1904,
        "oprate": 1,
        "name": "能耗1069",
        "node_name": "能耗02",
        "point_id": 69,
        "group_id": 55,
        "id": 2864,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1907,
        "oprate": 1,
        "name": "能耗1072",
        "node_name": "能耗02",
        "point_id": 72,
        "group_id": 55,
        "id": 2865,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1910,
        "oprate": 1,
        "name": "能耗1075",
        "node_name": "能耗02",
        "point_id": 75,
        "group_id": 55,
        "id": 2866,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1909,
        "oprate": 1,
        "name": "能耗1074",
        "node_name": "能耗02",
        "point_id": 74,
        "group_id": 55,
        "id": 2867,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1912,
        "oprate": 1,
        "name": "能耗1077",
        "node_name": "能耗02",
        "point_id": 77,
        "group_id": 55,
        "id": 2868,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1913,
        "oprate": 1,
        "name": "能耗1078",
        "node_name": "能耗02",
        "point_id": 78,
        "group_id": 55,
        "id": 2869,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1914,
        "oprate": 1,
        "name": "能耗1079",
        "node_name": "能耗02",
        "point_id": 79,
        "group_id": 55,
        "id": 2870,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1915,
        "oprate": 1,
        "name": "能耗1080",
        "node_name": "能耗02",
        "point_id": 80,
        "group_id": 55,
        "id": 2871,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1916,
        "oprate": 1,
        "name": "能耗1081",
        "node_name": "能耗02",
        "point_id": 81,
        "group_id": 55,
        "id": 2872,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1917,
        "oprate": 1,
        "name": "能耗1082",
        "node_name": "能耗02",
        "point_id": 82,
        "group_id": 55,
        "id": 2873,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1918,
        "oprate": 1,
        "name": "能耗1083",
        "node_name": "能耗02",
        "point_id": 83,
        "group_id": 55,
        "id": 2874,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1919,
        "oprate": 1,
        "name": "能耗1084",
        "node_name": "能耗02",
        "point_id": 84,
        "group_id": 55,
        "id": 2875,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1920,
        "oprate": 1,
        "name": "能耗1085",
        "node_name": "能耗02",
        "point_id": 85,
        "group_id": 55,
        "id": 2876,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1921,
        "oprate": 1,
        "name": "能耗1086",
        "node_name": "能耗02",
        "point_id": 86,
        "group_id": 55,
        "id": 2877,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1922,
        "oprate": 1,
        "name": "能耗1087",
        "node_name": "能耗02",
        "point_id": 87,
        "group_id": 55,
        "id": 2878,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1923,
        "oprate": 1,
        "name": "能耗1088",
        "node_name": "能耗02",
        "point_id": 88,
        "group_id": 55,
        "id": 2879,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1924,
        "oprate": 1,
        "name": "能耗1089",
        "node_name": "能耗02",
        "point_id": 89,
        "group_id": 55,
        "id": 2880,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1925,
        "oprate": 1,
        "name": "能耗1090",
        "node_name": "能耗02",
        "point_id": 90,
        "group_id": 55,
        "id": 2881,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1926,
        "oprate": 1,
        "name": "能耗1091",
        "node_name": "能耗02",
        "point_id": 91,
        "group_id": 55,
        "id": 2882,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1927,
        "oprate": 1,
        "name": "能耗1092",
        "node_name": "能耗02",
        "point_id": 92,
        "group_id": 55,
        "id": 2883,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1928,
        "oprate": 1,
        "name": "能耗1093",
        "node_name": "能耗02",
        "point_id": 93,
        "group_id": 55,
        "id": 2884,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1929,
        "oprate": 1,
        "name": "能耗1094",
        "node_name": "能耗02",
        "point_id": 94,
        "group_id": 55,
        "id": 2885,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1930,
        "oprate": 1,
        "name": "能耗1095",
        "node_name": "能耗02",
        "point_id": 95,
        "group_id": 55,
        "id": 2886,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1931,
        "oprate": 1,
        "name": "能耗1096",
        "node_name": "能耗02",
        "point_id": 96,
        "group_id": 55,
        "id": 2887,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1932,
        "oprate": 1,
        "name": "能耗1097",
        "node_name": "能耗02",
        "point_id": 97,
        "group_id": 55,
        "id": 2888,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1933,
        "oprate": 1,
        "name": "能耗1098",
        "node_name": "能耗02",
        "point_id": 98,
        "group_id": 55,
        "id": 2889,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1934,
        "oprate": 1,
        "name": "能耗1099",
        "node_name": "能耗02",
        "point_id": 99,
        "group_id": 55,
        "id": 2890,
        "create_time": "2017-06-15 18:38:28"
      }, {
        "tag_id": 1935,
        "oprate": 1,
        "name": "能耗1100",
        "node_name": "能耗02",
        "point_id": 100,
        "group_id": 55,
        "id": 2891,
        "create_time": "2017-06-15 18:38:28"
      }],
      "id": 55,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗12",
      "tag_id_tree": null,
      "hide_tag": 1,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 1936,
        "oprate": 1,
        "name": "能耗1101",
        "node_name": "能耗02",
        "point_id": 101,
        "group_id": 56,
        "id": 2892,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1937,
        "oprate": 1,
        "name": "能耗1102",
        "node_name": "能耗02",
        "point_id": 102,
        "group_id": 56,
        "id": 2893,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1938,
        "oprate": 1,
        "name": "能耗1103",
        "node_name": "能耗02",
        "point_id": 103,
        "group_id": 56,
        "id": 2894,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1939,
        "oprate": 1,
        "name": "能耗1104",
        "node_name": "能耗02",
        "point_id": 104,
        "group_id": 56,
        "id": 2895,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1940,
        "oprate": 1,
        "name": "能耗1105",
        "node_name": "能耗02",
        "point_id": 105,
        "group_id": 56,
        "id": 2896,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1941,
        "oprate": 1,
        "name": "能耗1106",
        "node_name": "能耗02",
        "point_id": 106,
        "group_id": 56,
        "id": 2897,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1942,
        "oprate": 1,
        "name": "能耗1107",
        "node_name": "能耗02",
        "point_id": 107,
        "group_id": 56,
        "id": 2898,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1943,
        "oprate": 1,
        "name": "能耗1108",
        "node_name": "能耗02",
        "point_id": 108,
        "group_id": 56,
        "id": 2899,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1944,
        "oprate": 1,
        "name": "能耗1109",
        "node_name": "能耗02",
        "point_id": 109,
        "group_id": 56,
        "id": 2900,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1945,
        "oprate": 1,
        "name": "能耗1110",
        "node_name": "能耗02",
        "point_id": 110,
        "group_id": 56,
        "id": 2901,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1946,
        "oprate": 1,
        "name": "能耗1111",
        "node_name": "能耗02",
        "point_id": 111,
        "group_id": 56,
        "id": 2902,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1947,
        "oprate": 1,
        "name": "能耗1112",
        "node_name": "能耗02",
        "point_id": 112,
        "group_id": 56,
        "id": 2903,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1948,
        "oprate": 1,
        "name": "能耗1113",
        "node_name": "能耗02",
        "point_id": 113,
        "group_id": 56,
        "id": 2904,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1949,
        "oprate": 1,
        "name": "能耗1114",
        "node_name": "能耗02",
        "point_id": 114,
        "group_id": 56,
        "id": 2905,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1950,
        "oprate": 1,
        "name": "能耗1115",
        "node_name": "能耗02",
        "point_id": 115,
        "group_id": 56,
        "id": 2906,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1951,
        "oprate": 1,
        "name": "能耗1116",
        "node_name": "能耗02",
        "point_id": 116,
        "group_id": 56,
        "id": 2907,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1952,
        "oprate": 1,
        "name": "能耗1117",
        "node_name": "能耗02",
        "point_id": 117,
        "group_id": 56,
        "id": 2908,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1953,
        "oprate": 1,
        "name": "能耗1118",
        "node_name": "能耗02",
        "point_id": 118,
        "group_id": 56,
        "id": 2909,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1954,
        "oprate": 1,
        "name": "能耗1119",
        "node_name": "能耗02",
        "point_id": 119,
        "group_id": 56,
        "id": 2910,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1955,
        "oprate": 1,
        "name": "能耗1120",
        "node_name": "能耗02",
        "point_id": 120,
        "group_id": 56,
        "id": 2911,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1956,
        "oprate": 1,
        "name": "能耗1121",
        "node_name": "能耗02",
        "point_id": 121,
        "group_id": 56,
        "id": 2912,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1957,
        "oprate": 1,
        "name": "能耗1122",
        "node_name": "能耗02",
        "point_id": 122,
        "group_id": 56,
        "id": 2913,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1959,
        "oprate": 1,
        "name": "能耗1124",
        "node_name": "能耗02",
        "point_id": 124,
        "group_id": 56,
        "id": 2914,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1958,
        "oprate": 1,
        "name": "能耗1123",
        "node_name": "能耗02",
        "point_id": 123,
        "group_id": 56,
        "id": 2915,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1960,
        "oprate": 1,
        "name": "能耗1125",
        "node_name": "能耗02",
        "point_id": 125,
        "group_id": 56,
        "id": 2916,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1961,
        "oprate": 1,
        "name": "能耗1126",
        "node_name": "能耗02",
        "point_id": 126,
        "group_id": 56,
        "id": 2917,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1962,
        "oprate": 1,
        "name": "能耗1127",
        "node_name": "能耗02",
        "point_id": 127,
        "group_id": 56,
        "id": 2918,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1963,
        "oprate": 1,
        "name": "能耗1128",
        "node_name": "能耗02",
        "point_id": 128,
        "group_id": 56,
        "id": 2919,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1964,
        "oprate": 1,
        "name": "能耗1129",
        "node_name": "能耗02",
        "point_id": 129,
        "group_id": 56,
        "id": 2920,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1965,
        "oprate": 1,
        "name": "能耗1130",
        "node_name": "能耗02",
        "point_id": 130,
        "group_id": 56,
        "id": 2921,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1966,
        "oprate": 1,
        "name": "能耗1131",
        "node_name": "能耗02",
        "point_id": 131,
        "group_id": 56,
        "id": 2922,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1967,
        "oprate": 1,
        "name": "能耗1132",
        "node_name": "能耗02",
        "point_id": 132,
        "group_id": 56,
        "id": 2923,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1968,
        "oprate": 1,
        "name": "能耗1133",
        "node_name": "能耗02",
        "point_id": 133,
        "group_id": 56,
        "id": 2924,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1969,
        "oprate": 1,
        "name": "能耗1134",
        "node_name": "能耗02",
        "point_id": 134,
        "group_id": 56,
        "id": 2925,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1970,
        "oprate": 1,
        "name": "能耗1135",
        "node_name": "能耗02",
        "point_id": 135,
        "group_id": 56,
        "id": 2926,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1971,
        "oprate": 1,
        "name": "能耗1136",
        "node_name": "能耗02",
        "point_id": 136,
        "group_id": 56,
        "id": 2927,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1972,
        "oprate": 1,
        "name": "能耗1137",
        "node_name": "能耗02",
        "point_id": 137,
        "group_id": 56,
        "id": 2928,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1974,
        "oprate": 1,
        "name": "能耗1139",
        "node_name": "能耗02",
        "point_id": 139,
        "group_id": 56,
        "id": 2929,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1973,
        "oprate": 1,
        "name": "能耗1138",
        "node_name": "能耗02",
        "point_id": 138,
        "group_id": 56,
        "id": 2930,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1975,
        "oprate": 1,
        "name": "能耗1140",
        "node_name": "能耗02",
        "point_id": 140,
        "group_id": 56,
        "id": 2931,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1976,
        "oprate": 1,
        "name": "能耗1141",
        "node_name": "能耗02",
        "point_id": 141,
        "group_id": 56,
        "id": 2932,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1977,
        "oprate": 1,
        "name": "能耗1142",
        "node_name": "能耗02",
        "point_id": 142,
        "group_id": 56,
        "id": 2933,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1979,
        "oprate": 1,
        "name": "能耗1144",
        "node_name": "能耗02",
        "point_id": 144,
        "group_id": 56,
        "id": 2934,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1978,
        "oprate": 1,
        "name": "能耗1143",
        "node_name": "能耗02",
        "point_id": 143,
        "group_id": 56,
        "id": 2935,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1980,
        "oprate": 1,
        "name": "能耗1145",
        "node_name": "能耗02",
        "point_id": 145,
        "group_id": 56,
        "id": 2936,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1981,
        "oprate": 1,
        "name": "能耗1146",
        "node_name": "能耗02",
        "point_id": 146,
        "group_id": 56,
        "id": 2937,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1982,
        "oprate": 1,
        "name": "能耗1147",
        "node_name": "能耗02",
        "point_id": 147,
        "group_id": 56,
        "id": 2938,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1983,
        "oprate": 1,
        "name": "能耗1148",
        "node_name": "能耗02",
        "point_id": 148,
        "group_id": 56,
        "id": 2939,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1984,
        "oprate": 1,
        "name": "能耗1149",
        "node_name": "能耗02",
        "point_id": 149,
        "group_id": 56,
        "id": 2940,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1985,
        "oprate": 1,
        "name": "能耗1150",
        "node_name": "能耗02",
        "point_id": 150,
        "group_id": 56,
        "id": 2941,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1986,
        "oprate": 1,
        "name": "能耗1151",
        "node_name": "能耗02",
        "point_id": 151,
        "group_id": 56,
        "id": 2942,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1987,
        "oprate": 1,
        "name": "能耗1152",
        "node_name": "能耗02",
        "point_id": 152,
        "group_id": 56,
        "id": 2943,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1988,
        "oprate": 1,
        "name": "能耗1153",
        "node_name": "能耗02",
        "point_id": 153,
        "group_id": 56,
        "id": 2944,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1989,
        "oprate": 1,
        "name": "能耗1154",
        "node_name": "能耗02",
        "point_id": 154,
        "group_id": 56,
        "id": 2945,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1990,
        "oprate": 1,
        "name": "能耗1155",
        "node_name": "能耗02",
        "point_id": 155,
        "group_id": 56,
        "id": 2946,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1991,
        "oprate": 1,
        "name": "能耗1156",
        "node_name": "能耗02",
        "point_id": 156,
        "group_id": 56,
        "id": 2947,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1992,
        "oprate": 1,
        "name": "能耗1157",
        "node_name": "能耗02",
        "point_id": 157,
        "group_id": 56,
        "id": 2948,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1993,
        "oprate": 1,
        "name": "能耗1158",
        "node_name": "能耗02",
        "point_id": 158,
        "group_id": 56,
        "id": 2949,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1994,
        "oprate": 1,
        "name": "能耗1159",
        "node_name": "能耗02",
        "point_id": 159,
        "group_id": 56,
        "id": 2950,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1995,
        "oprate": 1,
        "name": "能耗1160",
        "node_name": "能耗02",
        "point_id": 160,
        "group_id": 56,
        "id": 2951,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1996,
        "oprate": 1,
        "name": "能耗1161",
        "node_name": "能耗02",
        "point_id": 161,
        "group_id": 56,
        "id": 2952,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1997,
        "oprate": 1,
        "name": "能耗1162",
        "node_name": "能耗02",
        "point_id": 162,
        "group_id": 56,
        "id": 2953,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2000,
        "oprate": 1,
        "name": "能耗1165",
        "node_name": "能耗02",
        "point_id": 165,
        "group_id": 56,
        "id": 2954,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1999,
        "oprate": 1,
        "name": "能耗1164",
        "node_name": "能耗02",
        "point_id": 164,
        "group_id": 56,
        "id": 2955,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 1998,
        "oprate": 1,
        "name": "能耗1163",
        "node_name": "能耗02",
        "point_id": 163,
        "group_id": 56,
        "id": 2956,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2001,
        "oprate": 1,
        "name": "能耗1166",
        "node_name": "能耗02",
        "point_id": 166,
        "group_id": 56,
        "id": 2957,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2002,
        "oprate": 1,
        "name": "能耗1167",
        "node_name": "能耗02",
        "point_id": 167,
        "group_id": 56,
        "id": 2958,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2003,
        "oprate": 1,
        "name": "能耗1168",
        "node_name": "能耗02",
        "point_id": 168,
        "group_id": 56,
        "id": 2959,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2004,
        "oprate": 1,
        "name": "能耗1169",
        "node_name": "能耗02",
        "point_id": 169,
        "group_id": 56,
        "id": 2960,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2005,
        "oprate": 1,
        "name": "能耗1170",
        "node_name": "能耗02",
        "point_id": 170,
        "group_id": 56,
        "id": 2961,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2007,
        "oprate": 1,
        "name": "能耗1172",
        "node_name": "能耗02",
        "point_id": 172,
        "group_id": 56,
        "id": 2962,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2006,
        "oprate": 1,
        "name": "能耗1171",
        "node_name": "能耗02",
        "point_id": 171,
        "group_id": 56,
        "id": 2963,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2008,
        "oprate": 1,
        "name": "能耗1173",
        "node_name": "能耗02",
        "point_id": 173,
        "group_id": 56,
        "id": 2964,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2009,
        "oprate": 1,
        "name": "能耗1174",
        "node_name": "能耗02",
        "point_id": 174,
        "group_id": 56,
        "id": 2965,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2010,
        "oprate": 1,
        "name": "能耗1175",
        "node_name": "能耗02",
        "point_id": 175,
        "group_id": 56,
        "id": 2966,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2011,
        "oprate": 1,
        "name": "能耗1176",
        "node_name": "能耗02",
        "point_id": 176,
        "group_id": 56,
        "id": 2967,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2012,
        "oprate": 1,
        "name": "能耗1177",
        "node_name": "能耗02",
        "point_id": 177,
        "group_id": 56,
        "id": 2968,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2013,
        "oprate": 1,
        "name": "能耗1178",
        "node_name": "能耗02",
        "point_id": 178,
        "group_id": 56,
        "id": 2969,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2014,
        "oprate": 1,
        "name": "能耗1179",
        "node_name": "能耗02",
        "point_id": 179,
        "group_id": 56,
        "id": 2970,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2015,
        "oprate": 1,
        "name": "能耗1180",
        "node_name": "能耗02",
        "point_id": 180,
        "group_id": 56,
        "id": 2971,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2016,
        "oprate": 1,
        "name": "能耗1181",
        "node_name": "能耗02",
        "point_id": 181,
        "group_id": 56,
        "id": 2972,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2017,
        "oprate": 1,
        "name": "能耗1182",
        "node_name": "能耗02",
        "point_id": 182,
        "group_id": 56,
        "id": 2973,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2018,
        "oprate": 1,
        "name": "能耗1183",
        "node_name": "能耗02",
        "point_id": 183,
        "group_id": 56,
        "id": 2974,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2019,
        "oprate": 1,
        "name": "能耗1184",
        "node_name": "能耗02",
        "point_id": 184,
        "group_id": 56,
        "id": 2975,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2020,
        "oprate": 1,
        "name": "能耗1185",
        "node_name": "能耗02",
        "point_id": 185,
        "group_id": 56,
        "id": 2976,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2021,
        "oprate": 1,
        "name": "能耗1186",
        "node_name": "能耗02",
        "point_id": 186,
        "group_id": 56,
        "id": 2977,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2022,
        "oprate": 1,
        "name": "能耗1187",
        "node_name": "能耗02",
        "point_id": 187,
        "group_id": 56,
        "id": 2978,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2023,
        "oprate": 1,
        "name": "能耗1188",
        "node_name": "能耗02",
        "point_id": 188,
        "group_id": 56,
        "id": 2979,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2025,
        "oprate": 1,
        "name": "能耗1190",
        "node_name": "能耗02",
        "point_id": 190,
        "group_id": 56,
        "id": 2980,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2024,
        "oprate": 1,
        "name": "能耗1189",
        "node_name": "能耗02",
        "point_id": 189,
        "group_id": 56,
        "id": 2981,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2026,
        "oprate": 1,
        "name": "能耗1191",
        "node_name": "能耗02",
        "point_id": 191,
        "group_id": 56,
        "id": 2982,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2027,
        "oprate": 1,
        "name": "能耗1192",
        "node_name": "能耗02",
        "point_id": 192,
        "group_id": 56,
        "id": 2983,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2028,
        "oprate": 1,
        "name": "能耗1193",
        "node_name": "能耗02",
        "point_id": 193,
        "group_id": 56,
        "id": 2984,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2029,
        "oprate": 1,
        "name": "能耗1194",
        "node_name": "能耗02",
        "point_id": 194,
        "group_id": 56,
        "id": 2985,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2030,
        "oprate": 1,
        "name": "能耗1195",
        "node_name": "能耗02",
        "point_id": 195,
        "group_id": 56,
        "id": 2986,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2032,
        "oprate": 1,
        "name": "能耗1197",
        "node_name": "能耗02",
        "point_id": 197,
        "group_id": 56,
        "id": 2987,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2031,
        "oprate": 1,
        "name": "能耗1196",
        "node_name": "能耗02",
        "point_id": 196,
        "group_id": 56,
        "id": 2988,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2033,
        "oprate": 1,
        "name": "能耗1198",
        "node_name": "能耗02",
        "point_id": 198,
        "group_id": 56,
        "id": 2989,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2034,
        "oprate": 1,
        "name": "能耗1199",
        "node_name": "能耗02",
        "point_id": 199,
        "group_id": 56,
        "id": 2990,
        "create_time": "2017-06-15 18:38:37"
      }, {
        "tag_id": 2035,
        "oprate": 1,
        "name": "能耗1200",
        "node_name": "能耗02",
        "point_id": 200,
        "group_id": 56,
        "id": 2991,
        "create_time": "2017-06-15 18:38:37"
      }],
      "id": 56,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗13",
      "tag_id_tree": null,
      "hide_tag": 1,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2036,
        "oprate": 1,
        "name": "能耗1201",
        "node_name": "能耗02",
        "point_id": 201,
        "group_id": 57,
        "id": 2992,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2037,
        "oprate": 1,
        "name": "能耗1202",
        "node_name": "能耗02",
        "point_id": 202,
        "group_id": 57,
        "id": 2993,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2038,
        "oprate": 1,
        "name": "能耗1203",
        "node_name": "能耗02",
        "point_id": 203,
        "group_id": 57,
        "id": 2994,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2039,
        "oprate": 1,
        "name": "能耗1204",
        "node_name": "能耗02",
        "point_id": 204,
        "group_id": 57,
        "id": 2995,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2040,
        "oprate": 1,
        "name": "能耗1205",
        "node_name": "能耗02",
        "point_id": 205,
        "group_id": 57,
        "id": 2996,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2041,
        "oprate": 1,
        "name": "能耗1206",
        "node_name": "能耗02",
        "point_id": 206,
        "group_id": 57,
        "id": 2997,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2042,
        "oprate": 1,
        "name": "能耗1207",
        "node_name": "能耗02",
        "point_id": 207,
        "group_id": 57,
        "id": 2998,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2043,
        "oprate": 1,
        "name": "能耗1208",
        "node_name": "能耗02",
        "point_id": 208,
        "group_id": 57,
        "id": 2999,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2045,
        "oprate": 1,
        "name": "能耗1210",
        "node_name": "能耗02",
        "point_id": 210,
        "group_id": 57,
        "id": 3000,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2044,
        "oprate": 1,
        "name": "能耗1209",
        "node_name": "能耗02",
        "point_id": 209,
        "group_id": 57,
        "id": 3001,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2046,
        "oprate": 1,
        "name": "能耗1211",
        "node_name": "能耗02",
        "point_id": 211,
        "group_id": 57,
        "id": 3002,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2047,
        "oprate": 1,
        "name": "能耗1212",
        "node_name": "能耗02",
        "point_id": 212,
        "group_id": 57,
        "id": 3003,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2048,
        "oprate": 1,
        "name": "能耗1213",
        "node_name": "能耗02",
        "point_id": 213,
        "group_id": 57,
        "id": 3004,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2049,
        "oprate": 1,
        "name": "能耗1214",
        "node_name": "能耗02",
        "point_id": 214,
        "group_id": 57,
        "id": 3005,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2050,
        "oprate": 1,
        "name": "能耗1215",
        "node_name": "能耗02",
        "point_id": 215,
        "group_id": 57,
        "id": 3006,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2051,
        "oprate": 1,
        "name": "能耗1216",
        "node_name": "能耗02",
        "point_id": 216,
        "group_id": 57,
        "id": 3007,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2052,
        "oprate": 1,
        "name": "能耗1217",
        "node_name": "能耗02",
        "point_id": 217,
        "group_id": 57,
        "id": 3008,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2053,
        "oprate": 1,
        "name": "能耗1218",
        "node_name": "能耗02",
        "point_id": 218,
        "group_id": 57,
        "id": 3009,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2054,
        "oprate": 1,
        "name": "能耗1219",
        "node_name": "能耗02",
        "point_id": 219,
        "group_id": 57,
        "id": 3010,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2055,
        "oprate": 1,
        "name": "能耗1220",
        "node_name": "能耗02",
        "point_id": 220,
        "group_id": 57,
        "id": 3011,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2056,
        "oprate": 1,
        "name": "能耗1221",
        "node_name": "能耗02",
        "point_id": 221,
        "group_id": 57,
        "id": 3012,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2057,
        "oprate": 1,
        "name": "能耗1222",
        "node_name": "能耗02",
        "point_id": 222,
        "group_id": 57,
        "id": 3013,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2058,
        "oprate": 1,
        "name": "能耗1223",
        "node_name": "能耗02",
        "point_id": 223,
        "group_id": 57,
        "id": 3014,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2059,
        "oprate": 1,
        "name": "能耗1224",
        "node_name": "能耗02",
        "point_id": 224,
        "group_id": 57,
        "id": 3015,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2060,
        "oprate": 1,
        "name": "能耗1225",
        "node_name": "能耗02",
        "point_id": 225,
        "group_id": 57,
        "id": 3016,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2061,
        "oprate": 1,
        "name": "能耗1226",
        "node_name": "能耗02",
        "point_id": 226,
        "group_id": 57,
        "id": 3017,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2062,
        "oprate": 1,
        "name": "能耗1227",
        "node_name": "能耗02",
        "point_id": 227,
        "group_id": 57,
        "id": 3018,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2063,
        "oprate": 1,
        "name": "能耗1228",
        "node_name": "能耗02",
        "point_id": 228,
        "group_id": 57,
        "id": 3019,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2064,
        "oprate": 1,
        "name": "能耗1229",
        "node_name": "能耗02",
        "point_id": 229,
        "group_id": 57,
        "id": 3020,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2065,
        "oprate": 1,
        "name": "能耗1230",
        "node_name": "能耗02",
        "point_id": 230,
        "group_id": 57,
        "id": 3021,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2066,
        "oprate": 1,
        "name": "能耗1231",
        "node_name": "能耗02",
        "point_id": 231,
        "group_id": 57,
        "id": 3022,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2067,
        "oprate": 1,
        "name": "能耗1232",
        "node_name": "能耗02",
        "point_id": 232,
        "group_id": 57,
        "id": 3023,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2068,
        "oprate": 1,
        "name": "能耗1233",
        "node_name": "能耗02",
        "point_id": 233,
        "group_id": 57,
        "id": 3024,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2069,
        "oprate": 1,
        "name": "能耗1234",
        "node_name": "能耗02",
        "point_id": 234,
        "group_id": 57,
        "id": 3025,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2070,
        "oprate": 1,
        "name": "能耗1235",
        "node_name": "能耗02",
        "point_id": 235,
        "group_id": 57,
        "id": 3026,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2071,
        "oprate": 1,
        "name": "能耗1236",
        "node_name": "能耗02",
        "point_id": 236,
        "group_id": 57,
        "id": 3027,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2072,
        "oprate": 1,
        "name": "能耗1237",
        "node_name": "能耗02",
        "point_id": 237,
        "group_id": 57,
        "id": 3028,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2073,
        "oprate": 1,
        "name": "能耗1238",
        "node_name": "能耗02",
        "point_id": 238,
        "group_id": 57,
        "id": 3029,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2074,
        "oprate": 1,
        "name": "能耗1239",
        "node_name": "能耗02",
        "point_id": 239,
        "group_id": 57,
        "id": 3030,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2075,
        "oprate": 1,
        "name": "能耗1240",
        "node_name": "能耗02",
        "point_id": 240,
        "group_id": 57,
        "id": 3031,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2076,
        "oprate": 1,
        "name": "能耗1241",
        "node_name": "能耗02",
        "point_id": 241,
        "group_id": 57,
        "id": 3032,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2077,
        "oprate": 1,
        "name": "能耗1242",
        "node_name": "能耗02",
        "point_id": 242,
        "group_id": 57,
        "id": 3033,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2078,
        "oprate": 1,
        "name": "能耗1243",
        "node_name": "能耗02",
        "point_id": 243,
        "group_id": 57,
        "id": 3034,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2079,
        "oprate": 1,
        "name": "能耗1244",
        "node_name": "能耗02",
        "point_id": 244,
        "group_id": 57,
        "id": 3035,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2080,
        "oprate": 1,
        "name": "能耗1245",
        "node_name": "能耗02",
        "point_id": 245,
        "group_id": 57,
        "id": 3036,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2081,
        "oprate": 1,
        "name": "能耗1246",
        "node_name": "能耗02",
        "point_id": 246,
        "group_id": 57,
        "id": 3037,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2082,
        "oprate": 1,
        "name": "能耗1247",
        "node_name": "能耗02",
        "point_id": 247,
        "group_id": 57,
        "id": 3038,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2083,
        "oprate": 1,
        "name": "能耗1248",
        "node_name": "能耗02",
        "point_id": 248,
        "group_id": 57,
        "id": 3039,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2084,
        "oprate": 1,
        "name": "能耗1249",
        "node_name": "能耗02",
        "point_id": 249,
        "group_id": 57,
        "id": 3040,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2085,
        "oprate": 1,
        "name": "能耗1250",
        "node_name": "能耗02",
        "point_id": 250,
        "group_id": 57,
        "id": 3041,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2086,
        "oprate": 1,
        "name": "能耗1251",
        "node_name": "能耗02",
        "point_id": 251,
        "group_id": 57,
        "id": 3042,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2087,
        "oprate": 1,
        "name": "能耗1252",
        "node_name": "能耗02",
        "point_id": 252,
        "group_id": 57,
        "id": 3043,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2088,
        "oprate": 1,
        "name": "能耗1253",
        "node_name": "能耗02",
        "point_id": 253,
        "group_id": 57,
        "id": 3044,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2089,
        "oprate": 1,
        "name": "能耗1254",
        "node_name": "能耗02",
        "point_id": 254,
        "group_id": 57,
        "id": 3045,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2090,
        "oprate": 1,
        "name": "能耗1255",
        "node_name": "能耗02",
        "point_id": 255,
        "group_id": 57,
        "id": 3046,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2091,
        "oprate": 1,
        "name": "能耗1256",
        "node_name": "能耗02",
        "point_id": 256,
        "group_id": 57,
        "id": 3047,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2092,
        "oprate": 1,
        "name": "能耗1257",
        "node_name": "能耗02",
        "point_id": 257,
        "group_id": 57,
        "id": 3048,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2093,
        "oprate": 1,
        "name": "能耗1258",
        "node_name": "能耗02",
        "point_id": 258,
        "group_id": 57,
        "id": 3049,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2094,
        "oprate": 1,
        "name": "能耗1259",
        "node_name": "能耗02",
        "point_id": 259,
        "group_id": 57,
        "id": 3050,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2095,
        "oprate": 1,
        "name": "能耗1260",
        "node_name": "能耗02",
        "point_id": 260,
        "group_id": 57,
        "id": 3051,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2096,
        "oprate": 1,
        "name": "能耗1261",
        "node_name": "能耗02",
        "point_id": 261,
        "group_id": 57,
        "id": 3052,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2097,
        "oprate": 1,
        "name": "能耗1262",
        "node_name": "能耗02",
        "point_id": 262,
        "group_id": 57,
        "id": 3053,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2098,
        "oprate": 1,
        "name": "能耗1263",
        "node_name": "能耗02",
        "point_id": 263,
        "group_id": 57,
        "id": 3054,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2099,
        "oprate": 1,
        "name": "能耗1264",
        "node_name": "能耗02",
        "point_id": 264,
        "group_id": 57,
        "id": 3055,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2100,
        "oprate": 1,
        "name": "能耗1265",
        "node_name": "能耗02",
        "point_id": 265,
        "group_id": 57,
        "id": 3056,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2101,
        "oprate": 1,
        "name": "能耗1266",
        "node_name": "能耗02",
        "point_id": 266,
        "group_id": 57,
        "id": 3057,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2102,
        "oprate": 1,
        "name": "能耗1267",
        "node_name": "能耗02",
        "point_id": 267,
        "group_id": 57,
        "id": 3058,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2103,
        "oprate": 1,
        "name": "能耗1268",
        "node_name": "能耗02",
        "point_id": 268,
        "group_id": 57,
        "id": 3059,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2104,
        "oprate": 1,
        "name": "能耗1269",
        "node_name": "能耗02",
        "point_id": 269,
        "group_id": 57,
        "id": 3060,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2106,
        "oprate": 1,
        "name": "能耗1271",
        "node_name": "能耗02",
        "point_id": 271,
        "group_id": 57,
        "id": 3061,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2105,
        "oprate": 1,
        "name": "能耗1270",
        "node_name": "能耗02",
        "point_id": 270,
        "group_id": 57,
        "id": 3062,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2107,
        "oprate": 1,
        "name": "能耗1272",
        "node_name": "能耗02",
        "point_id": 272,
        "group_id": 57,
        "id": 3063,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2109,
        "oprate": 1,
        "name": "能耗1274",
        "node_name": "能耗02",
        "point_id": 274,
        "group_id": 57,
        "id": 3064,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2108,
        "oprate": 1,
        "name": "能耗1273",
        "node_name": "能耗02",
        "point_id": 273,
        "group_id": 57,
        "id": 3065,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2110,
        "oprate": 1,
        "name": "能耗1275",
        "node_name": "能耗02",
        "point_id": 275,
        "group_id": 57,
        "id": 3066,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2111,
        "oprate": 1,
        "name": "能耗1276",
        "node_name": "能耗02",
        "point_id": 276,
        "group_id": 57,
        "id": 3067,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2112,
        "oprate": 1,
        "name": "能耗1277",
        "node_name": "能耗02",
        "point_id": 277,
        "group_id": 57,
        "id": 3068,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2113,
        "oprate": 1,
        "name": "能耗1278",
        "node_name": "能耗02",
        "point_id": 278,
        "group_id": 57,
        "id": 3069,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2114,
        "oprate": 1,
        "name": "能耗1279",
        "node_name": "能耗02",
        "point_id": 279,
        "group_id": 57,
        "id": 3070,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2115,
        "oprate": 1,
        "name": "能耗1280",
        "node_name": "能耗02",
        "point_id": 280,
        "group_id": 57,
        "id": 3071,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2116,
        "oprate": 1,
        "name": "能耗1281",
        "node_name": "能耗02",
        "point_id": 281,
        "group_id": 57,
        "id": 3072,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2117,
        "oprate": 1,
        "name": "能耗1282",
        "node_name": "能耗02",
        "point_id": 282,
        "group_id": 57,
        "id": 3073,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2118,
        "oprate": 1,
        "name": "能耗1283",
        "node_name": "能耗02",
        "point_id": 283,
        "group_id": 57,
        "id": 3074,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2119,
        "oprate": 1,
        "name": "能耗1284",
        "node_name": "能耗02",
        "point_id": 284,
        "group_id": 57,
        "id": 3075,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2120,
        "oprate": 1,
        "name": "能耗1285",
        "node_name": "能耗02",
        "point_id": 285,
        "group_id": 57,
        "id": 3076,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2121,
        "oprate": 1,
        "name": "能耗1286",
        "node_name": "能耗02",
        "point_id": 286,
        "group_id": 57,
        "id": 3077,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2122,
        "oprate": 1,
        "name": "能耗1287",
        "node_name": "能耗02",
        "point_id": 287,
        "group_id": 57,
        "id": 3078,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2123,
        "oprate": 1,
        "name": "能耗1288",
        "node_name": "能耗02",
        "point_id": 288,
        "group_id": 57,
        "id": 3079,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2124,
        "oprate": 1,
        "name": "能耗1289",
        "node_name": "能耗02",
        "point_id": 289,
        "group_id": 57,
        "id": 3080,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2125,
        "oprate": 1,
        "name": "能耗1290",
        "node_name": "能耗02",
        "point_id": 290,
        "group_id": 57,
        "id": 3081,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2126,
        "oprate": 1,
        "name": "能耗1291",
        "node_name": "能耗02",
        "point_id": 291,
        "group_id": 57,
        "id": 3082,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2127,
        "oprate": 1,
        "name": "能耗1292",
        "node_name": "能耗02",
        "point_id": 292,
        "group_id": 57,
        "id": 3083,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2128,
        "oprate": 1,
        "name": "能耗1293",
        "node_name": "能耗02",
        "point_id": 293,
        "group_id": 57,
        "id": 3084,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2129,
        "oprate": 1,
        "name": "能耗1294",
        "node_name": "能耗02",
        "point_id": 294,
        "group_id": 57,
        "id": 3085,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2130,
        "oprate": 1,
        "name": "能耗1295",
        "node_name": "能耗02",
        "point_id": 295,
        "group_id": 57,
        "id": 3086,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2131,
        "oprate": 1,
        "name": "能耗1296",
        "node_name": "能耗02",
        "point_id": 296,
        "group_id": 57,
        "id": 3087,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2132,
        "oprate": 1,
        "name": "能耗1297",
        "node_name": "能耗02",
        "point_id": 297,
        "group_id": 57,
        "id": 3088,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2133,
        "oprate": 1,
        "name": "能耗1298",
        "node_name": "能耗02",
        "point_id": 298,
        "group_id": 57,
        "id": 3089,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2134,
        "oprate": 1,
        "name": "能耗1299",
        "node_name": "能耗02",
        "point_id": 299,
        "group_id": 57,
        "id": 3090,
        "create_time": "2017-06-15 18:38:41"
      }, {
        "tag_id": 2135,
        "oprate": 1,
        "name": "能耗1300",
        "node_name": "能耗02",
        "point_id": 300,
        "group_id": 57,
        "id": 3091,
        "create_time": "2017-06-15 18:38:41"
      }],
      "id": 57,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗14",
      "tag_id_tree": null,
      "hide_tag": 1,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2136,
        "oprate": 1,
        "name": "能耗1301",
        "node_name": "能耗02",
        "point_id": 301,
        "group_id": 58,
        "id": 3092,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2137,
        "oprate": 1,
        "name": "能耗1302",
        "node_name": "能耗02",
        "point_id": 302,
        "group_id": 58,
        "id": 3093,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2138,
        "oprate": 1,
        "name": "能耗1303",
        "node_name": "能耗02",
        "point_id": 303,
        "group_id": 58,
        "id": 3094,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2139,
        "oprate": 1,
        "name": "能耗1304",
        "node_name": "能耗02",
        "point_id": 304,
        "group_id": 58,
        "id": 3095,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2140,
        "oprate": 1,
        "name": "能耗1305",
        "node_name": "能耗02",
        "point_id": 305,
        "group_id": 58,
        "id": 3096,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2141,
        "oprate": 1,
        "name": "能耗1306",
        "node_name": "能耗02",
        "point_id": 306,
        "group_id": 58,
        "id": 3097,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2142,
        "oprate": 1,
        "name": "能耗1307",
        "node_name": "能耗02",
        "point_id": 307,
        "group_id": 58,
        "id": 3098,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2143,
        "oprate": 1,
        "name": "能耗1308",
        "node_name": "能耗02",
        "point_id": 308,
        "group_id": 58,
        "id": 3099,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2144,
        "oprate": 1,
        "name": "能耗1309",
        "node_name": "能耗02",
        "point_id": 309,
        "group_id": 58,
        "id": 3100,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2145,
        "oprate": 1,
        "name": "能耗1310",
        "node_name": "能耗02",
        "point_id": 310,
        "group_id": 58,
        "id": 3101,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2146,
        "oprate": 1,
        "name": "能耗1311",
        "node_name": "能耗02",
        "point_id": 311,
        "group_id": 58,
        "id": 3102,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2147,
        "oprate": 1,
        "name": "能耗1312",
        "node_name": "能耗02",
        "point_id": 312,
        "group_id": 58,
        "id": 3103,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2148,
        "oprate": 1,
        "name": "能耗1313",
        "node_name": "能耗02",
        "point_id": 313,
        "group_id": 58,
        "id": 3104,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2149,
        "oprate": 1,
        "name": "能耗1314",
        "node_name": "能耗02",
        "point_id": 314,
        "group_id": 58,
        "id": 3105,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2150,
        "oprate": 1,
        "name": "能耗1315",
        "node_name": "能耗02",
        "point_id": 315,
        "group_id": 58,
        "id": 3106,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2151,
        "oprate": 1,
        "name": "能耗1316",
        "node_name": "能耗02",
        "point_id": 316,
        "group_id": 58,
        "id": 3107,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2152,
        "oprate": 1,
        "name": "能耗1317",
        "node_name": "能耗02",
        "point_id": 317,
        "group_id": 58,
        "id": 3108,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2153,
        "oprate": 1,
        "name": "能耗1318",
        "node_name": "能耗02",
        "point_id": 318,
        "group_id": 58,
        "id": 3109,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2154,
        "oprate": 1,
        "name": "能耗1319",
        "node_name": "能耗02",
        "point_id": 319,
        "group_id": 58,
        "id": 3110,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2156,
        "oprate": 1,
        "name": "能耗1321",
        "node_name": "能耗02",
        "point_id": 321,
        "group_id": 58,
        "id": 3111,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2155,
        "oprate": 1,
        "name": "能耗1320",
        "node_name": "能耗02",
        "point_id": 320,
        "group_id": 58,
        "id": 3112,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2157,
        "oprate": 1,
        "name": "能耗1322",
        "node_name": "能耗02",
        "point_id": 322,
        "group_id": 58,
        "id": 3113,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2158,
        "oprate": 1,
        "name": "能耗1323",
        "node_name": "能耗02",
        "point_id": 323,
        "group_id": 58,
        "id": 3114,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2159,
        "oprate": 1,
        "name": "能耗1324",
        "node_name": "能耗02",
        "point_id": 324,
        "group_id": 58,
        "id": 3115,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2160,
        "oprate": 1,
        "name": "能耗1325",
        "node_name": "能耗02",
        "point_id": 325,
        "group_id": 58,
        "id": 3116,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2161,
        "oprate": 1,
        "name": "能耗1326",
        "node_name": "能耗02",
        "point_id": 326,
        "group_id": 58,
        "id": 3117,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2162,
        "oprate": 1,
        "name": "能耗1327",
        "node_name": "能耗02",
        "point_id": 327,
        "group_id": 58,
        "id": 3118,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2163,
        "oprate": 1,
        "name": "能耗1328",
        "node_name": "能耗02",
        "point_id": 328,
        "group_id": 58,
        "id": 3119,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2164,
        "oprate": 1,
        "name": "能耗1329",
        "node_name": "能耗02",
        "point_id": 329,
        "group_id": 58,
        "id": 3120,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2165,
        "oprate": 1,
        "name": "能耗1330",
        "node_name": "能耗02",
        "point_id": 330,
        "group_id": 58,
        "id": 3121,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2166,
        "oprate": 1,
        "name": "能耗1331",
        "node_name": "能耗02",
        "point_id": 331,
        "group_id": 58,
        "id": 3122,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2167,
        "oprate": 1,
        "name": "能耗1332",
        "node_name": "能耗02",
        "point_id": 332,
        "group_id": 58,
        "id": 3123,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2168,
        "oprate": 1,
        "name": "能耗1333",
        "node_name": "能耗02",
        "point_id": 333,
        "group_id": 58,
        "id": 3124,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2169,
        "oprate": 1,
        "name": "能耗1334",
        "node_name": "能耗02",
        "point_id": 334,
        "group_id": 58,
        "id": 3125,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2170,
        "oprate": 1,
        "name": "能耗1335",
        "node_name": "能耗02",
        "point_id": 335,
        "group_id": 58,
        "id": 3126,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2171,
        "oprate": 1,
        "name": "能耗1336",
        "node_name": "能耗02",
        "point_id": 336,
        "group_id": 58,
        "id": 3127,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2172,
        "oprate": 1,
        "name": "能耗1337",
        "node_name": "能耗02",
        "point_id": 337,
        "group_id": 58,
        "id": 3128,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2173,
        "oprate": 1,
        "name": "能耗1338",
        "node_name": "能耗02",
        "point_id": 338,
        "group_id": 58,
        "id": 3129,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2174,
        "oprate": 1,
        "name": "能耗1339",
        "node_name": "能耗02",
        "point_id": 339,
        "group_id": 58,
        "id": 3130,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2175,
        "oprate": 1,
        "name": "能耗1340",
        "node_name": "能耗02",
        "point_id": 340,
        "group_id": 58,
        "id": 3131,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2177,
        "oprate": 1,
        "name": "能耗1342",
        "node_name": "能耗02",
        "point_id": 342,
        "group_id": 58,
        "id": 3132,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2176,
        "oprate": 1,
        "name": "能耗1341",
        "node_name": "能耗02",
        "point_id": 341,
        "group_id": 58,
        "id": 3133,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2178,
        "oprate": 1,
        "name": "能耗1343",
        "node_name": "能耗02",
        "point_id": 343,
        "group_id": 58,
        "id": 3134,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2179,
        "oprate": 1,
        "name": "能耗1344",
        "node_name": "能耗02",
        "point_id": 344,
        "group_id": 58,
        "id": 3135,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2180,
        "oprate": 1,
        "name": "能耗1345",
        "node_name": "能耗02",
        "point_id": 345,
        "group_id": 58,
        "id": 3136,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2181,
        "oprate": 1,
        "name": "能耗1346",
        "node_name": "能耗02",
        "point_id": 346,
        "group_id": 58,
        "id": 3137,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2182,
        "oprate": 1,
        "name": "能耗1347",
        "node_name": "能耗02",
        "point_id": 347,
        "group_id": 58,
        "id": 3138,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2183,
        "oprate": 1,
        "name": "能耗1348",
        "node_name": "能耗02",
        "point_id": 348,
        "group_id": 58,
        "id": 3139,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2184,
        "oprate": 1,
        "name": "能耗1349",
        "node_name": "能耗02",
        "point_id": 349,
        "group_id": 58,
        "id": 3140,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2185,
        "oprate": 1,
        "name": "能耗1350",
        "node_name": "能耗02",
        "point_id": 350,
        "group_id": 58,
        "id": 3141,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2186,
        "oprate": 1,
        "name": "能耗1351",
        "node_name": "能耗02",
        "point_id": 351,
        "group_id": 58,
        "id": 3142,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2187,
        "oprate": 1,
        "name": "能耗1352",
        "node_name": "能耗02",
        "point_id": 352,
        "group_id": 58,
        "id": 3143,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2188,
        "oprate": 1,
        "name": "能耗1353",
        "node_name": "能耗02",
        "point_id": 353,
        "group_id": 58,
        "id": 3144,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2189,
        "oprate": 1,
        "name": "能耗1354",
        "node_name": "能耗02",
        "point_id": 354,
        "group_id": 58,
        "id": 3145,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2190,
        "oprate": 1,
        "name": "能耗1355",
        "node_name": "能耗02",
        "point_id": 355,
        "group_id": 58,
        "id": 3146,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2191,
        "oprate": 1,
        "name": "能耗1356",
        "node_name": "能耗02",
        "point_id": 356,
        "group_id": 58,
        "id": 3147,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2192,
        "oprate": 1,
        "name": "能耗1357",
        "node_name": "能耗02",
        "point_id": 357,
        "group_id": 58,
        "id": 3148,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2193,
        "oprate": 1,
        "name": "能耗1358",
        "node_name": "能耗02",
        "point_id": 358,
        "group_id": 58,
        "id": 3149,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2195,
        "oprate": 1,
        "name": "能耗1360",
        "node_name": "能耗02",
        "point_id": 360,
        "group_id": 58,
        "id": 3150,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2194,
        "oprate": 1,
        "name": "能耗1359",
        "node_name": "能耗02",
        "point_id": 359,
        "group_id": 58,
        "id": 3151,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2196,
        "oprate": 1,
        "name": "能耗1361",
        "node_name": "能耗02",
        "point_id": 361,
        "group_id": 58,
        "id": 3152,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2197,
        "oprate": 1,
        "name": "能耗1362",
        "node_name": "能耗02",
        "point_id": 362,
        "group_id": 58,
        "id": 3153,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2198,
        "oprate": 1,
        "name": "能耗1363",
        "node_name": "能耗02",
        "point_id": 363,
        "group_id": 58,
        "id": 3154,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2199,
        "oprate": 1,
        "name": "能耗1364",
        "node_name": "能耗02",
        "point_id": 364,
        "group_id": 58,
        "id": 3155,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2200,
        "oprate": 1,
        "name": "能耗1365",
        "node_name": "能耗02",
        "point_id": 365,
        "group_id": 58,
        "id": 3156,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2201,
        "oprate": 1,
        "name": "能耗1366",
        "node_name": "能耗02",
        "point_id": 366,
        "group_id": 58,
        "id": 3157,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2202,
        "oprate": 1,
        "name": "能耗1367",
        "node_name": "能耗02",
        "point_id": 367,
        "group_id": 58,
        "id": 3158,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2203,
        "oprate": 1,
        "name": "能耗1368",
        "node_name": "能耗02",
        "point_id": 368,
        "group_id": 58,
        "id": 3159,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2204,
        "oprate": 1,
        "name": "能耗1369",
        "node_name": "能耗02",
        "point_id": 369,
        "group_id": 58,
        "id": 3160,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2205,
        "oprate": 1,
        "name": "能耗1370",
        "node_name": "能耗02",
        "point_id": 370,
        "group_id": 58,
        "id": 3161,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2206,
        "oprate": 1,
        "name": "能耗1371",
        "node_name": "能耗02",
        "point_id": 371,
        "group_id": 58,
        "id": 3162,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2207,
        "oprate": 1,
        "name": "能耗1372",
        "node_name": "能耗02",
        "point_id": 372,
        "group_id": 58,
        "id": 3163,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2208,
        "oprate": 1,
        "name": "能耗1373",
        "node_name": "能耗02",
        "point_id": 373,
        "group_id": 58,
        "id": 3164,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2209,
        "oprate": 1,
        "name": "能耗1374",
        "node_name": "能耗02",
        "point_id": 374,
        "group_id": 58,
        "id": 3165,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2210,
        "oprate": 1,
        "name": "能耗1375",
        "node_name": "能耗02",
        "point_id": 375,
        "group_id": 58,
        "id": 3166,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2211,
        "oprate": 1,
        "name": "能耗1376",
        "node_name": "能耗02",
        "point_id": 376,
        "group_id": 58,
        "id": 3167,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2213,
        "oprate": 1,
        "name": "能耗1378",
        "node_name": "能耗02",
        "point_id": 378,
        "group_id": 58,
        "id": 3168,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2212,
        "oprate": 1,
        "name": "能耗1377",
        "node_name": "能耗02",
        "point_id": 377,
        "group_id": 58,
        "id": 3169,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2214,
        "oprate": 1,
        "name": "能耗1379",
        "node_name": "能耗02",
        "point_id": 379,
        "group_id": 58,
        "id": 3170,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2215,
        "oprate": 1,
        "name": "能耗1380",
        "node_name": "能耗02",
        "point_id": 380,
        "group_id": 58,
        "id": 3171,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2216,
        "oprate": 1,
        "name": "能耗1381",
        "node_name": "能耗02",
        "point_id": 381,
        "group_id": 58,
        "id": 3172,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2217,
        "oprate": 1,
        "name": "能耗1382",
        "node_name": "能耗02",
        "point_id": 382,
        "group_id": 58,
        "id": 3173,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2218,
        "oprate": 1,
        "name": "能耗1383",
        "node_name": "能耗02",
        "point_id": 383,
        "group_id": 58,
        "id": 3174,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2219,
        "oprate": 1,
        "name": "能耗1384",
        "node_name": "能耗02",
        "point_id": 384,
        "group_id": 58,
        "id": 3175,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2220,
        "oprate": 1,
        "name": "能耗1385",
        "node_name": "能耗02",
        "point_id": 385,
        "group_id": 58,
        "id": 3176,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2221,
        "oprate": 1,
        "name": "能耗1386",
        "node_name": "能耗02",
        "point_id": 386,
        "group_id": 58,
        "id": 3177,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2222,
        "oprate": 1,
        "name": "能耗1387",
        "node_name": "能耗02",
        "point_id": 387,
        "group_id": 58,
        "id": 3178,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2223,
        "oprate": 1,
        "name": "能耗1388",
        "node_name": "能耗02",
        "point_id": 388,
        "group_id": 58,
        "id": 3179,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2224,
        "oprate": 1,
        "name": "能耗1389",
        "node_name": "能耗02",
        "point_id": 389,
        "group_id": 58,
        "id": 3180,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2225,
        "oprate": 1,
        "name": "能耗1390",
        "node_name": "能耗02",
        "point_id": 390,
        "group_id": 58,
        "id": 3181,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2226,
        "oprate": 1,
        "name": "能耗1391",
        "node_name": "能耗02",
        "point_id": 391,
        "group_id": 58,
        "id": 3182,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2227,
        "oprate": 1,
        "name": "能耗1392",
        "node_name": "能耗02",
        "point_id": 392,
        "group_id": 58,
        "id": 3183,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2228,
        "oprate": 1,
        "name": "能耗1393",
        "node_name": "能耗02",
        "point_id": 393,
        "group_id": 58,
        "id": 3184,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2229,
        "oprate": 1,
        "name": "能耗1394",
        "node_name": "能耗02",
        "point_id": 394,
        "group_id": 58,
        "id": 3185,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2230,
        "oprate": 1,
        "name": "能耗1395",
        "node_name": "能耗02",
        "point_id": 395,
        "group_id": 58,
        "id": 3186,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2231,
        "oprate": 1,
        "name": "能耗1396",
        "node_name": "能耗02",
        "point_id": 396,
        "group_id": 58,
        "id": 3187,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2232,
        "oprate": 1,
        "name": "能耗1397",
        "node_name": "能耗02",
        "point_id": 397,
        "group_id": 58,
        "id": 3188,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2233,
        "oprate": 1,
        "name": "能耗1398",
        "node_name": "能耗02",
        "point_id": 398,
        "group_id": 58,
        "id": 3189,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2234,
        "oprate": 1,
        "name": "能耗1399",
        "node_name": "能耗02",
        "point_id": 399,
        "group_id": 58,
        "id": 3190,
        "create_time": "2017-06-15 18:38:44"
      }, {
        "tag_id": 2235,
        "oprate": 1,
        "name": "能耗1400",
        "node_name": "能耗02",
        "point_id": 400,
        "group_id": 58,
        "id": 3191,
        "create_time": "2017-06-15 18:38:44"
      }],
      "id": 58,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗15",
      "tag_id_tree": null,
      "hide_tag": 1,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2236,
        "oprate": 1,
        "name": "能耗1401",
        "node_name": "能耗02",
        "point_id": 401,
        "group_id": 59,
        "id": 3192,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2237,
        "oprate": 1,
        "name": "能耗1402",
        "node_name": "能耗02",
        "point_id": 402,
        "group_id": 59,
        "id": 3193,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2238,
        "oprate": 1,
        "name": "能耗1403",
        "node_name": "能耗02",
        "point_id": 403,
        "group_id": 59,
        "id": 3194,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2239,
        "oprate": 1,
        "name": "能耗1404",
        "node_name": "能耗02",
        "point_id": 404,
        "group_id": 59,
        "id": 3195,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2240,
        "oprate": 1,
        "name": "能耗1405",
        "node_name": "能耗02",
        "point_id": 405,
        "group_id": 59,
        "id": 3196,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2241,
        "oprate": 1,
        "name": "能耗1406",
        "node_name": "能耗02",
        "point_id": 406,
        "group_id": 59,
        "id": 3197,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2242,
        "oprate": 1,
        "name": "能耗1407",
        "node_name": "能耗02",
        "point_id": 407,
        "group_id": 59,
        "id": 3198,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2243,
        "oprate": 1,
        "name": "能耗1408",
        "node_name": "能耗02",
        "point_id": 408,
        "group_id": 59,
        "id": 3199,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2244,
        "oprate": 1,
        "name": "能耗1409",
        "node_name": "能耗02",
        "point_id": 409,
        "group_id": 59,
        "id": 3200,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2245,
        "oprate": 1,
        "name": "能耗1410",
        "node_name": "能耗02",
        "point_id": 410,
        "group_id": 59,
        "id": 3201,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2246,
        "oprate": 1,
        "name": "能耗1411",
        "node_name": "能耗02",
        "point_id": 411,
        "group_id": 59,
        "id": 3202,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2247,
        "oprate": 1,
        "name": "能耗1412",
        "node_name": "能耗02",
        "point_id": 412,
        "group_id": 59,
        "id": 3203,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2248,
        "oprate": 1,
        "name": "能耗1413",
        "node_name": "能耗02",
        "point_id": 413,
        "group_id": 59,
        "id": 3204,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2249,
        "oprate": 1,
        "name": "能耗1414",
        "node_name": "能耗02",
        "point_id": 414,
        "group_id": 59,
        "id": 3205,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2250,
        "oprate": 1,
        "name": "能耗1415",
        "node_name": "能耗02",
        "point_id": 415,
        "group_id": 59,
        "id": 3206,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2251,
        "oprate": 1,
        "name": "能耗1416",
        "node_name": "能耗02",
        "point_id": 416,
        "group_id": 59,
        "id": 3207,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2252,
        "oprate": 1,
        "name": "能耗1417",
        "node_name": "能耗02",
        "point_id": 417,
        "group_id": 59,
        "id": 3208,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2253,
        "oprate": 1,
        "name": "能耗1418",
        "node_name": "能耗02",
        "point_id": 418,
        "group_id": 59,
        "id": 3209,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2254,
        "oprate": 1,
        "name": "能耗1419",
        "node_name": "能耗02",
        "point_id": 419,
        "group_id": 59,
        "id": 3210,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2255,
        "oprate": 1,
        "name": "能耗1420",
        "node_name": "能耗02",
        "point_id": 420,
        "group_id": 59,
        "id": 3211,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2256,
        "oprate": 1,
        "name": "能耗1421",
        "node_name": "能耗02",
        "point_id": 421,
        "group_id": 59,
        "id": 3212,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2257,
        "oprate": 1,
        "name": "能耗1422",
        "node_name": "能耗02",
        "point_id": 422,
        "group_id": 59,
        "id": 3213,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2258,
        "oprate": 1,
        "name": "能耗1423",
        "node_name": "能耗02",
        "point_id": 423,
        "group_id": 59,
        "id": 3214,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2259,
        "oprate": 1,
        "name": "能耗1424",
        "node_name": "能耗02",
        "point_id": 424,
        "group_id": 59,
        "id": 3215,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2260,
        "oprate": 1,
        "name": "能耗1425",
        "node_name": "能耗02",
        "point_id": 425,
        "group_id": 59,
        "id": 3216,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2261,
        "oprate": 1,
        "name": "能耗1426",
        "node_name": "能耗02",
        "point_id": 426,
        "group_id": 59,
        "id": 3217,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2262,
        "oprate": 1,
        "name": "能耗1427",
        "node_name": "能耗02",
        "point_id": 427,
        "group_id": 59,
        "id": 3218,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2263,
        "oprate": 1,
        "name": "能耗1428",
        "node_name": "能耗02",
        "point_id": 428,
        "group_id": 59,
        "id": 3219,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2264,
        "oprate": 1,
        "name": "能耗1429",
        "node_name": "能耗02",
        "point_id": 429,
        "group_id": 59,
        "id": 3220,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2265,
        "oprate": 1,
        "name": "能耗1430",
        "node_name": "能耗02",
        "point_id": 430,
        "group_id": 59,
        "id": 3221,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2266,
        "oprate": 1,
        "name": "能耗1431",
        "node_name": "能耗02",
        "point_id": 431,
        "group_id": 59,
        "id": 3222,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2267,
        "oprate": 1,
        "name": "能耗1432",
        "node_name": "能耗02",
        "point_id": 432,
        "group_id": 59,
        "id": 3223,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2268,
        "oprate": 1,
        "name": "能耗1433",
        "node_name": "能耗02",
        "point_id": 433,
        "group_id": 59,
        "id": 3224,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2269,
        "oprate": 1,
        "name": "能耗1434",
        "node_name": "能耗02",
        "point_id": 434,
        "group_id": 59,
        "id": 3225,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2270,
        "oprate": 1,
        "name": "能耗1435",
        "node_name": "能耗02",
        "point_id": 435,
        "group_id": 59,
        "id": 3226,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2271,
        "oprate": 1,
        "name": "能耗1436",
        "node_name": "能耗02",
        "point_id": 436,
        "group_id": 59,
        "id": 3227,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2272,
        "oprate": 1,
        "name": "能耗1437",
        "node_name": "能耗02",
        "point_id": 437,
        "group_id": 59,
        "id": 3228,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2273,
        "oprate": 1,
        "name": "能耗1438",
        "node_name": "能耗02",
        "point_id": 438,
        "group_id": 59,
        "id": 3229,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2274,
        "oprate": 1,
        "name": "能耗1439",
        "node_name": "能耗02",
        "point_id": 439,
        "group_id": 59,
        "id": 3230,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2275,
        "oprate": 1,
        "name": "能耗1440",
        "node_name": "能耗02",
        "point_id": 440,
        "group_id": 59,
        "id": 3231,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2276,
        "oprate": 1,
        "name": "能耗1441",
        "node_name": "能耗02",
        "point_id": 441,
        "group_id": 59,
        "id": 3232,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2278,
        "oprate": 1,
        "name": "能耗1443",
        "node_name": "能耗02",
        "point_id": 443,
        "group_id": 59,
        "id": 3233,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2277,
        "oprate": 1,
        "name": "能耗1442",
        "node_name": "能耗02",
        "point_id": 442,
        "group_id": 59,
        "id": 3234,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2279,
        "oprate": 1,
        "name": "能耗1444",
        "node_name": "能耗02",
        "point_id": 444,
        "group_id": 59,
        "id": 3235,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2280,
        "oprate": 1,
        "name": "能耗1445",
        "node_name": "能耗02",
        "point_id": 445,
        "group_id": 59,
        "id": 3236,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2281,
        "oprate": 1,
        "name": "能耗1446",
        "node_name": "能耗02",
        "point_id": 446,
        "group_id": 59,
        "id": 3237,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2282,
        "oprate": 1,
        "name": "能耗1447",
        "node_name": "能耗02",
        "point_id": 447,
        "group_id": 59,
        "id": 3238,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2283,
        "oprate": 1,
        "name": "能耗1448",
        "node_name": "能耗02",
        "point_id": 448,
        "group_id": 59,
        "id": 3239,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2284,
        "oprate": 1,
        "name": "能耗1449",
        "node_name": "能耗02",
        "point_id": 449,
        "group_id": 59,
        "id": 3240,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2285,
        "oprate": 1,
        "name": "能耗1450",
        "node_name": "能耗02",
        "point_id": 450,
        "group_id": 59,
        "id": 3241,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2286,
        "oprate": 1,
        "name": "能耗1451",
        "node_name": "能耗02",
        "point_id": 451,
        "group_id": 59,
        "id": 3242,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2287,
        "oprate": 1,
        "name": "能耗1452",
        "node_name": "能耗02",
        "point_id": 452,
        "group_id": 59,
        "id": 3243,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2288,
        "oprate": 1,
        "name": "能耗1453",
        "node_name": "能耗02",
        "point_id": 453,
        "group_id": 59,
        "id": 3244,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2289,
        "oprate": 1,
        "name": "能耗1454",
        "node_name": "能耗02",
        "point_id": 454,
        "group_id": 59,
        "id": 3245,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2290,
        "oprate": 1,
        "name": "能耗1455",
        "node_name": "能耗02",
        "point_id": 455,
        "group_id": 59,
        "id": 3246,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2291,
        "oprate": 1,
        "name": "能耗1456",
        "node_name": "能耗02",
        "point_id": 456,
        "group_id": 59,
        "id": 3247,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2293,
        "oprate": 1,
        "name": "能耗1458",
        "node_name": "能耗02",
        "point_id": 458,
        "group_id": 59,
        "id": 3248,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2292,
        "oprate": 1,
        "name": "能耗1457",
        "node_name": "能耗02",
        "point_id": 457,
        "group_id": 59,
        "id": 3249,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2294,
        "oprate": 1,
        "name": "能耗1459",
        "node_name": "能耗02",
        "point_id": 459,
        "group_id": 59,
        "id": 3250,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2295,
        "oprate": 1,
        "name": "能耗1460",
        "node_name": "能耗02",
        "point_id": 460,
        "group_id": 59,
        "id": 3251,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2296,
        "oprate": 1,
        "name": "能耗1461",
        "node_name": "能耗02",
        "point_id": 461,
        "group_id": 59,
        "id": 3252,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2297,
        "oprate": 1,
        "name": "能耗1462",
        "node_name": "能耗02",
        "point_id": 462,
        "group_id": 59,
        "id": 3253,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2298,
        "oprate": 1,
        "name": "能耗1463",
        "node_name": "能耗02",
        "point_id": 463,
        "group_id": 59,
        "id": 3254,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2299,
        "oprate": 1,
        "name": "能耗1464",
        "node_name": "能耗02",
        "point_id": 464,
        "group_id": 59,
        "id": 3255,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2300,
        "oprate": 1,
        "name": "能耗1465",
        "node_name": "能耗02",
        "point_id": 465,
        "group_id": 59,
        "id": 3256,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2301,
        "oprate": 1,
        "name": "能耗1466",
        "node_name": "能耗02",
        "point_id": 466,
        "group_id": 59,
        "id": 3257,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2302,
        "oprate": 1,
        "name": "能耗1467",
        "node_name": "能耗02",
        "point_id": 467,
        "group_id": 59,
        "id": 3258,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2303,
        "oprate": 1,
        "name": "能耗1468",
        "node_name": "能耗02",
        "point_id": 468,
        "group_id": 59,
        "id": 3259,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2304,
        "oprate": 1,
        "name": "能耗1469",
        "node_name": "能耗02",
        "point_id": 469,
        "group_id": 59,
        "id": 3260,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2305,
        "oprate": 1,
        "name": "能耗1470",
        "node_name": "能耗02",
        "point_id": 470,
        "group_id": 59,
        "id": 3261,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2306,
        "oprate": 1,
        "name": "能耗1471",
        "node_name": "能耗02",
        "point_id": 471,
        "group_id": 59,
        "id": 3262,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2307,
        "oprate": 1,
        "name": "能耗1472",
        "node_name": "能耗02",
        "point_id": 472,
        "group_id": 59,
        "id": 3263,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2308,
        "oprate": 1,
        "name": "能耗1473",
        "node_name": "能耗02",
        "point_id": 473,
        "group_id": 59,
        "id": 3264,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2310,
        "oprate": 1,
        "name": "能耗1475",
        "node_name": "能耗02",
        "point_id": 475,
        "group_id": 59,
        "id": 3265,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2309,
        "oprate": 1,
        "name": "能耗1474",
        "node_name": "能耗02",
        "point_id": 474,
        "group_id": 59,
        "id": 3266,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2311,
        "oprate": 1,
        "name": "能耗1476",
        "node_name": "能耗02",
        "point_id": 476,
        "group_id": 59,
        "id": 3267,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2312,
        "oprate": 1,
        "name": "能耗1477",
        "node_name": "能耗02",
        "point_id": 477,
        "group_id": 59,
        "id": 3268,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2313,
        "oprate": 1,
        "name": "能耗1478",
        "node_name": "能耗02",
        "point_id": 478,
        "group_id": 59,
        "id": 3269,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2314,
        "oprate": 1,
        "name": "能耗1479",
        "node_name": "能耗02",
        "point_id": 479,
        "group_id": 59,
        "id": 3270,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2315,
        "oprate": 1,
        "name": "能耗1480",
        "node_name": "能耗02",
        "point_id": 480,
        "group_id": 59,
        "id": 3271,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2316,
        "oprate": 1,
        "name": "能耗1481",
        "node_name": "能耗02",
        "point_id": 481,
        "group_id": 59,
        "id": 3272,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2317,
        "oprate": 1,
        "name": "能耗1482",
        "node_name": "能耗02",
        "point_id": 482,
        "group_id": 59,
        "id": 3273,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2318,
        "oprate": 1,
        "name": "能耗1483",
        "node_name": "能耗02",
        "point_id": 483,
        "group_id": 59,
        "id": 3274,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2319,
        "oprate": 1,
        "name": "能耗1484",
        "node_name": "能耗02",
        "point_id": 484,
        "group_id": 59,
        "id": 3275,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2320,
        "oprate": 1,
        "name": "能耗1485",
        "node_name": "能耗02",
        "point_id": 485,
        "group_id": 59,
        "id": 3276,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2321,
        "oprate": 1,
        "name": "能耗1486",
        "node_name": "能耗02",
        "point_id": 486,
        "group_id": 59,
        "id": 3277,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2322,
        "oprate": 1,
        "name": "能耗1487",
        "node_name": "能耗02",
        "point_id": 487,
        "group_id": 59,
        "id": 3278,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2323,
        "oprate": 1,
        "name": "能耗1488",
        "node_name": "能耗02",
        "point_id": 488,
        "group_id": 59,
        "id": 3279,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2324,
        "oprate": 1,
        "name": "能耗1489",
        "node_name": "能耗02",
        "point_id": 489,
        "group_id": 59,
        "id": 3280,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2325,
        "oprate": 1,
        "name": "能耗1490",
        "node_name": "能耗02",
        "point_id": 490,
        "group_id": 59,
        "id": 3281,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2326,
        "oprate": 1,
        "name": "能耗1491",
        "node_name": "能耗02",
        "point_id": 491,
        "group_id": 59,
        "id": 3282,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2327,
        "oprate": 1,
        "name": "能耗1492",
        "node_name": "能耗02",
        "point_id": 492,
        "group_id": 59,
        "id": 3283,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2328,
        "oprate": 1,
        "name": "能耗1493",
        "node_name": "能耗02",
        "point_id": 493,
        "group_id": 59,
        "id": 3284,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2329,
        "oprate": 1,
        "name": "能耗1494",
        "node_name": "能耗02",
        "point_id": 494,
        "group_id": 59,
        "id": 3285,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2330,
        "oprate": 1,
        "name": "能耗1495",
        "node_name": "能耗02",
        "point_id": 495,
        "group_id": 59,
        "id": 3286,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2331,
        "oprate": 1,
        "name": "能耗1496",
        "node_name": "能耗02",
        "point_id": 496,
        "group_id": 59,
        "id": 3287,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2332,
        "oprate": 1,
        "name": "能耗1497",
        "node_name": "能耗02",
        "point_id": 497,
        "group_id": 59,
        "id": 3288,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2333,
        "oprate": 1,
        "name": "能耗1498",
        "node_name": "能耗02",
        "point_id": 498,
        "group_id": 59,
        "id": 3289,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2334,
        "oprate": 1,
        "name": "能耗1499",
        "node_name": "能耗02",
        "point_id": 499,
        "group_id": 59,
        "id": 3290,
        "create_time": "2017-06-15 18:38:47"
      }, {
        "tag_id": 2335,
        "oprate": 1,
        "name": "能耗1500",
        "node_name": "能耗02",
        "point_id": 500,
        "group_id": 59,
        "id": 3291,
        "create_time": "2017-06-15 18:38:47"
      }],
      "id": 59,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗16",
      "tag_id_tree": null,
      "hide_tag": 0,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2336,
        "oprate": 1,
        "name": "能耗1501",
        "node_name": "能耗02",
        "point_id": 501,
        "group_id": 60,
        "id": 2292,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2337,
        "oprate": 1,
        "name": "能耗1502",
        "node_name": "能耗02",
        "point_id": 502,
        "group_id": 60,
        "id": 2293,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2338,
        "oprate": 1,
        "name": "能耗1503",
        "node_name": "能耗02",
        "point_id": 503,
        "group_id": 60,
        "id": 2294,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2339,
        "oprate": 1,
        "name": "能耗1504",
        "node_name": "能耗02",
        "point_id": 504,
        "group_id": 60,
        "id": 2295,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2340,
        "oprate": 1,
        "name": "能耗1505",
        "node_name": "能耗02",
        "point_id": 505,
        "group_id": 60,
        "id": 2296,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2341,
        "oprate": 1,
        "name": "能耗1506",
        "node_name": "能耗02",
        "point_id": 506,
        "group_id": 60,
        "id": 2297,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2342,
        "oprate": 1,
        "name": "能耗1507",
        "node_name": "能耗02",
        "point_id": 507,
        "group_id": 60,
        "id": 2298,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2343,
        "oprate": 1,
        "name": "能耗1508",
        "node_name": "能耗02",
        "point_id": 508,
        "group_id": 60,
        "id": 2299,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2344,
        "oprate": 1,
        "name": "能耗1509",
        "node_name": "能耗02",
        "point_id": 509,
        "group_id": 60,
        "id": 2300,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2345,
        "oprate": 1,
        "name": "能耗1510",
        "node_name": "能耗02",
        "point_id": 510,
        "group_id": 60,
        "id": 2301,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2346,
        "oprate": 1,
        "name": "能耗1511",
        "node_name": "能耗02",
        "point_id": 511,
        "group_id": 60,
        "id": 2302,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2347,
        "oprate": 1,
        "name": "能耗1512",
        "node_name": "能耗02",
        "point_id": 512,
        "group_id": 60,
        "id": 2303,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2348,
        "oprate": 1,
        "name": "能耗1513",
        "node_name": "能耗02",
        "point_id": 513,
        "group_id": 60,
        "id": 2304,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2349,
        "oprate": 1,
        "name": "能耗1514",
        "node_name": "能耗02",
        "point_id": 514,
        "group_id": 60,
        "id": 2305,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2350,
        "oprate": 1,
        "name": "能耗1515",
        "node_name": "能耗02",
        "point_id": 515,
        "group_id": 60,
        "id": 2306,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2351,
        "oprate": 1,
        "name": "能耗1516",
        "node_name": "能耗02",
        "point_id": 516,
        "group_id": 60,
        "id": 2307,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2352,
        "oprate": 1,
        "name": "能耗1517",
        "node_name": "能耗02",
        "point_id": 517,
        "group_id": 60,
        "id": 2308,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2353,
        "oprate": 1,
        "name": "能耗1518",
        "node_name": "能耗02",
        "point_id": 518,
        "group_id": 60,
        "id": 2309,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2354,
        "oprate": 1,
        "name": "能耗1519",
        "node_name": "能耗02",
        "point_id": 519,
        "group_id": 60,
        "id": 2310,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2355,
        "oprate": 1,
        "name": "能耗1520",
        "node_name": "能耗02",
        "point_id": 520,
        "group_id": 60,
        "id": 2311,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2356,
        "oprate": 1,
        "name": "能耗1521",
        "node_name": "能耗02",
        "point_id": 521,
        "group_id": 60,
        "id": 2312,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2357,
        "oprate": 1,
        "name": "能耗1522",
        "node_name": "能耗02",
        "point_id": 522,
        "group_id": 60,
        "id": 2313,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2358,
        "oprate": 1,
        "name": "能耗1523",
        "node_name": "能耗02",
        "point_id": 523,
        "group_id": 60,
        "id": 2314,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2359,
        "oprate": 1,
        "name": "能耗1524",
        "node_name": "能耗02",
        "point_id": 524,
        "group_id": 60,
        "id": 2315,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2360,
        "oprate": 1,
        "name": "能耗1525",
        "node_name": "能耗02",
        "point_id": 525,
        "group_id": 60,
        "id": 2316,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2361,
        "oprate": 1,
        "name": "能耗1526",
        "node_name": "能耗02",
        "point_id": 526,
        "group_id": 60,
        "id": 2317,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2362,
        "oprate": 1,
        "name": "能耗1527",
        "node_name": "能耗02",
        "point_id": 527,
        "group_id": 60,
        "id": 2318,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2363,
        "oprate": 1,
        "name": "能耗1528",
        "node_name": "能耗02",
        "point_id": 528,
        "group_id": 60,
        "id": 2319,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2364,
        "oprate": 1,
        "name": "能耗1529",
        "node_name": "能耗02",
        "point_id": 529,
        "group_id": 60,
        "id": 2320,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2365,
        "oprate": 1,
        "name": "能耗1530",
        "node_name": "能耗02",
        "point_id": 530,
        "group_id": 60,
        "id": 2321,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2366,
        "oprate": 1,
        "name": "能耗1531",
        "node_name": "能耗02",
        "point_id": 531,
        "group_id": 60,
        "id": 2322,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2367,
        "oprate": 1,
        "name": "能耗1532",
        "node_name": "能耗02",
        "point_id": 532,
        "group_id": 60,
        "id": 2323,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2368,
        "oprate": 1,
        "name": "能耗1533",
        "node_name": "能耗02",
        "point_id": 533,
        "group_id": 60,
        "id": 2324,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2369,
        "oprate": 1,
        "name": "能耗1534",
        "node_name": "能耗02",
        "point_id": 534,
        "group_id": 60,
        "id": 2325,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2370,
        "oprate": 1,
        "name": "能耗1535",
        "node_name": "能耗02",
        "point_id": 535,
        "group_id": 60,
        "id": 2326,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2371,
        "oprate": 1,
        "name": "能耗1536",
        "node_name": "能耗02",
        "point_id": 536,
        "group_id": 60,
        "id": 2327,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2372,
        "oprate": 1,
        "name": "能耗1537",
        "node_name": "能耗02",
        "point_id": 537,
        "group_id": 60,
        "id": 2328,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2373,
        "oprate": 1,
        "name": "能耗1538",
        "node_name": "能耗02",
        "point_id": 538,
        "group_id": 60,
        "id": 2329,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2374,
        "oprate": 1,
        "name": "能耗1539",
        "node_name": "能耗02",
        "point_id": 539,
        "group_id": 60,
        "id": 2330,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2375,
        "oprate": 1,
        "name": "能耗1540",
        "node_name": "能耗02",
        "point_id": 540,
        "group_id": 60,
        "id": 2331,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2376,
        "oprate": 1,
        "name": "能耗1541",
        "node_name": "能耗02",
        "point_id": 541,
        "group_id": 60,
        "id": 2332,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2377,
        "oprate": 1,
        "name": "能耗1542",
        "node_name": "能耗02",
        "point_id": 542,
        "group_id": 60,
        "id": 2333,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2378,
        "oprate": 1,
        "name": "能耗1543",
        "node_name": "能耗02",
        "point_id": 543,
        "group_id": 60,
        "id": 2334,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2379,
        "oprate": 1,
        "name": "能耗1544",
        "node_name": "能耗02",
        "point_id": 544,
        "group_id": 60,
        "id": 2335,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2380,
        "oprate": 1,
        "name": "能耗1545",
        "node_name": "能耗02",
        "point_id": 545,
        "group_id": 60,
        "id": 2336,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2381,
        "oprate": 1,
        "name": "能耗1546",
        "node_name": "能耗02",
        "point_id": 546,
        "group_id": 60,
        "id": 2337,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2382,
        "oprate": 1,
        "name": "能耗1547",
        "node_name": "能耗02",
        "point_id": 547,
        "group_id": 60,
        "id": 2338,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2383,
        "oprate": 1,
        "name": "能耗1548",
        "node_name": "能耗02",
        "point_id": 548,
        "group_id": 60,
        "id": 2339,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2384,
        "oprate": 1,
        "name": "能耗1549",
        "node_name": "能耗02",
        "point_id": 549,
        "group_id": 60,
        "id": 2340,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2385,
        "oprate": 1,
        "name": "能耗1550",
        "node_name": "能耗02",
        "point_id": 550,
        "group_id": 60,
        "id": 2341,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2387,
        "oprate": 1,
        "name": "能耗1552",
        "node_name": "能耗02",
        "point_id": 552,
        "group_id": 60,
        "id": 2342,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2386,
        "oprate": 1,
        "name": "能耗1551",
        "node_name": "能耗02",
        "point_id": 551,
        "group_id": 60,
        "id": 2343,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2388,
        "oprate": 1,
        "name": "能耗1553",
        "node_name": "能耗02",
        "point_id": 553,
        "group_id": 60,
        "id": 2344,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2389,
        "oprate": 1,
        "name": "能耗1554",
        "node_name": "能耗02",
        "point_id": 554,
        "group_id": 60,
        "id": 2345,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2390,
        "oprate": 1,
        "name": "能耗1555",
        "node_name": "能耗02",
        "point_id": 555,
        "group_id": 60,
        "id": 2346,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2391,
        "oprate": 1,
        "name": "能耗1556",
        "node_name": "能耗02",
        "point_id": 556,
        "group_id": 60,
        "id": 2347,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2392,
        "oprate": 1,
        "name": "能耗1557",
        "node_name": "能耗02",
        "point_id": 557,
        "group_id": 60,
        "id": 2348,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2393,
        "oprate": 1,
        "name": "能耗1558",
        "node_name": "能耗02",
        "point_id": 558,
        "group_id": 60,
        "id": 2349,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2394,
        "oprate": 1,
        "name": "能耗1559",
        "node_name": "能耗02",
        "point_id": 559,
        "group_id": 60,
        "id": 2350,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2395,
        "oprate": 1,
        "name": "能耗1560",
        "node_name": "能耗02",
        "point_id": 560,
        "group_id": 60,
        "id": 2351,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2396,
        "oprate": 1,
        "name": "能耗1561",
        "node_name": "能耗02",
        "point_id": 561,
        "group_id": 60,
        "id": 2352,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2397,
        "oprate": 1,
        "name": "能耗1562",
        "node_name": "能耗02",
        "point_id": 562,
        "group_id": 60,
        "id": 2353,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2398,
        "oprate": 1,
        "name": "能耗1563",
        "node_name": "能耗02",
        "point_id": 563,
        "group_id": 60,
        "id": 2354,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2399,
        "oprate": 1,
        "name": "能耗1564",
        "node_name": "能耗02",
        "point_id": 564,
        "group_id": 60,
        "id": 2355,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2400,
        "oprate": 1,
        "name": "能耗1565",
        "node_name": "能耗02",
        "point_id": 565,
        "group_id": 60,
        "id": 2356,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2401,
        "oprate": 1,
        "name": "能耗1566",
        "node_name": "能耗02",
        "point_id": 566,
        "group_id": 60,
        "id": 2357,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2402,
        "oprate": 1,
        "name": "能耗1567",
        "node_name": "能耗02",
        "point_id": 567,
        "group_id": 60,
        "id": 2358,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2403,
        "oprate": 1,
        "name": "能耗1568",
        "node_name": "能耗02",
        "point_id": 568,
        "group_id": 60,
        "id": 2359,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2404,
        "oprate": 1,
        "name": "能耗1569",
        "node_name": "能耗02",
        "point_id": 569,
        "group_id": 60,
        "id": 2360,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2405,
        "oprate": 1,
        "name": "能耗1570",
        "node_name": "能耗02",
        "point_id": 570,
        "group_id": 60,
        "id": 2361,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2406,
        "oprate": 1,
        "name": "能耗1571",
        "node_name": "能耗02",
        "point_id": 571,
        "group_id": 60,
        "id": 2362,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2407,
        "oprate": 1,
        "name": "能耗1572",
        "node_name": "能耗02",
        "point_id": 572,
        "group_id": 60,
        "id": 2363,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2408,
        "oprate": 1,
        "name": "能耗1573",
        "node_name": "能耗02",
        "point_id": 573,
        "group_id": 60,
        "id": 2364,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2409,
        "oprate": 1,
        "name": "能耗1574",
        "node_name": "能耗02",
        "point_id": 574,
        "group_id": 60,
        "id": 2365,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2410,
        "oprate": 1,
        "name": "能耗1575",
        "node_name": "能耗02",
        "point_id": 575,
        "group_id": 60,
        "id": 2366,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2411,
        "oprate": 1,
        "name": "能耗1576",
        "node_name": "能耗02",
        "point_id": 576,
        "group_id": 60,
        "id": 2367,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2412,
        "oprate": 1,
        "name": "能耗1577",
        "node_name": "能耗02",
        "point_id": 577,
        "group_id": 60,
        "id": 2368,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2413,
        "oprate": 1,
        "name": "能耗1578",
        "node_name": "能耗02",
        "point_id": 578,
        "group_id": 60,
        "id": 2369,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2414,
        "oprate": 1,
        "name": "能耗1579",
        "node_name": "能耗02",
        "point_id": 579,
        "group_id": 60,
        "id": 2370,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2415,
        "oprate": 1,
        "name": "能耗1580",
        "node_name": "能耗02",
        "point_id": 580,
        "group_id": 60,
        "id": 2371,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2416,
        "oprate": 1,
        "name": "能耗1581",
        "node_name": "能耗02",
        "point_id": 581,
        "group_id": 60,
        "id": 2372,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2417,
        "oprate": 1,
        "name": "能耗1582",
        "node_name": "能耗02",
        "point_id": 582,
        "group_id": 60,
        "id": 2373,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2418,
        "oprate": 1,
        "name": "能耗1583",
        "node_name": "能耗02",
        "point_id": 583,
        "group_id": 60,
        "id": 2374,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2419,
        "oprate": 1,
        "name": "能耗1584",
        "node_name": "能耗02",
        "point_id": 584,
        "group_id": 60,
        "id": 2375,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2420,
        "oprate": 1,
        "name": "能耗1585",
        "node_name": "能耗02",
        "point_id": 585,
        "group_id": 60,
        "id": 2376,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2421,
        "oprate": 1,
        "name": "能耗1586",
        "node_name": "能耗02",
        "point_id": 586,
        "group_id": 60,
        "id": 2377,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2422,
        "oprate": 1,
        "name": "能耗1587",
        "node_name": "能耗02",
        "point_id": 587,
        "group_id": 60,
        "id": 2378,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2423,
        "oprate": 1,
        "name": "能耗1588",
        "node_name": "能耗02",
        "point_id": 588,
        "group_id": 60,
        "id": 2379,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2424,
        "oprate": 1,
        "name": "能耗1589",
        "node_name": "能耗02",
        "point_id": 589,
        "group_id": 60,
        "id": 2380,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2425,
        "oprate": 1,
        "name": "能耗1590",
        "node_name": "能耗02",
        "point_id": 590,
        "group_id": 60,
        "id": 2381,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2426,
        "oprate": 1,
        "name": "能耗1591",
        "node_name": "能耗02",
        "point_id": 591,
        "group_id": 60,
        "id": 2382,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2427,
        "oprate": 1,
        "name": "能耗1592",
        "node_name": "能耗02",
        "point_id": 592,
        "group_id": 60,
        "id": 2383,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2428,
        "oprate": 1,
        "name": "能耗1593",
        "node_name": "能耗02",
        "point_id": 593,
        "group_id": 60,
        "id": 2384,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2429,
        "oprate": 1,
        "name": "能耗1594",
        "node_name": "能耗02",
        "point_id": 594,
        "group_id": 60,
        "id": 2385,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2430,
        "oprate": 1,
        "name": "能耗1595",
        "node_name": "能耗02",
        "point_id": 595,
        "group_id": 60,
        "id": 2386,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2431,
        "oprate": 1,
        "name": "能耗1596",
        "node_name": "能耗02",
        "point_id": 596,
        "group_id": 60,
        "id": 2387,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2432,
        "oprate": 1,
        "name": "能耗1597",
        "node_name": "能耗02",
        "point_id": 597,
        "group_id": 60,
        "id": 2388,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2433,
        "oprate": 1,
        "name": "能耗1598",
        "node_name": "能耗02",
        "point_id": 598,
        "group_id": 60,
        "id": 2389,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2434,
        "oprate": 1,
        "name": "能耗1599",
        "node_name": "能耗02",
        "point_id": 599,
        "group_id": 60,
        "id": 2390,
        "create_time": "2017-06-15 17:28:01"
      }, {
        "tag_id": 2435,
        "oprate": 1,
        "name": "能耗1600",
        "node_name": "能耗02",
        "point_id": 600,
        "group_id": 60,
        "id": 2391,
        "create_time": "2017-06-15 17:28:01"
      }],
      "id": 60,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗17",
      "tag_id_tree": null,
      "hide_tag": 0,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2436,
        "oprate": 1,
        "name": "能耗1601",
        "node_name": "能耗02",
        "point_id": 601,
        "group_id": 61,
        "id": 2392,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2437,
        "oprate": 1,
        "name": "能耗1602",
        "node_name": "能耗02",
        "point_id": 602,
        "group_id": 61,
        "id": 2393,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2438,
        "oprate": 1,
        "name": "能耗1603",
        "node_name": "能耗02",
        "point_id": 603,
        "group_id": 61,
        "id": 2394,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2439,
        "oprate": 1,
        "name": "能耗1604",
        "node_name": "能耗02",
        "point_id": 604,
        "group_id": 61,
        "id": 2395,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2440,
        "oprate": 1,
        "name": "能耗1605",
        "node_name": "能耗02",
        "point_id": 605,
        "group_id": 61,
        "id": 2396,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2441,
        "oprate": 1,
        "name": "能耗1606",
        "node_name": "能耗02",
        "point_id": 606,
        "group_id": 61,
        "id": 2397,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2442,
        "oprate": 1,
        "name": "能耗1607",
        "node_name": "能耗02",
        "point_id": 607,
        "group_id": 61,
        "id": 2398,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2443,
        "oprate": 1,
        "name": "能耗1608",
        "node_name": "能耗02",
        "point_id": 608,
        "group_id": 61,
        "id": 2399,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2444,
        "oprate": 1,
        "name": "能耗1609",
        "node_name": "能耗02",
        "point_id": 609,
        "group_id": 61,
        "id": 2400,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2445,
        "oprate": 1,
        "name": "能耗1610",
        "node_name": "能耗02",
        "point_id": 610,
        "group_id": 61,
        "id": 2401,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2446,
        "oprate": 1,
        "name": "能耗1611",
        "node_name": "能耗02",
        "point_id": 611,
        "group_id": 61,
        "id": 2402,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2447,
        "oprate": 1,
        "name": "能耗1612",
        "node_name": "能耗02",
        "point_id": 612,
        "group_id": 61,
        "id": 2403,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2448,
        "oprate": 1,
        "name": "能耗1613",
        "node_name": "能耗02",
        "point_id": 613,
        "group_id": 61,
        "id": 2404,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2449,
        "oprate": 1,
        "name": "能耗1614",
        "node_name": "能耗02",
        "point_id": 614,
        "group_id": 61,
        "id": 2405,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2450,
        "oprate": 1,
        "name": "能耗1615",
        "node_name": "能耗02",
        "point_id": 615,
        "group_id": 61,
        "id": 2406,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2451,
        "oprate": 1,
        "name": "能耗1616",
        "node_name": "能耗02",
        "point_id": 616,
        "group_id": 61,
        "id": 2407,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2452,
        "oprate": 1,
        "name": "能耗1617",
        "node_name": "能耗02",
        "point_id": 617,
        "group_id": 61,
        "id": 2408,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2453,
        "oprate": 1,
        "name": "能耗1618",
        "node_name": "能耗02",
        "point_id": 618,
        "group_id": 61,
        "id": 2409,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2454,
        "oprate": 1,
        "name": "能耗1619",
        "node_name": "能耗02",
        "point_id": 619,
        "group_id": 61,
        "id": 2410,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2455,
        "oprate": 1,
        "name": "能耗1620",
        "node_name": "能耗02",
        "point_id": 620,
        "group_id": 61,
        "id": 2411,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2456,
        "oprate": 1,
        "name": "能耗1621",
        "node_name": "能耗02",
        "point_id": 621,
        "group_id": 61,
        "id": 2412,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2457,
        "oprate": 1,
        "name": "能耗1622",
        "node_name": "能耗02",
        "point_id": 622,
        "group_id": 61,
        "id": 2413,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2458,
        "oprate": 1,
        "name": "能耗1623",
        "node_name": "能耗02",
        "point_id": 623,
        "group_id": 61,
        "id": 2414,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2459,
        "oprate": 1,
        "name": "能耗1624",
        "node_name": "能耗02",
        "point_id": 624,
        "group_id": 61,
        "id": 2415,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2460,
        "oprate": 1,
        "name": "能耗1625",
        "node_name": "能耗02",
        "point_id": 625,
        "group_id": 61,
        "id": 2416,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2462,
        "oprate": 1,
        "name": "能耗1627",
        "node_name": "能耗02",
        "point_id": 627,
        "group_id": 61,
        "id": 2417,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2461,
        "oprate": 1,
        "name": "能耗1626",
        "node_name": "能耗02",
        "point_id": 626,
        "group_id": 61,
        "id": 2418,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2463,
        "oprate": 1,
        "name": "能耗1628",
        "node_name": "能耗02",
        "point_id": 628,
        "group_id": 61,
        "id": 2419,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2464,
        "oprate": 1,
        "name": "能耗1629",
        "node_name": "能耗02",
        "point_id": 629,
        "group_id": 61,
        "id": 2420,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2465,
        "oprate": 1,
        "name": "能耗1630",
        "node_name": "能耗02",
        "point_id": 630,
        "group_id": 61,
        "id": 2421,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2466,
        "oprate": 1,
        "name": "能耗1631",
        "node_name": "能耗02",
        "point_id": 631,
        "group_id": 61,
        "id": 2422,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2467,
        "oprate": 1,
        "name": "能耗1632",
        "node_name": "能耗02",
        "point_id": 632,
        "group_id": 61,
        "id": 2423,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2468,
        "oprate": 1,
        "name": "能耗1633",
        "node_name": "能耗02",
        "point_id": 633,
        "group_id": 61,
        "id": 2424,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2469,
        "oprate": 1,
        "name": "能耗1634",
        "node_name": "能耗02",
        "point_id": 634,
        "group_id": 61,
        "id": 2425,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2470,
        "oprate": 1,
        "name": "能耗1635",
        "node_name": "能耗02",
        "point_id": 635,
        "group_id": 61,
        "id": 2426,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2471,
        "oprate": 1,
        "name": "能耗1636",
        "node_name": "能耗02",
        "point_id": 636,
        "group_id": 61,
        "id": 2427,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2472,
        "oprate": 1,
        "name": "能耗1637",
        "node_name": "能耗02",
        "point_id": 637,
        "group_id": 61,
        "id": 2428,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2473,
        "oprate": 1,
        "name": "能耗1638",
        "node_name": "能耗02",
        "point_id": 638,
        "group_id": 61,
        "id": 2429,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2474,
        "oprate": 1,
        "name": "能耗1639",
        "node_name": "能耗02",
        "point_id": 639,
        "group_id": 61,
        "id": 2430,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2475,
        "oprate": 1,
        "name": "能耗1640",
        "node_name": "能耗02",
        "point_id": 640,
        "group_id": 61,
        "id": 2431,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2476,
        "oprate": 1,
        "name": "能耗1641",
        "node_name": "能耗02",
        "point_id": 641,
        "group_id": 61,
        "id": 2432,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2477,
        "oprate": 1,
        "name": "能耗1642",
        "node_name": "能耗02",
        "point_id": 642,
        "group_id": 61,
        "id": 2433,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2478,
        "oprate": 1,
        "name": "能耗1643",
        "node_name": "能耗02",
        "point_id": 643,
        "group_id": 61,
        "id": 2434,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2479,
        "oprate": 1,
        "name": "能耗1644",
        "node_name": "能耗02",
        "point_id": 644,
        "group_id": 61,
        "id": 2435,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2480,
        "oprate": 1,
        "name": "能耗1645",
        "node_name": "能耗02",
        "point_id": 645,
        "group_id": 61,
        "id": 2436,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2481,
        "oprate": 1,
        "name": "能耗1646",
        "node_name": "能耗02",
        "point_id": 646,
        "group_id": 61,
        "id": 2437,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2482,
        "oprate": 1,
        "name": "能耗1647",
        "node_name": "能耗02",
        "point_id": 647,
        "group_id": 61,
        "id": 2438,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2483,
        "oprate": 1,
        "name": "能耗1648",
        "node_name": "能耗02",
        "point_id": 648,
        "group_id": 61,
        "id": 2439,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2484,
        "oprate": 1,
        "name": "能耗1649",
        "node_name": "能耗02",
        "point_id": 649,
        "group_id": 61,
        "id": 2440,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2485,
        "oprate": 1,
        "name": "能耗1650",
        "node_name": "能耗02",
        "point_id": 650,
        "group_id": 61,
        "id": 2441,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2486,
        "oprate": 1,
        "name": "能耗1651",
        "node_name": "能耗02",
        "point_id": 651,
        "group_id": 61,
        "id": 2442,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2487,
        "oprate": 1,
        "name": "能耗1652",
        "node_name": "能耗02",
        "point_id": 652,
        "group_id": 61,
        "id": 2443,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2488,
        "oprate": 1,
        "name": "能耗1653",
        "node_name": "能耗02",
        "point_id": 653,
        "group_id": 61,
        "id": 2444,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2489,
        "oprate": 1,
        "name": "能耗1654",
        "node_name": "能耗02",
        "point_id": 654,
        "group_id": 61,
        "id": 2445,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2490,
        "oprate": 1,
        "name": "能耗1655",
        "node_name": "能耗02",
        "point_id": 655,
        "group_id": 61,
        "id": 2446,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2491,
        "oprate": 1,
        "name": "能耗1656",
        "node_name": "能耗02",
        "point_id": 656,
        "group_id": 61,
        "id": 2447,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2492,
        "oprate": 1,
        "name": "能耗1657",
        "node_name": "能耗02",
        "point_id": 657,
        "group_id": 61,
        "id": 2448,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2493,
        "oprate": 1,
        "name": "能耗1658",
        "node_name": "能耗02",
        "point_id": 658,
        "group_id": 61,
        "id": 2449,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2494,
        "oprate": 1,
        "name": "能耗1659",
        "node_name": "能耗02",
        "point_id": 659,
        "group_id": 61,
        "id": 2450,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2495,
        "oprate": 1,
        "name": "能耗1660",
        "node_name": "能耗02",
        "point_id": 660,
        "group_id": 61,
        "id": 2451,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2496,
        "oprate": 1,
        "name": "能耗1661",
        "node_name": "能耗02",
        "point_id": 661,
        "group_id": 61,
        "id": 2452,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2497,
        "oprate": 1,
        "name": "能耗1662",
        "node_name": "能耗02",
        "point_id": 662,
        "group_id": 61,
        "id": 2453,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2498,
        "oprate": 1,
        "name": "能耗1663",
        "node_name": "能耗02",
        "point_id": 663,
        "group_id": 61,
        "id": 2454,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2499,
        "oprate": 1,
        "name": "能耗1664",
        "node_name": "能耗02",
        "point_id": 664,
        "group_id": 61,
        "id": 2455,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2500,
        "oprate": 1,
        "name": "能耗1665",
        "node_name": "能耗02",
        "point_id": 665,
        "group_id": 61,
        "id": 2456,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2501,
        "oprate": 1,
        "name": "能耗1666",
        "node_name": "能耗02",
        "point_id": 666,
        "group_id": 61,
        "id": 2457,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2502,
        "oprate": 1,
        "name": "能耗1667",
        "node_name": "能耗02",
        "point_id": 667,
        "group_id": 61,
        "id": 2458,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2503,
        "oprate": 1,
        "name": "能耗1668",
        "node_name": "能耗02",
        "point_id": 668,
        "group_id": 61,
        "id": 2459,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2504,
        "oprate": 1,
        "name": "能耗1669",
        "node_name": "能耗02",
        "point_id": 669,
        "group_id": 61,
        "id": 2460,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2505,
        "oprate": 1,
        "name": "能耗1670",
        "node_name": "能耗02",
        "point_id": 670,
        "group_id": 61,
        "id": 2461,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2506,
        "oprate": 1,
        "name": "能耗1671",
        "node_name": "能耗02",
        "point_id": 671,
        "group_id": 61,
        "id": 2462,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2507,
        "oprate": 1,
        "name": "能耗1672",
        "node_name": "能耗02",
        "point_id": 672,
        "group_id": 61,
        "id": 2463,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2508,
        "oprate": 1,
        "name": "能耗1673",
        "node_name": "能耗02",
        "point_id": 673,
        "group_id": 61,
        "id": 2464,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2509,
        "oprate": 1,
        "name": "能耗1674",
        "node_name": "能耗02",
        "point_id": 674,
        "group_id": 61,
        "id": 2465,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2510,
        "oprate": 1,
        "name": "能耗1675",
        "node_name": "能耗02",
        "point_id": 675,
        "group_id": 61,
        "id": 2466,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2511,
        "oprate": 1,
        "name": "能耗1676",
        "node_name": "能耗02",
        "point_id": 676,
        "group_id": 61,
        "id": 2467,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2512,
        "oprate": 1,
        "name": "能耗1677",
        "node_name": "能耗02",
        "point_id": 677,
        "group_id": 61,
        "id": 2468,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2513,
        "oprate": 1,
        "name": "能耗1678",
        "node_name": "能耗02",
        "point_id": 678,
        "group_id": 61,
        "id": 2469,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2514,
        "oprate": 1,
        "name": "能耗1679",
        "node_name": "能耗02",
        "point_id": 679,
        "group_id": 61,
        "id": 2470,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2515,
        "oprate": 1,
        "name": "能耗1680",
        "node_name": "能耗02",
        "point_id": 680,
        "group_id": 61,
        "id": 2471,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2516,
        "oprate": 1,
        "name": "能耗1681",
        "node_name": "能耗02",
        "point_id": 681,
        "group_id": 61,
        "id": 2472,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2517,
        "oprate": 1,
        "name": "能耗1682",
        "node_name": "能耗02",
        "point_id": 682,
        "group_id": 61,
        "id": 2473,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2518,
        "oprate": 1,
        "name": "能耗1683",
        "node_name": "能耗02",
        "point_id": 683,
        "group_id": 61,
        "id": 2474,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2519,
        "oprate": 1,
        "name": "能耗1684",
        "node_name": "能耗02",
        "point_id": 684,
        "group_id": 61,
        "id": 2475,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2520,
        "oprate": 1,
        "name": "能耗1685",
        "node_name": "能耗02",
        "point_id": 685,
        "group_id": 61,
        "id": 2476,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2521,
        "oprate": 1,
        "name": "能耗1686",
        "node_name": "能耗02",
        "point_id": 686,
        "group_id": 61,
        "id": 2477,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2522,
        "oprate": 1,
        "name": "能耗1687",
        "node_name": "能耗02",
        "point_id": 687,
        "group_id": 61,
        "id": 2478,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2523,
        "oprate": 1,
        "name": "能耗1688",
        "node_name": "能耗02",
        "point_id": 688,
        "group_id": 61,
        "id": 2479,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2524,
        "oprate": 1,
        "name": "能耗1689",
        "node_name": "能耗02",
        "point_id": 689,
        "group_id": 61,
        "id": 2480,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2525,
        "oprate": 1,
        "name": "能耗1690",
        "node_name": "能耗02",
        "point_id": 690,
        "group_id": 61,
        "id": 2481,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2526,
        "oprate": 1,
        "name": "能耗1691",
        "node_name": "能耗02",
        "point_id": 691,
        "group_id": 61,
        "id": 2482,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2527,
        "oprate": 1,
        "name": "能耗1692",
        "node_name": "能耗02",
        "point_id": 692,
        "group_id": 61,
        "id": 2483,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2528,
        "oprate": 1,
        "name": "能耗1693",
        "node_name": "能耗02",
        "point_id": 693,
        "group_id": 61,
        "id": 2484,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2529,
        "oprate": 1,
        "name": "能耗1694",
        "node_name": "能耗02",
        "point_id": 694,
        "group_id": 61,
        "id": 2485,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2530,
        "oprate": 1,
        "name": "能耗1695",
        "node_name": "能耗02",
        "point_id": 695,
        "group_id": 61,
        "id": 2486,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2531,
        "oprate": 1,
        "name": "能耗1696",
        "node_name": "能耗02",
        "point_id": 696,
        "group_id": 61,
        "id": 2487,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2532,
        "oprate": 1,
        "name": "能耗1697",
        "node_name": "能耗02",
        "point_id": 697,
        "group_id": 61,
        "id": 2488,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2533,
        "oprate": 1,
        "name": "能耗1698",
        "node_name": "能耗02",
        "point_id": 698,
        "group_id": 61,
        "id": 2489,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2534,
        "oprate": 1,
        "name": "能耗1699",
        "node_name": "能耗02",
        "point_id": 699,
        "group_id": 61,
        "id": 2490,
        "create_time": "2017-06-15 17:34:34"
      }, {
        "tag_id": 2535,
        "oprate": 1,
        "name": "能耗1700",
        "node_name": "能耗02",
        "point_id": 700,
        "group_id": 61,
        "id": 2491,
        "create_time": "2017-06-15 17:34:34"
      }],
      "id": 61,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗18",
      "tag_id_tree": null,
      "hide_tag": 0,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2536,
        "oprate": 1,
        "name": "能耗1701",
        "node_name": "能耗02",
        "point_id": 701,
        "group_id": 62,
        "id": 2492,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2537,
        "oprate": 1,
        "name": "能耗1702",
        "node_name": "能耗02",
        "point_id": 702,
        "group_id": 62,
        "id": 2493,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2538,
        "oprate": 1,
        "name": "能耗1703",
        "node_name": "能耗02",
        "point_id": 703,
        "group_id": 62,
        "id": 2494,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2539,
        "oprate": 1,
        "name": "能耗1704",
        "node_name": "能耗02",
        "point_id": 704,
        "group_id": 62,
        "id": 2495,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2540,
        "oprate": 1,
        "name": "能耗1705",
        "node_name": "能耗02",
        "point_id": 705,
        "group_id": 62,
        "id": 2496,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2541,
        "oprate": 1,
        "name": "能耗1706",
        "node_name": "能耗02",
        "point_id": 706,
        "group_id": 62,
        "id": 2497,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2542,
        "oprate": 1,
        "name": "能耗1707",
        "node_name": "能耗02",
        "point_id": 707,
        "group_id": 62,
        "id": 2498,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2543,
        "oprate": 1,
        "name": "能耗1708",
        "node_name": "能耗02",
        "point_id": 708,
        "group_id": 62,
        "id": 2499,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2544,
        "oprate": 1,
        "name": "能耗1709",
        "node_name": "能耗02",
        "point_id": 709,
        "group_id": 62,
        "id": 2500,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2545,
        "oprate": 1,
        "name": "能耗1710",
        "node_name": "能耗02",
        "point_id": 710,
        "group_id": 62,
        "id": 2501,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2546,
        "oprate": 1,
        "name": "能耗1711",
        "node_name": "能耗02",
        "point_id": 711,
        "group_id": 62,
        "id": 2502,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2547,
        "oprate": 1,
        "name": "能耗1712",
        "node_name": "能耗02",
        "point_id": 712,
        "group_id": 62,
        "id": 2503,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2548,
        "oprate": 1,
        "name": "能耗1713",
        "node_name": "能耗02",
        "point_id": 713,
        "group_id": 62,
        "id": 2504,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2549,
        "oprate": 1,
        "name": "能耗1714",
        "node_name": "能耗02",
        "point_id": 714,
        "group_id": 62,
        "id": 2505,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2550,
        "oprate": 1,
        "name": "能耗1715",
        "node_name": "能耗02",
        "point_id": 715,
        "group_id": 62,
        "id": 2506,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2551,
        "oprate": 1,
        "name": "能耗1716",
        "node_name": "能耗02",
        "point_id": 716,
        "group_id": 62,
        "id": 2507,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2552,
        "oprate": 1,
        "name": "能耗1717",
        "node_name": "能耗02",
        "point_id": 717,
        "group_id": 62,
        "id": 2508,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2553,
        "oprate": 1,
        "name": "能耗1718",
        "node_name": "能耗02",
        "point_id": 718,
        "group_id": 62,
        "id": 2509,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2554,
        "oprate": 1,
        "name": "能耗1719",
        "node_name": "能耗02",
        "point_id": 719,
        "group_id": 62,
        "id": 2510,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2555,
        "oprate": 1,
        "name": "能耗1720",
        "node_name": "能耗02",
        "point_id": 720,
        "group_id": 62,
        "id": 2511,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2556,
        "oprate": 1,
        "name": "能耗1721",
        "node_name": "能耗02",
        "point_id": 721,
        "group_id": 62,
        "id": 2512,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2557,
        "oprate": 1,
        "name": "能耗1722",
        "node_name": "能耗02",
        "point_id": 722,
        "group_id": 62,
        "id": 2513,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2558,
        "oprate": 1,
        "name": "能耗1723",
        "node_name": "能耗02",
        "point_id": 723,
        "group_id": 62,
        "id": 2514,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2559,
        "oprate": 1,
        "name": "能耗1724",
        "node_name": "能耗02",
        "point_id": 724,
        "group_id": 62,
        "id": 2515,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2560,
        "oprate": 1,
        "name": "能耗1725",
        "node_name": "能耗02",
        "point_id": 725,
        "group_id": 62,
        "id": 2516,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2561,
        "oprate": 1,
        "name": "能耗1726",
        "node_name": "能耗02",
        "point_id": 726,
        "group_id": 62,
        "id": 2517,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2562,
        "oprate": 1,
        "name": "能耗1727",
        "node_name": "能耗02",
        "point_id": 727,
        "group_id": 62,
        "id": 2518,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2563,
        "oprate": 1,
        "name": "能耗1728",
        "node_name": "能耗02",
        "point_id": 728,
        "group_id": 62,
        "id": 2519,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2564,
        "oprate": 1,
        "name": "能耗1729",
        "node_name": "能耗02",
        "point_id": 729,
        "group_id": 62,
        "id": 2520,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2565,
        "oprate": 1,
        "name": "能耗1730",
        "node_name": "能耗02",
        "point_id": 730,
        "group_id": 62,
        "id": 2521,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2566,
        "oprate": 1,
        "name": "能耗1731",
        "node_name": "能耗02",
        "point_id": 731,
        "group_id": 62,
        "id": 2522,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2567,
        "oprate": 1,
        "name": "能耗1732",
        "node_name": "能耗02",
        "point_id": 732,
        "group_id": 62,
        "id": 2523,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2568,
        "oprate": 1,
        "name": "能耗1733",
        "node_name": "能耗02",
        "point_id": 733,
        "group_id": 62,
        "id": 2524,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2569,
        "oprate": 1,
        "name": "能耗1734",
        "node_name": "能耗02",
        "point_id": 734,
        "group_id": 62,
        "id": 2525,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2570,
        "oprate": 1,
        "name": "能耗1735",
        "node_name": "能耗02",
        "point_id": 735,
        "group_id": 62,
        "id": 2526,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2571,
        "oprate": 1,
        "name": "能耗1736",
        "node_name": "能耗02",
        "point_id": 736,
        "group_id": 62,
        "id": 2527,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2572,
        "oprate": 1,
        "name": "能耗1737",
        "node_name": "能耗02",
        "point_id": 737,
        "group_id": 62,
        "id": 2528,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2573,
        "oprate": 1,
        "name": "能耗1738",
        "node_name": "能耗02",
        "point_id": 738,
        "group_id": 62,
        "id": 2529,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2574,
        "oprate": 1,
        "name": "能耗1739",
        "node_name": "能耗02",
        "point_id": 739,
        "group_id": 62,
        "id": 2530,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2575,
        "oprate": 1,
        "name": "能耗1740",
        "node_name": "能耗02",
        "point_id": 740,
        "group_id": 62,
        "id": 2531,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2576,
        "oprate": 1,
        "name": "能耗1741",
        "node_name": "能耗02",
        "point_id": 741,
        "group_id": 62,
        "id": 2532,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2577,
        "oprate": 1,
        "name": "能耗1742",
        "node_name": "能耗02",
        "point_id": 742,
        "group_id": 62,
        "id": 2533,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2578,
        "oprate": 1,
        "name": "能耗1743",
        "node_name": "能耗02",
        "point_id": 743,
        "group_id": 62,
        "id": 2534,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2579,
        "oprate": 1,
        "name": "能耗1744",
        "node_name": "能耗02",
        "point_id": 744,
        "group_id": 62,
        "id": 2535,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2580,
        "oprate": 1,
        "name": "能耗1745",
        "node_name": "能耗02",
        "point_id": 745,
        "group_id": 62,
        "id": 2536,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2581,
        "oprate": 1,
        "name": "能耗1746",
        "node_name": "能耗02",
        "point_id": 746,
        "group_id": 62,
        "id": 2537,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2582,
        "oprate": 1,
        "name": "能耗1747",
        "node_name": "能耗02",
        "point_id": 747,
        "group_id": 62,
        "id": 2538,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2583,
        "oprate": 1,
        "name": "能耗1748",
        "node_name": "能耗02",
        "point_id": 748,
        "group_id": 62,
        "id": 2539,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2584,
        "oprate": 1,
        "name": "能耗1749",
        "node_name": "能耗02",
        "point_id": 749,
        "group_id": 62,
        "id": 2540,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2585,
        "oprate": 1,
        "name": "能耗1750",
        "node_name": "能耗02",
        "point_id": 750,
        "group_id": 62,
        "id": 2541,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2587,
        "oprate": 1,
        "name": "能耗1752",
        "node_name": "能耗02",
        "point_id": 752,
        "group_id": 62,
        "id": 2542,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2586,
        "oprate": 1,
        "name": "能耗1751",
        "node_name": "能耗02",
        "point_id": 751,
        "group_id": 62,
        "id": 2543,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2588,
        "oprate": 1,
        "name": "能耗1753",
        "node_name": "能耗02",
        "point_id": 753,
        "group_id": 62,
        "id": 2544,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2589,
        "oprate": 1,
        "name": "能耗1754",
        "node_name": "能耗02",
        "point_id": 754,
        "group_id": 62,
        "id": 2545,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2590,
        "oprate": 1,
        "name": "能耗1755",
        "node_name": "能耗02",
        "point_id": 755,
        "group_id": 62,
        "id": 2546,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2591,
        "oprate": 1,
        "name": "能耗1756",
        "node_name": "能耗02",
        "point_id": 756,
        "group_id": 62,
        "id": 2547,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2592,
        "oprate": 1,
        "name": "能耗1757",
        "node_name": "能耗02",
        "point_id": 757,
        "group_id": 62,
        "id": 2548,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2593,
        "oprate": 1,
        "name": "能耗1758",
        "node_name": "能耗02",
        "point_id": 758,
        "group_id": 62,
        "id": 2549,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2594,
        "oprate": 1,
        "name": "能耗1759",
        "node_name": "能耗02",
        "point_id": 759,
        "group_id": 62,
        "id": 2550,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2595,
        "oprate": 1,
        "name": "能耗1760",
        "node_name": "能耗02",
        "point_id": 760,
        "group_id": 62,
        "id": 2551,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2596,
        "oprate": 1,
        "name": "能耗1761",
        "node_name": "能耗02",
        "point_id": 761,
        "group_id": 62,
        "id": 2552,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2597,
        "oprate": 1,
        "name": "能耗1762",
        "node_name": "能耗02",
        "point_id": 762,
        "group_id": 62,
        "id": 2553,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2598,
        "oprate": 1,
        "name": "能耗1763",
        "node_name": "能耗02",
        "point_id": 763,
        "group_id": 62,
        "id": 2554,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2599,
        "oprate": 1,
        "name": "能耗1764",
        "node_name": "能耗02",
        "point_id": 764,
        "group_id": 62,
        "id": 2555,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2600,
        "oprate": 1,
        "name": "能耗1765",
        "node_name": "能耗02",
        "point_id": 765,
        "group_id": 62,
        "id": 2556,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2601,
        "oprate": 1,
        "name": "能耗1766",
        "node_name": "能耗02",
        "point_id": 766,
        "group_id": 62,
        "id": 2557,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2602,
        "oprate": 1,
        "name": "能耗1767",
        "node_name": "能耗02",
        "point_id": 767,
        "group_id": 62,
        "id": 2558,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2603,
        "oprate": 1,
        "name": "能耗1768",
        "node_name": "能耗02",
        "point_id": 768,
        "group_id": 62,
        "id": 2559,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2605,
        "oprate": 1,
        "name": "能耗1770",
        "node_name": "能耗02",
        "point_id": 770,
        "group_id": 62,
        "id": 2560,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2606,
        "oprate": 1,
        "name": "能耗1771",
        "node_name": "能耗02",
        "point_id": 771,
        "group_id": 62,
        "id": 2561,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2604,
        "oprate": 1,
        "name": "能耗1769",
        "node_name": "能耗02",
        "point_id": 769,
        "group_id": 62,
        "id": 2562,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2607,
        "oprate": 1,
        "name": "能耗1772",
        "node_name": "能耗02",
        "point_id": 772,
        "group_id": 62,
        "id": 2563,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2608,
        "oprate": 1,
        "name": "能耗1773",
        "node_name": "能耗02",
        "point_id": 773,
        "group_id": 62,
        "id": 2564,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2609,
        "oprate": 1,
        "name": "能耗1774",
        "node_name": "能耗02",
        "point_id": 774,
        "group_id": 62,
        "id": 2565,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2610,
        "oprate": 1,
        "name": "能耗1775",
        "node_name": "能耗02",
        "point_id": 775,
        "group_id": 62,
        "id": 2566,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2611,
        "oprate": 1,
        "name": "能耗1776",
        "node_name": "能耗02",
        "point_id": 776,
        "group_id": 62,
        "id": 2567,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2612,
        "oprate": 1,
        "name": "能耗1777",
        "node_name": "能耗02",
        "point_id": 777,
        "group_id": 62,
        "id": 2568,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2613,
        "oprate": 1,
        "name": "能耗1778",
        "node_name": "能耗02",
        "point_id": 778,
        "group_id": 62,
        "id": 2569,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2614,
        "oprate": 1,
        "name": "能耗1779",
        "node_name": "能耗02",
        "point_id": 779,
        "group_id": 62,
        "id": 2570,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2615,
        "oprate": 1,
        "name": "能耗1780",
        "node_name": "能耗02",
        "point_id": 780,
        "group_id": 62,
        "id": 2571,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2616,
        "oprate": 1,
        "name": "能耗1781",
        "node_name": "能耗02",
        "point_id": 781,
        "group_id": 62,
        "id": 2572,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2617,
        "oprate": 1,
        "name": "能耗1782",
        "node_name": "能耗02",
        "point_id": 782,
        "group_id": 62,
        "id": 2573,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2618,
        "oprate": 1,
        "name": "能耗1783",
        "node_name": "能耗02",
        "point_id": 783,
        "group_id": 62,
        "id": 2574,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2619,
        "oprate": 1,
        "name": "能耗1784",
        "node_name": "能耗02",
        "point_id": 784,
        "group_id": 62,
        "id": 2575,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2620,
        "oprate": 1,
        "name": "能耗1785",
        "node_name": "能耗02",
        "point_id": 785,
        "group_id": 62,
        "id": 2576,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2621,
        "oprate": 1,
        "name": "能耗1786",
        "node_name": "能耗02",
        "point_id": 786,
        "group_id": 62,
        "id": 2577,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2622,
        "oprate": 1,
        "name": "能耗1787",
        "node_name": "能耗02",
        "point_id": 787,
        "group_id": 62,
        "id": 2578,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2623,
        "oprate": 1,
        "name": "能耗1788",
        "node_name": "能耗02",
        "point_id": 788,
        "group_id": 62,
        "id": 2579,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2624,
        "oprate": 1,
        "name": "能耗1789",
        "node_name": "能耗02",
        "point_id": 789,
        "group_id": 62,
        "id": 2580,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2625,
        "oprate": 1,
        "name": "能耗1790",
        "node_name": "能耗02",
        "point_id": 790,
        "group_id": 62,
        "id": 2581,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2626,
        "oprate": 1,
        "name": "能耗1791",
        "node_name": "能耗02",
        "point_id": 791,
        "group_id": 62,
        "id": 2582,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2627,
        "oprate": 1,
        "name": "能耗1792",
        "node_name": "能耗02",
        "point_id": 792,
        "group_id": 62,
        "id": 2583,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2628,
        "oprate": 1,
        "name": "能耗1793",
        "node_name": "能耗02",
        "point_id": 793,
        "group_id": 62,
        "id": 2584,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2629,
        "oprate": 1,
        "name": "能耗1794",
        "node_name": "能耗02",
        "point_id": 794,
        "group_id": 62,
        "id": 2585,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2630,
        "oprate": 1,
        "name": "能耗1795",
        "node_name": "能耗02",
        "point_id": 795,
        "group_id": 62,
        "id": 2586,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2631,
        "oprate": 1,
        "name": "能耗1796",
        "node_name": "能耗02",
        "point_id": 796,
        "group_id": 62,
        "id": 2587,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2632,
        "oprate": 1,
        "name": "能耗1797",
        "node_name": "能耗02",
        "point_id": 797,
        "group_id": 62,
        "id": 2588,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2633,
        "oprate": 1,
        "name": "能耗1798",
        "node_name": "能耗02",
        "point_id": 798,
        "group_id": 62,
        "id": 2589,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2634,
        "oprate": 1,
        "name": "能耗1799",
        "node_name": "能耗02",
        "point_id": 799,
        "group_id": 62,
        "id": 2590,
        "create_time": "2017-06-15 17:36:43"
      }, {
        "tag_id": 2635,
        "oprate": 1,
        "name": "能耗1800",
        "node_name": "能耗02",
        "point_id": 800,
        "group_id": 62,
        "id": 2591,
        "create_time": "2017-06-15 17:36:43"
      }],
      "id": 62,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗19",
      "tag_id_tree": null,
      "hide_tag": 0,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2636,
        "oprate": 1,
        "name": "能耗1801",
        "node_name": "能耗02",
        "point_id": 801,
        "group_id": 63,
        "id": 2592,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2637,
        "oprate": 1,
        "name": "能耗1802",
        "node_name": "能耗02",
        "point_id": 802,
        "group_id": 63,
        "id": 2593,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2638,
        "oprate": 1,
        "name": "能耗1803",
        "node_name": "能耗02",
        "point_id": 803,
        "group_id": 63,
        "id": 2594,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2639,
        "oprate": 1,
        "name": "能耗1804",
        "node_name": "能耗02",
        "point_id": 804,
        "group_id": 63,
        "id": 2595,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2640,
        "oprate": 1,
        "name": "能耗1805",
        "node_name": "能耗02",
        "point_id": 805,
        "group_id": 63,
        "id": 2596,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2641,
        "oprate": 1,
        "name": "能耗1806",
        "node_name": "能耗02",
        "point_id": 806,
        "group_id": 63,
        "id": 2597,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2642,
        "oprate": 1,
        "name": "能耗1807",
        "node_name": "能耗02",
        "point_id": 807,
        "group_id": 63,
        "id": 2598,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2643,
        "oprate": 1,
        "name": "能耗1808",
        "node_name": "能耗02",
        "point_id": 808,
        "group_id": 63,
        "id": 2599,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2644,
        "oprate": 1,
        "name": "能耗1809",
        "node_name": "能耗02",
        "point_id": 809,
        "group_id": 63,
        "id": 2600,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2645,
        "oprate": 1,
        "name": "能耗1810",
        "node_name": "能耗02",
        "point_id": 810,
        "group_id": 63,
        "id": 2601,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2646,
        "oprate": 1,
        "name": "能耗1811",
        "node_name": "能耗02",
        "point_id": 811,
        "group_id": 63,
        "id": 2602,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2647,
        "oprate": 1,
        "name": "能耗1812",
        "node_name": "能耗02",
        "point_id": 812,
        "group_id": 63,
        "id": 2603,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2648,
        "oprate": 1,
        "name": "能耗1813",
        "node_name": "能耗02",
        "point_id": 813,
        "group_id": 63,
        "id": 2604,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2649,
        "oprate": 1,
        "name": "能耗1814",
        "node_name": "能耗02",
        "point_id": 814,
        "group_id": 63,
        "id": 2605,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2650,
        "oprate": 1,
        "name": "能耗1815",
        "node_name": "能耗02",
        "point_id": 815,
        "group_id": 63,
        "id": 2606,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2651,
        "oprate": 1,
        "name": "能耗1816",
        "node_name": "能耗02",
        "point_id": 816,
        "group_id": 63,
        "id": 2607,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2652,
        "oprate": 1,
        "name": "能耗1817",
        "node_name": "能耗02",
        "point_id": 817,
        "group_id": 63,
        "id": 2608,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2653,
        "oprate": 1,
        "name": "能耗1818",
        "node_name": "能耗02",
        "point_id": 818,
        "group_id": 63,
        "id": 2609,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2654,
        "oprate": 1,
        "name": "能耗1819",
        "node_name": "能耗02",
        "point_id": 819,
        "group_id": 63,
        "id": 2610,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2655,
        "oprate": 1,
        "name": "能耗1820",
        "node_name": "能耗02",
        "point_id": 820,
        "group_id": 63,
        "id": 2611,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2656,
        "oprate": 1,
        "name": "能耗1821",
        "node_name": "能耗02",
        "point_id": 821,
        "group_id": 63,
        "id": 2612,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2657,
        "oprate": 1,
        "name": "能耗1822",
        "node_name": "能耗02",
        "point_id": 822,
        "group_id": 63,
        "id": 2613,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2658,
        "oprate": 1,
        "name": "能耗1823",
        "node_name": "能耗02",
        "point_id": 823,
        "group_id": 63,
        "id": 2614,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2659,
        "oprate": 1,
        "name": "能耗1824",
        "node_name": "能耗02",
        "point_id": 824,
        "group_id": 63,
        "id": 2615,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2660,
        "oprate": 1,
        "name": "能耗1825",
        "node_name": "能耗02",
        "point_id": 825,
        "group_id": 63,
        "id": 2616,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2661,
        "oprate": 1,
        "name": "能耗1826",
        "node_name": "能耗02",
        "point_id": 826,
        "group_id": 63,
        "id": 2617,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2662,
        "oprate": 1,
        "name": "能耗1827",
        "node_name": "能耗02",
        "point_id": 827,
        "group_id": 63,
        "id": 2618,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2663,
        "oprate": 1,
        "name": "能耗1828",
        "node_name": "能耗02",
        "point_id": 828,
        "group_id": 63,
        "id": 2619,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2664,
        "oprate": 1,
        "name": "能耗1829",
        "node_name": "能耗02",
        "point_id": 829,
        "group_id": 63,
        "id": 2620,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2665,
        "oprate": 1,
        "name": "能耗1830",
        "node_name": "能耗02",
        "point_id": 830,
        "group_id": 63,
        "id": 2621,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2666,
        "oprate": 1,
        "name": "能耗1831",
        "node_name": "能耗02",
        "point_id": 831,
        "group_id": 63,
        "id": 2622,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2667,
        "oprate": 1,
        "name": "能耗1832",
        "node_name": "能耗02",
        "point_id": 832,
        "group_id": 63,
        "id": 2623,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2668,
        "oprate": 1,
        "name": "能耗1833",
        "node_name": "能耗02",
        "point_id": 833,
        "group_id": 63,
        "id": 2624,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2669,
        "oprate": 1,
        "name": "能耗1834",
        "node_name": "能耗02",
        "point_id": 834,
        "group_id": 63,
        "id": 2625,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2670,
        "oprate": 1,
        "name": "能耗1835",
        "node_name": "能耗02",
        "point_id": 835,
        "group_id": 63,
        "id": 2626,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2671,
        "oprate": 1,
        "name": "能耗1836",
        "node_name": "能耗02",
        "point_id": 836,
        "group_id": 63,
        "id": 2627,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2672,
        "oprate": 1,
        "name": "能耗1837",
        "node_name": "能耗02",
        "point_id": 837,
        "group_id": 63,
        "id": 2628,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2673,
        "oprate": 1,
        "name": "能耗1838",
        "node_name": "能耗02",
        "point_id": 838,
        "group_id": 63,
        "id": 2629,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2674,
        "oprate": 1,
        "name": "能耗1839",
        "node_name": "能耗02",
        "point_id": 839,
        "group_id": 63,
        "id": 2630,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2675,
        "oprate": 1,
        "name": "能耗1840",
        "node_name": "能耗02",
        "point_id": 840,
        "group_id": 63,
        "id": 2631,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2676,
        "oprate": 1,
        "name": "能耗1841",
        "node_name": "能耗02",
        "point_id": 841,
        "group_id": 63,
        "id": 2632,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2677,
        "oprate": 1,
        "name": "能耗1842",
        "node_name": "能耗02",
        "point_id": 842,
        "group_id": 63,
        "id": 2633,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2678,
        "oprate": 1,
        "name": "能耗1843",
        "node_name": "能耗02",
        "point_id": 843,
        "group_id": 63,
        "id": 2634,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2679,
        "oprate": 1,
        "name": "能耗1844",
        "node_name": "能耗02",
        "point_id": 844,
        "group_id": 63,
        "id": 2635,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2680,
        "oprate": 1,
        "name": "能耗1845",
        "node_name": "能耗02",
        "point_id": 845,
        "group_id": 63,
        "id": 2636,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2681,
        "oprate": 1,
        "name": "能耗1846",
        "node_name": "能耗02",
        "point_id": 846,
        "group_id": 63,
        "id": 2637,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2682,
        "oprate": 1,
        "name": "能耗1847",
        "node_name": "能耗02",
        "point_id": 847,
        "group_id": 63,
        "id": 2638,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2683,
        "oprate": 1,
        "name": "能耗1848",
        "node_name": "能耗02",
        "point_id": 848,
        "group_id": 63,
        "id": 2639,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2684,
        "oprate": 1,
        "name": "能耗1849",
        "node_name": "能耗02",
        "point_id": 849,
        "group_id": 63,
        "id": 2640,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2685,
        "oprate": 1,
        "name": "能耗1850",
        "node_name": "能耗02",
        "point_id": 850,
        "group_id": 63,
        "id": 2641,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2686,
        "oprate": 1,
        "name": "能耗1851",
        "node_name": "能耗02",
        "point_id": 851,
        "group_id": 63,
        "id": 2642,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2687,
        "oprate": 1,
        "name": "能耗1852",
        "node_name": "能耗02",
        "point_id": 852,
        "group_id": 63,
        "id": 2643,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2688,
        "oprate": 1,
        "name": "能耗1853",
        "node_name": "能耗02",
        "point_id": 853,
        "group_id": 63,
        "id": 2644,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2689,
        "oprate": 1,
        "name": "能耗1854",
        "node_name": "能耗02",
        "point_id": 854,
        "group_id": 63,
        "id": 2645,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2690,
        "oprate": 1,
        "name": "能耗1855",
        "node_name": "能耗02",
        "point_id": 855,
        "group_id": 63,
        "id": 2646,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2691,
        "oprate": 1,
        "name": "能耗1856",
        "node_name": "能耗02",
        "point_id": 856,
        "group_id": 63,
        "id": 2647,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2692,
        "oprate": 1,
        "name": "能耗1857",
        "node_name": "能耗02",
        "point_id": 857,
        "group_id": 63,
        "id": 2648,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2693,
        "oprate": 1,
        "name": "能耗1858",
        "node_name": "能耗02",
        "point_id": 858,
        "group_id": 63,
        "id": 2649,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2694,
        "oprate": 1,
        "name": "能耗1859",
        "node_name": "能耗02",
        "point_id": 859,
        "group_id": 63,
        "id": 2650,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2695,
        "oprate": 1,
        "name": "能耗1860",
        "node_name": "能耗02",
        "point_id": 860,
        "group_id": 63,
        "id": 2651,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2696,
        "oprate": 1,
        "name": "能耗1861",
        "node_name": "能耗02",
        "point_id": 861,
        "group_id": 63,
        "id": 2652,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2697,
        "oprate": 1,
        "name": "能耗1862",
        "node_name": "能耗02",
        "point_id": 862,
        "group_id": 63,
        "id": 2653,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2698,
        "oprate": 1,
        "name": "能耗1863",
        "node_name": "能耗02",
        "point_id": 863,
        "group_id": 63,
        "id": 2654,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2699,
        "oprate": 1,
        "name": "能耗1864",
        "node_name": "能耗02",
        "point_id": 864,
        "group_id": 63,
        "id": 2655,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2700,
        "oprate": 1,
        "name": "能耗1865",
        "node_name": "能耗02",
        "point_id": 865,
        "group_id": 63,
        "id": 2656,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2701,
        "oprate": 1,
        "name": "能耗1866",
        "node_name": "能耗02",
        "point_id": 866,
        "group_id": 63,
        "id": 2657,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2702,
        "oprate": 1,
        "name": "能耗1867",
        "node_name": "能耗02",
        "point_id": 867,
        "group_id": 63,
        "id": 2658,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2703,
        "oprate": 1,
        "name": "能耗1868",
        "node_name": "能耗02",
        "point_id": 868,
        "group_id": 63,
        "id": 2659,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2704,
        "oprate": 1,
        "name": "能耗1869",
        "node_name": "能耗02",
        "point_id": 869,
        "group_id": 63,
        "id": 2660,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2705,
        "oprate": 1,
        "name": "能耗1870",
        "node_name": "能耗02",
        "point_id": 870,
        "group_id": 63,
        "id": 2661,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2706,
        "oprate": 1,
        "name": "能耗1871",
        "node_name": "能耗02",
        "point_id": 871,
        "group_id": 63,
        "id": 2662,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2707,
        "oprate": 1,
        "name": "能耗1872",
        "node_name": "能耗02",
        "point_id": 872,
        "group_id": 63,
        "id": 2663,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2708,
        "oprate": 1,
        "name": "能耗1873",
        "node_name": "能耗02",
        "point_id": 873,
        "group_id": 63,
        "id": 2664,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2709,
        "oprate": 1,
        "name": "能耗1874",
        "node_name": "能耗02",
        "point_id": 874,
        "group_id": 63,
        "id": 2665,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2710,
        "oprate": 1,
        "name": "能耗1875",
        "node_name": "能耗02",
        "point_id": 875,
        "group_id": 63,
        "id": 2666,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2711,
        "oprate": 1,
        "name": "能耗1876",
        "node_name": "能耗02",
        "point_id": 876,
        "group_id": 63,
        "id": 2667,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2712,
        "oprate": 1,
        "name": "能耗1877",
        "node_name": "能耗02",
        "point_id": 877,
        "group_id": 63,
        "id": 2668,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2713,
        "oprate": 1,
        "name": "能耗1878",
        "node_name": "能耗02",
        "point_id": 878,
        "group_id": 63,
        "id": 2669,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2714,
        "oprate": 1,
        "name": "能耗1879",
        "node_name": "能耗02",
        "point_id": 879,
        "group_id": 63,
        "id": 2670,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2715,
        "oprate": 1,
        "name": "能耗1880",
        "node_name": "能耗02",
        "point_id": 880,
        "group_id": 63,
        "id": 2671,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2716,
        "oprate": 1,
        "name": "能耗1881",
        "node_name": "能耗02",
        "point_id": 881,
        "group_id": 63,
        "id": 2672,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2717,
        "oprate": 1,
        "name": "能耗1882",
        "node_name": "能耗02",
        "point_id": 882,
        "group_id": 63,
        "id": 2673,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2718,
        "oprate": 1,
        "name": "能耗1883",
        "node_name": "能耗02",
        "point_id": 883,
        "group_id": 63,
        "id": 2674,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2719,
        "oprate": 1,
        "name": "能耗1884",
        "node_name": "能耗02",
        "point_id": 884,
        "group_id": 63,
        "id": 2675,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2720,
        "oprate": 1,
        "name": "能耗1885",
        "node_name": "能耗02",
        "point_id": 885,
        "group_id": 63,
        "id": 2676,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2721,
        "oprate": 1,
        "name": "能耗1886",
        "node_name": "能耗02",
        "point_id": 886,
        "group_id": 63,
        "id": 2677,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2722,
        "oprate": 1,
        "name": "能耗1887",
        "node_name": "能耗02",
        "point_id": 887,
        "group_id": 63,
        "id": 2678,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2723,
        "oprate": 1,
        "name": "能耗1888",
        "node_name": "能耗02",
        "point_id": 888,
        "group_id": 63,
        "id": 2679,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2724,
        "oprate": 1,
        "name": "能耗1889",
        "node_name": "能耗02",
        "point_id": 889,
        "group_id": 63,
        "id": 2680,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2725,
        "oprate": 1,
        "name": "能耗1890",
        "node_name": "能耗02",
        "point_id": 890,
        "group_id": 63,
        "id": 2681,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2726,
        "oprate": 1,
        "name": "能耗1891",
        "node_name": "能耗02",
        "point_id": 891,
        "group_id": 63,
        "id": 2682,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2727,
        "oprate": 1,
        "name": "能耗1892",
        "node_name": "能耗02",
        "point_id": 892,
        "group_id": 63,
        "id": 2683,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2728,
        "oprate": 1,
        "name": "能耗1893",
        "node_name": "能耗02",
        "point_id": 893,
        "group_id": 63,
        "id": 2684,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2729,
        "oprate": 1,
        "name": "能耗1894",
        "node_name": "能耗02",
        "point_id": 894,
        "group_id": 63,
        "id": 2685,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2730,
        "oprate": 1,
        "name": "能耗1895",
        "node_name": "能耗02",
        "point_id": 895,
        "group_id": 63,
        "id": 2686,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2731,
        "oprate": 1,
        "name": "能耗1896",
        "node_name": "能耗02",
        "point_id": 896,
        "group_id": 63,
        "id": 2687,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2732,
        "oprate": 1,
        "name": "能耗1897",
        "node_name": "能耗02",
        "point_id": 897,
        "group_id": 63,
        "id": 2688,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2733,
        "oprate": 1,
        "name": "能耗1898",
        "node_name": "能耗02",
        "point_id": 898,
        "group_id": 63,
        "id": 2689,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2734,
        "oprate": 1,
        "name": "能耗1899",
        "node_name": "能耗02",
        "point_id": 899,
        "group_id": 63,
        "id": 2690,
        "create_time": "2017-06-15 17:38:18"
      }, {
        "tag_id": 2735,
        "oprate": 1,
        "name": "能耗1900",
        "node_name": "能耗02",
        "point_id": 900,
        "group_id": 63,
        "id": 2691,
        "create_time": "2017-06-15 17:38:18"
      }],
      "id": 63,
      "create_time": "0001-01-01 00:00:00"
    }, {
      "next_level": [],
      "project_id": 1,
      "name": "能耗20",
      "tag_id_tree": null,
      "hide_tag": 0,
      "level": 1,
      "higher_level": 0,
      "sort": 0,
      "tag_list": [{
        "tag_id": 2736,
        "oprate": 1,
        "name": "能耗1901",
        "node_name": "能耗02",
        "point_id": 901,
        "group_id": 64,
        "id": 2692,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2737,
        "oprate": 1,
        "name": "能耗1902",
        "node_name": "能耗02",
        "point_id": 902,
        "group_id": 64,
        "id": 2693,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2738,
        "oprate": 1,
        "name": "能耗1903",
        "node_name": "能耗02",
        "point_id": 903,
        "group_id": 64,
        "id": 2694,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2739,
        "oprate": 1,
        "name": "能耗1904",
        "node_name": "能耗02",
        "point_id": 904,
        "group_id": 64,
        "id": 2695,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2740,
        "oprate": 1,
        "name": "能耗1905",
        "node_name": "能耗02",
        "point_id": 905,
        "group_id": 64,
        "id": 2696,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2741,
        "oprate": 1,
        "name": "能耗1906",
        "node_name": "能耗02",
        "point_id": 906,
        "group_id": 64,
        "id": 2697,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2742,
        "oprate": 1,
        "name": "能耗1907",
        "node_name": "能耗02",
        "point_id": 907,
        "group_id": 64,
        "id": 2698,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2743,
        "oprate": 1,
        "name": "能耗1908",
        "node_name": "能耗02",
        "point_id": 908,
        "group_id": 64,
        "id": 2699,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2744,
        "oprate": 1,
        "name": "能耗1909",
        "node_name": "能耗02",
        "point_id": 909,
        "group_id": 64,
        "id": 2700,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2745,
        "oprate": 1,
        "name": "能耗1910",
        "node_name": "能耗02",
        "point_id": 910,
        "group_id": 64,
        "id": 2701,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2746,
        "oprate": 1,
        "name": "能耗1911",
        "node_name": "能耗02",
        "point_id": 911,
        "group_id": 64,
        "id": 2702,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2747,
        "oprate": 1,
        "name": "能耗1912",
        "node_name": "能耗02",
        "point_id": 912,
        "group_id": 64,
        "id": 2703,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2748,
        "oprate": 1,
        "name": "能耗1913",
        "node_name": "能耗02",
        "point_id": 913,
        "group_id": 64,
        "id": 2704,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2749,
        "oprate": 1,
        "name": "能耗1914",
        "node_name": "能耗02",
        "point_id": 914,
        "group_id": 64,
        "id": 2705,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2750,
        "oprate": 1,
        "name": "能耗1915",
        "node_name": "能耗02",
        "point_id": 915,
        "group_id": 64,
        "id": 2706,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2751,
        "oprate": 1,
        "name": "能耗1916",
        "node_name": "能耗02",
        "point_id": 916,
        "group_id": 64,
        "id": 2707,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2752,
        "oprate": 1,
        "name": "能耗1917",
        "node_name": "能耗02",
        "point_id": 917,
        "group_id": 64,
        "id": 2708,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2753,
        "oprate": 1,
        "name": "能耗1918",
        "node_name": "能耗02",
        "point_id": 918,
        "group_id": 64,
        "id": 2709,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2754,
        "oprate": 1,
        "name": "能耗1919",
        "node_name": "能耗02",
        "point_id": 919,
        "group_id": 64,
        "id": 2710,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2755,
        "oprate": 1,
        "name": "能耗1920",
        "node_name": "能耗02",
        "point_id": 920,
        "group_id": 64,
        "id": 2711,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2756,
        "oprate": 1,
        "name": "能耗1921",
        "node_name": "能耗02",
        "point_id": 921,
        "group_id": 64,
        "id": 2712,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2757,
        "oprate": 1,
        "name": "能耗1922",
        "node_name": "能耗02",
        "point_id": 922,
        "group_id": 64,
        "id": 2713,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2759,
        "oprate": 1,
        "name": "能耗1924",
        "node_name": "能耗02",
        "point_id": 924,
        "group_id": 64,
        "id": 2714,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2758,
        "oprate": 1,
        "name": "能耗1923",
        "node_name": "能耗02",
        "point_id": 923,
        "group_id": 64,
        "id": 2715,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2760,
        "oprate": 1,
        "name": "能耗1925",
        "node_name": "能耗02",
        "point_id": 925,
        "group_id": 64,
        "id": 2716,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2761,
        "oprate": 1,
        "name": "能耗1926",
        "node_name": "能耗02",
        "point_id": 926,
        "group_id": 64,
        "id": 2717,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2763,
        "oprate": 1,
        "name": "能耗1928",
        "node_name": "能耗02",
        "point_id": 928,
        "group_id": 64,
        "id": 2718,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2762,
        "oprate": 1,
        "name": "能耗1927",
        "node_name": "能耗02",
        "point_id": 927,
        "group_id": 64,
        "id": 2719,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2764,
        "oprate": 1,
        "name": "能耗1929",
        "node_name": "能耗02",
        "point_id": 929,
        "group_id": 64,
        "id": 2720,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2765,
        "oprate": 1,
        "name": "能耗1930",
        "node_name": "能耗02",
        "point_id": 930,
        "group_id": 64,
        "id": 2721,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2766,
        "oprate": 1,
        "name": "能耗1931",
        "node_name": "能耗02",
        "point_id": 931,
        "group_id": 64,
        "id": 2722,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2767,
        "oprate": 1,
        "name": "能耗1932",
        "node_name": "能耗02",
        "point_id": 932,
        "group_id": 64,
        "id": 2723,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2768,
        "oprate": 1,
        "name": "能耗1933",
        "node_name": "能耗02",
        "point_id": 933,
        "group_id": 64,
        "id": 2724,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2770,
        "oprate": 1,
        "name": "能耗1935",
        "node_name": "能耗02",
        "point_id": 935,
        "group_id": 64,
        "id": 2725,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2769,
        "oprate": 1,
        "name": "能耗1934",
        "node_name": "能耗02",
        "point_id": 934,
        "group_id": 64,
        "id": 2726,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2771,
        "oprate": 1,
        "name": "能耗1936",
        "node_name": "能耗02",
        "point_id": 936,
        "group_id": 64,
        "id": 2727,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2772,
        "oprate": 1,
        "name": "能耗1937",
        "node_name": "能耗02",
        "point_id": 937,
        "group_id": 64,
        "id": 2728,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2773,
        "oprate": 1,
        "name": "能耗1938",
        "node_name": "能耗02",
        "point_id": 938,
        "group_id": 64,
        "id": 2729,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2774,
        "oprate": 1,
        "name": "能耗1939",
        "node_name": "能耗02",
        "point_id": 939,
        "group_id": 64,
        "id": 2730,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2775,
        "oprate": 1,
        "name": "能耗1940",
        "node_name": "能耗02",
        "point_id": 940,
        "group_id": 64,
        "id": 2731,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2776,
        "oprate": 1,
        "name": "能耗1941",
        "node_name": "能耗02",
        "point_id": 941,
        "group_id": 64,
        "id": 2732,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2777,
        "oprate": 1,
        "name": "能耗1942",
        "node_name": "能耗02",
        "point_id": 942,
        "group_id": 64,
        "id": 2733,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2778,
        "oprate": 1,
        "name": "能耗1943",
        "node_name": "能耗02",
        "point_id": 943,
        "group_id": 64,
        "id": 2734,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2779,
        "oprate": 1,
        "name": "能耗1944",
        "node_name": "能耗02",
        "point_id": 944,
        "group_id": 64,
        "id": 2735,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2780,
        "oprate": 1,
        "name": "能耗1945",
        "node_name": "能耗02",
        "point_id": 945,
        "group_id": 64,
        "id": 2736,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2781,
        "oprate": 1,
        "name": "能耗1946",
        "node_name": "能耗02",
        "point_id": 946,
        "group_id": 64,
        "id": 2737,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2782,
        "oprate": 1,
        "name": "能耗1947",
        "node_name": "能耗02",
        "point_id": 947,
        "group_id": 64,
        "id": 2738,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2783,
        "oprate": 1,
        "name": "能耗1948",
        "node_name": "能耗02",
        "point_id": 948,
        "group_id": 64,
        "id": 2739,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2784,
        "oprate": 1,
        "name": "能耗1949",
        "node_name": "能耗02",
        "point_id": 949,
        "group_id": 64,
        "id": 2740,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2785,
        "oprate": 1,
        "name": "能耗1950",
        "node_name": "能耗02",
        "point_id": 950,
        "group_id": 64,
        "id": 2741,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2786,
        "oprate": 1,
        "name": "能耗1951",
        "node_name": "能耗02",
        "point_id": 951,
        "group_id": 64,
        "id": 2742,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2787,
        "oprate": 1,
        "name": "能耗1952",
        "node_name": "能耗02",
        "point_id": 952,
        "group_id": 64,
        "id": 2743,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2788,
        "oprate": 1,
        "name": "能耗1953",
        "node_name": "能耗02",
        "point_id": 953,
        "group_id": 64,
        "id": 2744,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2789,
        "oprate": 1,
        "name": "能耗1954",
        "node_name": "能耗02",
        "point_id": 954,
        "group_id": 64,
        "id": 2745,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2790,
        "oprate": 1,
        "name": "能耗1955",
        "node_name": "能耗02",
        "point_id": 955,
        "group_id": 64,
        "id": 2746,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2791,
        "oprate": 1,
        "name": "能耗1956",
        "node_name": "能耗02",
        "point_id": 956,
        "group_id": 64,
        "id": 2747,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2792,
        "oprate": 1,
        "name": "能耗1957",
        "node_name": "能耗02",
        "point_id": 957,
        "group_id": 64,
        "id": 2748,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2793,
        "oprate": 1,
        "name": "能耗1958",
        "node_name": "能耗02",
        "point_id": 958,
        "group_id": 64,
        "id": 2749,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2794,
        "oprate": 1,
        "name": "能耗1959",
        "node_name": "能耗02",
        "point_id": 959,
        "group_id": 64,
        "id": 2750,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2795,
        "oprate": 1,
        "name": "能耗1960",
        "node_name": "能耗02",
        "point_id": 960,
        "group_id": 64,
        "id": 2751,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2796,
        "oprate": 1,
        "name": "能耗1961",
        "node_name": "能耗02",
        "point_id": 961,
        "group_id": 64,
        "id": 2752,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2797,
        "oprate": 1,
        "name": "能耗1962",
        "node_name": "能耗02",
        "point_id": 962,
        "group_id": 64,
        "id": 2753,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2798,
        "oprate": 1,
        "name": "能耗1963",
        "node_name": "能耗02",
        "point_id": 963,
        "group_id": 64,
        "id": 2754,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2799,
        "oprate": 1,
        "name": "能耗1964",
        "node_name": "能耗02",
        "point_id": 964,
        "group_id": 64,
        "id": 2755,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2800,
        "oprate": 1,
        "name": "能耗1965",
        "node_name": "能耗02",
        "point_id": 965,
        "group_id": 64,
        "id": 2756,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2801,
        "oprate": 1,
        "name": "能耗1966",
        "node_name": "能耗02",
        "point_id": 966,
        "group_id": 64,
        "id": 2757,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2802,
        "oprate": 1,
        "name": "能耗1967",
        "node_name": "能耗02",
        "point_id": 967,
        "group_id": 64,
        "id": 2758,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2803,
        "oprate": 1,
        "name": "能耗1968",
        "node_name": "能耗02",
        "point_id": 968,
        "group_id": 64,
        "id": 2759,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2804,
        "oprate": 1,
        "name": "能耗1969",
        "node_name": "能耗02",
        "point_id": 969,
        "group_id": 64,
        "id": 2760,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2805,
        "oprate": 1,
        "name": "能耗1970",
        "node_name": "能耗02",
        "point_id": 970,
        "group_id": 64,
        "id": 2761,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2806,
        "oprate": 1,
        "name": "能耗1971",
        "node_name": "能耗02",
        "point_id": 971,
        "group_id": 64,
        "id": 2762,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2807,
        "oprate": 1,
        "name": "能耗1972",
        "node_name": "能耗02",
        "point_id": 972,
        "group_id": 64,
        "id": 2763,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2808,
        "oprate": 1,
        "name": "能耗1973",
        "node_name": "能耗02",
        "point_id": 973,
        "group_id": 64,
        "id": 2764,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2809,
        "oprate": 1,
        "name": "能耗1974",
        "node_name": "能耗02",
        "point_id": 974,
        "group_id": 64,
        "id": 2765,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2810,
        "oprate": 1,
        "name": "能耗1975",
        "node_name": "能耗02",
        "point_id": 975,
        "group_id": 64,
        "id": 2766,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2811,
        "oprate": 1,
        "name": "能耗1976",
        "node_name": "能耗02",
        "point_id": 976,
        "group_id": 64,
        "id": 2767,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2812,
        "oprate": 1,
        "name": "能耗1977",
        "node_name": "能耗02",
        "point_id": 977,
        "group_id": 64,
        "id": 2768,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2813,
        "oprate": 1,
        "name": "能耗1978",
        "node_name": "能耗02",
        "point_id": 978,
        "group_id": 64,
        "id": 2769,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2814,
        "oprate": 1,
        "name": "能耗1979",
        "node_name": "能耗02",
        "point_id": 979,
        "group_id": 64,
        "id": 2770,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2815,
        "oprate": 1,
        "name": "能耗1980",
        "node_name": "能耗02",
        "point_id": 980,
        "group_id": 64,
        "id": 2771,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2816,
        "oprate": 1,
        "name": "能耗1981",
        "node_name": "能耗02",
        "point_id": 981,
        "group_id": 64,
        "id": 2772,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2817,
        "oprate": 1,
        "name": "能耗1982",
        "node_name": "能耗02",
        "point_id": 982,
        "group_id": 64,
        "id": 2773,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2818,
        "oprate": 1,
        "name": "能耗1983",
        "node_name": "能耗02",
        "point_id": 983,
        "group_id": 64,
        "id": 2774,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2819,
        "oprate": 1,
        "name": "能耗1984",
        "node_name": "能耗02",
        "point_id": 984,
        "group_id": 64,
        "id": 2775,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2820,
        "oprate": 1,
        "name": "能耗1985",
        "node_name": "能耗02",
        "point_id": 985,
        "group_id": 64,
        "id": 2776,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2821,
        "oprate": 1,
        "name": "能耗1986",
        "node_name": "能耗02",
        "point_id": 986,
        "group_id": 64,
        "id": 2777,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2822,
        "oprate": 1,
        "name": "能耗1987",
        "node_name": "能耗02",
        "point_id": 987,
        "group_id": 64,
        "id": 2778,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2824,
        "oprate": 1,
        "name": "能耗1989",
        "node_name": "能耗02",
        "point_id": 989,
        "group_id": 64,
        "id": 2779,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2823,
        "oprate": 1,
        "name": "能耗1988",
        "node_name": "能耗02",
        "point_id": 988,
        "group_id": 64,
        "id": 2780,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2825,
        "oprate": 1,
        "name": "能耗1990",
        "node_name": "能耗02",
        "point_id": 990,
        "group_id": 64,
        "id": 2781,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2826,
        "oprate": 1,
        "name": "能耗1991",
        "node_name": "能耗02",
        "point_id": 991,
        "group_id": 64,
        "id": 2782,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2827,
        "oprate": 1,
        "name": "能耗1992",
        "node_name": "能耗02",
        "point_id": 992,
        "group_id": 64,
        "id": 2783,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2828,
        "oprate": 1,
        "name": "能耗1993",
        "node_name": "能耗02",
        "point_id": 993,
        "group_id": 64,
        "id": 2784,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2829,
        "oprate": 1,
        "name": "能耗1994",
        "node_name": "能耗02",
        "point_id": 994,
        "group_id": 64,
        "id": 2785,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2830,
        "oprate": 1,
        "name": "能耗1995",
        "node_name": "能耗02",
        "point_id": 995,
        "group_id": 64,
        "id": 2786,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2831,
        "oprate": 1,
        "name": "能耗1996",
        "node_name": "能耗02",
        "point_id": 996,
        "group_id": 64,
        "id": 2787,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2832,
        "oprate": 1,
        "name": "能耗1997",
        "node_name": "能耗02",
        "point_id": 997,
        "group_id": 64,
        "id": 2788,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2833,
        "oprate": 1,
        "name": "能耗1998",
        "node_name": "能耗02",
        "point_id": 998,
        "group_id": 64,
        "id": 2789,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2834,
        "oprate": 1,
        "name": "能耗1999",
        "node_name": "能耗02",
        "point_id": 999,
        "group_id": 64,
        "id": 2790,
        "create_time": "2017-06-15 17:39:44"
      }, {
        "tag_id": 2835,
        "oprate": 1,
        "name": "能耗2000",
        "node_name": "能耗02",
        "point_id": 1000,
        "group_id": 64,
        "id": 2791,
        "create_time": "2017-06-15 17:39:44"
      }],
      "id": 64,
      "create_time": "0001-01-01 00:00:00"
    }]
  },
  "error_message": null
};
var ids = 'tree';

function abcd() {
  var html = ''
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


      html += '<div class="panel panel-default"><div class="panel-heading fang" style="padding-left:0;padding-right:0px;" ><h4 class="panel-title" style="background:red">';
      html += '<label style="background:blue;float:left"><input  type="checkbox" id="' + ids + '-' + item.id + '-' + index + '"  class="bayaxcheckbox fu" ids="' + item.id + '" ><label class="checkbox-i" for="' + ids + '-' + item.id + '-' + index + '"></label></label>'
      if (a === '') {
        html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion"  class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="true">';
      } else {
        html += '<a  href="#' + ids + '-s' + item.id + '" data-parent="#accordion" data-toggle="collapse" class="one-step accordion-toggle  ' + a + ' pointGroups-a" aria-expanded="false">';
      }


      html += ' <label  class="form-label pointGroups-label">' + item.name + '</label></a></h4></div></div>';
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
              html += '<div class="panel-body tree-msg" style=";margin-left: 25px;padding-top:5px;padding-bottom:5px;">'+
              '<label style="float:left"><input tabindex="5" oprate="' + items.oprate + '" type="checkbox" id="' + ids + '-' + item.id + '-' + index + '-' + indexs + '" class="skin-square-green" ids="' + items.tag_id + '" ></label>'
              +'<a href="#' + ids + '-' + items.id + '" data-parent="#accordion" data-toggle="collapse" class="accordion-toggle collapsed pointGroups-a-son" aria-expanded="false"><label class="form-label pointGroups-label-son">' + items.name + '</label></a>'
              +'</div>';
            })
          }

        }
      }


      html += '</div>';

    })
    html += '</div></div></div>';
    // console.log("查看:" + html)
    $("#" + ids).append(html);


  }
}

abcd();