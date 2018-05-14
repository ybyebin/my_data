$(function() {
    var class_list = {
        active_cls: 'lxn-this',
        lxn_show: 'lxn-show',
        form_select: 'lxn-form-select',
        form_selected: 'lxn-form-selected'
    };

    var active_cls = 'lxn-this';
    var tab_show = 'lxn-show';
    $('.lxn-tab').on('click', 'li', function() {
        var _this = $(this);
        $('.tab-li').removeClass(active_cls);
        $('.lxn-tab-item').removeClass(tab_show)
        _this.addClass(active_cls);

        var tab = _this.data('for');
        $(tab).addClass(tab_show);
        console.log(_this.data('type'));
        var type = _this.data('type');
        console.log(type);
        $('#car-type').data('type', type);
    });

    setHtmlRem();
});


function setHtmlRem() {
    var b = document;
    var a = {};
    a.Html = b.getElementsByTagName('html')[0];
    a.widthProportion = function() {
        var c = (b.body && b.body.clientWidth || a.Html.offsetWidth) / 750;

        // console.log(b.body.clientWidth)
        // console.log(a.Html.offsetWidth)

        // console.log(c)
        return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
    };
    a.changePage = function() {
        // console.log(a.widthProportion())
        a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + 'px!important;height:auto');
    }

    a.changePage();
    setInterval(a.changePage, 1000);
}