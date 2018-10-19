//demo code for radial progress
$(function () {

    // var radials = $('#indicatorContainer2').radialIndicator({
    //     barColor: '#87CEEB',
    //     barWidth: 10,
    //     initValue: 0,
    //     radius:60,
    //     roundCorner: true,
    // }).data('radialIndicator');
   


    
var radials = radialIndicator('#indicatorContainer2',{
    barColor: '#87CEEB',
    barWidth: 10,
    initValue: 0,
    radius:60,
    roundCorner: true,
});  



console.log(radials)
setTimeout(function(){
    console.log('=====================')
    radials.animate(90)
},1000)









var radials = radiallndicator('#indicatorContainer2',{
    barColor: '#87CEEB',
    barBgColor:'#e1e1e1',
    barWidth: 30,
    initValue: 0,
    radius:200,
    roundCorner: true
    // fontSize:30
}); 
    $('.btn-exchange').on('click', function () {
        console.log('点击按钮=====')
        console.log('查看:'+devicePixelRatio)
        console.log('=====================')
        radials.animate(10)

           
    })


});;