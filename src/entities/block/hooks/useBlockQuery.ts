import { blocksController } from "@/shared/api/client";
import { blockKey } from "@/shared/lib/queryKeyFactory";
import { Block } from "@/shared/types/gamePack";
import { useQuery } from "@tanstack/react-query";

const useBlockQuery = (id: Block["id"]) => {
  return useQuery({
    queryKey: blockKey.detail(id),
    queryFn: async () => await blocksController.getBlock(id),
  });
};

export default useBlockQuery;
