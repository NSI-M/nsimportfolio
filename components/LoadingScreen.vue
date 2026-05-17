<template>
  <div v-if="isLoading" class="global-loading">
      <img src="/img/blogo.gif">
    </div>
</template>

<script setup>
const isLoading = ref(true)
const nuxtApp = useNuxtApp()

// ページ遷移開始
nuxtApp.hook('page:start', () => {
  console.log('遷移開始！') // デバッグ用
  isLoading.value = true
})

// ページ遷移終了
nuxtApp.hook('page:finish', () => {
  // すぐに消さず、次のティック（描画タイミング）まで待つ
  nextTick(() => {
    setTimeout(() => {
      isLoading.value = false
    }, 600) // 0.3秒ほどバッファを持たせるとスムーズです
  })
})

// テスト用：強制的に3秒間表示させるボタンをどこかに置いてチェックしてみてください
// const testLoading = () => { isLoading.value = true; setTimeout(() => isLoading.value = false, 3000) }
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  z-index: 9999;
}
.spinner {
  width: 50px; height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>