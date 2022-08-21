<template>
  <div>
    <canvas
      id="lifeGameField"
      ref="fieldCanvas"
      @mousedown="drawStart"
      @mousemove="draw"
      @mouseup="drawEnd"
    />
    <InfoCard class="top-3 right-3" />
    <ZoomCard class="bottom-3 left-3" />
    <OperationCard class="bottom-3 right-3" />
  </div>
</template>

<script lang="ts" setup>
let isDraw = false;
const fieldCanvas = ref<HTMLCanvasElement>(null);

const lifeGameState = useLifeGameState();

onMounted(() => {
  const canvas = fieldCanvas.value;
  lifeGameState.initialize(canvas);
});

const drawStart = (e: MouseEvent) => {
  isDraw = true;
  drawPoint(e);
};

const draw = (e: MouseEvent) => {
  if (!isDraw) return;
  drawPoint(e);
};

const drawEnd = (e: MouseEvent) => {
  isDraw = false;
  drawPoint(e);
};

const drawPoint = (e: MouseEvent) => {
  lifeGameState.draw(e);
};
</script>

<style lang="scss" scoped>
#lifeGameField {
  border: solid;
}

.floatingContainer {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 0 10px;
}
</style>
