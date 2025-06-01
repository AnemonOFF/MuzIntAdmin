"use client";

import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      slideId: Slide["id"];
    }) =>
      await presentationController.deleteSlideAction(
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

export default useDeleteSlideMutation;
