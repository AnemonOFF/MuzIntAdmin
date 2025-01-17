import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { User } from "@/shared/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddModeratorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { gameId: Game["id"]; moderatorId: User["id"] }) =>
      await gamesController.addModerator(data.gameId, data.moderatorId),
    onSuccess: (_, { gameId }) => {
      queryClient.invalidateQueries({ queryKey: gameKey.moderators(gameId) });
    },
  });
};

export default useAddModeratorMutation;
