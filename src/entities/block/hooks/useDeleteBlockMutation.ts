import { blocksController } from "@/shared/api/client";
import { blockKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { Tour } from "@/shared/types/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteBlockMutation = (tourId?: Tour["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blocksController.deleteBlock,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: blockKey.detail(id) });
      queryClient.invalidateQueries({
        queryKey: tourId ? tourKey.detail(tourId) : tourKey.details(),
      });
    },
  });
};

export default useDeleteBlockMutation;
