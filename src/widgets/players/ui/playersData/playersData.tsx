"use client";

import React from "react";
import PlayersCount from "./playersCount";
import PlayersNotReady from "./playersNotReady";
import PlayersResult from "./playersResult";

export interface PlayersDataProps {}

const PlayersData: React.FC<PlayersDataProps> = ({}) => {
  return (
    <div className="space-y-5">
      <PlayersCount />
      <PlayersNotReady />
      <PlayersResult />
    </div>
  );
};

export default React.memo(PlayersData);
