<template>

  <div class="flexbox">
    <button @click="goCheckout1">Stripe Checkout へ</button>
  </div>

</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
let stripe: Stripe | null = null


// window.Stripe が読み込まれた後に呼び出す
onMounted(() => {
  if (typeof window !== 'undefined' && window.Stripe) {
    console.log('Stripe Key →', config.public.publishableKey)
    stripe = window.Stripe(config.public.publishableKey)
  }
})

const goCheckout1 = async () => {
  console.log('goCheckout 呼ばれました')   
  if (!stripe) return alert('Stripe.js 読み込み待ち')

  // サーバーにセッション作成をリクエスト
  try {
    const { sessionId } = await $fetch('/api/checkout/', {
      method: 'POST',
      body: { priceId: 'price_1RrFuI09dtrC0gbUJKs5ey0t', quantity: 1 },
    })
    const { error } = await stripe.redirectToCheckout({ sessionId })
    if (error) {
      console.error(error.message)
      alert('決済ページの表示に失敗しました')
  }} catch (e) {
    console.error('fetch error →', e)
    alert('セッション作成に失敗しました')
  }

  // Stripe Hosted Checkout へのリダイレクト
  
}
</script>
