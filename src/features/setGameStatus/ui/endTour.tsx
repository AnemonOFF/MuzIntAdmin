"use client";

import { useGameStatusMutation, useGameStore } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import React, { useState } from "react";

export interface EndTourProps {
  disabled: boolean;
}

const EndTour: React.FC<EndTourProps> = ({ disabled }) => {
  const currentTourId = useGameStore((state) => state.currentTourId);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);

  const endTour = () => {
    mutate({
      gameId: gameId,
      status: GameStatus.TourEnd,
    });
  };

  const verifyPlayers = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const players = useGameStore.getState().players;
    if (
      players.some(
        (p) =>
          !p.playerTours.find((t) => t.tourId === currentTourId)?.isAnswered
      )
    ) {
      setOpen(true);
      return;
    }
    endTour();
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button onClick={verifyPlayers} disabled={disabled || isPending}>
          Закрыть тур
        </Button>
      }
      title="Закрыть тур"
      content={
        <div className="space-y-5">
          <span>
            Не все игроки сохранили ответы, им будем засчитано 0 баллов, вы
            уверены?
          </span>
          <div className="flex items-center justify-between gap-2">
            <Button variant="outline" onClick={endTour} disabled={disabled}>
              Закрыть
            </Button>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
          </div>
        </div>
      }
    />
  );
};

export default React.memo(EndTour);
