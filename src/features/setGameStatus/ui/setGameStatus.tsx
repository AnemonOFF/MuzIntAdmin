"use client";

import { useGameStore } from "@/entities/game";
import { useShallow } from "zustand/react/shallow";
import { GameStatus } from "@/shared/types/game";
import React from "react";
import StartTour from "./startTour";
import ResultTour from "./resultTour";
import EndGame from "./endGame";

export interface SetGameStatusProps {}

const SetGameStatus: React.FC<SetGameStatusProps> = ({}) => {
  const { status } = useGameStore(
    useShallow((state) => ({
      status: state.status,
      gameId: state.id,
    }))
  );

  if (status === GameStatus.WaitForStart) return <StartTour />;
  if (status === GameStatus.TourInProgress) return <ResultTour />;
  if (status === GameStatus.TourResults)
    return (
      <div className="space-y-5">
        <StartTour />
        {/* <ResultGame /> */}
        <EndGame />
      </div>
    );
  if (status === GameStatus.Results) return <EndGame />;
  return null;
};

export default React.memo(SetGameStatus);
