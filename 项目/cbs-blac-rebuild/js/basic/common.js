/**
 * 公用的系统方法
 */

//日期选择

/**
 * dic.name 时间名称 参数：【'今天','昨天','最近3天','最近7天','最近30天','?月','自定义'】;
 * dic.type 时间对比类型 参数：【'true相对时间','false绝对时间'】;  作用：用于历史数据对比 
 * dic.unit 时间对比单位  参数：【'天','个3天','个7天','个30天','个月',''】; 作用：用于历史数据对比 
 * dic.num  时间名称数字标志 ；作用：用于历史数据对比,计算时间
 * dic.chart_time 能耗图表可选日期类型 参数：【'0(hour)','1(hour,day)','2(day)','3(day,month)','4(自定义day)'】 作用:用于设置图表可选日期类型
 * dic.start_time 开始时间值;
 * dic.end_time 结束时间值;
 * @returns 
 */
function dateData() {
    var dateArr = [],
        lengths = 9;

    var nowdate = new Date();
    var nowMonth = Number(nowdate.getMonth() + 1);
    for (var i = 0; i < lengths; i++) {


        var dic = { type: true }; //true(相对时间) fasle(绝对时间)
        switch (i) {
            case 0:
                var time = FormatDate(nowdate, "yyyy-MM-dd");
                dic.name = '今天';
                dic.unit = '天';
                dic.num = 0;
                dic.chart_time = 0;
                dic.start_time = time;
                dic.end_time = time;

                break;
            case 1:
                var time = compareDate(1, 1);
                dic.name = '昨天';
                dic.unit = '天';
                dic.num = 1;
                dic.chart_time = 0;
                dic.start_time = time;
                dic.end_time = time;
                break;
            case 2:
                dic.name = '最近3天';
                dic.unit = '个3天';
                dic.num = 2;
                dic.chart_time = 1;
                dic.start_time = compareDate(1, 2);
                dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                break;
            case 3:
                dic.name = '最近7天';
                dic.unit = '个7天';
                dic.num = 3;
                dic.chart_time = 1;
                dic.start_time = compareDate(1, 6);
                dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                break;
            case 4:
                dic.name = '最近30天';
                dic.unit = '个30天';
                dic.num = 4;
                dic.chart_time = 2;
                dic.start_time = compareDate(1, 29);
                dic.end_time = FormatDate(nowdate, "yyyy-MM-dd");
                break;
            case 5:
                dic.name = compareDate(2, 2) + "月";
                dic.unit = '个月';
                dic.num = 5;
                dic.chart_time = 3;
                if (nowMonth === 1) {
                    dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 2) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                } else {
                    dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 2) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                }
                break;
            case 6:
                dic.name = compareDate(2, 3) + "月";
                dic.unit = '个月';
                dic.num = 6;
                dic.chart_time = 3;
                if (nowMonth === 1 || nowMonth === 2) {

                    dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 3) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);

                } else {
                    dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 3) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                }
                break;
            case 7:
                dic.name = compareDate(2, 4) + "月";
                dic.unit = '个月';
                dic.num = 7;
                dic.chart_time = 3;
                if (nowMonth === 1 || nowMonth === 2 || nowMonth === 3) {

                    dic.start_time = (nowdate.getFullYear() - 1) + '-' + compareDate(2, 4) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);

                } else {
                    dic.start_time = nowdate.getFullYear() + '-' + compareDate(2, 4) + '-01';
                    dic.end_time = getCurrentMonthLastForSelect(dic.start_time);
                }
                break;
            default:
                dic.name = '自定义';
                dic.unit = '';
                dic.num = 8;
                dic.chart_time = 2;
                dic.start_time = '';
                dic.end_time = '';
                dic.type = false;
                break;
        }
        dateArr.push(dic);

    }
    return dateArr;
}


//比较时间大小




function bayaxCompareDate(start, end, type) {
    if (type == 1) {
        // var startTime = $("#" + start + "").val();
        var start = new Date(start.replace("-", "/").replace("-", "/"));
        // var endTime = $("#" + end + "").val();
        var end = new Date(end.replace("-", "/").replace("-", "/"));
        if (end < start) {
            return false;
        }
        return true;
    } else {
        var starts = new Date(start.replace("-", "/").replace("-", "/"));
        var ends = new Date(end.replace("-", "/").replace("-", "/"));
        var cha = ends - starts;
        cha = cha / (60 * 60 * 24 * 1000);
        return cha;
    }

}



/**
 * 相对历史数据对比  时间处理
 * @param {对比时间 类型(今天。。昨天。。)} type 
 * @param {*} conts 
 * @param {*} selecti 
 */
function setRelativeHisTime(type, conts, selecti) {
    console.log('今天:' + type)

    var time = {};
    switch (type) {
        case 0: //对比今天
            console.log('对比今天')
            time.start_time = compareDate(1, conts);
            time.end_time = compareDate(1, conts);
            break;
        case 1: //对比昨天
            console.log('对比昨天')
            time.start_time = compareDate(1, conts + 1);
            time.end_time = compareDate(1, conts + 1);
            break;
        case 2: //对比最近三天
            console.log('对比最近三天')
            var c = 3;
            time.start_time = compareDate(1, c * conts + c - 1);
            time.end_time = compareDate(1, c * conts);
            break;
        case 3: //对比最近七天
            console.log('对比最近七天')
            var c = 7;
            time.start_time = compareDate(1, c * conts + c - 1);
            time.end_time = compareDate(1, c * conts);
            break;
        case 4: //对比最近30天
            console.log('对比最近30天')
            var c = 30;
            time.start_time = compareDate(1, c * conts + c - 1);
            time.end_time = compareDate(1, c * conts);
            break;
        case 5: //对比最近1个月
            console.log('对比最近1个月')
            time.start_time = getCurrentMonthFirst(conts + 2);
            time.end_time = getCurrentMonthLastForSelect(compareDate(3, conts + 2));
            break;
        case 6: //对比最近2个月
            console.log('对比最近2个月')
            time.start_time = getCurrentMonthFirst(conts + 3);
            time.end_time = getCurrentMonthLastForSelect(compareDate(3, conts + 3));
            break;
        case 7: //对比最近3个月
            console.log('对比最近3个月')
            time.start_time = getCurrentMonthFirst(conts + 4);
            time.end_time = getCurrentMonthLastForSelect(compareDate(3, conts + 4));
            break;
        default:
            break;
    }
    return time;
}

// ///////////////////////////////////////////////////////////////////////////




//比较现在时间 和指定时间 并返回天数
function compareDate(type, counts) {
    var mydate;
    var nowdate = new Date();

    if (type == 1) {
        //现在时间减去天数
        mydate = CutDays(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
        return FormatDate(mydate, "yyyy-MM-dd");

    } else if (type == 2) {
        //现在时间减去月数   
        mydate = CutMOnth(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
        return FormatDate(mydate, "MM");

    } else { //现在时间减去月数
        mydate = CutMOnth(parseDates(FormatDate(nowdate, "yyyy-MM-dd")), counts);
        return FormatDate(mydate, "yyyy-MM-dd");
    }

}



//比较时间大小
function checkEndTime(start, end, type) {
    if (type == 1) {
        var startTime = $("#" + start + "").val();
        var start = new Date(startTime.replace("-", "/").replace("-", "/"));
        var endTime = $("#" + end + "").val();
        var end = new Date(endTime.replace("-", "/").replace("-", "/"));
        if (end < start) {
            return false;
        }
        return true;
    } else {
        var starts = new Date(start.replace("-", "/").replace("-", "/"));
        var ends = new Date(end.replace("-", "/").replace("-", "/"));
        var cha = ends - starts;
        cha = cha / (60 * 60 * 24 * 1000);
        return cha;
    }

}

//加减天  
function CutDays(date, value, type) {
    if (type) {
        date.setDate(date.getDate() + value);
    } else {
        date.setDate(date.getDate() - value);
    }

    return date;
}
//减周

function CutWeek(date, value) {
    date.setDate(today.getDate() - 7)
    return date;
}

//减月
function CutMOnth(date, value) {
    date.setMonth((date.getMonth() - value + 1), 1);
    return date;
}

//加年
function AddYear(date, value) {
    date.setYear(date.getFullYear() + value);
    return date;
}

//js日期字符串转换成日期类型
function parseDates(dateStr) {
    return new Date(Replace(dateStr, "-", "/"));
}

//比较年
function compareYear(start, counts) {
    mydate = AddYear(parseDates(FormatDate(start, "yyyy-MM-dd")), counts);

    return FormatDate(mydate, "yyyy-MM-dd");

}

//替换字符串  
function Replace(str, from, to) {
    return str.split(from).join(to);
}

// 日期类型格式成指定的字符串
function FormatDate(date, format) {
    format = Replace(format, "yyyy", date.getFullYear());
    format = Replace(format, "MM", GetFullMonth(date));
    format = Replace(format, "dd", GetFullDate(date));
    format = Replace(format, "hh", GetFullHours(date));
    return format;
}

//返回月份(两位数)  
function GetFullMonth(date) {
    var v = date.getMonth() + 1;
    if (v > 9) return v.toString();
    return "0" + v;
}

//返回日(两位数)  
function GetFullDate(date) {
    var v = date.getDate();
    if (v > 9) return v.toString();
    return "0" + v;
}
//返回月份(两位数)  
function GetFullHours(date) {
    var v = date.getHours();
    if (v > 9) return v.toString();
    return "0" + v;
}

// 获取指定月的最后一天(时间选择框)
function getCurrentMonthLastForSelect(dates) {
    var date = new Date(dates);
    // var currentMonth = month - 1;
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return FormatDate(new Date(nextMonthFirstDay - oneDay), "yyyy-MM-dd");
}


// 获取指定月的最后一天
function getCurrentMonthLast(month) {
    var date = new Date();
    var currentMonth = month - 1;
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var da = new Date(nextMonthFirstDay - oneDay);
    return FormatDate(new Date(nextMonthFirstDay - oneDay), "yyyy-MM-dd")
}



// 获取指定月有多少天
function getMothCount(year, month) {
    return new Date(year, month, 0).getDate();
}

// 获取指定月的第一天 counts 是多少个月
function getCurrentMonthFirst(counts) {
    var month = compareDate(3, counts);
    console.log('month:' + month)
    str = month.replace(/-/g, "/");
    var date = new Date(str);
    date.setDate(1);
    console.log('data:' + date)
    return FormatDate(date, "yyyy-MM-dd");
}

//获取今天
function getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return year + "-" + GetFullMonth(now) + "-" + GetFullDate(now);
}
//获取当月
function getMonth() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return year + "-" + GetFullMonth(now);
}
//获取今年
function getYear() {
    var now = new Date();
    var year = now.getFullYear();
    return year;
}



//滚动条
function initScrollerA(ids, type) {
    var is = true;
    if (type) {
        is = false;
    }

    $("#" + ids + "").mCustomScrollbar("destroy");
    $("#" + ids + "").mCustomScrollbar({
        axis: "y",
        theme: "dark-thick", //3d-thick-dark，dark
        autoHideScrollbar: false, //是否自动隐藏滚动条
        scrollbarPosition: '', //'outside','inside'
        advanced: {
            autoExpandHorizontalScroll: false,
            updateOnContentResize: true
        },
        scrollButtons: { //是否要左右的箭头按钮
            enable: is
        },
        callbacks: {
            onScroll: function() {}
        }
    });
}





/**设备监控左侧菜单 */
function mainmenuScroll() {

    // var topbar = $(".navbar-header").height();
    // var projectinfo = $(".timeControl").innerHeight();

    // var height = document.body.scrollHeight - topbar-5;

    // $('#main-menu-wrapper').height(height).mCustomScrollbar({
    //   axis: "y",
    //   theme: "dark-thick", //3d-thick-dark，dark
    //   autoHideScrollbar: false, //是否自动隐藏滚动条
    //   scrollbarPosition: '', //'outside','inside'
    //   advanced: {
    //     autoExpandHorizontalScroll: false,
    //     updateOnContentResize: true
    //   }
    // });
    // $("#main-menu-wrapper .wraplist").height('auto');

    // $("li.open > .sub-menu").attr("style", "display:block;");
};

function mainmenuCollapsed() {

    if ($("#main-menu-wrapper").length > 0) {
        var topbar = $(".navbar-header").height();
        var windowheight = window.innerHeight;
        var minheight = windowheight - topbar;
        var fullheight = $("#tab").height();

        var height = fullheight;
        if (fullheight < minheight) {
            height = minheight;
        }


        $('#main-menu-wrapper').mCustomScrollbar('destroy');

        // $('#main-menu-wrapper .wraplist').height(height);

        $("li.open .sub-menu").attr("style", "");

    }

};



function getHeight() {
    var left = $(".left").height();
    var right = Number($(".right").height()) + 20;
    if (document.body.scrollHeight > $(window).height()) {
        $(".left").height(document.body.scrollHeight - 70 + "px");
        return;
    } else if (left >= right) {
        $(".left").height($(window).height() - 70 + "px");
    }
}

function mainMenu() {
    $('.leftMenu li a').click(function(e) {
        if ($(this).next().hasClass('sub-menu') === false) {
            return;
        }
        var parent = $(this).parent().parent();
        var sub = $(this).next();

        parent.children('li.open').children('.sub-menu').slideUp(200);
        parent.children('li.open').children('a').children('.arrow').removeClass('open');
        parent.children('li').removeClass('open');

        if (sub.is(":visible")) {
            $(this).find(".arrow").removeClass("open");
            sub.slideUp(200);
        } else {
            $(this).parent().addClass("open");
            $(this).find(".arrow").addClass("open");
            sub.slideDown(200);
        }

    });
};



$(window).resize(function() {
    mainmenuCollapsed();
    mainmenuScroll();
});


/**设备监控左侧菜单 结束*/

/**
 * 接受地址栏参数
 * @AuthorHTL
 * @DateTime  2016-07-13T22:45:53+0800
 */
var Url = function() {};
Url.prototype = {
    Type: function() { return GetQueryString("type") },
    Id: function() { return GetQueryString("id") },
    GetQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}




//验证文件格式
function fileName(name, type) {

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
                $("#" + name + "").next().html("输入超过规定长度").show();
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
                $("#" + name + "").next().html("该名称已经存在").show();
                // layer.msg('该名称已经存在')
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