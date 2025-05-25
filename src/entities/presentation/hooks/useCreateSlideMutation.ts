"use client";

import { presentationController } from "@/shared/api/client";
import { presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSlideMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      presentationId: Presentation["id"];
      content: File | Blob;
      sound?: File | Blob;
    }) =>
      await presentationController.createSlide(
        data.presentationId,
        data.content,
        data.sound
      ),
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(presentationId),
      });
    },
  });
};

export default useCreateSlideMutation;
