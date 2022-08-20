<template>
  <button
    class="rounded p-1"
    :class="colorClass"
    type="button"
    @click.prevent="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ color: string }>(), { color: "blue" });

const emit = defineEmits<{ (e: "click"): void }>();

const colorClass = computed((): string[] => {
  switch (props.color) {
    case "gray":
      return ["bg-gray-500", "hover:bg-gray-700", "text-white"];
    default:
      return ["bg-blue-500", "hover:bg-blue-700", "text-white"];
  }
});
</script>
