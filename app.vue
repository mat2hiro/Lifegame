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
    <ZoomCard class="bottom-3 left-3" :size="sizeFactor" @change="sizeChange" />
    <OperationCard
      class="bottom-3 right-3"
      v-model:speed="speed"
      :isStart="!!timeoutId"
      @stop="stop"
      @start="start"
      @next="nextGeneration"
      @random="randomize"
      @clear="clear"
    />
  </div>
</template>

<script lang="ts" setup>
const timeoutId = ref<NodeJS.Timeout>(null);
const speed = ref(100);
const sizeFactor = ref(1);
const cellSize = computed(() => 8 * sizeFactor.value);
let isDraw = false;
let cellState: (0 | 1)[][] = [];
const fieldCanvas = ref<HTMLCanvasElement>(null);
const canvasContext = ref<CanvasRenderingContext2D>(null);

onMounted(() => {
  const c = sizeFactor.value;
  const canvas = fieldCanvas.value;
  const size = cellSize.value;
  canvas.width = window.innerWidth * c;
  canvas.height = window.innerHeight * c;
  initField(
    Array.from({ length: Math.ceil(canvas.width / size) }, () =>
      Array.from({ length: Math.ceil(canvas.height / size) }, () => 0)
    )
  );
});

const start = () => {
  generationLoop();
};

const stop = () => {
  if (!timeoutId.value) return;
  clearTimeout(timeoutId.value);
  timeoutId.value = null;
};

const initField = (initialState: (0 | 1)[][]) => {
  const canvas = fieldCanvas.value;
  canvasContext.value = canvas.getContext("2d");
  const context = canvasContext.value;
  context.fillStyle = "#504945";
  context.fillRect(0, 0, canvas.width, canvas.height);
  refreshCells(initialState);
};

const refreshCells = (state: (0 | 1)[][]) => {
  if (!canvasContext.value) return;
  const context = canvasContext.value;
  const size = cellSize.value;
  state.forEach((rows, x) =>
    rows.forEach((alive, y) => {
      context.fillStyle = alive ? "#98971a" : "#282828";
      context.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
    })
  );
  cellState = state;
};

const updateCell = (x: number, y: number, alive: 0 | 1) => {
  if (cellState[x][y] === alive) return;
  const context = canvasContext.value;
  const size = cellSize.value;
  context.fillStyle = alive ? "#98971a" : "#282828";
  context.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
  cellState[x][y] = alive;
};

const sizeChange = (newFactor: number) => {
  sizeFactor.value = newFactor;
  const c = sizeFactor.value;
  const canvas = fieldCanvas.value;
  canvas.width = window.innerWidth * c;
  canvas.height = window.innerHeight * c;
  initField(cellState);
};

const drawStart = (e: MouseEvent) => {
  if (!canvasContext.value) return;
  isDraw = true;
  drawPoint(e);
};

const draw = (e: MouseEvent) => {
  if (!canvasContext.value) return;
  if (!isDraw) return;
  drawPoint(e);
};

const drawEnd = (e: MouseEvent) => {
  if (!canvasContext.value) return;
  isDraw = false;
  drawPoint(e);
};

const drawPoint = (e: MouseEvent) => {
  const rect = fieldCanvas.value.getBoundingClientRect();
  const size = cellSize.value;
  updateCell(
    Math.floor((e.clientX - rect.left) / size),
    Math.floor((e.clientY - rect.top) / size),
    e.shiftKey ? 0 : 1
  );
};

const generationLoop = () => {
  nextGeneration();
  timeoutId.value = setTimeout(generationLoop, speed.value);
};

const nextGeneration = () => {
  const nextState: (0 | 1)[][] = JSON.parse(JSON.stringify(cellState));
  cellState.forEach((row, x) =>
    row.forEach((alive, y) => {
      const aliveCount = Array.from({ length: 3 }, (_, a) => x - 1 + a)
        .flatMap((aroundX) =>
          aroundX >= 0 && aroundX < cellState.length
            ? Array.from({ length: 3 }, (_, b) => {
                const aroundY = y - 1 + b;
                return aroundY >= 0 && aroundY < cellState[aroundX].length
                  ? cellState[aroundX][aroundY]
                  : 0;
              })
            : [0]
        )
        .reduce((pre, curr) => curr + pre, 0);
      nextState[x][y] =
        (alive && (aliveCount === 3 || aliveCount === 4)) ||
        (!alive && aliveCount === 3)
          ? 1
          : 0;
    })
  );
  refreshCells(nextState);
};

const randomize = () => {
  cellState.forEach((row, x) =>
    row.forEach((_, y) => {
      cellState[x][y] = Math.random() < 0.2 ? 1 : 0;
    })
  );
  refreshCells(cellState);
};

const clear = () => {
  cellState.forEach((row, x) =>
    row.forEach((_, y) => {
      cellState[x][y] = 0;
    })
  );
  refreshCells(cellState);
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
