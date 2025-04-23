$(function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



  let isScrolling = false;
  let scrollCooldown = false;
  let isHorizontalScrolling = false;
  const sections = document.querySelectorAll("section");
  let currentIndex = 0;

  function scrollToSection(index) {
    if (scrollCooldown) return;

    const horizontalTrigger = ScrollTrigger.getById("work-horizontal");
    const isInHorizontal = horizontalTrigger && horizontalTrigger.isActive;

    if (isInHorizontal) return;

    if (index >= 0 && index < sections.length) {
      isScrolling = true;
      scrollCooldown = true;

      scroll.scrollTo(sections[index], {
        offset: 0,
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0],
        callback: () => {
          isScrolling = false;
          currentIndex = index;
          setTimeout(() => {
            scrollCooldown = false;
          }, 1200);
        },
      });
    }
  }

  window.addEventListener("wheel", (e) => {
    const horizontalTrigger = ScrollTrigger.getById("work-horizontal");
    const workWrapper = document.querySelector("#work .horizontal-wrapper");

    const isPinned =
      horizontalTrigger &&
      horizontalTrigger.pin === workWrapper &&
      horizontalTrigger.isActive;

    if (isScrolling || scrollCooldown || isPinned) return;

    if (e.deltaY > 50) {
      scrollToSection(currentIndex + 1);
    } else if (e.deltaY < -50) {
      scrollToSection(currentIndex - 1);
    }
  });





  gsap.utils.toArray("section").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      end: "bottom top",
      snap: 1,
    });
  });



  // ⭐ 가로 스크롤 설정
  const hor = document.querySelector("#work");
  const workWrapper = document.querySelector("#work .horizontal-wrapper");
  const workli = gsap.utils.toArray("#work .horizontal-wrapper .workli");

  const scrollLength = workWrapper.scrollWidth - window.innerWidth;

  gsap.to(workWrapper, {
    x: () => -scrollLength,
    ease: "none",
    scrollTrigger: {
      id: "work-horizontal",
      trigger: hor,
      start: "top top",
      end: () => "+=" + scrollLength,
      pin: true,
      scrub: 2.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => isHorizontalScrolling = true,
      onLeave: () => isHorizontalScrolling = false,
      onLeaveBack: () => isHorizontalScrolling = false,
    },
  });

  // 🎨 커스텀 커서
  const cursor2 = document.querySelector(".custom_cursor2");
  document.addEventListener("mousemove", (e) => {
    cursor2.style.left = `${e.clientX}px`;
    cursor2.style.top = `${e.clientY}px`;
    createStarTrail(e.clientX, e.clientY);
  });

  function createStarTrail(x, y) {
    const trail = document.createElement("img");
    trail.classList.add("star-trail-svg");
    document.body.appendChild(trail);

    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    const scale = 0.3 + Math.random() * 0.8;

    trail.style.left = `${x + offsetX}px`;
    trail.style.top = `${y + offsetY}px`;
    trail.style.transform = `translate(-50%, -50%) scale(${scale})`;

    gsap.to(trail, {
      left: `${x + (Math.random() - 0.5) * 5}px`,
      top: `${y + (Math.random() - 0.5) * 5}px`,
      opacity: 0,
      duration: 0.8 + Math.random() * 0.5,
      ease: "power1.out",
      onComplete: () => {
        trail.remove();
      },
    });
  }

  document.querySelectorAll("a, button, .lottie-hover-zone").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor2.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor2.classList.remove("hover"));
  });

  // 🔝 scroll to top
  document.querySelector(".goback a").addEventListener("click", function (e) {
    e.preventDefault();
    scroll.scrollTo(0, {
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  });

  gsap.from("#main .top, #main .top img", {
    scrollTrigger: {
      trigger: "#main",
      start: "top 100%",
    },
    y: -400,
    duration: .5,
    ease: "power2.out"
  });

  gsap.from("#main img.bottom", {
    scrollTrigger: {
      trigger: "#main",
      start: "top 100%"
    },
    x: -200,
    duration: 3,
    ease: "expo.out"
  })
  // STAR 흔들림 + 트레일
  let star = document.querySelector('.star');
  const aboutSection = document.querySelector('#main');

  aboutSection.addEventListener('mousemove', function (e) {
    let x = (e.clientX - window.innerWidth / 2) / 30;
    let y = (e.clientY - window.innerHeight / 2) / 30;

    gsap.to(star, {
      x: x,
      y: y,
      rotation: x / 5,
      duration: 0.8,
      ease: 'sine.out'
    });
  });

  // 트레일 생성
  for (let i = 0; i < 5; i++) {
    let trail = star.cloneNode(true);
    trail.classList.add('star-trail');
    document.querySelector('#main .bg').appendChild(trail);
  }

  const trails = document.querySelectorAll('.star-trail');

  aboutSection.addEventListener('mousemove', (e) => {
    const baseX = (e.clientX - window.innerWidth / 2) / 30;
    const baseY = (e.clientY - window.innerHeight / 2) / 30;

    trails.forEach((el, i) => {
      const delay = (i + 1) * 0.05;

      gsap.to(el, {
        x: baseX,
        y: baseY,
        rotation: baseX / 5,
        opacity: 0.2,
        duration: 0.5 + delay,
        ease: 'sine.out'
      });
    });
  });

  //ufo 불러오기
  let animation = bodymovin.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'svg',
    loop: true, //반복재생
    autoplay: true, //자동재생
    path: './img/about/main_character.json',

  });


  //ufo 애니메이션
  animation.addEventListener('DOMLoaded', () => {
    gsap.from('#lottie', {
      scrollTrigger: {
        trigger: '#main',
        start: 'top 100%',
        toggleActions: 'play none none none',
      },
      x: 500,
      duration: 2,
      ease: "back.out(1.7)",
    });

    //ufo 둥둥
    gsap.to('#lottie', {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  //ufo 호버
  const hoverZone = document.querySelector('.lottie-hover-zone');

  hoverZone.addEventListener('mouseenter', () => {
    gsap.to('#lottie', {
      keyframes: [
        { y: 30, rotation: 5, x: -10, duration: 0.3 },
        { y: 32, rotation: -5, x: 10, duration: 0.3 },
        { y: 30, rotation: 3, x: -5, duration: 0.3 },
        { y: 15, rotation: 0, x: 0, duration: 0.4 },
        { y: 0, rotation: 0, x: 0, duration: 0.4 },
      ],
      ease: 'sine.inOut'
    });
  });

  const ufo = document.getElementById('lottie');
  const beam = document.querySelector('.beam');
  const text = document.querySelector('#main .txt');

  ufo.addEventListener('click', () => {
    // GSAP 타임라인 사용해서 동시에 실행
    const tl = gsap.timeline();

    // 빔 켜짐 + 텍스트 위로 동시에 시작
    tl.to(beam, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out"
    }, 0); // ← 0초부터 시작

    tl.to(text, {
      y: -80,
      duration: 1.2,
      ease: "power2.out"
    }, 0); // ← 동시에 시작

    // 텍스트 다시 제자리로
    tl.to(text, {
      y: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, ">"); // 이전 애니메이션 끝난 직후 시작

    // 빔 꺼짐
    tl.to(beam, {
      opacity: 0,
      duration: 1,
      ease: "power1.in"
    }, "-=0.5"); // 텍스트 내려가는 중간쯤에 빔 꺼짐
  });

  //페이퍼 회전
  gsap.to("#resume .paper", {
    rotate: -2,
    y: 30,
    x: 40,
    ease: "none",
    scrollTrigger: {
      trigger: "#resume",
      start: "top bottom",   // 언제부터 시작할지 (화면 중앙 기준)
      end: "bottom center",  // 언제 끝날지
      scrub: true,           // 스크롤에 따라 자연스럽게 반응
    }
  });


  // 텍스트 요소들 순차 등장 애니메이션
  gsap.utils.toArray('#about .txt').forEach((txtEl, i) => {
    gsap.fromTo(txtEl,
      { autoAlpha: 0, y: 50 }, // 처음 상태: 투명하고 아래로 살짝 내려가 있음
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: txtEl,
          start: "top 90%", // 화면의 80% 지점에 들어오면 시작
          toggleActions: "play none none reverse",
        }
      }
    );
  });

  const star1 = document.querySelector('.star1');
  const star2 = document.querySelector('.star2');
  const back = document.querySelector('#contact .img .last_chara');

  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;

    // 마우스 위치를 -1 ~ 1 사이 값으로 정규화
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    // 움직임 적용 (여유있게 흔들림)
    gsap.to(star1, {
      x: x * 30, // 움직임 범위 조절
      y: y * 30,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.to(star2, {
      x: x * -15, // 반대 방향으로 살짝 흔들리게
      y: y * -15,
      duration: 1.4,
      ease: "power3.out"
    });

    gsap.to(back, {
      x: x * -2,
      y: y * -2,
      duration: 2,
      ease: "power4.out"
    })
  });


  gsap.from("#contact .cont_txt .top", {
    scrollTrigger: {
      trigger: "#contact",
      start: "top 100%",
      scrub: true,
    },
    y: -400,
    delay: 1,
    duration: 3,
    ease: "power2.out",
  });

  document.querySelector('.goback a').addEventListener('click', function (e) {
    e.preventDefault(); // 기본 이동 막기
  
    if (typeof scroll !== 'undefined' && typeof scroll.scrollTo === 'function') {
      // 🚀 Locomotive Scroll이 있는 경우
      scroll.scrollTo(0, {
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      // ✨ 일반 브라우저 스크롤
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });
 
});
