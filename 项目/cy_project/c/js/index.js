$(function () {
    var radio_remember = $('.radio_remember');
    var c_body = $('.index-center');
    var dev_hei = $(window).height();
    var index = {
        index : true,
        init: function () {
            index.heightFun();
        },
        heightFun: function () {
            var _height = (dev_hei - 127);
            c_body.css('height',_height+'px');
        }
    }
    index.init();
})