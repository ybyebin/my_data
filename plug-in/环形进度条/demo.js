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

});;