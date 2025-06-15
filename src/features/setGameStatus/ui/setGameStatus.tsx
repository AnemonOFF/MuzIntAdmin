"use client";

import { useGameStore } from "@/entities/game";
import { useShallow } from "zustand/react/shallow";
import { GameStatus } from "@/shared/types/game";
import React from "react";
import StartTour from "./startTour";
import ResultTour from "./resultTour";
import EndGame from "./endGame";
import EndTour from "./endTour";

export interface SetGameStatusProps {}

const SetGameStatus: React.FC<SetGameStatusProps> = ({}) => {
  const { status, presentationMode } = useGameStore(
    useShallow((state) => ({
      status: state.status,
      presentationMode: state.presentationMode,
      gameId: state.id,
    }))
  );

  if (status === GameStatus.WaitForStart)
    return <StartTour disabled={presentationMode} />;
  if (status === GameStatus.TourInProgress)
    return <EndTour disabled={presentationMode} />;
  if (status === GameStatus.TourEnd)
    return <ResultTour disabled={presentationMode} />;
  if (status === GameStatus.TourResults)
    return (
      <div className="space-y-5">
        <StartTour disabled={presentationMode} />
        {/* <ResultGame disabled={presentationMode} /> */}
        <EndGame disabled={presentationMode} />
      </div>
    );
  if (status === GameStatus.Results)
    return <EndGame disabled={presentationMode} />;
  return null;
};

export default React.memo(SetGameStatus);
