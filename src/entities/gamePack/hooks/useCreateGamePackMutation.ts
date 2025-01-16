"use client";

import { gamePacksController } from "@/shared/api/client";
import { gamePackKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGamePackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamePacksController.createGamePack,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: gamePackKey.simpleList() });
      queryClient.setQueryData(gamePackKey.detail(data.id), data);
    },
  });
};

export default useCreateGamePackMutation;
