import { WinnerPanel } from "@/entities/presentation";
import { PlayerWithScore } from "@/shared/types/player";
import React from "react";

export interface WinnerPrePanelProps {}

const WinnerPrePanel: React.FC<WinnerPrePanelProps> = ({}) => {
  const player: PlayerWithScore = {
    id: 5,
    name: "Евгений",
    playArea: "15",
    totalPoints: 91,
    extraPoints: 0,
    points: 0,
    time: new Date().getTime(),
  };
  return <WinnerPanel winner={player} />;
};

export default React.memo(WinnerPrePanel);
