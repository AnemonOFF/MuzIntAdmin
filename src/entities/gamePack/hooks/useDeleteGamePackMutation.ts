"use client";

import { gamePacksController } from "@/shared/api/client";
import { gamePackKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGamePackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamePacksController.deleteGamePack,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: gamePackKey.simpleList() });
      queryClient.invalidateQueries({ queryKey: gamePackKey.detail(data.id) });
    },
  });
};

export default useDeleteGamePackMutation;
