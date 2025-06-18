<template>
  
    <!--
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    -->
  <NuxtPage />

  
</template>
<script setup>
  import { useHead } from '#imports';
  import { onMounted, ref } from 'vue';

  const isDarkMode = ref(false);

  onMounted(() => {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;

    useHead({
      link: [
        {
          rel: 'icon',
          href: isDarkMode.value ? '/faviconl.ico' : '/faviconb.ico'
        }
      ],
      bodyAttrs: {
        class: 'kielbody',
        tagDuplicateStrategy: 'replace'
      }
    });

  });
</script>