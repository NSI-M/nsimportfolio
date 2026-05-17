<template>
        <header class="kielheader">
            <NuxtLink to="/" class="logocontainer" external  target="_self" style="text-decoration: none;">
                    <img src="@/assets/img/thumbdef.png" class="headlogo">
            </NuxtLink>
            <div class="search-container">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="キーワードを入力..." 
                class="search-input"
            />
            </div>  
            <div class="headerlist" >
                <Authcomp>
                    <div class="headeritem" >
                        <button class="menubutton" onclick="toggleMenu()" >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="4" y1="9" x2="28" y2="9" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                                <line x1="4" y1="18" x2="28" y2="18" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                            </svg>
                        </button>
                        <ul class="menu" id="menu">
                            <li class="menulists"><NuxtLink to="/collections/" external  target="_self" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collection</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/missions/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Our mission</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/collaborations/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collaboration</NuxtLink></li>
                            <li class="menulists"><NuxtLink to="/arts/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Arts</NuxtLink></li>
                        </ul>
                    </div>
                </Authcomp>
                <div class="headeritem" >
                    <button class="menubutton" onclick="toggleMenu()" >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="4" y1="9" x2="28" y2="9" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                            <line x1="4" y1="18" x2="28" y2="18" stroke="#ffffff" stroke-width="1.5" fill-opacity="0"/>
                        </svg>
                    </button>
                    <ul class="menu" id="menu">
                        <li class="menulists"><NuxtLink to="/collections/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collection</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/missions/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Our mission</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/collaborations/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Collaboration</NuxtLink></li>
                        <li class="menulists"><NuxtLink to="/arts/" style="color: rgba(255, 255, 255, 1); text-decoration: none; font-family: 'Orbitron';">Arts</NuxtLink></li>
                    </ul>
                </div>    
            </div>
             <div v-if="searchResults.length > 0" class="flexbox">
                <div class="box" v-for="result in searchResults" :key="result.id">
                    
                <NuxtLink class="t-img"  :to="result.path" external>
                    <img  v-if="result.image && result.image.src"  :src="result.image.src" :alt="result.image.alt || ''"class="mainimg">
                    <div class="t-info">
                        <h3>{{ result.title }}</h3>
                        <p v-if="result.badge">{{ result.badge }}</p>
                    </div>
                </NuxtLink>
            </div>
            </div>
            
            <p v-else-if="searchQuery" class="no-results">
                一致する記事が見つかりませんでした。
            </p>

        </header>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MiniSearch from 'minisearch'

// 1. コレクションから検索用のデータを取得
// ※ 'news' の部分は、ご自身が設定したコレクション名に変更してください
const { data: posts } = await useAsyncData('search-data', () => {
  return queryCollection('items')
    // 必要なデータだけを取得して通信量を削減
    .select('title', 'badge', 'path', 'image')
    .all()
})

const searchQuery = ref('')
const searchResults = ref([])

// 2. MiniSearchの初期化
const miniSearch = new MiniSearch({
  fields: ['title', 'badge'], // 検索対象にする項目
  storeFields: ['title', 'badge', 'path', 'image'], // 検索結果として受け取る項目
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