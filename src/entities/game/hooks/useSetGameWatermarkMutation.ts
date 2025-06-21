import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game, SetWatermarkRequest } from "@/shared/types/game";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSetGameWatermarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gameId,
      data,
      file,
    }: {
      gameId: Game["id"];
      data: SetWatermarkRequest;
      file?: File;
    }) => gamesController.setWatermark(gameId, data, file),
    onSuccess: (data) => {
      queryClient.setQueryData(gameKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
    },
  });
};

export default useSetGameWatermarkMutation;
