import usersController from "@/shared/api/client/usersController";
import { meKeys } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersController.logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meKeys.me,
      });
    },
  });
};

export default useLogoutMutation;
