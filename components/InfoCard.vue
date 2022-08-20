<template>
  <FloatCard class="fixed">
    <div class="flex gap-2 items-center">
      <NuxtLink
        to="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >
        <font-awesome-icon icon="fa-solid fa-circle-question" />
      </NuxtLink>
      <button type="button" @click.prevent="toggleInfo">
        <h1 class="inline mr-2">Conway's Game of Life</h1>
        <font-awesome-icon v-if="infoOpen" icon="fa-solid fa-chevron-up" />
        <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
      </button>
    </div>
    <div
      v-if="infoOpen"
      class="mt-2 border-dashed border-gray-400 border-t-2 pt-2 flex flex-col gap-1 items-start"
    >
      <p>
        <font-awesome-icon icon="fa-solid fa-arrow-pointer" />:
        <font-awesome-icon icon="fa-solid fa-pen" />
      </p>
      <p>
        <font-awesome-icon icon="fa-solid fa-circle-up" /> +
        <font-awesome-icon icon="fa-solid fa-arrow-pointer" />:
        <font-awesome-icon icon="fa-solid fa-eraser" />
      </p>
    </div>
  </FloatCard>
</template>

<script lang="ts" setup>
const infoOpen = ref(false);

const toggleInfo = () => {
  infoOpen.value = !infoOpen.value;
};
</script>
