// var arr = [1, 2, 3];
// console.log(arr.toString())
// console.log(Object.prototype.toString.call(arr))

// function aa() {

// }
// var dic = {}

// console.log(Object.prototype.toString.call(dic))
// console.log('object');







// function deepClone(obj) {
//     if (obj == null || typeof obj !== 'object') {
//         return obj;
//     }
//     switch (Object.prototype.toString.call(obj)) {

//         case '[object Array]':
//             var result = new Array(obj.length);
//             for (var i = 0; i < result.length; ++i) {
//                 result[i] = deepClone(obj[i]);
//             }
//             return result;

//             break;
//         case '[object Object]':
//             var keys = Object.keys(obj);
//             var result = {};
//             for (var i = 0; i < keys.length; ++i) {
//                 var key = keys[i];
//                 result[key] = deepClone(obj[key]);
//             }
//             return result;
//             break;

//     }


// }





// var dic1 = {
//     a: {
//         a1: 1
//     },
//     b: {
//         b1: 2
//     }
// }

// var arr1 = [{
//     a: 1,
//     b: 2,
//     c: [1, 2, 3, { m: 12 }]
// }, 2]


// var dic2 = deepClone(dic1);
// dic1.b = 1;
// console.log('dic1：' + JSON.stringify(dic1, null, 2));
// console.log('dic2：' + JSON.stringify(dic2, null, 2));
// var arr2 = deepClone(arr1);
// arr1[0] = 5;
// console.log('arr1：' + JSON.stringify(arr1, null, 2));
// console.log('arr2：' + JSON.stringify(arr2, null, 2));




// var arr = [1, 1, 1, 1, 2, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8, 89, 0];
// var data = arr.reduce(function(arrnum, curr) {
//     if (curr in arrnum) {
//         arrnum[curr]++;
//     } else {
//         arrnum[curr] = 1;
//     }
//     return arrnum;
// }, {});
// console.log(data);





// function aa() {
//     var a = 1;
//     var b = 2;

//     function bb() {
//         return a + b;
//     }
//     return bb;
// }
// var mm = aa();
// console.log(mm());

// function deepClone(obj) {
//     if (obj == null || typeof obj !== 'object') {
//         return obj;
//     }
//     switch (Object.prototype.toString.call(obj)) {
//         case '[object Array]':
//             var result = new Array(obj.length);
//             for (var i = 0; i < result.length; ++i) {
//                 result[i] = deepClone(obj[i]);
//             }
//             return result;
//             break;
//         case '[object Object]':
//             var result = {};
//             var keys = Object.keys(obj);
//             for (var i = 0; i < keys.length; ++i) {
//                 var key = keys[i];
//                 result[key] = deepClone(obj[key]);
//             }
//             return result;

//             break;
//     }
// }

// if (!isArray) {
//     if (Object.prototype.toString.call(arr) !== '[object Aray]') {
//         return false;
//     }
// }


// var arr = [1, 2, 1, 2, 3, 4, 5, 7, 7, 7, 7, 7, 8, 8, 9, 9];
// var result = arr.sort().reduce((init, current) => {
//     if (init.length === 0 || init[init.length - 1] !== current) {
//         init.push(current);
//     }
//     return init;
// }, []);

// console.log(JSON.stringify(arr));
// console.log(JSON.stringify(result));



// var arr = ['Tom', 'Jerry', 'Tom', 'Mike', 'Mike', 'Bolp'];

// for (const iterator of arr) {
//     console.log(iterator)
// }
//更改该代码块，使其 输出 1,2,3,4,5
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, i * 1000);
// }



function checkType(obj) {
    return Object.prototype.toString.call(obj);
}

console.log(checkType(1)); //[object Number]
console.log(checkType('1')); //[object String]
console.log(checkType(true)); //[object Boolean]
console.log(checkType(undefined)); //[object Undefined]
console.log(checkType(null)); //[object Null]
console.log(checkType([1, 2, 3])); //[object Array]
console.log(checkType({ a: 1, b: 2 })); //[object Object]
console.log(checkType(function() {})); //[object Function]

function randomString(length) {
    var type = Object.prototype.toString.call(length);
    if (type === '[object Number]' || type === '[object Undefined]') {
        length = length || 18;
        var random_number = new Date().getTime().toString(36);　
        var base_charts = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var chart_length = base_charts.length;
        var str = '';
        for (var i = 0; i < length; i++) {　　　　
            str += base_charts.charAt(Math.floor(Math.random() * chart_length));　　
        }　
        if (length <= 8) {
            return str;
        } else {
            return str.substr(0, str.length - 8) + random_number;
        }
    } else {
        alert('输入错误')
    }
}

console.log(randomString('123'));
console.log(randomString(10))