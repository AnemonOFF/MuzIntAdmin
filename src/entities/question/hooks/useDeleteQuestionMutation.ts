import { questionsController } from "@/shared/api/client";
import { blockKey, questionKey } from "@/shared/lib/queryKeyFactory";
import { Block } from "@/shared/types/block";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteQuestionMutation = (blockId?: Block["id"]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: questionsController.deleteQuestion,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: questionKey.detail(id) });
      queryClient.invalidateQueries({
        queryKey: blockId ? blockKey.detail(blockId) : blockKey.details(),
      });
    },
  });
};

export default useDeleteQuestionMutation;
