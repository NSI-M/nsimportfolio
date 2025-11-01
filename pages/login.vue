<template>
  <Headertop/>
  <div class="flexboxf">
    <div class="formimgbox">
      <img src="@/assets/img/formimage.jpg"/>
    </div>
    <form class="formbox" @submit.prevent="onSignin">
      <div class="">
        <h2>
          <span style="font-family: 'Orbitron';">SIGN IN to discover membership information</span>
        </h2>
      </div>
      <div class="formcomp">
        <label>Email*</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="formcomp">
        <label>Password*</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="formcomp">
        <button type="submit">SIGN IN</button>
      </div>
      <p class="">
        ご登録がまだの方：<NuxtLink to="/signup" ><span class="formlink">サインアップ</span></NuxtLink>
      </p>
    </form>
  </div>
  <footern/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const { signin } = useAuth()
const router = useRouter()
const errorMessage = ref<string | null>(null)
const onSignin = async () => {
    errorMessage.value = null
  try {
    await signin(email.value, password.value)
    console.log('Signin successful! User redirected to home page.')
    //router.push('/') // 認証後の遷移先
     navigateTo('/', {external: true})
  } catch (e: any) {
    alert(e.statusMessage || 'サインインに失敗しました')
    console.error('Signin failed:', e)
  }
}
useHead({
  title: 'SIGN IN',
  meta: [
    {name: 'description', content: 'SIGN IN to discover membership information'},
    {property: 'og:title', content: 'SIGN IN'},
    {name:"robots", content:"index, nofollow, max-image-preview:large"}
 ]
})

</script>
