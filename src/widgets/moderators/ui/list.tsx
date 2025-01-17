"use client";

import { Game } from "@/shared/types/game";
import React from "react";
import Loader from "@/shared/ui/loader";
import { useModeratorsQuery } from "@/entities/game";
import { AddModerator, DeleteModerator } from "@/features/moderators";

export interface GameModeratorsListProps {
  id: Game["id"];
}

const GameModeratorsList: React.FC<GameModeratorsListProps> = ({ id }) => {
  const { data, isSuccess } = useModeratorsQuery(id);

  if (!isSuccess) return <Loader text="Загрузка модераторов игры" />;

  return (
    <div className="border rounded-md p-2 space-y-2">
      {data.map((moderator) => (
        <div
          className="flex gap-2 justify-between items-center"
          key={`moderator_${moderator.id}`}
        >
          <span>{moderator.email}</span>
          <DeleteModerator gameId={id} moderatorId={moderator.id} />
        </div>
      ))}
      <AddModerator gameId={id} />
    </div>
  );
};

export default React.memo(GameModeratorsList);
