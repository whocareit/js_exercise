// 在移动端开发的过程中，不需要太多的兼容性处理，其兼容性只需要考虑的就是
//android  ios两种操作系统
//绑定事件的变化，主要涉及的就是touch事件的绑定
//touch中共有touchstart touchmove touchend三种事件
//touchstart触摸开始的时候触发
//touchmove手指在屏幕上滑动的时候触发
//touchend触摸结束的时候触发
//touchcancel(系统事件)：当系统停止跟踪触摸的时候触发
//touch模块，独立于zepto的一个文件，当引入zepto后还需要去单独去引入这个模块,在Git上去搜索，然后copy下来这个模板即可

//动态生成图片
var total = 9;
var liWidth = ($('.ul-wrapper').width() - 24)/4;
var activeIndex;
var radio = $(window).width()/$(window).height()

function renderImg(){
    var str = '';
    for(var i = 0; i < total; i++){
        str+='<li style = " height : '+ liWidth +'px"><img src ="./src/img/'+ i + '.jpg"/></li>';
    }
    //在这里使用appendTo的原因是可以去实现一个链式的调用
    $(str).appendTo($('.ul-wrapper'));
}
renderImg();

$('ul').on('tap','li',function(){
    //代表当前元素第几个
    activeIndex = $(this).index();
    display(activeIndex);
})

function display(index){
    //展示class选择器中的内容,在展示之前，将上一次的内容清空
    $('.show').html('').show()
    //创建一个图片对象，用于去引入图片的逻辑
    var oImg = new Image()
    oImg.src = './src/img/' + index + '.jpg'
    oImg.onload = function(){
        //下面部分的内容用于去判断图片是横着的还是竖着的
        var h = $(this).height;
        var w = $(this).width;
        if((w/h) > radio){
            $(this).appendTo($('.show')).css('width','100%').animate({opacity : 1},500);
        }else{
            $(this).appendTo($('.show')).css('height','100%').animate({opacity : 1},500);
        }
    }
}
$('.show').on('tap',function(){
    //隐藏属性选择器
    $(this).hide();
}).on('swipeLeft',function(){
    //swipeLeft()滑动的方向向左，在这里根据activeIndex来判定当前的图片的索引值
    activeIndex = activeIndex >= total - 1 ?  total - 1: activeIndex + 1
    display(activeIndex);
}).on('swipeRight',function(){
    //swipeRight()滑动的方向往右
    activeIndex = activeIndex <= 0  ? 0 : activeIndex - 1
    display(activeIndex);
})
