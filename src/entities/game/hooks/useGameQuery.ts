"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery } from "@tanstack/react-query";

const useGameQuery = (id: Game["id"]) => {
  return useQuery({
    queryKey: gameKey.detail(id),
    queryFn: async () => await gamesController.getGame(id),
  });
};

export default useGameQuery;
