<template>
  <FloatCard class="fixed inline-flex flex-col p-0">
    <button
      type="button"
      class="w-8 rounded-t border-b border-black p-1 hover:bg-gray-200"
      @click.prevent="sizeChange(size + 1)"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <button
      type="button"
      class="w-8 rounded-b p-1 hover:bg-gray-200"
      @click.prevent="sizeChange(size - 1)"
    >
      <font-awesome-icon icon="fa-solid fa-minus" />
    </button>
  </FloatCard>
</template>

<script lang="ts" setup>
defineProps<{ size: number }>();

const emit = defineEmits<{ (e: "change", newSize: number): number }>();

const sizeChange = (newFactor: number) => {
  emit("change", Math.max(1, Math.min(newFactor, 5)));
};
</script>
