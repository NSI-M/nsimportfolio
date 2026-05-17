<script setup lang="ts">
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}
const { data: posts } = await useAsyncData('items', () => {
  return queryCollection('items').all()
})
</script>

<template>
  <div :key="currentCategory2" class="flexcontainer">
    <h2><span style="font-family: 'Orbitron';">NEW ARRIVAL</span></h2>
  </div>
  
          <NuxtLink :to="post.path" external v-for="post in posts" :key="`items-${post.id}`" class="newsitem">
              <div class="newsimg">
                <img
                  v-if="post.image"
                  :src="post.image.src"
                  :alt="post.image.alt"
                  class="w-full h-auto object-cover"
                />
              </div>
              <div class="newsinfo">
                <div class="newsinfodata">
                  <span class="newsbudge">
                    {{ post.badge }}
                  </span>
                </div>
                <div class="newstitle">
                  <p>
                    {{ post.title }}
                  </p>
                </div>
              </div>
          </NuxtLink>
  
</template>