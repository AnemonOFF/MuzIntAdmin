"use client";

import { useAuthQuery } from "@/entities/user";
import { DeleteGame, EditGameName } from "@/features/editGame";
import { haveFeatureAccess } from "@/shared/lib/roleHelpers";
import { Game } from "@/shared/types/game";
import { UserRoles } from "@/shared/types/user";
import { ModeratorsList } from "@/widgets/moderators";
import { useRouter } from "next/navigation";
import React from "react";

export interface GamePageProps {
  id: Game["id"];
}

const GamePage: React.FC<GamePageProps> = ({ id }) => {
  const router = useRouter();
  const { data: user, isSuccess } = useAuthQuery();

  return (
    <div className="space-y-5">
      <div className="flex gap-2 justify-between">
        <EditGameName id={id} />
        {isSuccess &&
          haveFeatureAccess(
            "admin.games.delete",
            user.roles as UserRoles[]
          ) && <DeleteGame id={id} onDelete={() => router.push("/games")} />}
      </div>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 max-lg:grid-rows-2">
        <div className="space-y-5">
          {isSuccess &&
            haveFeatureAccess(
              "admin.games.moderators",
              user.roles as UserRoles[]
            ) && <ModeratorsList id={id} />}
        </div>
        <div className="max-lg:order-1"></div>
      </div>
    </div>
  );
};

export default React.memo(GamePage);
