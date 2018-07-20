 // function test(element){
    //     var ele = element;
    //     var result = {
    //         "code": 0,
    //         "data": {
    //             "open_citys": ["北京", "上海", "广州", "天津", "深圳", "郑州", "南京", "重庆", "成都", "杭州", "东莞", "武汉", "安阳", "洛阳"],
                
    //             "setting": {
    //                 "city": "郑州",
    //                 "code": "268",
    //                 "desc": {
    //                     "lat": "34.75661",
    //                     "lng": "113.649644",
    //                     "province": "河南",
    //                     "shortname": "zz"
    //                 },
    //                 "service": [ {
    //                     "name": "普通搬家",
    //                     "type": 5,
    //                     "isShow": 1,
    //                     "car": [{
    //                         "type": 3,
    //                         "name": "小面",
    //                         "icon_id": "1",
    //                         "start_price": "96",
    //                         "start_km": "10",
    //                         "stairs_fee": ["有电梯,无楼梯费", "无电梯1层,楼层费0元", "无电梯2层,楼层费10元", "无电梯3层,楼层费20元", "无电梯4层,楼层费40元", "无电梯5层,楼层费60元", "无电梯6层,楼层费80元", "无电梯7层,楼层费110元", "无电梯8层,楼层费140元"],
    //                         "up_price": "5"
    //                     }, {
    //                         "type": 2,
    //                         "name": "金杯",
    //                         "icon_id": "2",
    //                         "start_price": "166",
    //                         "start_km": "10",
    //                         "stairs_fee": ["有电梯,无楼梯费", "无电梯1层,楼层费0元", "无电梯2层,楼层费12元", "无电梯3层,楼层费24元", "无电梯4层,楼层费48元", "无电梯5层,楼层费72元", "无电梯6层,楼层费96元", "无电梯7层,楼层费132元", "无电梯8层,楼层费168元"],
    //                         "up_price": "5"
    //                     }, {
    //                         "type": 20,
    //                         "name": "4.2米厢货",
    //                         "icon_id": "4",
    //                         "start_price": "348",
    //                         "start_km": "10",
    //                         "stairs_fee": ["有电梯,无楼梯费", "无电梯1层,楼层费0元", "无电梯2层,楼层费15元", "无电梯3层,楼层费30元", "无电梯4层,楼层费60元", "无电梯5层,楼层费90元", "无电梯6层,楼层费120元", "无电梯7层,楼层费165元", "无电梯8层,楼层费210元"],
    //                         "up_price": "6"
    //                     }],
    //                     "time": {
    //                         "timeSpan": 1800,
    //                         "timeDelayOfReserve": 3600,
    //                         "openTime": 0,
    //                         "closeTime": 86400,
    //                         "maxSerivceDays": 7,
    //                         "servertimestamp": 1525682353,
    //                         "waitTimeOfDeploy": 60,
    //                         "waitTimeOfConfirm": 120
    //                     },
    //                     "square": {
    //                         "start": 0,
    //                         "incrby": 1,
    //                         "end": 0
    //                     },
    //                     "openCity": ["北京", "上海", "广州", "天津", "深圳", "郑州", "南京", "重庆", "成都", "杭州", "东莞", "武汉", "安阳", "洛阳"],
    //                     "lineStrategy": 0,
    //                     "remarkTag": [],
    //                     "notice": {
    //                         "icon": "",
    //                         "content": ""
    //                     }
    //                 } ]
                    
    //             },
                
                
        
    //         },
    //         "msg": "成功"
    //     }
    //             // 当前城市开放的车型总列表
    //             var carType = ele.querySelector('#car-type');
    //             // 小面
    //             var carSmall = ele.querySelector('#car-small');
    //             // 金杯
    //             var carMiddle = ele.querySelector('#car-middle');
    //             // 箱货
    //             var carBig = ele.querySelector('#car-big');
    //             // tab-li
    //             var tabLi = ele.querySelectorAll('.tab-li');
    //             // lxn-tab-item
    //             var lxnTabItem = ele.querySelectorAll('.lxn-tab-item');
    //             // 确认下单
    //             // var orderConfirm = ele.querySelector('#order-confirm');
    //             // 搬出地址
    //             var moveOut = ele.querySelector('#move-out-address');
    //             // 搬出楼层
    //             var moveOutFloor = ele.querySelector('#move-out-floor');
    //             // 搬入地址
    //             var moveIn = ele.querySelector('#move-in-address');
    //             // 搬入楼层
    //             var moveInFloor = ele.querySelector('#move-in-floor');
    //             // 搬家时间
    //             var moveTime = ele.querySelector('#move-time');
        
    //             // 城市
    //             var city = localStorage.getItem('focuscity');
    //             if (city === null) {
    //                 city = '北京';
    //                 localStorage.setItem('focuscity', '北京');
    //             }
    //              // 搬出搬入楼层 本地保存的数据
    //     var orderMove = localStorage.getItem('move');
    //     // 搬出搬入地址 本地保存的数据
    //     var moveAddress = localStorage.getItem('moveAddress');
    //     // 搬家时间 本地保存的数据
    //     var moveTimeData = localStorage.getItem('move_time_formate');

    //     // 设置地址
    //     if (moveAddress !== null) {
    //         var moveAddressd = JSON.parse(moveAddress);
    //         console.log(JSON.stringify(moveAddressd, null, 2));

    //         moveOut.value = moveAddressd.moveout.location.title;
    //         moveIn.value = moveAddressd.movein.location.title;
    //     }

    //     // 设置楼层
    //     if (orderMove !== null) {
    //         var ordermoves = JSON.parse(orderMove);
    //         moveOutFloor.value = ordermoves.data.pop.name;
    //         moveInFloor.value = ordermoves.data.push.name;
    //     }

    //     // 时间
    //     if (moveTime !== null) {
    //         moveTime.value = moveTimeData;
    //     }



    //      // 车型
    //      var cartype = localStorage.getItem('cartype');
    //      // tab 车辆信息
    //      var car = {};
    //      var service = result.data.setting.service;
    //      for (var i = 0; i < service.length; i++) {
    //          if (service[i].type === 5) {
    //              car = service[i].car;
    //              break;
    //          }
    //      }
    //      if (car.length > 2) {
    //          carType.classList.add('lxn-tab-three');
    //      }

    //      var option = 'option';
    //      // console.log(car)
    //      car.forEach(function (item) {
    //          var arr = item.stairs_fee.map(function (item, index) {
    //              var arr = {
    //                  id: index,
    //                  name: item
    //              };
    //              return arr;
    //          });

    //          item.stairsFee = arr;

    //          var options = JSON.stringify(item);
    //          switch (item.type) {
    //              case 3:
    //                  $(carSmall).data(option, options);
    //                  if (cartype === null) {
    //                      localStorage.setItem('cartype', JSON.stringify({
    //                          licls: '.tab-li-one',
    //                          tabcls: '.tab-item-one',
    //                          cartype: item
    //                      }));
    //                  }
    //                  else {

    //                      var activeCls = 'lxn-this';
    //                      var tabShow = 'lxn-show';
    //                      var type = JSON.parse(cartype);
    //                      tabLi.forEach(function (item) {
    //                          item.classList.remove(activeCls);
    //                      });
    //                      lxnTabItem.forEach(function (item) {
    //                          item.classList.remove(tabShow);
    //                      });
    //                      //  $('.tab-li').removeClass(activeCls);
    //                      //  $('.lxn-tab-item').removeClass(tabShow);

    //                      $(type.licls).addClass(activeCls);
    //                      $(type.tabcls).addClass(tabShow);
    //                  }
    //                  break;
    //              case 2:
    //                  $(carMiddle).data(option, options);
    //                  break;
    //              case 20:
    //                  $(carBig).data(option, options);
    //                  break;
    //              default:
    //                  break;
    //          }
    //      });
    //      // 开放城市
    //      localStorage.setItem('open_citys', JSON.stringify(result.data.open_citys));



        

        
    // }