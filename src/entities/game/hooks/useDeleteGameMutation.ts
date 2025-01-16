"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesController.deleteGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
      queryClient.invalidateQueries({ queryKey: gameKey.detail(data.id) });
    },
  });
};

export default useDeleteGameMutation;
