<template>
    <headertop/>

    <footern/>
</template>
<script setup>
useHead({
  script: [
    {
      src: '/js/swiper-bundle.min.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: true, 
    }],
 meta: [
    {name: 'description', content: 'Volata | Japan Runway Show'},
    {property: 'og:title', content: 'Volata | Japan Runway Show'},
 ]
})

</script>