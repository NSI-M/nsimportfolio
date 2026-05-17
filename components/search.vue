<template>
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="キーワードを入力..." 
        class="search-input"
      />
    </div>  
      <ul v-if="searchResults.length > 0" class="search-results">
        <li v-for="result in searchResults" :key="result.id">
          <NuxtLink :to="result.path">
            <h3>{{ result.title }}</h3>
            <p v-if="result.badge">{{ result.badge }}</p>
          </NuxtLink>
        </li>
      </ul>
      
      <p v-else-if="searchQuery" class="no-results">
        一致する記事が見つかりませんでした。
      </p>
    
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MiniSearch from 'minisearch'

// 1. コレクションから検索用のデータを取得
// ※ 'news' の部分は、ご自身が設定したコレクション名に変更してください
const { data: posts } = await useAsyncData('search-data', () => {
  return queryCollection('items')
    // 必要なデータだけを取得して通信量を削減
    .select('title', 'badge', 'path')
    .all()
})

const searchQuery = ref('')
const searchResults = ref([])

// 2. MiniSearchの初期化
const miniSearch = new MiniSearch({
  fields: ['title', 'badge'], // 検索対象にする項目
  storeFields: ['title', 'badge', 'path'], // 検索結果として受け取る項目
  idField: 'path' // Nuxt Content v3 にはデフォルトの id がないため、一意な 'path' をIDとして代用する
})

// 3. データをMiniSearchに登録
if (posts.value) {
  miniSearch.addAll(posts.value)
}

// 4. キーワードが入力されるたびに検索を実行
watch(searchQuery, (newQuery) => {
  if (!newQuery) {
    searchResults.value = [] // 未入力なら結果を空に
    return
  }
  
  // 検索実行（prefix: true にすることで「ファッシ」で「ファッション」がヒットするように前方一致を許可）
  searchResults.value = miniSearch.search(newQuery, { 
    prefix: true,
    fuzzy: 0.2 // 少しのタイポ（打ち間違い）も許容したい場合は fuzzy を設定
  })
})
</script>

