import { Ref } from "nuxt/dist/app/compat/capi";
import { LifeGameState } from "../useLifeGameState";

const useLifeGame = (rootState: Readonly<Ref<LifeGameState>>) => {
  const getNextGeneration = () => {
    const { field } = rootState.value;
    return field.map((row, x) =>
      row.map((alive, y) => {
        const aliveCount = Array.from({ length: 3 }, (_, a) => x - 1 + a)
          .flatMap((aroundX) =>
            aroundX >= 0 && aroundX < field.length
              ? Array.from({ length: 3 }, (_, b) => {
                  const aroundY = y - 1 + b;
                  return aroundY >= 0 && aroundY < field[aroundX].length
                    ? field[aroundX][aroundY]
                    : 0;
                })
              : [0]
          )
          .reduce((pre, curr) => curr + pre, 0);
        return (alive && (aliveCount === 3 || aliveCount === 4)) ||
          (!alive && aliveCount === 3)
          ? 1
          : 0;
      })
    );
    // const alive = field[x][y];
    // const aliveCount = Array.from({ length: 3 }, (_, a) => x - 1 + a)
    //   .flatMap((aroundX) =>
    //     aroundX >= 0 && aroundX < field.length
    //       ? Array.from({ length: 3 }, (_, b) => {
    //           const aroundY = y - 1 + b;
    //           return aroundY >= 0 && aroundY < field[aroundX].length
    //             ? field[aroundX][aroundY]
    //             : 0;
    //         })
    //       : [0]
    //   )
    //   .reduce((pre, curr) => curr + pre, 0);
    // return (alive && (aliveCount === 3 || aliveCount === 4)) ||
    //   (!alive && aliveCount === 3)
    //   ? 1
    //   : 0;
  };

  return {
    getNextGeneration,
  };
};

export default useLifeGame;
