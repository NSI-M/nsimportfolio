<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="Miyu Ishitsubo" src="/img/ishikawa/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">石川 愛<span style="font-size: small;">Ai Ishikawa</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       シャンソンVマジック所属
                    </p>
                    <p>
                        デンソーアイリス所属
                    </p>
                    <p>
                        山梨クィンビーズ所属
                    </p>
                    <p>
                        U-15・U-18 日本代表
                    </p>
                    <p>
                        Wリーグ2年目 ブロックショット1位受賞
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="石川 愛" src="/img/ishikawa/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="石川 愛" src="/img/ishikawa/3.jpg" class="mainimg" data-index="1"/>
            </div>
            <div id="modal" class="modal" style="display: none;">
                <span class="close">&times;</span>
                <img class="modal-content" id="modalImage">
                <div class="nav prev">&#10094;</div>
                <div class="nav next">&#10095;</div>
            </div>

    </div>
    <Footern/>

</template>
<script setup>
import { onMounted } from 'vue'
import { NuxtLink } from '#components';
useHead({
  title: 'Japan Runway Showは、石川 愛の活躍を応援します',
  meta: [
      {name: 'description', content: '石川 愛を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、石川 愛の活躍を応援します'},
      {property: 'og:description', content: '石川 愛を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>