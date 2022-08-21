<template>
  <img :src="src" class="w-4 block" />
</template>

<script lang="ts" setup>
defineProps<{ src: string }>();
</script>
