"use client";

import { useGameStatusMutation, useGameStore } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import React from "react";

export interface TourResultProps {}

const TourResult: React.FC<TourResultProps> = ({}) => {
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);

  const endTour = () => {
    mutate({
      gameId: gameId,
      status: GameStatus.TourResults,
    });
  };

  return (
    <Button onClick={endTour} disabled={isPending}>
      Закончить тур
    </Button>
  );
};

export default React.memo(TourResult);
