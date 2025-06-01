"use client";

import { gamePacksController } from "@/shared/api/client";
import { gamePackKey, presentationKey } from "@/shared/lib/queryKeyFactory";
import { GamePack } from "@/shared/types/gamePack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useGamePackPresentationQuery = (
  id: GamePack["id"],
  enabled?: boolean
) => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: gamePackKey.presentation(id),
    queryFn: async () => await gamePacksController.getGamePackPresentation(id),
    enabled: enabled,
  });

  useEffect(() => {
    if (!response.isSuccess || !response.data) return;
    queryClient.setQueryData(
      presentationKey.detail(response.data.id),
      response.data
    );
  }, [response.isSuccess, response.data, queryClient]);
  return response;
};

export default useGamePackPresentationQuery;
