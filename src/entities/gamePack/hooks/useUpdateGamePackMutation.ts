import { gamePacksController } from "@/shared/api/client";
import { gamePackKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateGamePackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Parameters<typeof gamePacksController.updateGamePack>
    ) => await gamePacksController.updateGamePack(data[0], data[1]),
    onSuccess: (data) => {
      queryClient.setQueryData(gamePackKey.detail(data.id), data);
    },
  });
};

export default useUpdateGamePackMutation;
