import { GameField } from "~~/types";

const useLifeGame = () => {
  const getNextGeneration = (field: GameField) => {
    const oldField: GameField = JSON.parse(JSON.stringify(field));
    return oldField.map((row, x) =>
      row.map((alive, y) => {
        let aliveCount = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            aliveCount += oldField[x + i]?.[y + j] ?? 0;
          }
        }
        return (alive && (aliveCount === 3 || aliveCount === 4)) ||
          (!alive && aliveCount === 3)
          ? 1
          : 0;
      })
    );
  };

  return {
    getNextGeneration,
  };
};

export default useLifeGame;
