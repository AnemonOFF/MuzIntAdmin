import { GamePack } from "@/shared/types/gamePack";
import { GamePackEditor } from "@/widgets/gamePack";
import React from "react";

export interface GamePackPageProps {
  id: GamePack["id"];
}

const GamePackPage: React.FC<GamePackPageProps> = ({ id }) => {
  return <GamePackEditor id={id} />;
};

export default React.memo(GamePackPage);
