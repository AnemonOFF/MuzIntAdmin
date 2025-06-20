"use client";

import { gamePacksController } from "@/shared/api/client";
import {
  blockKey,
  gamePackKey,
  questionKey,
  tourKey,
} from "@/shared/lib/queryKeyFactory";
import { GamePack } from "@/shared/types/gamePack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useGamePackQuery = (id: GamePack["id"], enabled?: boolean) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: gamePackKey.detail(id),
    queryFn: async () => await gamePacksController.getGamePack(id),
    enabled: enabled,
  });

  useEffect(() => {
    const data = result.data;
    if (!data) return;

    queryClient.setQueryData(gamePackKey.detail(data.id), data);
    queryClient.setQueryData(tourKey.gamePack(data.id), data.tours);
    data.tours.forEach((tour) => {
      queryClient.setQueryData(tourKey.detail(tour.id), tour);
      queryClient.setQueryData(blockKey.tour(tour.id), tour.blocks);
      tour.blocks.forEach((block) => {
        queryClient.setQueryData(blockKey.detail(block.id), block);
        queryClient.setQueryData(questionKey.block(block.id), block.questions);
        block.questions.forEach((question) => {
          queryClient.setQueryData(questionKey.detail(question.id), question);
        });
      });
    });
  }, [result.data, queryClient]);

  return result;
};

export default useGamePackQuery;
