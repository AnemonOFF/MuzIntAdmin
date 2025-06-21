import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGameWatermarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gamesController.deleteWatermark,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: gameKey.list() });
      queryClient.invalidateQueries({ queryKey: gameKey.detail(data.id) });
    },
  });
};

export default useDeleteGameWatermarkMutation;
