import { blocksController } from "@/shared/api/client";
import { blockKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateBlockMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Parameters<typeof blocksController.updateBlock>) =>
      await blocksController.updateBlock(data[0], data[1]),
    onSuccess: (data) => {
      queryClient.setQueryData(blockKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: tourKey.details() });
    },
  });
};

export default useUpdateBlockMutation;
