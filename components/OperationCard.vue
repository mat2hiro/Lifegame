<template>
  <FloatCard class="fixed inline-flex gap-2 items-center">
    <div>
      <label class="block text-center text-sm"
        ><font-awesome-icon icon="fa-solid fa-forward"
      /></label>
      <input type="range" min="0" max="4" step="1" v-model="speedIO" />
    </div>
    <RoundedButton v-if="isStart" class="w-8" @click="stop">
      <font-awesome-icon icon="fa-solid fa-pause" />
    </RoundedButton>
    <RoundedButton v-else class="w-8" @click="start">
      <font-awesome-icon icon="fa-solid fa-play" />
    </RoundedButton>
    <RoundedButton class="w-8" @click="next">
      <font-awesome-icon icon="fa-solid fa-forward-step" />
    </RoundedButton>
    <RoundedButton class="w-8" color="gray" @click="random">
      <font-awesome-icon icon="fa-solid fa-shuffle" />
    </RoundedButton>
    <RoundedButton class="w-8" color="gray" @click="clear">
      <font-awesome-icon icon="fa-solid fa-trash-can" />
    </RoundedButton>
  </FloatCard>
</template>

<script lang="ts" setup>
const props = defineProps<{ speed: number; isStart: boolean }>();

const emit = defineEmits<{
  (e: "update:speed", newSpeed: number): number;
  (e: "stop"): void;
  (e: "start"): void;
  (e: "next"): void;
  (e: "random"): void;
  (e: "clear"): void;
}>();

const speedList = [1000, 500, 100, 50, 10];
const speedIO = computed({
  get: () =>
    Math.max(
      speedList.findIndex((sp) => sp === props.speed),
      0
    ),
  set: (newSpeed: number) => emit("update:speed", speedList[newSpeed]),
});

const stop = () => emit("stop");
const start = () => emit("start");
const next = () => emit("next");
const random = () => emit("random");
const clear = () => emit("clear");
</script>
