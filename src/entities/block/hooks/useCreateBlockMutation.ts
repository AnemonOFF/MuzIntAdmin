import { blocksController } from "@/shared/api/client";
import { blockKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { Tour } from "@/shared/types/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateBlockMutation = (tourId?: Tour["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blocksController.createBlock,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: tourId ? tourKey.detail(tourId) : tourKey.details(),
      });
      queryClient.setQueryData(blockKey.detail(data.id), data);
    },
  });
};

export default useCreateBlockMutation;
