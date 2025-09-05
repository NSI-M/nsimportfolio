<template>
    
    <headertop/>
    <div class="flexbox">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><a href="25ss/"><img src="@/assets/img/01.jpg" alt="25SS" style="max-width: 100%;"></a></div>
                <div class="swiper-slide"><img src="@/assets/img/01.jpg" alt="25resort" style="max-width: 100%;"></div>
                <div class="swiper-slide"><NuxtLink to="/collections/25aw/"><img src="@/assets/img/26aw.jpg" alt="26aw" style="max-width: 100%;"></NuxtLink></div>
            </div>
        </div>

    </div>

    <footern/>
</template>

<script setup>
import { NuxtLink } from '#components';
import { ref, onMounted } from 'vue';

// 1. useHeadでSwiperのCDNリソースを読み込む
useHead({
  title: 'Collections | Japan Runway Show',
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
  meta: [
      {name: 'description', content: 'これまでのJapan Runway Showのコレクションをチェック'},
      {property: 'og:title', content: 'Collections | Japan Runway Show'},
  ]
})

// Swiperを適用するDOM要素を特定するためのref
const swiperContainer = ref(null);

// 3. onMountedフックでSwiperを初期化
onMounted(() => {
  // Swiperがグローバルスコープ(window)にロードされるのを待つ
  // window.Swiper が存在することを確認してから初期化
  if (window.Swiper) {
    new window.Swiper(swiperContainer.value, {
      // Swiperのオプション設定
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    console.error('Swiper library is not loaded.');
  }
});

</script>