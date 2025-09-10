<template>
    <headertop/>
      <div class="iframecontainer">
        <iframe src="https://www.youtube.com/embed/lsAOykqZNRs?si=aST6gukrnBT7oiGh&autoplay=1&controls=0&disablekb=1&loop=1&mute=0&playsinline=1&rel=0" title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="flexbox">
        <div class="box">
          <div class="t-img">
            <img class="mainimg" alt="mitchdesunia" src="@/assets/img/volata/batch_DSC06155.jpg" data-index="1"/>
            <div class="t-info">
            </div>
          </div>          
        </div>
        <div class="box">
          <div class="t-img">
            <img class="mainimg" alt="mitchdesunia" src="@/assets/img/volata/batch_DSC06175.jpg" data-index="1"/>
            <div class="t-info">
            </div>
          </div>          
        </div>

      </div>
    <footern/>
</template>
<script setup>
useHead({
  title: "VOLATA 2025 SPRING/SUMMER | Japan Runway Show",
  script: [
    {
      src: '/js/script.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: 'VOLATA | Japan Runway Show'},
    {property: 'og:title', content: 'VOLATA | Japan Runway Show'},
 ]
});




</script>