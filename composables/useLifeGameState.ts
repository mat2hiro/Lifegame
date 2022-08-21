import { GameField } from "~~/types";
import useCanvasState from "./lifeGameState/canvas";
import useLifeGame from "./lifeGameState/lifeGame";

export type LifeGameState = {
  field: GameField;
};

const useLigeGameState = () => {
  const state = useState<LifeGameState>("lifeGameState", () => ({
    field: [],
  }));
  const canvasState = useCanvasState(state);
  const lifeGame = useLifeGame();

  const initialize = (canvas: HTMLCanvasElement) => {
    state.value.field = canvasState.initializeField(canvas);
    canvasState.resizeField(1);
  };

  const updateField = (
    newField: ((x: number, y: number) => 0 | 1) | GameField
  ) => {
    const field =
      typeof newField === "function"
        ? state.value.field.map((row, x) => row.map((_, y) => newField(x, y)))
        : newField;
    canvasState.fillAllCell(field);
    state.value.field = field;
  };

  const updateCell = (x: number, y: number, alive: 0 | 1) => {
    canvasState.fillCell(x, y, alive);
    state.value.field[x][y] = alive;
  };

  const next = () => {
    updateField(lifeGame.getNextGeneration(state.value.field));
  };

  const resize = (diff: number) => {
    const size = canvasState.state.value.size + diff;
    canvasState.resizeField(Math.max(1, Math.min(size, 5)));
  };

  const draw = (e: MouseEvent) => {
    const { x, y } = canvasState.getDrawPosition(e);
    updateCell(x, y, e.shiftKey ? 0 : 1);
  };

  return {
    state: readonly(state),
    initialize,
    updateField,
    updateCell,
    next,
    resize,
    draw,
  };
};

export default useLigeGameState;
