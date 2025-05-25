"use client";

import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { SetSlideOrderRequest } from "@/shared/types/slide";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useReorderSlidesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      order: SetSlideOrderRequest;
    }) =>
      await presentationController.reorderSlides(
        data.presentationId,
        data.order
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useReorderSlidesMutation;
