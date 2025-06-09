import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useToggleRandomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { gameId: number; isRandom: boolean }) =>
      gamesController.toggleRandom(data.gameId, data.isRandom),
    onSuccess: (data) => {
      queryClient.setQueryData(gameKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
    },
  });
};

export default useToggleRandomMutation;
