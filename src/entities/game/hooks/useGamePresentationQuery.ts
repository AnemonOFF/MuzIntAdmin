"use client";

import { gamesController } from "@/shared/api/client";
import {
  gameKey,
  gamePackKey,
  presentationKey,
} from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useGamePresentationQuery = (gameId: Game["id"], enabled?: boolean) => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: gameKey.presentation(gameId),
    queryFn: async () => await gamesController.getGamePresentation(gameId),
    enabled: enabled,
  });

  useEffect(() => {
    if (!response.isSuccess) return;
    queryClient.setQueryData(
      presentationKey.detail(response.data.id),
      response.data
    );
    queryClient.setQueryData(
      gamePackKey.presentation(response.data.gamePackId),
      response.data
    );
  }, [response.isSuccess, response.data, queryClient]);

  return response;
};

export default useGamePresentationQuery;
