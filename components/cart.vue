<template>
  <div>
    <h2>ショッピングカート</h2>
    
    <div class="newsitem" v-for="item in cart" :key="item.priceId">
      <div class="newsimg">
        <img :src="item.imageUrl" :alt="item.name"/>
      </div>
      <div class="newsinfo">
         商品ID: {{ item.name }} | 数量: {{ item.quantity }}
         <button @click="addToCart(item.priceId,item.name,item.imageUrl, 1)":disabled="item.quantity >= 2">+</button>
         <button @click="decreaseQuantity(item.priceId,1)">-</button>
         <span v-if="item.quantity >= 2" style="color: orange; margin-left: 10px;">
           購入上限（2個）に達しました
         </span>
      </div>
     
      
    

    </div>


    <!--    <button @click="addToCart('price_1TBHfD09dtrC0gbUvzv2Wh7i', 'お魚', '/img/thumbdef.png', 1)":disabled="getItemQuantity('price_1TBHfD09dtrC0gbUvzv2Wh7i') >= 2">商品を追加</button>
    <button @click="addToCart('price_1Rvj0I09dtrC0gbUikNONw4w','焼肉', '', 1)">商品を追加</button>
        <button @click="addToCart('price_1TNyp109dtrC0gbUrpwN0Rud','やきそば', '', 1)">商品を追加</button>
<button @click="addToCart('price_XXXXXX', 1)">商品を追加</button>-->

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

const { cart, getItemQuantity, addToCart, decreaseQuantity,clearCart } = useCart()
const checkoutError = ref('')
const handleCheckout = async () => {
  // 実行のたびにエラーメッセージをリセット 20260426
    checkoutError.value = ''
  // --- 追加: 数量が3以上のアイテムが含まれていないかチェック ---
    const hasOverQuantity = cart.value.some(item => item.quantity >= 3)
    if(hasOverQuantity){
      checkoutError.value='数量が3以上の商品が含まれています。各商品は2個までです。'
      return // ここで処理を中断し、決済へ進まない
    } //20260426ここまで
    try {
    // 1. Stripeが受け付けるフォーマット (price, quantity) にマッピング
    const lineItems = cart.value.map(item => ({
      price: item.priceId,
      quantity: item.quantity
    }))

    // 2. Expressサーバーへ送信 ($fetchを使用)
    // ※URLはExpressサーバーのものに合わせてください
    const fetchClientSecret = async () => {
        const response = await $fetch('http://localhost:5000/api/auth/create-checkout', {
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