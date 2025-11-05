<template>
    <Headertop/>
    <topvideo/>
    <div class="pflexbox">
        <h2>
            <span style="font-family: 'Orbitron';">VIP Tickets</span>
        </h2>
        <p>
            OPEN12:00/START13:00/PARTY18:00~20:30<br>ご観覧を検討いただきありがとうございます。<br>ご参加の際はご購入ページ記載の利用規約の確認をお願いいたします。外部団体の撮影に関する同意が必要です。
        </p>
        <div class="newsitem">
            <a href="checkout_vip" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/thumbdef.png"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>ご招待チケット<br>タップしてチケット情報をご入力ください<br>￥-</h3>
                </div>
            </a>
        </div>
        <div class="newsitem">
            <a href="checkout_vipafter" style="display: flex;">
                <div class="newsimg">
                    <img src="@/assets/img/thumbdef.png"/>
                </div>
                <div class="newsinfo" style="justify-content: center;">
                    <h3>アフターパーティつきご招待チケット<br><del>￥15,000</del>￥7,500</h3>
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
  title: "チケット一覧",
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: 'チケット一覧 | Japan Runway Show'},
    {property: 'og:title', content: 'チケット一覧 | Japan Runway Show'},
    {property:"twitter:description", content:"チケット一覧 | Japan Runway Show"},
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})
</script>