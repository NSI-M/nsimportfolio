<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

const { fetchMember, signout, tokenCookie } = useAuth()
const router = useRouter()
const config = useRuntimeConfig()

const user = ref<any>(null)
const isLoading = ref(true)

// 名前変更フォーム用の状態管理
const isEditing = ref(false)
const editForm = ref({ fname: '', lname: '' })
const isSaving = ref(false)

onMounted(async () => {
  const memberData = await fetchMember()
  if (memberData) {
    user.value = memberData
  } else {
    router.push('/login')
  }
  isLoading.value = true
})

// 編集モードをオンにする処理
const startEditing = () => {
  // 現在の名前を入力フォームにセットする
  editForm.value.lname = user.value.lname || ''
  editForm.value.fname = user.value.fname || ''
  isEditing.value = true
}

// 変更をバックエンドに送信する処理
const saveName = async () => {
  if (!editForm.value.lname || !editForm.value.fname) {
    alert('姓と名を入力してください。')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/auth/customer', {
      baseURL: config.public.apiBase,
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
      body: {
        lname: editForm.value.lname,
        fname: editForm.value.fname
      }
    })

    // 成功したら画面上の表示も更新する
    user.value.lname = editForm.value.lname
    user.value.fname = editForm.value.fname
    isEditing.value = false
    alert('名前を更新しました！')

  } catch (error) {
    console.error(error)
    alert('名前の更新に失敗しました。')
  } finally {
    isSaving.value = false
  }
}

const handleSignout = () => {
  signout()
  router.push('/login')
}
</script>

<template>
  <div class="mypage-container">
    <h1>マイページ</h1>

    <div v-if="isLoading">
      <p>読み込み中...</p>
    </div>

    <div v-else-if="user">
      <!-- ★ user.status が 2 以上の時だけ表示される -->
      <h2 v-if="user.status >= 2" class="welcome-message">
        ようこそ！
      </h2>

      <div class="user-info">
        <p><strong>メールアドレス:</strong> {{ user.email }}</p>
        
        <hr />

        <div class="name-section">
          <!-- 通常の表示モード -->
          <div v-if="!isEditing">
            <p><strong>お名前:</strong> {{ user.lname }} {{ user.fname }}</p>
            <button @click="startEditing" class="edit-btn">名前を変更する</button>
          </div>

          <!-- 編集モード -->
          <div v-else class="edit-form">
            <p><strong>名前の変更</strong></p>
            <div class="input-group">
              <label>姓:</label>
              <input type="text" v-model="editForm.lname" placeholder="山田" />
            </div>
            <div class="input-group">
              <label>名:</label>
              <input type="text" v-model="editForm.fname" placeholder="太郎" />
            </div>
            
            <div class="form-actions">
              <button @click="saveName" class="save-btn" :disabled="isSaving">
                {{ isSaving ? '保存中...' : '保存' }}
              </button>
              <button @click="isEditing = false" class="cancel-btn" :disabled="isSaving">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>

      <button @click="handleSignout" class="logout-btn">
        ログアウト
      </button>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
.welcome-message {
  color: #d4af37; /* ちょっと豪華な色合いなどお好みで */
  margin-bottom: 1rem;
}
.user-info {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  color: #333;
}
hr {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 1rem 0;
}
.input-group {
  margin-bottom: 1rem;
}
.input-group label {
  display: inline-block;
  width: 30px;
}
.input-group input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-btn { background-color: #eee; color: #333; border: 1px solid #ccc; }
.save-btn { background-color: #007bff; color: #fff; }
.save-btn:disabled { background-color: #99c2ff; cursor: not-allowed; }
.cancel-btn { background-color: #ccc; color: #333; }
.logout-btn { background-color: #333; color: white; margin-top: 20px;}
</style>