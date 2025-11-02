<template>
    <headertop/>
    <!-- Display the order status -->
    <div class="flexboxf">
      <div class="formimgbox">
        <img src="@/assets/img/formimage.jpg"/>
      </div>
      <div class="formbox">
        <div class="">
          <h2>
            <span style="font-family: 'Orbitron';">THANK YOU FOR THE RESERVATION</span>
          </h2>
        </div>
        <div class="formcomp">
          <p>
            japanrunwayshow@gmail.comよりチケットをお送りいたします。受信設定をご確認のうえ、お待ちください。<br>領収書をお求めの際は、同メールアドレス宛にご連絡ください。
          </p>

        </div>
        <p class="">
          メンバーシップに登録し、最新情報を知る：<NuxtLink to="/signup" ><span class="formlink">サインアップ</span></NuxtLink>
        </p>
      </div>
    </div>
    <footern/>
</template>
<script>
useHead({
  title: 'ご登録ありがとうございます',
  script: [
    {
      src: 'https://js.stripe.com/basil/stripe.js',
      // body: true をつけると<body>の末尾で読み込まれる
      body: false, 
    },
    {
      src:'/js/checkout.js'
    }
],
 meta: [
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})


</script>