"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { Tour } from "@/shared/types/tour";
import { useQuery } from "@tanstack/react-query";

const useTopPlayersQuery = (
  gameId: Game["id"],
  top: number,
  tourId?: Tour["id"],
  enabled?: boolean,
  staleTime?: number
) => {
  return useQuery({
    queryKey: gameKey.top(gameId, top, tourId),
    queryFn: async () =>
      await gamesController.getTopPlayers(gameId, top, tourId),
    enabled,
    staleTime: staleTime,
  });
};

export default useTopPlayersQuery;
