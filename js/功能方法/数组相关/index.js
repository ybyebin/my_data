// Array.form

var arr1 = [1, 2, 3, 1, 2, 3, 4, 5, 6, 767, 4, 3, 2, 2, 1];
var results = Array.from(new Set(arr1));
console.log(JSON.stringify(results, null, 2));

function text() {
    console.log(Array.from(arguments));
    console.log([].slice.call(arguments))
}

text('a', 'b');
// Array.isArray

console.log(Array.isArray([1]));

function myIsArray(obj) {
    if (!Array.isArray) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    }
}
console.log(myIsArray([1]));
console.log(myIsArray(1));

// 深拷贝
function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    switch (Object.prototype.toString.call(obj)) {
        case '[object Array]':
            var length = obj.length;
            var result = new Array(length);
            for (var i = 0; i < length; i++) {
                result[i] = deepClone(obj[i]);
            }
            return result;
            break;
        case '[object Object]':
            var keys = Object.keys(obj);
            var result = {};
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                result[key] = deepClone(obj[key]);
            }
            return result;
            break;
    }
}

var a = [1, { 'a': '1', 'b': function() {} }];
var b = deepClone(a);
console.log(JSON.stringify(b, null, 2));
a[1].a = 3;
a[1].b = 3;
console.log(JSON.stringify(a, null, 2));
console.log(JSON.stringify(b, null, 2));



var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 0, 'a', 'a', 1, 2, 3, 4, 56];


outarrs(arr2);


function outarrs(arr) {
    var maxnum = 0;
    var maxname = '';
    var arrs = [];

    var results = arr.reduce(function(all, item) {
        if (item in all) {
            all[item] += 1;
        } else {
            all[item] = 1;
        }
        return all;
    }, {});


    for (const key in results) {
        if (results[key] > maxnum) {
            maxnum = results[key];
            maxname = key;
        }
    }
    for (const key in results) {
        if (results[key] === maxnum) {
            var dic = {};
            dic[key] = maxnum;
            arrs.push(dic);
        }

    }

    console.log('出现次数最多的值:' + maxname);
    console.log('出现次数:' + maxnum);
    console.log(JSON.stringify(arrs, null, 2))
}






function ipv4s(ip) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var flag = ip.match(exp);
    console.log(flag)
    if (flag != undefined && flag !== '') {
        return true;
    } else {
        return false;
    }
}

function ipv4ss(ip) {
    var flag = true;
    var arr = ip.split('.');
    for (var i = 0; i < arr.length; i++) {
        var num = Number(arr[i]);
        if (num >= 0 && num <= 255) {} else {
            flag = false;
            break;
        }
    }
    return flag;

}

// console.log(queryDev('155.255.255.256'))
// console.log(ipv4s('155.255.255.256'))
console.log(ipv4ss('155.255.255.255'))