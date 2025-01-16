"use client";

import { useGamePackQuery } from "@/entities/gamePack";
import { GamePack } from "@/shared/types/gamePack";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export interface GamePackNameProps {
  id: GamePack["id"];
  editing?: boolean;
}

const GamePackName: React.FC<GamePackNameProps> = ({ id, editing }) => {
  const { data: gamePack, isLoading, isSuccess } = useGamePackQuery(id);

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-28 rounded-md" />;

  return (
    <Input
      id={`gamepack_${id}_name`}
      type="text"
      value={gamePack.name}
      disabled={!editing}
    />
  );
};

export default React.memo(GamePackName);
