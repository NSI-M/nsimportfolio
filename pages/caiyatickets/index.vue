<template>
    <Headertop/>
    <topvideo/>
    <div class="pflexbox">
        <h2>
            <span style="font-family: 'Orbitron';">Tickets invited by Caiya</span>
        </h2>
        <p>
            OPEN12:00/START13:00/PARTY18:00~20:00<br>カイヤから招待を受けた方限定の特別なチケットです。ご参加の際はご購入ページ記載の利用規約の確認をお願いいたします。外部団体の撮影に関する同意が必要です。<br>アフターパーティつきご観覧チケットでは、ショー終了後、次世代の基幹事業と目される「クリエイティブ・エコノミー」の興隆を期し、出展ブランドとクリエイターによるアフターパーティにご参加いただけます。
        </p>
        <div class="newsitem">
            <a href="checkout_caiya" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/tickets.jpg"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>カイヤ招待ご観覧チケット<br>￥10,000</h3>
                </div>
            </a>
        </div>
        <div class="newsitem">
            <a href="checkout_caiyaafter" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/tickets.jpg"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>カイヤ招待アフターパーティつきチケット<br>￥15,000</h3>
                </div>
            </a>
        </div>

    </div>
    <footern/>
</template>
<script>
import { NuxtLink } from '#components';
import { ref, onMounted } from 'vue';

// 1. useHeadでSwiperのCDNリソースを読み込む
useHead({
  title: "カイヤ招待チケット",
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: 'カイヤ招待チケット | Japan Runway Show'},
    {property: 'og:title', content: 'カイヤ招待チケット | Japan Runway Show'},
    {property: 'og:description', content: 'カイヤから招待を受けた方限定の特別なチケットです。'},
    {property:"twitter:description", content:"カイヤ招待チケット | Japan Runway Show"},
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})
</script>