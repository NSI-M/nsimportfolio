<template>
  <form @submit.prevent="handleCheckout">
    <!-- 隠しフィールドに価格IDと数量を設定 -->
    <input v-model="price" type="hidden" name="price" />
    <input v-model="quantity" type="hidden" name="quantity" />

    <button type="submit" :disabled="loading">
      {{ loading ? '処理中…' : 'Checkout に進む' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

// 環境変数から公開可能キーを読み込む
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const price = ref('price_1RrFuI09dtrC0gbUJKs5ey0t')    // 事前に Stripe ダッシュボードで設定した Price ID
const quantity = ref(1)
const loading = ref(false)

const handleCheckout = async () => {
  loading.value = true

  // 1. 自サイトの API で Checkout セッションを作成
  const res = await fetch('/api/checkout/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price: price.value,
      quantity: quantity.value
    })
  })
  const { sessionId } = await res.json()

  // 2. Stripe.js をロードして Checkout へリダイレクト
  const stripe = await stripePromise
  await stripe.redirectToCheckout({ sessionId })

  loading.value = false
}
</script>
