<script setup lang="ts">
const handleLoginClick = () => {
  navigateTo('/')
}
</script>

<template>
  <h1>ログイン</h1>
  <button type="button" @click="handleLoginClick()">ログイン</button>
</template>