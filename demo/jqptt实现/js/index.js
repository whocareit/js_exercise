var timer = null;
var lock = true;
var mLeft = 0;
var num = parseInt($('.ul-bg li').css('width'));
var index = 0;


//左右按钮点击事件
$('.buttonRight').click(function () {
    autoMove('right->left')
})
$('.buttonLeft').click(function () {
    autoMove('left->right')
})

for(var i = 0 ; i <  $('span').length; i++){
    (function(myIndex){
        $('span').eq(i).click(function(){
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            $('.ul-bg').animate({ 'left': -index * num }, 1000, 'linear', function (){
                lock = true;
                timer = setTimeout(autoMove,1000);
                changeIndex(index)
            })
        })
    })(i)
}
//轮播图自动移动函数
function autoMove(direction) {
    clearTimeout(timer)
    if(lock){
        lock = false;
        if (!direction || direction == 'left->right') {
            index++
            $('.ul-bg').animate({ 'left': parseInt($('.ul-bg').css('left')) - num }, 1000, 'linear', function () {
                if (parseInt($('.ul-bg').css('left')) == -3 * num) {
                    index = 0
                    parseInt($('.ul-bg').css('left',0)) ;
                }
                timer = setTimeout(autoMove,1000);
                changeIndex(index)
                lock = true;
            })
        }else if(direction == 'right->left'){
            index--
            if(parseInt($('.ul-bg').css('left')) == 0){
                index = 3
                parseInt($('.ul-bg').css('left',-3 * num));
            }
            $('.ul-bg').animate({ 'left': parseInt($('.ul-bg').css('left')) + num }, 1000, 'linear', function (){
                timer = setTimeout(autoMove,1000);
                changeIndex(index)
                lock = true;
            })
        }
    }
}
timer = setTimeout(autoMove,1000)
//小圆点样式改变
function changeIndex(_index){
    for(var i = 0; i < $('span').length; i++){
        $('span').eq(i).removeClass();
    }
    $('span').eq(_index).addClass('active');
}
