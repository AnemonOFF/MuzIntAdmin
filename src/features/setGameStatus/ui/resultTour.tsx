"use client";

import { useGameStatusMutation, useGameStore } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import React from "react";

export interface TourResultProps {
  disabled: boolean;
}

const TourResult: React.FC<TourResultProps> = ({ disabled }) => {
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);

  const setStatus = () => {
    mutate({
      gameId: gameId,
      status: GameStatus.TourResults,
    });
  };

  return (
    <Button onClick={setStatus} disabled={disabled || isPending}>
      Показать результаты
    </Button>
  );
};

export default React.memo(TourResult);
