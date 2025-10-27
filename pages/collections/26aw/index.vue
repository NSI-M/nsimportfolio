<template>
<Headertop/>
<div class="iframecontainer">
    <iframe src="https://www.youtube.com/embed/3D7yMxY3bs8?autoplay=1&controls=0&disablekb=1&loop=1&mute=0&" title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
        <div class="flexbox">
            <div id="jssor_1" style="position:relative;margin:0 auto;top:0px;left:0px;width:980px;height:600px;overflow:hidden;visibility:hidden;">
                <!-- Loading Screen -->
                <div data-u="loading" class="jssorl-009-spin" style="position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.7);">
                    <img style="margin-top:-19px;position:relative;top:50%;width:38px;height:38px;" src="/img/thumbdef.png"/>
                </div>
                <div data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:980px;height:600px;overflow:hidden;">
                    <div>
                        <NuxtLink to="/collections/26aw/yomeishu">
                            <img style="width: 100%;" src="/img/sazii/logo.png" alt="サジーの恵み">
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink to="/collections/26aw/yomeishu">
                            <img style="max-width: 100%;" src="/img/kean/logo.png" alt="KEAN HEALTH">
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink to="/collections/26aw/yomeishu">
                            <img style="max-width: 100%;" src="/img/kojiko/logo.png" alt="麹粉">
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink to="/collections/26aw/yomeishu">
                            <img style="max-width: 100%;" src="/img/kojiko/logo.png" alt="麹粉">
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink to="/collections/26aw/yomeishu">
                            <img style="max-width: 100%;" src="/img/kojiko/logo.png" alt="麹粉">
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <!--<div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../img/01.jpg" alt="Image 1" style="max-width: 100%;"></div>
                <div class="swiper-slide"><img src="../../img/IMG_5542.jpg" alt="Image 2" style="max-width: 100%;"></div>
                <div class="swiper-slide"><img src="../img/IMG_4272.jpg" alt="Image 2" style="max-width: 100%;"></div>
            </div>
        </div>-->
        </div>


<Footern/>


</template>
<script setup>

// 1. useHeadでSwiperのCDNリソースを読み込む
useHead({
  script: [
    {
      src: '/js/jssor.slider-27.5.0.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: false, 
    }],
 meta: [
    {name: 'description', content: '26aw | Japan Runway Show'},
    {property: 'og:title', content: 'Collections | Japan Runway Show'},
 ]
})


</script>

