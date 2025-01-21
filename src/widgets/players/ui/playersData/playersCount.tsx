"use client";

import { useGameStore } from "@/entities/game";
import React from "react";

export interface PlayersCountProps {}

const PlayersCount: React.FC<PlayersCountProps> = ({}) => {
  const players = useGameStore((state) => state.players);

  return <p>Всего игроков: {players.length}</p>;
};

export default React.memo(PlayersCount);
