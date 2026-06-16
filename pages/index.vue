<template>
    
    <headertop/>
    <diarytop/>
    <div class="flexbox">
        <works/>
        <div class="flexcontainer">
        </div>

    
    </div>
    <footertop/>
    
</template>

<script setup>
import { onMounted } from 'vue'
import { navigateTo } from '#app'
import { NuxtLink } from '#components';

useHead({
  title: 'NSIM',
  meta: [
    {name: 'description', content: 'NSIM directs branding, designing, engineering and everyday'},
    {property: 'og:title', content: 'NSIM'},
    {name:"robots", content:"index, follow, max-image-preview:large"}
 ]
})

</script>