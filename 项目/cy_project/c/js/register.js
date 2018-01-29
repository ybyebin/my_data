$(function () {
    var radio_remember = $('.radio_remember');
    var c_body = $('.c-body');
    var dev_hei = $(window).height();
    var register = {
        index : true,
        init: function () {
            register.heightFun();
        },
        heightFun: function () {
            var _height = (dev_hei - 101 - 490)/2;
            c_body.css('margin-top',_height+'px');
        }
    }
    register.init();
})