<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="Miyu Ishitsubo" src="/img/goda/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">合田 智子<span style="font-size: small;">Tomoko Goda</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       野球・ソフトボール（元プロ選手）
                    </p>
                    <p>
                        NABBA KOREA GP 優勝
                    </p>
                    <p>
                        Beef Sasaki Classic 優勝
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="合田 智子" src="/img/goda/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="合田 智子" src="/img/goda/3.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="合田 智子" src="/img/goda/4.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、合田 智子の活躍を応援します',
  meta: [
      {name: 'description', content: '合田 智子を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、合田 智子の活躍を応援します'},
      {property: 'og:description', content: '合田 智子を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>