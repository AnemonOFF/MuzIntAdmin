"use client";

import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { SetSlideActionRequest } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      slideId: Slide["id"];
      action: SetSlideActionRequest;
    }) =>
      await presentationController.updateSlideAction(
        data.presentationId,
        data.slideId,
        data.action
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useUpdateSlideMutation;
