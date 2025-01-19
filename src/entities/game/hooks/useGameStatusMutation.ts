import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game, GameStatus } from "@/shared/types/game";
import { Tour } from "@/shared/types/gamePack";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGameStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      gameId: Game["id"];
      status: GameStatus;
      newTourId?: Tour["id"];
    }) =>
      await gamesController.changeStatus(
        data.gameId,
        data.status,
        data.newTourId
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(gameKey.detail(data.id), data);
    },
  });
};

export default useGameStatusMutation;
