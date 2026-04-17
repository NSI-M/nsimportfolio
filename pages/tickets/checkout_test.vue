<template>
  <headertop/>

<div class="flexbox">
  <label for="quantity">数量</label>
  <select id="quantity">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
  <button id="checkout-btn">購入手続きへ</button>
</div>


<div class="flexbox" id="checkout">
  </div>
  <footern/>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { onMounted } from 'vue'
const config = useRuntimeConfig()
useHead({
  title: "チケット",
  script: [
    {
      src: 'https://js.stripe.com/basil/stripe.js'
      // body: true をつけると<body>の末尾で読み込まれる
      
    }],
 meta: [
    {name: 'description', content: 'Ticket Checkout | Japan Runway Show'},
    {property: 'og:title', content: 'Ticket Checkout | Japan Runway Show'},
    {property:"twitter:description", content:"Ticket Checkout | Japan Runway Show"},
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})

onMounted(() => {
  if (!window.Stripe) {
    console.error('Stripe.js が読み込まれていません')
    return
  }
const stripe = Stripe(config.public.publishableKey);

document.getElementById('checkout-btn').addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  initialize(quantity);
});

async function initialize(quantity) {
  const fetchClientSecret = async () => {
    const response = await fetch('http://localhost:5000/api/auth/create-checkout-session0', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }), 
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
  // 以下、initialize 関数を呼び出し
})


</script>
