import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { SetSlideDynamicContentRequest, Slide } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateSlideDynamicContentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      slideId: Slide["id"];
      dynamicContent: SetSlideDynamicContentRequest;
    }) =>
      await presentationController.updateSlideDynamicContent(
        data.presentationId,
        data.slideId,
        data.dynamicContent
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useUpdateSlideDynamicContentMutation;
