import { toursController } from "@/shared/api/client";
import { tourKey } from "@/shared/lib/queryKeyFactory";
import { Tour } from "@/shared/types/gamePack";
import { useQuery } from "@tanstack/react-query";

const useTourQuery = (id: Tour["id"], enabled?: boolean) => {
  return useQuery({
    queryKey: tourKey.detail(id),
    queryFn: async () => await toursController.getTour(id),
    enabled: enabled,
  });
};

export default useTourQuery;
