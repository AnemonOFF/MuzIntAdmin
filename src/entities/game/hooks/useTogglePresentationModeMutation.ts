import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTogglePresentationModeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { gameId: number; isPresentationMode: boolean }) =>
      gamesController.togglePresentationMode(
        data.gameId,
        data.isPresentationMode
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(gameKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
    },
  });
};

export default useTogglePresentationModeMutation;
