"use client";

import { useUsersQuery } from "@/entities/user";
import Loader from "@/shared/ui/loader";
import React, { useState } from "react";
import UsersDataTable from "./usersDataTable";
import { PaginationState } from "@tanstack/react-table";

export interface UsersTableProps {}

const UsersTable: React.FC<UsersTableProps> = ({}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: -1,
  });
  const { data, isLoading, isSuccess } = useUsersQuery(
    pagination.pageIndex + 1
  );

  if (isLoading || !isSuccess) return <Loader text="Загрузка пользователей" />;

  return (
    <UsersDataTable
      data={data.items}
      rowCount={data.totalCount}
      page={pagination.pageIndex}
      pageSize={data.perPageCount}
      onPaginationChange={setPagination}
    />
  );
};

export default React.memo(UsersTable);
