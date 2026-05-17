<script lang="ts" setup>
const config = useRuntimeConfig()

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('items').path(route.path).first()
})
const { cart, getItemQuantity, addToCart, decreaseQuantity,clearCart } = useCart()
const { data: stockData, refresh: refreshStock } = await useAsyncData(
  `stock-${route.path}`,
  async () => {
    if (!page.value?.price) return null
    // ExpressのURLに合わせて変更してください
    return await $fetch<{ stock: number }>(`/api/stock/${page.value.price}`, {
      baseURL: config.public.apiBase // ここで環境変数のURLを適用
    })  },
  {
    // page の取得が終わってから実行されるように監視
    watch: [page]
  }
)

// 在庫があるかどうかを判定
const isOutOfStock = computed(() => {
  return stockData.value !== null && stockData.value.stock <= 0
})
</script>

<template>
  <headertop/>
  <template >
    <div class="flexbox">
      <div class="flexboxa">
        <h2>{{ page.badge }}</h2>
      </div>
      
      <div class="carousel" style="margin: 0 auto;">
        <img :src="page.image.src" :alt="page.image.alt" style="max-width: 100%;"/>
        <img :src="page.image2.src" :alt="page.image2.alt" style="max-width: 100%;"/>
      </div>
    <div class="flexboxa">
      <div v-if="isOutOfStock" style="color: red; font-weight: bold; margin-bottom: 10px;">
          大変申し訳ございません。この商品は現在在庫切れです。
      </div>
      <button @click="addToCart(page.price,page.image.alt, page.image.src, 1)":disabled="getItemQuantity(page.price) >= 2|| isOutOfStock">{{ isOutOfStock ? '在庫切れ' : '商品を追加' }}</button>
        
      <ContentRenderer :value="page" />
    </div>
    
    
    </div>
  </template>
  
  <footern/>
</template>