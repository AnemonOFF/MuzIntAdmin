"use client";

import { useGameStore } from "@/entities/game";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import React from "react";
import NotReadyDataTable from "./notReadyDataTable";
import { IconEye } from "@tabler/icons-react";

export interface PlayersNotReadyProps {}

const PlayersNotReady: React.FC<PlayersNotReadyProps> = ({}) => {
  const currentTourId = useGameStore((state) => state.currentTourId);
  const players = useGameStore((state) => state.players);

  const notReadyPlayers =
    currentTourId === null
      ? []
      : players.filter(
          (p) =>
            !p.playerTours.find((t) => t.tourId === currentTourId)?.isAnswered
        );
  const notReadyCount = notReadyPlayers.length;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2">
          <IconEye />
          {notReadyCount === 0 ? "Все готовы" : `Не готово: ${notReadyCount}`}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Не готовые игроки</DialogTitle>
        </DialogHeader>
        <NotReadyDataTable data={notReadyPlayers} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(PlayersNotReady);
