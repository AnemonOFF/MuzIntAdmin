"use client";

import { useGameQuery } from "@/entities/game";
import { cn } from "@/shared/lib/utils";
import { Game } from "@/shared/types/game";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export interface EditGameNameProps {
  id: Game["id"];
  editing?: boolean;
}

const EditGameName: React.FC<EditGameNameProps> = ({ id, editing }) => {
  const { data: game, isSuccess } = useGameQuery(id);

  if (!isSuccess) return <Skeleton className="h-10 w-full rounded-md" />;

  return (
    <Input
      type="text"
      value={game.name}
      className={cn("border-none", {
        "text-foreground !cursor-text": !editing,
      })}
      disabled={!editing}
    />
  );
};

export default React.memo(EditGameName);
