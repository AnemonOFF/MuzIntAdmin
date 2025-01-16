"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";

const useGamesQuery = (page: number, onlyApproved: boolean) => {
  return useQuery({
    queryKey: gameKey.page(page, onlyApproved),
    queryFn: async () => gamesController.getGames(page, onlyApproved),
  });
};

export default useGamesQuery;
