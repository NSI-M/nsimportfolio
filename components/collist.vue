<script setup lang="ts">
const { data: collist } = await useAsyncData('coll', () => {
  if (import.meta.server) {
    // ターミナル（黒い画面）にのみ出力されます
    console.log('--- SERVER SIDE DATA CHECK ---')
    console.log('First Item Path:', result[0]?.path)
  }
  return queryCollection('coll').all()
})
</script>

<template>
  <div  :key="currentCategory" class="flexcontainer">
    <h2><span style="font-family: 'Orbitron';">collection</span></h2>
  </div>
  
          <NuxtLink :to="post.path" v-for="post in collist" :key="`coll-${post.id}`" class="newsitem">
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