// for (let i = 1; i <= 5; i++) {
//     setTimeout(function timer() {
//         console.log(i);
//     }, i * 1000);
// }


// for (var i = 1; i <= 5; i++) {
//     (function(i) {
//         setTimeout(function timer() {
//             console.log(i)

//         }, i * 1000);
//     })(i)
// }



// for (var i = 1; i <= 5; i++) {
//     setTimeout(function timer(i) {
//         return function() {
//             console.log(i)
//         }

//     }(i), i * 1000);


// }


//  闭包：闭包是一种现象。
//  它由两部分组成：执行上下文A，以及在A中创建的执行上下文B，
//  B执行时，访问了A的局部变量，这时闭包就产生了

// for (var i = 0; i < 5; i++) {
//     setTimeout(function timer() {
//         console.log('原始版本:' + i);
//     }, i * 1000);
// }


// for (let i = 0; i < 5; i++) {
//     setTimeout(function timer() {
//         console.log('let版本:' + i);
//     }, i * 1000);
// }

// for (var i = 0; i < 5; i++) {
//     (function(i) {
//         setTimeout(function() {
//             console.log('立即执行版本:' + i);
//         }, i * 1000);
//     })(i);
// }


// for (var i = 0; i < 5; i++) {
//     setTimeout(function(i) {
//         console.log('内部立即执行版本:' + i);
//     }(i), i * 1000);
// }


// for (var i = 0; i < 5; i++) {
//     setTimeout(function(i) {
//         return function() {
//             console.log('内部立即执行并返回函数版本:' + i);
//         }
//     }(i), i * 1000);
// }