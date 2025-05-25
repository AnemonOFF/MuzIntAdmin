"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery } from "@tanstack/react-query";

const useGamePresentationStateQuery = (
  gameId: Game["id"],
  enabled?: boolean
) => {
  return useQuery({
    queryKey: gameKey.presentationState(gameId),
    queryFn: async () => await gamesController.getGamePresentationState(gameId),
    enabled: enabled,
  });
};

export default useGamePresentationStateQuery;
