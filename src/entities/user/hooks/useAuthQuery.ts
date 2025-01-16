"use client";

import { usersController } from "@/shared/api/client";
import { meKeys } from "@/shared/lib/queryKeyFactory";
import { useQuery } from "@tanstack/react-query";

const useAuthQuery = () => {
  return useQuery({
    queryKey: meKeys.me,
    queryFn: usersController.getAuthUser,
  });
};

export default useAuthQuery;
