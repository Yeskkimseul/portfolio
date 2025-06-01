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

  mainSwiper.on('slideChangeTransitionEnd', function () {
    $('.swiper-slide .inner').removeClass('color-white'); // 초기화

    const realIndex = mainSwiper.realIndex; // loop일 경우 실제 index는 이걸로 가져옴

    if (realIndex === 3) {
      // 0-based index라 3 = 4번째 슬라이드
      $('.swiper-slide-active .inner').addClass('color-white');
    }
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

  let eventChk = 0;

  let event_slider = new Swiper(".event_slider", {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".pr_next_stop .fa-chevron-right",
      prevEl: ".pr_next_stop .fa-chevron-left",
    },
    on: {
         slideChange: function () {
      updateProgressBar(this.realIndex); // realIndex: 실제 슬라이드 인덱스 (loop 고려)
      },
    },
  });

  $('.stopplay i').click(function () {
    if (eventChk === 0) {
      event_slider.autoplay.stop();
      eventChk = 1;
    } else {
      event_slider.autoplay.start();
      eventChk = 0;
    }

    $('.stopplay i').removeClass('on');
    $(this).siblings('i').addClass('on');
    console.log('클릭')
  });

  // ✅ 진행 바 위치 업데이트 함수
  function updateProgressBar(index) {
    const now = document.querySelector(".pager .now");
    const bar = document.querySelector(".pager .bar");

    const totalSlides = 3;
    const barWidth = bar.clientWidth;
    const nowWidth = 12; // 이미지 너비 가정

    // 계산: 인덱스에 따라 위치 계산
    const maxLeft = barWidth - nowWidth; // 최대 이동 범위
    const position = (maxLeft / (totalSlides - 1)) * index;

    now.style.left = `${position}px`;

    // 숫자도 함께 변경 (1부터 시작하도록 표시)
    document.querySelector(".pager span").textContent = index + 1;
  }

});//ready end