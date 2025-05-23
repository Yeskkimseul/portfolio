$(function(){

    updateAOS();
    $(window).on("resize", updateAOS);

    function updateAOS() {
        if ($(window).width() < 825) {
            AOS.init({ disable: true }); // 825px 이하에서는 AOS 비활성화
        } else {
            AOS.init({ disable: false }); // 825px 이상에서는 AOS 활성화
        }
    };
    

    $('main .tabbar div').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    
        if ($('.tabbar .wel_tab').hasClass('on')) {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $('main .welcome').show().siblings('.history').hide(); 
        } else {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $('main .history').show().siblings('.welcome').hide(); 
        }
    
         // 부드럽게 스크롤
    });


    

    $('.ham').click(function(){
        $('.mobile_nav').fadeIn();
        $('body').addClass("no-scroll")
    });

    $('.mobile_nav .top .close').click(function(){
        $('.mobile_nav').fadeOut();
        $('body').removeClass("no-scroll")
    });

    updateAOS();
    window.addEventListener("resize", updateAOS);



});