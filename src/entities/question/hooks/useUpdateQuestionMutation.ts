import { questionsController } from "@/shared/api/client";
import { blockKey, questionKey } from "@/shared/lib/queryKeyFactory";
import { Block } from "@/shared/types/block";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateQuestionMutation = (blockId?: Block["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Parameters<typeof questionsController.updateQuestion>
    ) => await questionsController.updateQuestion(data[0], data[1]),
    onSuccess: (data) => {
      queryClient.setQueryData(questionKey.detail(data.id), data);
      queryClient.invalidateQueries({
        queryKey: blockId ? blockKey.detail(blockId) : blockKey.details(),
      });
    },
  });
};

export default useUpdateQuestionMutation;
