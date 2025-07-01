<template>
  <Headertop/>
  <div class="flexbox">
    <form @submit.prevent="onSignin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const mail = ref('')
const password = ref('')
const pswd = ref('')
const { signin } = useAuth()
const { signup } = useAuth()
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
</script>
