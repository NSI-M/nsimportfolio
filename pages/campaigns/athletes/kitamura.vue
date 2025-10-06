<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="北村 夢" src="/img/kitamura/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">北村 夢<span style="font-size: small;">Yume Kitamura</span></h1>
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
                <img alt="北村 夢" src="/img/kitamura/2.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、北村 夢の活躍を応援します',
  meta: [
      {name: 'description', content: '北村 夢を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、北村 夢の活躍を応援します'},
      {property: 'og:description', content: '北村 夢を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>