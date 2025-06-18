<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('news').path(route.path).first()
})
</script>

<template>
  <headertop/>
  <template v-if="page">
    <div class="flexbox">
      <div class="flexboxa">
        <h2>{{ page.badge }}</h2>
      </div>
      
      <div class="carousel" style="margin: 0 auto;">
        <img :src="page.image.src" :alt="page.image.alt" style="max-width: 100%;"/>
      </div>
    <div class="flexboxa">
      <ContentRenderer :value="page" />
    </div>
    
    
    </div>
  </template>
  
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
  <footern/>
</template>