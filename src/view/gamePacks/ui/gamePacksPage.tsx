import { GamePacksTable } from "@/entities/gamePack";
import { CreateGamePack } from "@/features/gamePack";
import React from "react";

export interface GamePacksPageProps {}

const GamePacksPage: React.FC<GamePacksPageProps> = ({}) => {
  return (
    <div className="space-y-5">
      <CreateGamePack />
      <GamePacksTable />
    </div>
  );
};

export default React.memo(GamePacksPage);
