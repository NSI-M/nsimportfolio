<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="Miyu Ishitsubo" src="/img/mamiya/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">間宮佑圭<span style="font-size: small;">Yuka Mamiya</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                        日本代表：2009～2010年、2012～2017年、2020年
                    </p>
                    <p>
                       Wリーグ 2012-13シーズン
                    </p>
                    <p>
                        得点ランキング1位
                    </p>
                    <p>
                        ベスト5
                    </p>
                    <p>
                        レギュラーシーズンMVP
                    </p>
                    <p>
                        2013年アジア選手権 大会ベスト5
                    </p>
                    <p>
                        2013-14シーズン プレイオフMVP
                    </p>
                    <p>
                        代表成績
                    </p>
                    <p>
                        2013年 アジア選手権 優勝
                    </p>
                    <p>
                        2015年 アジア選手権 優勝
                    </p>
                    <p>
                        2016年 リオデジャネイロオリンピック ベスト8
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="間宮佑圭" src="/img/mamiya/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="間宮佑圭" src="/img/mamiya/3.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="間宮佑圭" src="/img/mamiya/4.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、間宮佑圭の活躍を応援します',
  meta: [
      {name: 'description', content: '間宮佑圭を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、間宮佑圭の活躍を応援します'},
      {property: 'og:description', content: '間宮佑圭を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>