<template>
  <div>
    <h2>ショッピングカート</h2>
    
    <div v-for="item in cart" :key="item.priceId">
      商品ID: {{ item.name }} | 数量: {{ item.quantity }}
      <img :src="item.imageUrl" :alt="item.name"/>
      <button @click="addToCart(item.priceId,item.name,item.imageUrl, 1)">+</button>
    <button @click="decreaseQuantity(item.priceId,1)">-</button>

    </div>

    <button @click="addToCart('price_1TBHfD09dtrC0gbUvzv2Wh7i', 'お魚', '/img/thumbdef.png', 1)">商品を追加</button>
    <button @click="addToCart('price_1Rvj0I09dtrC0gbUikNONw4w','焼肉', '', 1)">商品を追加</button>
    <!--<button @click="addToCart('price_XXXXXX', 1)">商品を追加</button>-->

    <button @click="handleCheckout" :disabled="cart.length === 0">
      決済画面へ進む
    </button>
    <button @click="clearCart()">
        やめる
    </button>
    <div class="flexbox" id="checkout">
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { onMounted } from 'vue'
const config = useRuntimeConfig()
useHead({
  script: [
    {
      src: 'https://js.stripe.com/basil/stripe.js'
      // body: true をつけると<body>の末尾で読み込まれる
      
    }]
})

const { cart, addToCart, decreaseQuantity,clearCart } = useCart()

const handleCheckout = async () => {
  try {
    // 1. Stripeが受け付けるフォーマット (price, quantity) にマッピング
    const lineItems = cart.value.map(item => ({
      price: item.priceId,
      quantity: item.quantity
    }))

    // 2. Expressサーバーへ送信 ($fetchを使用)
    // ※URLはExpressサーバーのものに合わせてください
    const fetchClientSecret = async () => {
        const response = await $fetch('https://emmmoeback.vercel.app/api/auth/create-checkout', {
        method: 'POST',
        body: {
            line_items: lineItems
        }
        });
        //const {clientSecret} = await response.json();
        return response.clientSecret;
    }

    // 3. 受け取った clientSecret を使って Embedded Checkout を初期化
    //console.log('Client Secretを取得しました:', response);
    // ここにStripeのEmbedded Checkoutを表示する処理を記述します
    const stripe = Stripe(config.public.publishableKey);
    const checkout = await stripe.initEmbeddedCheckout({
        fetchClientSecret,
    });
    checkout.mount('#checkout');

  } catch (error) {
    console.error('決済セッションの作成に失敗しました:', error)
  }
}
</script>
