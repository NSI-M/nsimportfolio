<script setup lang="ts">
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}
const { data: posts } = await useAsyncData('news', () => {
  return queryCollection('news').all()
})
</script>

<template>
  <div class="flexcontainer">
    <h2><span style="font-family: 'Orbitron';">News</span></h2>
  </div>
  
        <div v-for="post in posts" :key="post.id" class="newsitem">
          <NuxtLink :to="post.path" style="display: flex; ">
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
                    {{ post.badge }}-{{ formatDate(post.date) }}
                  </span>
                </div>
                <div class="newstitle">
                  <p>
                    {{ post.title }}
                  </p>
                </div>
              </div>
          </NuxtLink>
        </div>
        <div class="newsitem">
          <a style="display: flex; width: 100%;" href="/pdf/JRSvol3.pdf">
            <div class="newsimg">
              <img src="/pdficon.svg">
            </div>
            <div class="newsinfo">
              <div class="newsinfodata">
                <span class="newsbudge">
                  PDF-2025/04/01
                </span>
              </div>
              <div class="newstitle">
                <p>
                  Japan Runway Show vol.3への参加要項資料を公開いたします。
                </p>
              </div>
            </div>
          </a>
        </div>
  
</template>