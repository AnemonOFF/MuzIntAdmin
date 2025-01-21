"use client";

import { useGameStore } from "@/entities/game";
import { Tour } from "@/shared/types/gamePack";
import { PlayerWithPoints } from "@/shared/types/player";
import React from "react";
import ResultDataTable from "./resultDataTable";

export interface ResultTableProps {
  tourId?: Tour["id"];
}

const ResultTable: React.FC<ResultTableProps> = ({ tourId }) => {
  const players = useGameStore((state) => state.players);

  const playersWithPoints: PlayerWithPoints[] = players.map((p) => {
    let points = 0;
    let extraPoints = 0;
    if (tourId) {
      const tour = p.playerTours.find((t) => t.tourId === tourId);
      points = tour?.points ?? 0;
      extraPoints = tour?.extraPoints ?? 0;
    } else {
      points = p.playerTours.reduce((sum, t) => sum + t.points, 0);
      extraPoints = p.playerTours.reduce((sum, t) => sum + t.extraPoints, 0);
    }
    console.log(p, points, extraPoints);
    return {
      id: p.id,
      name: p.name,
      playArea: p.playArea,
      points: points,
      extraPoints: extraPoints,
    };
  });

  return <ResultDataTable data={playersWithPoints} />;
};

export default React.memo(ResultTable);
