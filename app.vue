<template>
  <div>
    <canvas
      id="lifeGameField"
      ref="fieldCanvas"
      @mousedown="drawStart"
      @mousemove="draw"
      @mouseup="drawEnd"
    />
    <div class="fixed top-3 right-3">
      <div class="drop-shadow-md rounded p-2 bg-white">
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
      </div>
    </div>
    <div class="fixed bottom-3 left-3">
      <div class="inline-flex flex-col rounded border border-black bg-white">
        <button
          type="button"
          class="w-8 rounded-t border-b border-black p-1 bg-white hover:bg-gray-200"
          @click.prevent="sizeChange(sizeFactor + 1)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
        <button
          type="button"
          class="w-8 rounded-b p-1 bg-white hover:bg-gray-200"
          @click.prevent="sizeChange(sizeFactor - 1)"
        >
          <font-awesome-icon icon="fa-solid fa-minus" />
        </button>
      </div>
    </div>
    <div class="fixed bottom-3 right-3 flex flex-col items-end">
      <div
        class="drop-shadow-md rounded p-2 bg-white inline-flex gap-2 items-center"
      >
        <div>
          <label class="block text-center text-sm"
            ><font-awesome-icon icon="fa-solid fa-forward"
          /></label>
          <input type="range" min="0" max="4" step="1" v-model="speed" />
        </div>
        <button
          v-if="timeoutId !== null"
          class="w-8 rounded bg-blue-500 hover:bg-blue-700 text-white p-1"
          type="button"
          @click.prevent="stop"
        >
          <font-awesome-icon icon="fa-solid fa-pause" />
        </button>
        <button
          v-else
          class="w-8 rounded bg-blue-500 hover:bg-blue-700 text-white p-1"
          type="button"
          @click.prevent="start"
        >
          <font-awesome-icon icon="fa-solid fa-play" />
        </button>
        <button
          class="w-8 rounded bg-blue-500 hover:bg-blue-700 text-white p-1"
          type="button"
          @click.prevent="nextGeneration"
        >
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </button>
        <button
          class="w-8 rounded bg-gray-500 hover:bg-gray-700 text-white p-1"
          type="button"
          @click.prevent="randomize"
        >
          <font-awesome-icon icon="fa-solid fa-shuffle" />
        </button>
        <button
          class="w-8 rounded bg-gray-500 hover:bg-gray-700 text-white p-1"
          type="button"
          @click.prevent="clear"
        >
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const timeoutId = ref<NodeJS.Timeout>(null);
const speed = ref(2);
const sizeFactor = ref(1);
const infoOpen = ref(false);
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
  sizeFactor.value = Math.max(1, Math.min(newFactor, 5));
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
  timeoutId.value = setTimeout(
    generationLoop,
    [1000, 500, 100, 50, 10][speed.value]
  );
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

const toggleInfo = () => {
  infoOpen.value = !infoOpen.value;
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
