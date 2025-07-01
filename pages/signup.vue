<template>
    <form @submit.prevent="onSignup">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>

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
    router.push('/')
  } catch (e: any) {
    alert(e.statusMessage || 'サインアップに失敗しました')
  }
}
</script>
