$(function () {
    var radio_remember = $('.radio_remember');
    var c_body = $('.c-body');
    var dev_hei = $(window).height();
    var logIn = {
        index : true,
        init: function () {
            logIn.heightFun()
            logIn.lablClick();
        },
        // 记住密码的切换
        lablClick:function() {
            radio_remember.on('click',function(event) {
                if(logIn.index){
                    $(this).attr('checked',true);
                    logIn.index = false;
                }else{
                    $(this).removeAttr('checked');
                    logIn.index = true;
                }
            })
        },
        heightFun: function () {
            var _height = (dev_hei - 101 - 420)/2;
            c_body.css('margin-top',_height+'px');
        }
    }
    logIn.init();
})