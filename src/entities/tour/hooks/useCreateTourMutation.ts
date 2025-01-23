import { toursController } from "@/shared/api/client";
import { gamePackKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { GamePack } from "@/shared/types/gamePack";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateTourMutation = (gamePackId?: GamePack["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toursController.createTour,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: gamePackId
          ? gamePackKey.detail(gamePackId)
          : gamePackKey.details(),
      });
      queryClient.setQueryData(tourKey.detail(data.id), data);
    },
  });
};

export default useCreateTourMutation;
