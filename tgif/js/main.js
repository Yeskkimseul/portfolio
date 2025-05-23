$(function () {

    gsap.registerPlugin(ScrollTrigger) // 스크롤 트리거 등록

    /* 메뉴슬라이드 */

    let menuSwiper;
    function initSwiper() {
        if (window.innerWidth > 800) {
            if (!menuSwiper) {
                menuSwiper = new Swiper(".menuslide", {
                    loop: true,
                    autoplay: {
                        delay: 4000,
                    },
                    breakpoints: {
                        1920: {
                            slidesPerView: 3.2,
                            spaceBetween: 34,
                        },
                        801: {
                            slidesPerView: 2.2,
                            spaceBetween: 20,
                        }
                    }
                });
            }
        } else {
            // menuSwiper가 존재하는 경우에만 destroy() 실행
            if (menuSwiper) {
                menuSwiper.destroy(true, true);
                menuSwiper = null;
                console.log('aa')
            }
        }
    }
    initSwiper();


    /*     menuSwiper = new Swiper(".menuslide", {
            loop : true,
    
            autoplay: { 
                delay: 4000,
            },
            breakpoints: {
      
                1920:{
                    slidesPerView: 3.2,
                    spaceBetween: 34,
                },
                1024: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
            }
        }
        });
    */

    /* 공지_이벤트 */



    let notSwiper = new Swiper(".notice_slide", {
        loop: true,
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
        slidesPerView: 2.5,
        spaceBetween: 10, 
        centeredSlides: true,
        initialSlide: 1 ,
        breakpoints: {
            800:{
                slidesPerView: 2.5,
                spaceBetween: 10, 
                centeredSlides: true,
                initialSlide: 1 ,
            },    
            801:{
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
                initialSlide: 0,
            },
            1675: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
                initialSlide: 0,
            },
        }
    });

    let evenSwiper = new Swiper(".event_slide", {
        loop: true,
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        },
        slidesPerView: 2.5,
        spaceBetween: 10, 
        centeredSlides: true,
        initialSlide: 1 ,
        breakpoints: {
            800:{
                slidesPerView: 2.5,
                spaceBetween: 10, 
                centeredSlides: true,
                initialSlide: 1 ,
            },    
            801:{
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
                initialSlide: 0,
            },
            1675: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
                initialSlide: 0,
            },
        }
    });

    $('.event .con .tit .not_eve h4').click(function () {
        $(this).addClass('on').siblings('h4').removeClass('on');
        if ($('h4.not').hasClass('on')) {
            $('.notice_slide').addClass('on');
            $('.event_slide').removeClass('on');
            notSwiper.update();
        } else {
            $('.notice_slide').removeClass('on');
            $('.event_slide').addClass('on');
            evenSwiper.update();
        }
    });

    $(window).on("resize", function () {
        initSwiper(menuSwiper);
        initSwiper(notSwiper);
        initSwiper(evenSwiper);
    });
 
    AOS.init();

    $('.main_visual .ham').click(function(){
        $('.mobile_nav').fadeIn();
        $('body').addClass("no-scroll")
    });

    $('.mobile_nav .top .close').click(function(){
        $('.mobile_nav').fadeOut();
        $('body').removeClass("no-scroll")
    });



      ScrollTrigger.matchMedia({
        "(min-width: 826px)": function () {
            gsap.to(".bg_img", {
                scrollTrigger: {
                  trigger: ".bg_img",
                  start: "0% 30%",
                  end:"70% 50%",
                  scrub: 1,
                },
                y: -50
              });
        }
      });
})