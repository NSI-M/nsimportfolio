<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="Miyu Ishitsubo" src="/img/suzuki/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">鈴木 日葵<span style="font-size: small;">Hibiki Suzuki</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       群馬銀行グリーンウイングス所属
                    </p>
                    <p>
                        上尾メディックス所属
                    </p>
                    <p>
                        V.LEAGUE DIVISION2
                    </p>
                    <p>
                        2020〜2021／2021〜2022 シーズン スパイク賞
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="鈴木 日葵" src="/img/suzuki/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="鈴木 日葵" src="/img/suzuki/3.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、鈴木 日葵の活躍を応援します',
  meta: [
      {name: 'description', content: '鈴木 日葵を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、鈴木 日葵の活躍を応援します'},
      {property: 'og:description', content: '鈴木 日葵を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>