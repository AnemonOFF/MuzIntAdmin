"use client";

import { useAuthQuery } from "@/entities/user";
import { DeleteGame, EditGameName } from "@/features/editGame";
import { SignalRModeratorProvider } from "@/shared/api/client/signalR";
import { haveFeatureAccess } from "@/shared/lib/roleHelpers";
import { Game } from "@/shared/types/game";
import { UserRoles } from "@/shared/types/user";
import { useRouter } from "next/navigation";
import React from "react";
import GamePageContent from "./gamePageContent";
import Loader from "@/shared/ui/loader";
import { useGameStore } from "@/entities/game";

export interface GamePageProps {
  id: Game["id"];
}

const GamePage: React.FC<GamePageProps> = ({ id }) => {
  const router = useRouter();
  const setConnection = useGameStore((state) => state.setConnection);
  const { data: user, isSuccess } = useAuthQuery();

  return (
    <SignalRModeratorProvider gameId={id} setConnection={setConnection}>
      <div className="space-y-5">
        <div className="flex gap-2 justify-between">
          <EditGameName id={id} />
          {isSuccess &&
            haveFeatureAccess(
              "admin.games.delete",
              user.roles as UserRoles[]
            ) && <DeleteGame id={id} onDelete={() => router.push("/games")} />}
        </div>
        {isSuccess ? (
          <GamePageContent gameId={id} user={user} />
        ) : (
          <Loader text="Загрузка..." />
        )}
      </div>
    </SignalRModeratorProvider>
  );
};

export default React.memo(GamePage);
