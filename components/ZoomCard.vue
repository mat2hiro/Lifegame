<template>
  <FloatCard class="fixed inline-flex flex-col p-0">
    <button
      type="button"
      class="w-8 rounded-t border-b border-black p-1 hover:bg-gray-200"
      @click.prevent="sizeChange(+1)"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <button
      type="button"
      class="w-8 rounded-b p-1 hover:bg-gray-200"
      @click.prevent="sizeChange(-1)"
    >
      <font-awesome-icon icon="fa-solid fa-minus" />
    </button>
  </FloatCard>
</template>

<script lang="ts" setup>
const lifeGameState = useLifeGameState();

const sizeChange = (newFactor: number) => {
  lifeGameState.resize(newFactor);
};
</script>
