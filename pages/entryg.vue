<template>
    <Headertop/>
        <Authcompt>
            <div class="flexbox">
                <h2>
                    お名前{{ name }}様 席種類 一般観覧のみ
                </h2>
                <div class="formcomp">
                    <button @click="toggleRecorded">
                        {{ recorded ? '記録済' : '記録する' }}
                    </button>
                </div>
            </div>
        </Authcompt>
        <div class="flexcontainer">
            <img style="width: 100%;" src="@/assets/img/jrsprefall26.jpg" alt=""></img>
        </div>
    <footern/>
</template>

<script setup lang="ts">
    import { computed } from 'vue'; import { useRoute } from 'vue-router';
    const route = useRoute()
    const name = computed(() => { //query.nameはstring | 
    const raw = route.query.name 
    return Array.isArray(raw) ? raw[0] :(raw || '') }) 
    // localStorage 保存キーのベース
    const STORAGE_KEY_BASE = 'recorded_by_name_'

    // recorded 状態（初期は false、onMounted で localStorage から復元）
    const recorded = ref(false)

    // 汎用のキー（名前が空の場合は fallback を使う）
    const storageKey = computed(() => {
    const n = name.value && String(name.value).trim()
    return n ? STORAGE_KEY_BASE + n : STORAGE_KEY_BASE + 'anonymous'
    })

    onMounted(() => {
    // ブラウザ環境でのみ localStorage を読む
    try {
        const raw = localStorage.getItem(storageKey.value)
        recorded.value = raw === '1'
    } catch (e) {
        // localStorage が使えない場合は何もしない
        recorded.value = false
    }
    })

    function toggleRecorded() {
    recorded.value = !recorded.value
    try {
        if (recorded.value) {
        localStorage.setItem(storageKey.value, '1')
        } else {
        localStorage.removeItem(storageKey.value)
        }
    } catch (e) {
        // 書き込み失敗時は無視（必要ならエラーハンドリング追加）
    }
    }
</script>