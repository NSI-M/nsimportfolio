<template>
  <headertop/>
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
initialize();

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch('http://localhost:5000/api/auth/create-checkout-session8', {
      method: "POST",
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
