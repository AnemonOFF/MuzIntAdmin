import usersController from "@/shared/api/client/usersController";
import { userKeys } from "@/shared/lib/queryKeyFactory";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useUsersQuery = (page: number) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: userKeys.page(page),
    queryFn: async () => await usersController.getUsersPerPage(page),
  });

  useEffect(() => {
    result.data?.items.forEach((user) => {
      queryClient.setQueryData(userKeys.detail(user.id), user);
    });
  }, [result.data, queryClient]);

  return result;
};

export default useUsersQuery;
