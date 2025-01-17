"use client";

import { useAuthQuery } from "@/entities/user";
import { DeleteGame, EditGameName } from "@/features/editGame";
import { haveFeatureAccess } from "@/shared/lib/roleHelpers";
import { Game } from "@/shared/types/game";
import { UserRoles } from "@/shared/types/user";
import { ModeratorsList } from "@/widgets/moderators";
import React from "react";

export interface GamePageProps {
  id: Game["id"];
}

const GamePage: React.FC<GamePageProps> = ({ id }) => {
  const { data: user, isSuccess } = useAuthQuery();

  return (
    <div className="space-y-5">
      <div className="flex gap-2 justify-between">
        <EditGameName id={id} />
        <DeleteGame id={id} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-5">
          {isSuccess &&
            haveFeatureAccess(
              "admin.games.moderators",
              user.roles as UserRoles[]
            ) && <ModeratorsList id={id} />}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default React.memo(GamePage);
