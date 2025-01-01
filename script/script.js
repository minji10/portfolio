<script>
  // 모든 메뉴 아이템 가져오기
  const menuItems = document.querySelectorAll('.header_menu li a');

  // 이미지 경로 설정
  const activeImages = {
    "#main_container": "./img/main_icon_2.png",
    "#about_me_container": "./img/about_me_icon_2.png",
    "#works_container": "./img/works_icon_2.png",
    "#contact_container": "./img/contact_icon_2.png",
  };

  const defaultImages = {
    "#main_container": "./img/main_icon_1.png",
    "#about_me_container": "./img/about_me_icon_1.png",
    "#works_container": "./img/works_icon_1.png",
    "#contact_container": "./img/contact_icon_1.png",
  };

  // 클릭 이벤트 추가
  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      // 모든 아이콘을 기본 이미지로 리셋
      menuItems.forEach(otherItem => {
        const img = otherItem.querySelector('img');
        const href = otherItem.getAttribute('href');
        img.src = defaultImages[href];
      });

      // 클릭한 아이콘만 활성 이미지로 변경
      const img = this.querySelector('img');
      const href = this.getAttribute('href');
      img.src = activeImages[href];
    });
  });
</script>