
<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useAsyncData } from '#app'
const { data: member } = await useAsyncData('member', () => useAuth().fetchMember())
</script>

<template>
  <slot v-if="member" />
  <p v-else>この機能はログインが必要です。</p>
</template>
