$(function () {

  $('header .bottom .icon .ham').click(function () {
    $('header .bottom .icon .ham i').toggleClass('fa-xmark').toggleClass('fa-bars');
    $('.side').fadeToggle();
    $('.bg').addClass('on');
  });

  $('.bg').click(function () {
    $('.side').fadeOut();
    $('.bg').removeClass('on');
    $('header .bottom .icon .ham i').addClass('fa-bars').removeClass('fa-xmark');
  })

  /* 메인 슬라이드 */
  let mainSwiper = new Swiper(".main_slide", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let chk = 0;
  $('.autoplay i').click(function () {
    if (chk == 0) {
      //정지해야 하는 상황
      mainSwiper.autoplay.stop();
      chk++;
    } else {
      //플레이 해야 하는 상황
      mainSwiper.autoplay.start();
      chk = 0;
    }
    $(this).toggleClass('fa-pause').toggleClass('fa-play');

  });


  /* ran_box */
  $('.ran_box .inner .more_button').click(function () {
    $('.ran_box .inner .more').addClass('on');
    $(this).addClass('off');
  });

  /* new slide */
  let newSwiper = new Swiper(".new_slide", {
    loop: true,
    speed: 5000,
    autoplay: {
      delay: 3000,
    },
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 0,
    navigation: {
      nextEl: ".button-next-prev .fa-chevron-right",
      prevEl: ".button-next-prev .fa-chevron-left",
    },
  });

  /* topbtn */
  window.onscroll = function () {
    let topBtn = document.querySelector(".topbtn");
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
      topBtn.style.display = "flex";  // 버튼을 보이게 설정
    } else {
      topBtn.style.display = "none";  // 버튼을 숨김
    }
  };

  /*   document.querySelector(".topbtn").onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }; */

  /* event slide */



  let event_slider = new Swiper(".event_slider", {
    loop: true,
    autoplay: {
      delay: 2500,
    },
    navigation: {
      nextEl: ".pr_next_stop .fa-chevron-right",
      prevEl: ".pr_next_stop .fa-chevron-left",
    },

    // $('.autoplay i').click(function () {
    //   if (chk == 0) {
    //     //정지해야 하는 상황
    //     mainSwiper.autoplay.stop();
    //     chk++;
    //   } else {
    //     //플레이 해야 하는 상황
    //     mainSwiper.autoplay.start();
    //     chk = 0;
    //   }
    //   $(this).toggleClass('fa-pause').toggleClass('fa-play');
    });



  });//ready end