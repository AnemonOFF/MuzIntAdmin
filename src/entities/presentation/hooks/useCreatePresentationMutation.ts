"use client";

import { presentationController } from "@/shared/api/client";
import { gamePackKey, presentationKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreatePresentationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: presentationController.createPresentation,
    onSuccess: (data) => {
      queryClient.setQueryData(presentationKey.detail(data.id), data);
      queryClient.setQueryData(gamePackKey.presentation(data.gamePackId), data);
    },
  });
};

export default useCreatePresentationMutation;
