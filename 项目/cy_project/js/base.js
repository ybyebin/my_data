
function methodSlide() {
  var slide = $(".layui-side");
  var bodys = $(".layui-body");

  if (slide.hasClass("cy-slide-small")) {
    slide.removeClass("cy-slide-small");
    bodys.removeClass("cy-body-small");
    $('.bar-span').removeClass('bar-span-small');
    $('.bars').removeClass('bar-zk');
    $('.layui-bg-black').removeClass('layui-bg-black-small');
  } else {
    slide.addClass("cy-slide-small");
    bodys.addClass("cy-body-small");

    $('.bar-span').addClass('bar-span-small')
    $('.bars').addClass('bar-zk')

    $('.layui-bg-black').addClass('layui-bg-black-small');
  }
  $(".cy-scroll-big , .cy-scroll-small").toggle();
}



// 二级页面的js
// var index_children = true;
// $('.active').on('click','.first-web',function() {
//   if (index_children) {
//     console.log($(this).find('i').text());
//     $(this).siblings('dl').css('display','block');
//     $(this).find('.cy-icon-right').html('&#xe61a;');
//     index_children = false;
//   }else{
//     console.log($(this).find('i').text());
//     $(this).siblings('dl').css('display','none');
//     $(this).find('.cy-icon-right').html('&#xe602;');
//     index_children = true;
//   }
// })

// 设置延时器延时
var timer,
  timer1;
var ling = $('.ling');
var mes_ul_pop = $('.mes-ul-pop');
// mouseover

function headerFoldOver() {
  clearTimeout(timer1);
  timer = setTimeout(function() {
    mes_ul_pop.css('display', 'block');
  }, 100);
};

// mouseout
function headerFoldOut() {
  clearTimeout(timer);
  timer1 = setTimeout(function() {
    mes_ul_pop.css('display', 'none');
  }, 100);
};
ling.on('mouseenter', function() {
  headerFoldOver();
});
ling.on('mouseout', function() {
  headerFoldOut();
});
mes_ul_pop.on('mouseover', function() {
  headerFoldOver();
});
mes_ul_pop.on('mouseout', function() {
  headerFoldOut();
});