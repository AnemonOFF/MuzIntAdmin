import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGameProceedPresentationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: gamesController.proceedGamePresentation,
    onSuccess: (data, gameId) =>
      queryClient.setQueryData(gameKey.presentationState(gameId), data),
  });
};

export default useGameProceedPresentationMutation;
