import usersController from "@/shared/api/client/usersController";
import { userKeys } from "@/shared/lib/queryKeyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersController.registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.detail(data.id), data);
    },
  });
};

export default useRegisterMutation;
