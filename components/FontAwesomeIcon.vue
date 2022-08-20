<template>
  <span>
    <fa-icon :icon="icon" />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: String,
});
</script>
