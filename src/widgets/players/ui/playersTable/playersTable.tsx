import { useGameStore } from "@/entities/game";
import React from "react";
import PlayersDataTable from "./playersDataTable";

export interface PlayersTableProps {}

const PlayersTable: React.FC<PlayersTableProps> = ({}) => {
  const players = useGameStore((state) => state.players);

  return <PlayersDataTable data={players} />;
};

export default React.memo(PlayersTable);
