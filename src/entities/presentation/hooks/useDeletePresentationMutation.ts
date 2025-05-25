"use client";

import { presentationController } from "@/shared/api/client";
import { gamePackKey, presentationKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePresentationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: presentationController.deletePresentation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: presentationKey.detail(data.id),
      });
      queryClient.invalidateQueries({
        queryKey: gamePackKey.presentation(data.gamePackId),
      });
    },
  });
};

export default useDeletePresentationMutation;
