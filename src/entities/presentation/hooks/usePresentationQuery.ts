"use client";

import { presentationController } from "@/shared/api/client";
import { gamePackKey, presentationKey } from "@/shared/lib/queryKeyFactory";
import { Presentation } from "@/shared/types/presentation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const usePresentationQuery = (id: Presentation["id"], enabled?: boolean) => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: presentationKey.detail(id),
    queryFn: async () => await presentationController.getPresentation(id),
    enabled: enabled,
  });

  useEffect(() => {
    if (!response.isSuccess) return;
    queryClient.setQueryData(
      gamePackKey.presentation(response.data.gamePackId),
      response.data
    );
  }, [response.isSuccess, response.data, queryClient]);
  return response;
};

export default usePresentationQuery;
