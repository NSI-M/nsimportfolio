
<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useAsyncData } from '#app'
const { data: member } = await useAsyncData('member', () => useAuth().fetchMember())
import { computed } from 'vue'; import { useRoute } from 'vue-router';
const route = useRoute()
const name = computed(() => { //query.nameはstring | 
const raw = route.query.name 
return Array.isArray(raw) ? raw[0] :(raw || '') }) 

</script>

<template>
  <slot v-if="member" />
  <div class="flexbox" v-else>
    <h2>ようこそ{{ name }}様</h2>
        <p>Japan Runway Show vol.3では、japanrunwayshow@gmail.comよりお送りしたQRコードを受付にて拝見いたします。<br>QRコードをスクリーンショットなどで保存し、当日お忘れなきようお持ちください。</p>
  </div>
</template>