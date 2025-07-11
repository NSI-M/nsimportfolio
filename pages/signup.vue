<template>
  <headertop/>
  <div class="flexboxf">
    <div class="formimgbox">
      <img src="@/assets/img/formimage.jpg"/>
    </div>
    <form class="formbox" @submit.prevent="onSignup">
      <div class="">
        <h2>
          <span style="font-family: 'Orbitron';">SIGN UP to discover membership information</span>
        </h2>
      </div>
      <div class="formcomp">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="formcomp">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <div class="formcomp">
        <button type="submit">Sign Up</button>
      </div>
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
const { signup } = useAuth()
const router = useRouter()
const errorMessage = ref<string | null>(null)
const onSignup = async () => {
  try {
    await signup(email.value, password.value)
    alert('登録完了！サインイン画面へ移動します。')
    router.push('/login')
  } catch (e: any) {
    alert(e.statusMessage || 'サインアップに失敗しました')
  }
}
useHead({
 meta: [
    {name: 'description', content: 'SIGN UP'},
    {property: 'og:title', content: 'Collections | Japan Runway Show'},
 ]
})

</script>
