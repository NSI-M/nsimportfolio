<template>
  <headertop/>
  <div class="flexbox">
    <div class="gallery-layout">
      <nav class="year-nav">
        <ul id="year-list">
          <li data-index="0" class="active">2026</li>
          <li data-index="1">2025</li>
          <li data-index="3">2024</li>
        </ul>
      </nav>

      <div class="swiper-wrapper-container">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="/img/suzuki/1.jpg" alt="AW 26">
              <div class="slide-caption">Autumn Winter 2026</div>
            </div>
            <div class="swiper-slide">
              <img src="https://images.unsplash.com/photo-1527668752968-14ce70a4a7ae?auto=format&fit=crop&q=80&w=800" alt="SS 25">
              <div class="slide-caption">Spring Summer 2025</div>
            </div>
            <div class="swiper-slide">
              <img src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80&w=800" alt="Pre 25">
              <div class="slide-caption">Pre-Fall 2025</div>
            </div>
            <div class="swiper-slide">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" alt="AW 24">
              <div class="slide-caption">Autumn Winter 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footern/>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 状態管理フラグ
const isMounted = ref(false);
const swiperContainer = ref(null);

useHead({
  title: 'Collections | Japan Runway Show',
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',
      body: true, 
      // 3. スクリプト読み込み後に実行されるコールバックを指定可能
      onload: () => console.log('Swiper script loaded')
    }
  ]
});

let swiper = null;

onMounted(() => {
  // DOMContentLoadedの代わりにonMountedを使用し、
  // Nuxtの描画完了タイミングに合わせてSwiperを初期化する
  const initSwiper = () => {
    swiper = new window.Swiper(".mySwiper", {
      direction: 'horizontal',
      centeredSlides: true,
      slidesPerView: 1.5,
      spaceBetween: 40,
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
      },
      speed: 600,
      breakpoints: {
        768: {
          direction: 'vertical',
          slidesPerView: 1.5,
          centeredSlides: true,
          spaceBetween: 80,
        }
      }
    });

    // 既存のナビゲーション連動ロジック
    const navItems = document.querySelectorAll("#year-list li");

    swiper.on("slideChange", function () {
      const activeIndex = swiper.realIndex;
      
      navItems.forEach(item => item.classList.remove("active"));
      
      if (activeIndex === 0) {
        navItems[0]?.classList.add("active");
      } else if (activeIndex === 1 || activeIndex === 2) {
        navItems[1]?.classList.add("active");
      } else if (activeIndex >= 3) {
        navItems[2]?.classList.add("active");
      }
    });

    navItems.forEach(item => {
      item.addEventListener("click", function() {
        const targetIndex = parseInt(this.getAttribute("data-index"));
        swiper.slideTo(targetIndex);
      });
    });
  };

  // nuxt.config.tsで読み込んだSwiperがwindowオブジェクトに存在するか確認
  if (window.Swiper) {
    initSwiper();
  } else {
    // ネットワーク遅延などで読み込みが遅れた場合のフォールバック
    const timer = setInterval(() => {
      if (window.Swiper) {
        clearInterval(timer);
        initSwiper();
      }
    }, 100);
  }
});

// コンポーネントが破棄される時にSwiperも破棄してメモリリークを防ぐ
onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy(true, true);
  }
});
</script>