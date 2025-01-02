const intro = document.querySelector(".intro");
const wrap = document.querySelector(".wrap");

let isIntro = true;
let moving = false;
let isEnabled = true; // 스크립트 활성화 여부

checkScroll();
checkWindowSize();

function checkScroll() {
  if (window.scrollY !== 0) {
    scrollStart(false);
    isIntro = false;
  }
}

function scrollStart(transition = true) {
  if (!moving && isEnabled) {
    moving = true;
    setTimeout(() => {
      moving = false;
    }, 1000);

    if (transition) {
      intro.style.transition = "1s";
      wrap.style.transition = "1s";
    } else {
      intro.style.transition = "none";
      wrap.style.transition = "none";
    }

    intro.style.transform = `translateY(-100%)`;
    wrap.style.transform = `translateY(0)`;

    setTimeout(
      () => {
        document.body.style.overflow = "auto";
      },
      transition ? 1000 : 0
    );
  }
}

function returnIntro() {
  if (!moving && isEnabled) {
    moving = true;
    setTimeout(() => {
      moving = false;
    }, 1000);

    document.body.style.overflow = "hidden";
    intro.style.transition = "1s";
    wrap.style.transition = "1s";
    intro.style.transform = `translateY(0)`;
    wrap.style.transform = `translateY(100vh)`;
  }
}

function checkWindowSize() {
  isEnabled = window.innerWidth > 1024; // 1024px 이하에서는 비활성화
  if (!isEnabled) {
    // 1024px 이하일 때 초기화 (원래 위치로 되돌리기)
    intro.style.transform = `translateY(0)`;
    wrap.style.transform = `translateY(100vh)`;
    document.body.style.overflow = "auto"; // 스크롤 허용
  }
}

// 마우스 휠 이벤트
window.addEventListener("mousewheel", (e) => {
  if (isEnabled) {
    if (isIntro && e.deltaY > 0) {
      setTimeout(() => {
        isIntro = false;
      }, 1000);
      scrollStart(true);
      console.log("아래로는 내렸다");
    }

    if (window.scrollY === 0 && !isIntro && e.deltaY < 0) {
      setTimeout(() => {
        isIntro = true;
      }, 1000);
      returnIntro();
      console.log("위로는 올렸다");
    }
  }
});

// 창 크기 변경 이벤트
window.addEventListener("resize", checkWindowSize);

// 헤더메뉴 //

// 헤더 메뉴 이미지들을 배열로 저장
const menuImages = document.querySelectorAll(".header_menu .menu_img");

// 각 섹션 ID와 변경할 이미지 경로 매핑
const sectionImageMap = {
  main_container: "./img/main_icon_2.png",
  about_me_container: "./img/about_me_icon_2.png",
  works_container: "./img/works_icon_2.png",
  contact_container: "./img/contact_icon_2.png",
};

// 각 섹션 ID와 원래 이미지 경로 매핑
const originalImageMap = {
  main_container: "./img/main_icon_1.png",
  about_me_container: "./img/about_me_icon_1.png",
  works_container: "./img/works_icon_1.png",
  contact_container: "./img/contact_icon_1.png",
};

// Intersection Observer 설정
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const sectionKeys = Object.keys(sectionImageMap);

      if (entry.isIntersecting) {
        // 섹션에 진입했을 때 이미지 변경
        menuImages.forEach((img, index) => {
          if (sectionId === sectionKeys[index]) {
            img.src = sectionImageMap[sectionId];
          }
        });
      } else {
        // 섹션을 벗어났을 때 원래 이미지로 복원
        menuImages.forEach((img, index) => {
          if (sectionId === sectionKeys[index]) {
            img.src = originalImageMap[sectionId];
          }
        });
      }
    });
  },
  {
    threshold: 0.5, // 섹션의 절반 이상이 화면에 들어오면 트리거
  }
);

// 관찰할 섹션들을 설정
const sections = document.querySelectorAll("section");
sections.forEach((section) => observer.observe(section));
