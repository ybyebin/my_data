// 文档地址
// https://mp.weixin.qq.com/s/KK1kLu2cHK-xEvJB5t_RAQ

function add() {
    var args = [].slice.call(arguments);
    var fn = function() {
        var args_gn = [].slice.call(arguments);
        return add.apply(null, args.concat(args_gn));
    }
    fn.valueOf = function() {
        return args.reduce(function(a, b) {
            return a + b;
        });
    }
    return fn;
}