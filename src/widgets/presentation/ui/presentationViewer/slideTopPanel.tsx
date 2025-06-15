"use client";

import { calculatePlayerScore, useTopPlayersQuery } from "@/entities/game";
import { Game } from "@/shared/types/game";
import { Tour } from "@/shared/types/tour";
import React, { useMemo } from "react";
import { mockTop } from "../../constants/mock";
import { PlayerWithScore } from "@/shared/types/player";
import { LoadingPanel, TopPlayersPanel } from "@/entities/presentation";

export interface SlideTopPanelProps {
  top: number;
  tourId?: Tour["id"];
  notIntoResultTourIds: Tour["id"][];
  gameId?: Game["id"];
}

const SlideTopPanel: React.FC<SlideTopPanelProps> = ({
  notIntoResultTourIds,
  gameId,
  top,
  tourId,
}) => {
  const { data: gameTopPlayers } = useTopPlayersQuery(
    gameId!,
    top,
    tourId,
    !!gameId,
    2000
  );
  const topPlayers = gameId ? gameTopPlayers : mockTop(top);

  const topWithScore: PlayerWithScore[] | undefined = useMemo(
    () =>
      topPlayers?.map((p) =>
        calculatePlayerScore(p, notIntoResultTourIds, tourId)
      ),
    [topPlayers, notIntoResultTourIds, tourId]
  );
  console.log(topPlayers, topWithScore);

  if (!topWithScore) return <LoadingPanel />;

  return <TopPlayersPanel players={topWithScore} show={top} />;
};

export default React.memo(SlideTopPanel);
