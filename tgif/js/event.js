$(function(){
    AOS.init();
 $('.ham').click(function(){
        $('.mobile_nav').fadeIn();
        $('body').addClass("no-scroll")
    });

    $('.mobile_nav .top .close').click(function(){
        $('.mobile_nav').fadeOut();
        $('body').removeClass("no-scroll")
    });
    $('.tabbar li').click(function(){
        $('.tabbar li').removeClass('on');
        $(this).addClass('on').siblings();
    })
    $('.page a').click(function(){
        $('.page a').removeClass('on');
        $(this).addClass('on').siblings();
    })
});