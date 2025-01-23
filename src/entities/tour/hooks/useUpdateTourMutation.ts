import { toursController } from "@/shared/api/client";
import { gamePackKey, tourKey } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateTourMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Parameters<typeof toursController.updateTour>) =>
      await toursController.updateTour(data[0], data[1]),
    onSuccess: (data) => {
      queryClient.setQueryData(tourKey.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: gamePackKey.details() });
    },
  });
};

export default useUpdateTourMutation;
