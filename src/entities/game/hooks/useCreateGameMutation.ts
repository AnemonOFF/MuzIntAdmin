"use client";

import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesController.createGame,
    onSuccess: (data) => {
      queryClient.setQueryData(gameKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
    },
  });
};

export default useCreateGameMutation;
