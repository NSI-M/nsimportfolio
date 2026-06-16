<script setup lang="ts">
// 最新の5件の記事を取得
const { data: diaries } = await useAsyncData('carousel-diaries', () => {
  return queryCollection('diary')
    .order('date', 'DESC') // 新しい順
    .limit(5)              // スライダーに出す件数（必要に応じて変更）
    .all()
})
</script>

<template>
  <div v-if="diaries && diaries.length > 0" id="carouselExampleIndicators" class="carouseln slide" data-ride="carousel">
    
    <div class="carousel-inner">
      <div 
        v-for="(diary, index) in diaries" 
        :key="diary.path" 
        class="carousel-item"
        :class="{ active: index === 0 }" 
      >
        <NuxtLink :to="diary.path" target="_self">
          <img 
            v-if="diary.image" 
            :src="diary.image.src" 
            class="d-block w-100" 
            :alt="diary.image.alt || diary.title"
          >
        </NuxtLink>
      </div>
    </div>

    <ol class="carousel-indicators">
      <li 
        v-for="(diary, index) in diaries" 
        :key="'indicator-' + index"
        data-target="#carouselExampleIndicators" 
        :data-slide-to="index" 
        :class="{ active: index === 0 }"
      ></li>
    </ol>

    <a v-if="diaries.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
    <a v-if="diaries.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
    
  </div>
</template>

