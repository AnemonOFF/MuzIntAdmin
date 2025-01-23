import { toursController } from "@/shared/api/client";
import { gamePackKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { GamePack } from "@/shared/types/gamePack";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTourMutation = (gamePackId?: GamePack["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toursController.deleteTour,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: tourKey.detail(id) });
      queryClient.invalidateQueries({
        queryKey: gamePackId
          ? gamePackKey.detail(gamePackId)
          : gamePackKey.details(),
      });
    },
  });
};

export default useDeleteTourMutation;
