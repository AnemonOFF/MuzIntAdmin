"use client";

import { gamePacksController } from "@/shared/api/client";
import { blockKey, gamePackKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUploadGamePackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { file: File; name: string }) =>
      await gamePacksController.uploadGamePack(data.name, data.file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: gamePackKey.simpleList() });
      queryClient.setQueryData(gamePackKey.detail(data.id), data);
      queryClient.setQueryData(tourKey.gamePack(data.id), data.tours);
      data.tours.forEach((tour) => {
        queryClient.setQueryData(tourKey.detail(tour.id), tour);
        queryClient.setQueryData(blockKey.tour(tour.id), tour.blocks);
        tour.blocks.forEach((block) => {
          queryClient.setQueryData(blockKey.detail(block.id), block);
        });
      });
    },
  });
};

export default useUploadGamePackMutation;
