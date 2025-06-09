import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { Question } from "@/shared/types/question";
import { Slide } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAssignSlideToQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      slideId: Slide["id"];
      questionId: Question["id"];
    }) =>
      await presentationController.assignSlideToQuestion(
        data.presentationId,
        data.slideId,
        data.questionId
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useAssignSlideToQuestionMutation;
