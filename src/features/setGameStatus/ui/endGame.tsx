"use client";

import { useGameStatusMutation, useGameStore } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import ConfirmModal from "@/shared/ui/confirmModal";
import React from "react";

export interface EndGameProps {
  disabled: boolean;
}

const EndGame: React.FC<EndGameProps> = ({ disabled }) => {
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);

  const endResult = () => {
    if (disabled) return;
    mutate({
      gameId: gameId,
      status: GameStatus.Ended,
    });
  };

  return (
    <ConfirmModal
      text="Вы уверены что хотите завершить игру?"
      trigger={<Button disabled={disabled || isPending}>Завершить игру</Button>}
      onConfirm={endResult}
    />
  );
};

export default React.memo(EndGame);
