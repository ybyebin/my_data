window.onload = function() {

}


function init() {

    var selects = document.getElementsByClassName("ybui-form-select");
    for (var i = 0; i < selects.length; i++) {
        selects[i]
    }


}


window.onload = function() {
    // var oUl = document.getElementById("ul1");
    // var aLi = oUl.getElementsByTagName('li');
    // var num = 4;


    var selects = document.getElementsByClassName("ybui-form-select");
    // alert(selects.length)
    for (var i = 0; i < selects.length; i++) {
        selects[i].onclick = function(ev) {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            var node_name = target.nodeName.toLowerCase();
            var element = target.parentNode.parentNode;
            var cls = 'ybui-form-selected';
            var active_cls = 'ybui-this';
            if (node_name == 'input' || node_name == 'i') {
                var curent_have_cla = false;
                if ((' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1) {
                    curent_have_cla = true;
                }
                for (var j = 0; j < selects.length; j++) {
                    selects[j].classList.remove(cls);
                }
                if (!curent_have_cla) {
                    element.classList.add(cls);
                }
            }
            if (node_name == 'li') {

                var lis = target.parentNode.getElementsByTagName('li');
                for (var i = 0; i < lis.length; i++) {
                    lis[i].classList.remove(active_cls);
                }

                target.classList.add(active_cls);
                element.getElementsByTagName('input')[0].value = target.innerHTML;
                for (var j = 0; j < selects.length; j++) {
                    selects[j].classList.remove(cls);
                }
            }
        }
    }





    // //事件委托，添加的子元素也有事件
    // oUl.onmouseover = function(ev) {
    //     var ev = ev || window.event;
    //     var target = ev.target || ev.srcElement;
    //     if (target.nodeName.toLowerCase() == 'li') {
    //         target.style.background = "red";
    //     }

    // };
    // oUl.onmouseout = function(ev) {
    //     var ev = ev || window.event;
    //     var target = ev.target || ev.srcElement;
    //     if (target.nodeName.toLowerCase() == 'li') {
    //         target.style.background = "#fff";
    //     }

    // };

    // //添加新节点

    var oBtn = document.getElementById("btn");

    oBtn.onclick = function() {

        var oLi = document.createElement('li');
        oLi.innerHTML = 111;
        document.getElementsByClassName('ybui-select-group')[0].appendChild(oLi);
    };
}