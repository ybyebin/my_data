// var arr = [1, 2, 3];
// console.log(arr.toString())
// console.log(Object.prototype.toString.call(arr))

// function aa() {

// }
// var dic = {}

// console.log(Object.prototype.toString.call(dic))
// console.log('object');







function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    switch (Object.prototype.toString.call(obj)) {

        case '[object Array]':
            var result = new Array(obj.length);
            for (var i = 0; i < result.length; ++i) {
                result[i] = deepClone(obj[i]);
            }
            return result;

            break;
        case '[object Object]':
            var keys = Object.keys(obj);
            var result = {};
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                result[key] = deepClone(obj[key]);
            }
            return result;
            break;

    }


}





var dic1 = {
    a: {
        a1: 1
    },
    b: {
        b1: 2
    }
}

var arr1 = [{
    a: 1,
    b: 2
}, 2]


// var dic2 = deepClone(dic1);
// dic1.b = 1;
// console.log('dic1：' + JSON.stringify(dic1, null, 2));
// console.log('dic2：' + JSON.stringify(dic2, null, 2));
// var arr2 = deepClone(arr1);
// arr1[0] = 5;
// console.log('arr1：' + JSON.stringify(arr1, null, 2));
// console.log('arr2：' + JSON.stringify(arr2, null, 2));




var arr = [1, 1, 1, 1, 2, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8, 89, 0];
var data = arr.reduce(function(arrnum, curr) {
    if (curr in arrnum) {
        arrnum[curr]++;
    } else {
        arrnum[curr] = 1;
    }
    return arrnum;
}, {});
console.log(data);





function aa() {
    var a = 1;
    var b = 2;

    function bb() {
        return a + b;
    }
    return bb;
}
var mm = aa();
console.log(mm());