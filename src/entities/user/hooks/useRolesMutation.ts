"use client";

import { usersController } from "@/shared/api/client";
import { userKeys } from "@/shared/lib/queryKeyFactory";
import { RolesRequest } from "@/shared/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRolesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: number; data: RolesRequest }) =>
      await usersController.setRoles(data.userId, data.data),
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });
};

export default useRolesMutation;
