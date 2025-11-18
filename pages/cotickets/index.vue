<template>
    <Headertop/>
    <topvideo/>
    <div class="pflexbox">
        <h2>
            <span style="font-family: 'Orbitron';">パートナー・コグループ様専用チケットページ</span>
        </h2>
        <p>
            OPEN12:00/START13:00/PARTY18:00~20:00<br>ご参加の際はご購入ページ記載の利用規約の確認をお願いいたします。外部団体の撮影に関する同意が必要です。<br>アフターパーティつきご観覧チケットでは、ショー終了後、次世代の基幹事業と目される「クリエイティブ・エコノミー」の興隆を期し、出展ブランドとクリエイターによるアフターパーティにご参加いただけます。
        </p>
        <div class="newsitem">
            <a href="checkout_co" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/thumbdef.png"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>ご観覧チケット<br>￥10,00</h3>
                </div>
            </a>
        </div>
        <div class="newsitem">
            <a href="checkout_coafter" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/thumbdef.png"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>ご観覧チケット<br>￥15,000</h3>
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
  title: "パートナー・コ様専用チケットページ | Japan Runway Show",
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: 'パートナー・コ様専用チケットページ | Japan Runway Show'},
    {property: 'og:title', content: 'パートナー・コ様専用チケットページ | Japan Runway Show'},
    {property:"twitter:description", content:"パートナー・コ様専用チケットページ | Japan Runway Show"},
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})
</script>