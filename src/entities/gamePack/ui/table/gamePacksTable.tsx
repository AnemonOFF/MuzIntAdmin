"use client";

import React from "react";
import { useGamePacksQuery } from "../../hooks";
import GamePacksDataTable from "./gamePacksDataTable";
import Loader from "@/shared/ui/loader";

export interface GamePacksTableProps {}

const GamePacksTable: React.FC<GamePacksTableProps> = ({}) => {
  const { data, isLoading, isSuccess } = useGamePacksQuery();

  if (isLoading || !isSuccess) return <Loader text="Загрузка пакетов игр" />;

  return <GamePacksDataTable data={data} />;
};

export default React.memo(GamePacksTable);
