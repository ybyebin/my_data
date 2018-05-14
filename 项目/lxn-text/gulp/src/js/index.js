var m = {
    getNewDayList : function (index){
        var self = this;
        var list = '<li></li><li></li>';
        var defaultNum = '';
        var oneDay = 86400000;
        var now  = new Date()
        var dayMap = ['日','一','二','三','四','五','六']
        for (var j = 0; j <= 7; j++) {
            var month =( new Date(now.getTime() + oneDay*j).getMonth() )+1
            var date =  new Date(now.getTime() + oneDay*j).getDate()
            var day = new Date(now.getTime() + oneDay*j).getDay()
            var value = month+'-'+date;
            var show = month+'月'+date+'日'
            if(j == 0){
                show = '今天' +show
            }else if(j == 1){
                show = '明天' +show
            }else if(j==2){
                show = '后天' +show
            }else{
                show = '星期'+dayMap[day] +' ' +show

            }

            list += '<li data-value="' + value + '">' + show + '</li>';
        }
        self.setDefaultItem(index);
        list += '<li></li><li></li>';
        document.querySelector(
            '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list;
        setTimeout(function () {
            self.scrollInit(index, defaultNum);
        }, 0);

    }
}