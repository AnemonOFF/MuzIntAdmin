import { TopPlayersPanel } from "@/entities/presentation";
import { PlayerWithScore } from "@/shared/types/player";
import React from "react";

export interface TopPlayersPrePanelProps {}

const TopPlayersPrePanel: React.FC<TopPlayersPrePanelProps> = ({}) => {
  const players: PlayerWithScore[] = [
    {
      id: 1,
      name: "Дмитрий",
      playArea: "4",
      totalPoints: 51,
      extraPoints: 0,
      points: 0,
      time: new Date().getTime(),
    },
    {
      id: 2,
      name: "Антон",
      playArea: "7",
      totalPoints: 71,
      extraPoints: 0,
      points: 0,
      time: new Date().getTime(),
    },
    {
      id: 3,
      name: "Александр",
      playArea: "9",
      totalPoints: 22,
      extraPoints: 0,
      points: 0,
      time: new Date().getTime(),
    },
    {
      id: 4,
      name: "Владимир",
      playArea: "2",
      totalPoints: 37,
      extraPoints: 0,
      points: 0,
      time: new Date().getTime(),
    },
    {
      id: 5,
      name: "Евгений",
      playArea: "15",
      totalPoints: 91,
      extraPoints: 0,
      points: 0,
      time: new Date().getTime(),
    },
  ];

  return <TopPlayersPanel show={3} players={players} />;
};

export default React.memo(TopPlayersPrePanel);
