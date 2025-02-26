"use client";

import { useGameStore } from "@/entities/game";
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
      players.map((p) => {
        let points = 0;
        let extraPoints = 0;
        let time = 0;
        if (tourId) {
          const tour = p.playerTours.find((t) => t.tourId === tourId);
          points = tour?.points ?? 0;
          extraPoints = tour?.extraPoints ?? 0;
          time =
            tour?.answerTimeSpan
              .split(":")
              .map((v) => parseInt(v))
              .reduceRight((sum, v, i) => sum + v * 60 ** i, 0) ?? 0;
        } else {
          const validPlayerTours = p.playerTours.filter(
            (pt) => !notIntoResultTourIds.includes(pt.tourId)
          );
          points = validPlayerTours.reduce((sum, t) => sum + t.points, 0);
          extraPoints = validPlayerTours.reduce(
            (sum, t) => sum + t.extraPoints,
            0
          );
          time = validPlayerTours.reduce(
            (sum, t) =>
              sum +
              t.answerTimeSpan
                .split(":")
                .map((v) => parseInt(v))
                .reduceRight((sum, v, i) => sum + v * 60 ** i, 0),
            0
          );
        }
        return {
          id: p.id,
          name: p.name,
          playArea: p.playArea,
          points: points,
          extraPoints: extraPoints,
          totalPoints: points + extraPoints,
          time: time,
        };
      }),
    [players, tourId, notIntoResultTourIds]
  );

  return <ResultDataTable data={playersWithScore} />;
};

export default React.memo(ResultTable);
