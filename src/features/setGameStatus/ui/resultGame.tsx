import { useGameStatusMutation, useGameStore } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import React from "react";

export interface ResultGameProps {
  disabled: boolean;
}

const ResultGame: React.FC<ResultGameProps> = ({ disabled }) => {
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);

  const result = () => {
    mutate({
      gameId: gameId,
      status: GameStatus.Results,
    });
  };

  return (
    <Button onClick={result} disabled={disabled || isPending}>
      Показать результаты игры
    </Button>
  );
};

export default React.memo(ResultGame);
