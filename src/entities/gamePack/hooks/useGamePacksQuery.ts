"use client";

import { gamePacksController } from "@/shared/api/client";
import { gamePackKey } from "@/shared/lib/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";

const useGamePacksQuery = () => {
  return useQuery({
    queryKey: gamePackKey.simpleList(),
    queryFn: async () => await gamePacksController.getGamePacks(),
  });
};

export default useGamePacksQuery;
