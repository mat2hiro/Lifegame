<template>
  <FloatCard class="fixed inline-flex items-end gap-4">
    <div v-if="open" clas="mr-2">
      <div class="mb-2">
        <label class="block text-center text-sm"
          ><font-awesome-icon icon="fa-solid fa-forward"
        /></label>
        <input
          class="w-full"
          type="range"
          min="0"
          max="4"
          step="1"
          v-model="speedIO"
        />
      </div>
      <div class="flex gap-2 items-center">
        <RoundedButton v-if="!!timeoutId" class="w-8" @click="stop">
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
      </div>
    </div>
    <button type="button" class="w-6" @click="toggleOpen">
      <font-awesome-icon v-if="open" icon="fa-solid fa-angles-right" />
      <font-awesome-icon v-else icon="fa-solid fa-angles-left" />
    </button>
  </FloatCard>
</template>

<script lang="ts" setup>
const lifeGameState = useLifeGameState();
const speed = ref(100);
const open = ref(true);
const timeoutId = ref<NodeJS.Timeout>(null);

const speedList = [1000, 500, 100, 50, 10];
const speedIO = computed({
  get: () =>
    Math.max(
      speedList.findIndex((sp) => sp === speed.value),
      0
    ),
  set: (newSpeed: number) => (speed.value = speedList[newSpeed]),
});

const stop = () => {
  if (!timeoutId.value) return;
  clearTimeout(timeoutId.value);
  timeoutId.value = null;
};

const generationLoop = () => {
  lifeGameState.next();
  timeoutId.value = setTimeout(generationLoop, speed.value);
};
const start = generationLoop;

const next = lifeGameState.next;

const random = () => {
  lifeGameState.updateField(() => (Math.random() < 0.2 ? 1 : 0));
};

const clear = () => {
  lifeGameState.updateField(() => 0);
};

const toggleOpen = () => {
  open.value = !open.value;
};
</script>
