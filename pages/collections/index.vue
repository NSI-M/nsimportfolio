<template>
  <headertop/>
  <div class="flexbox">
    <div class="gallery-layout">
      <nav class="year-nav">
        <ul id="year-list">
          <li 
            @click="goToSlide(0)" 
            :class="{ active: activeIndex === 0 }"
          >2026</li>
          
          <li 
            @click="goToSlide(1)" 
            :class="{ active: activeIndex === 1 || activeIndex === 2 }"
          >2025</li>
          
          <li 
            @click="goToSlide(3)" 
            :class="{ active: activeIndex >= 3 }"
          >2024</li>
        </ul>
      </nav>
      <div class="swiper-wrapper-container">
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <NuxtLink to="/collections/26pf" class="swiper-slide">
                <img src="/img/thumbdef.png" alt="AW 26">
                <div class="slide-caption">Autumn Winter 2026</div>
              </NuxtLink>
              <NuxtLink to="/collections/25aw" class="swiper-slide">
                <img src="/img/suzuki/1.jpg" alt="SS 25">
                <div class="slide-caption">Spring Summer 2025</div>
              </NuxtLink>
              <NuxtLink to="/collections/25ss" class="swiper-slide">
                <img src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80&w=800" alt="Pre 25">
                <div class="slide-caption">Pre-Fall 2025</div>
              </NuxtLink>
              <NuxtLink to="/collections/25ss" class="swiper-slide">
                <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" alt="AW 24">
                <div class="slide-caption">Autumn Winter 2024</div>
              </NuxtLink>
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

// ▼ 修正ポイント2: 状態（データ）の定義 ▼
// Swiperのインスタンスを保持する変数
let swiperInstance = null;
// 現在表示されているスライドのインデックスをリアクティブな変数として管理
const activeIndex = ref(0);

// リストをクリックした時に呼ばれる関数
const goToSlide = (targetIndex) => {
  if (swiperInstance) {
    swiperInstance.slideTo(targetIndex);
  }
};

onMounted(() => {
  const initSwiper = () => {
    swiperInstance = new window.Swiper(".mySwiper", {
      // 以前と同じ設定
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

    // ▼ 修正ポイント3: Swiperが動いたら「データ」だけを更新する ▼
    // document.querySelectorAll などは使わず、変数の数値を書き換えるだけ！
    swiperInstance.on("slideChange", () => {
      activeIndex.value = swiperInstance.realIndex;
    });
  };

  // Swiperのロード待ち
  if (window.Swiper) {
    initSwiper();
  } else {
    const timer = setInterval(() => {
      if (window.Swiper) {
        clearInterval(timer);
        initSwiper();
      }
    }, 100);
  }
});

// コンポーネント破棄時のクリーンアップ
onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }
});
</script>