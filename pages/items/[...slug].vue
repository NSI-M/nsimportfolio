<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('items').path(route.path).first()
})
const { cart, addToCart, decreaseQuantity,clearCart } = useCart()

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
        <img :src="page.image2.src" :alt="page.image2.alt" style="max-width: 100%;"/>
      </div>
    <div class="flexboxa">
      <button @click="addToCart(page.price,page.image.alt, page.image.src, 1)">商品を追加</button>

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