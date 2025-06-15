import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { Slide } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGameProceedPresentationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      gameId,
      currentSlideId,
    }: {
      gameId: Game["id"];
      currentSlideId: Slide["id"];
    }) => await gamesController.proceedGamePresentation(gameId, currentSlideId),
    onSuccess: (data, { gameId }) =>
      queryClient.setQueryData(gameKey.presentationState(gameId), data),
  });
};

export default useGameProceedPresentationMutation;
