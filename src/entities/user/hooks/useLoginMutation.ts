import usersController from "@/shared/api/client/usersController";
import { meKeys, userKeys } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersController.loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.detail(data.id), data);
      queryClient.setQueryData(meKeys.me, data);
    },
  });
};

export default useLoginMutation;
