<template>
    <Headertop/>
    <div class="flexbox">
        <div class="talentimagecontainer">
            <img alt="濱田 真由" src="/img/hamada/1.jpg" class="mainimg"data-index="0"/>
        </div>
            <div class="talentinfocontainer">
                <div class="talentname">
                    <h1 style="text-decoration: none;">濱田 真由<span style="font-size: small;">Yuka hamada</span></h1>
                </div>
                <div class="talentdata">
                    <p>
                       2021年 第32回オリンピック競技大会（東京）出場
                    </p>
                    <p>
                        2017年 世界選手権大会（韓国・茂朱）ベスト8
                    </p>
                    <p>
                        2016年 第31回オリンピック競技大会（リオ）出場
                    </p>
                    <p>
                        2015年 ワールドグランプリマンチェスター 3位
                    </p>
                    <p>
                        2015年 世界選手権大会（ロシア）優勝
                    </p>
                    <p>
                        2014年 ワールドグランプリファイナル 3位
                    </p>
                    <p>
                        全日本選手権大会 優勝：2011〜2015、2017、2019
                    </p>
                    <p>
                        ...etc
                    </p>
                </div>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="濱田 真由" src="/img/hamada/2.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="濱田 真由" src="/img/hamada/3.jpg" class="mainimg" data-index="1"/>
            </div>
            <div class="talentsubimagecontainer">
                <img alt="濱田 真由" src="/img/hamada/4.jpg" class="mainimg" data-index="1"/>
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
  title: 'Japan Runway Showは、濱田 真由の活躍を応援します',
  meta: [
      {name: 'description', content: '濱田 真由を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'},
      {property: 'og:title', content: 'Japan Runway Showは、濱田 真由の活躍を応援します'},
      {property: 'og:description', content: '濱田 真由を起用したJapan Runway Show 2026 プレフォールキャンペーンをチェック'}
  ]
})

</script>