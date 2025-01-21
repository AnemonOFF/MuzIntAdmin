"use client";

import { useGameStore } from "@/entities/game";
import { Player } from "@/shared/types/player";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

export interface PlayerStatusProps {
  player: Player;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ player }) => {
  const currentTourId = useGameStore((state) => state.currentTourId);
  const playerTour = player.playerTours.find((t) => t.tourId === currentTourId);

  if (playerTour?.isAnswered) {
    return <IconCheck color="green" />;
  }

  return <IconX color="red" />;
};

export default React.memo(PlayerStatus);
