"use client";

import { GameState, useGameInitStore } from "@/entities/game";
import { SetGameStatus } from "@/features/setGameStatus";
import { haveFeatureAccess } from "@/shared/lib/roleHelpers";
import { Game } from "@/shared/types/game";
import { User, UserRoles } from "@/shared/types/user";
import { ModeratorsList } from "@/widgets/moderators";
import { PlayersTable } from "@/widgets/players";
import React from "react";

export interface RealTimeContentProps {
  gameId: Game["id"];
  user: User;
}

const GamePageContent: React.FC<RealTimeContentProps> = ({ user, gameId }) => {
  useGameInitStore(gameId);

  return (
    <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 max-lg:grid-rows-2">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-center">Модераторы</p>
          {haveFeatureAccess(
            "admin.games.moderators",
            user.roles as UserRoles[]
          ) && <ModeratorsList id={gameId} />}
        </div>
        <div className="space-y-2">
          <p className="text-center">Игроки</p>
          <PlayersTable />
        </div>
      </div>
      <div className="max-lg:order-1 space-y-5">
        <GameState />
        <SetGameStatus />
      </div>
    </div>
  );
};

export default React.memo(GamePageContent);
