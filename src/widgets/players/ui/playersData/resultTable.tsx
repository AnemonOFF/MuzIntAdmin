"use client";

import { calculatePlayerScore, useGameStore } from "@/entities/game";
import { Tour } from "@/shared/types/tour";
import { PlayerWithScore } from "@/shared/types/player";
import React, { useMemo } from "react";
import ResultDataTable from "./resultDataTable";

export interface ResultTableProps {
  tourId?: Tour["id"];
  notIntoResultTourIds: Tour["id"][];
}

const ResultTable: React.FC<ResultTableProps> = ({
  tourId,
  notIntoResultTourIds,
}) => {
  const players = useGameStore((state) => state.players);

  const playersWithScore: PlayerWithScore[] = useMemo(
    () =>
      players.map((p) => calculatePlayerScore(p, notIntoResultTourIds, tourId)),
    [players, tourId, notIntoResultTourIds]
  );

  return <ResultDataTable data={playersWithScore} />;
};

export default React.memo(ResultTable);
