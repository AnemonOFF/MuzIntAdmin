"use client";

import React from "react";
import { useGameStore } from "../model/gameStore";
import { statusLabels } from "../lib/statusHelpers";
import { GameStatus } from "@/shared/types/game";
import { useTourQuery } from "@/entities/tour";
import { Skeleton } from "@/shared/ui/skeleton";
import { useShallow } from "zustand/react/shallow";

export interface GameStateProps {}

const GameState: React.FC<GameStateProps> = ({}) => {
  const { status, currentTourId } = useGameStore(
    useShallow((state) => ({
      status: state.status,
      currentTourId: state.currentTourId,
    }))
  );
  const { data: tour, isSuccess: isTourLoaded } = useTourQuery(
    currentTourId!,
    !!currentTourId
  );

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <h2>Статус:</h2> <span>{statusLabels[status]}</span>
      </div>
      {status in [GameStatus.TourInProgress, GameStatus.TourResults] &&
      currentTourId ? (
        isTourLoaded ? (
          <p>{tour.name}</p>
        ) : (
          <Skeleton className="h-10 w-full" />
        )
      ) : null}
    </div>
  );
};

export default React.memo(GameState);
