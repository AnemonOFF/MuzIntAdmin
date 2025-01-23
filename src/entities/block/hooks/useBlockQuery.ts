import { blocksController } from "@/shared/api/client";
import { blockKey, questionKey } from "@/shared/lib/queryKeyFactory";
import { Block } from "@/shared/types/block";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useBlockQuery = (id: Block["id"]) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: blockKey.detail(id),
    queryFn: async () => await blocksController.getBlock(id),
  });

  useEffect(() => {
    if (query.isSuccess) {
      queryClient.setQueryData(blockKey.detail(query.data.id), query.data);
      queryClient.setQueryData(questionKey.block(query.data.id), query.data);
      query.data.questions.forEach((question) => {
        queryClient.setQueryData(questionKey.detail(question.id), question);
      });
    }
  }, [query.data, query.isSuccess, queryClient]);

  return query;
};

export default useBlockQuery;
