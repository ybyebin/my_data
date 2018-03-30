event.preventDefault() //会阻挡预设要发生的事件.
event.stopPropagation() //会阻挡发生冒泡事件.
return false //则是前面两者的事情他都会做：

// -[iOS， Safari浏览器， input等表单focus后fixed元素错位问题](https: //www.snip2code.com/Snippet/176582/--iOS-Safari----input---focus-fixed-----)
if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
    $(document).on('focus', 'input, textarea', function() {
        $('header').css("position", 'absolute');
        $('footer').css("position", 'absolute');

    });

    $(document).on('blur', 'input, textarea', function() {
        $('header').css("position", 'fixed');
        $('footer').css("position", 'fixed');

    });
}


// 插入排序
function insert_sort(input) {
    var i, j, temp;
    for (i = 1; i < input.length; i++) {
        temp = input[i];
        for (j = i - 1; j >= 0 && input[j] > temp; j--) {
            input[j + 1] = input[j];
        }

        input[j + 1] = temp;
    }
    return input;
}
window.onload = function() {
        var arr = [7, 6, 4, 2];
        insert_sort(arr)
            // console.log(JSON.stringify(insert_sort(arr),null,2))
    }
    // 冒泡排序
function bubble_sort(input) {
    var i, j, temp, flag;
    for (i = 0; i < input.length - 1; i++) {
        flag = true;
        for (j = 0; j < input.length - i; j++) {
            if (input[j] > input[j + 1]) {
                temp = input[j];
                input[j] = input[j + 1];
                input[j + 1] = temp;
                flag = false;
            }
        }
        if (flag)
        // 提前结束
            break;
    }
    return input;
}

// 快速排序
// javascript 版
function quick_sort(input) {
    var len = input.length;
    if (len <= 1)
        return input.slice(0);
    var left = [];
    var right = [];
    // 基准函数
    var mid = [input[0]];
    for (var i = 1; i < len; i++) {
        if (input[i] < mid[0])
            left.push(input[i]);
        else
            right.push(input[i]);
    }
    return quick_sort(left).concat(mid.concat(quick_sort(right)));
};










function init() {
    //加载package.js文件，设置script的id为yy
    loadJs("yy", "package.js", callbackFunction);
}

function callbackFunction() {
    functionOne();
}

function loadJs(sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0];
    var nodeScript = null;
    if (document.getElementById(sid) == null) {
        nodeScript = document.createElement('script');
        nodeScript.setAttribute('type', 'text/javascript');
        nodeScript.setAttribute('src', jsurl);
        nodeScript.setAttribute('id', sid);
        if (callback != null) {
            nodeScript.onload = nodeScript.onreadystatechange = function() {
                if (nodeScript.ready) {
                    return false;
                }
                if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                    nodeScript.ready = true;
                    callback();
                }
            };
        }
        nodeHead.appendChild(nodeScript);
    } else {
        if (callback != null) {
            callback();
        }
    }
}