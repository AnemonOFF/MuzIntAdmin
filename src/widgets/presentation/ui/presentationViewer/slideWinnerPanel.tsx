"use client";

import { calculatePlayerScore, useTopPlayersQuery } from "@/entities/game";
import { LoadingPanel, WinnerPanel } from "@/entities/presentation";
import { Game } from "@/shared/types/game";
import React, { useMemo } from "react";
import { mockWinner } from "../../constants/mock";
import { PlayerWithScore } from "@/shared/types/player";
import { Tour } from "@/shared/types/tour";

export interface SlideWinnerPanelProps {
  notIntoResultTourIds: Tour["id"][];
  gameId?: Game["id"];
}

const SlideWinnerPanel: React.FC<SlideWinnerPanelProps> = ({
  notIntoResultTourIds,
  gameId,
}) => {
  const { data: gameTop1Players, isSuccess: isGameTopLoaded } =
    useTopPlayersQuery(gameId!, 1, undefined, !!gameId, 2000);
  const winnerPlayer = gameId
    ? isGameTopLoaded
      ? gameTop1Players[0]
      : undefined
    : mockWinner;

  const winnerWithScore: PlayerWithScore | undefined = useMemo(
    () =>
      winnerPlayer
        ? calculatePlayerScore(winnerPlayer, notIntoResultTourIds, undefined)
        : undefined,
    [winnerPlayer, notIntoResultTourIds]
  );

  if (!winnerWithScore) return <LoadingPanel />;

  return <WinnerPanel winner={winnerWithScore} />;
};

export default React.memo(SlideWinnerPanel);
