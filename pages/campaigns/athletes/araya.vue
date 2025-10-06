<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="Miyu Ishitsubo" src="/img/araya/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">荒谷 珠未<span style="font-size: small;">Tamami Araya</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       Wリーグ ENEOSサンフラワーズ（2020〜2024）
                    </p>
                    <p>
                        日本代表 U16・U17・U18
                    </p>
                    <p>
                        2022年 3x3ワールドカップ 13位
                    </p>
                    <p>
                        2019・2021年 アジアカップ優勝
                    </p>
                    <p>
                        2018年 アジア大会 3位
                    </p>
                    <p>
                        2017年 ユニバーシアード準優勝
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="荒谷 珠未" src="/img/araya/2.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、荒谷 珠未の活躍を応援します',
  meta: [
      {name: 'description', content: '荒谷 珠未を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、荒谷 珠未の活躍を応援します'},
      {property: 'og:description', content: '荒谷 珠未を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>