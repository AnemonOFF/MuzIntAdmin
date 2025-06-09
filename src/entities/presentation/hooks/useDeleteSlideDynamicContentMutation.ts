import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteSlideDynamicContentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      slideId: Slide["id"];
    }) =>
      await presentationController.deleteSlideDynamicContent(
        data.presentationId,
        data.slideId
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useDeleteSlideDynamicContentMutation;
