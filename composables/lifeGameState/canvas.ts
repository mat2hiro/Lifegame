import { Ref } from "nuxt/dist/app/compat/capi";
import { GameField } from "~~/types";
import { LifeGameState } from "../useLifeGameState";

type CanvasState = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  size: number;
};

const useCanvasState = (rootState: Readonly<Ref<LifeGameState>>) => {
  const state = useState<CanvasState>("canvasState", () => ({
    canvas: null,
    context: null,
    size: 1,
  }));
  const size = computed(() => state.value.size * 8);

  const fillCell = (
    x: number,
    y: number,
    alive: 0 | 1,
    force: boolean = false
  ) => {
    const { field } = rootState.value;
    if (!force && field[x][y] === alive) return;
    const { context } = state.value;
    const sizeVal = size.value;
    context.fillStyle = alive ? "#98971a" : "#282828";
    context.fillRect(
      x * sizeVal + 1,
      y * sizeVal + 1,
      sizeVal - 1,
      sizeVal - 1
    );
  };

  const fillAllCell = (
    newField: GameField,
    options: { force: boolean } = { force: false }
  ) => {
    newField.forEach((rows, x) =>
      rows.forEach((alive, y) => {
        fillCell(x, y, alive, options.force);
      })
    );
  };

  const fillField = () => {
    const { context, canvas } = state.value;
    context.fillStyle = "#504945";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const resizeField = (newSize: number) => {
    state.value.size = newSize;
    state.value.canvas.width = window.innerWidth * newSize;
    state.value.canvas.height = window.innerHeight * newSize;
    fillField();
    fillAllCell(rootState.value.field, { force: true });
  };

  const initializeField = (canvas: HTMLCanvasElement) => {
    state.value.canvas = canvas;
    state.value.context = canvas.getContext("2d");
    const { size } = state.value;
    return Array.from({ length: Math.ceil(canvas.width / size) }, () =>
      Array.from({ length: Math.ceil(canvas.height / size) }, (): 0 => 0)
    );
  };

  const getDrawPosition = (e: MouseEvent) => {
    const { canvas, size } = state.value;
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / size / 8),
      y: Math.floor((e.clientY - rect.top) / size / 8),
    };
  };

  return {
    state,
    fillCell,
    fillAllCell,
    fillField,
    resizeField,
    initializeField,
    getDrawPosition,
  };
};

export default useCanvasState;
