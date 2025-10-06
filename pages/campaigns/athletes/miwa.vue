<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="三輪 ダリヤ" src="/img/miwa/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">三輪 ダリヤ<span style="font-size: small;">Daria Miwa</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       日本インカレ 3位
                    </p>
                    <p>
                        日本選手権 5年連続出場
                    </p>
                    <p>
                        東海選手権 優勝
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="三輪 ダリヤ" src="/img/miwa/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="三輪 ダリヤ" src="/img/miwa/3.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="三輪 ダリヤ" src="/img/miwa/4.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、三輪 ダリヤの活躍を応援します',
  meta: [
      {name: 'description', content: '三輪 ダリヤを起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、三輪 ダリヤの活躍を応援します'},
      {property: 'og:description', content: '三輪 ダリヤを起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>