"use client";

import React, { useState } from "react";
import GamesDataTable from "./gamesDataTable";
import { PaginationState } from "@tanstack/react-table";
import { useGamesQuery } from "../../hooks";
import Loader from "@/shared/ui/loader";

export interface GamesTableProps {
  onlyApproved?: boolean;
}

const GamesTable: React.FC<GamesTableProps> = ({ onlyApproved = false }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: -1,
  });
  const { data, isLoading, isSuccess } = useGamesQuery(
    pagination.pageIndex + 1,
    onlyApproved
  );

  if (isLoading || !isSuccess) return <Loader text="Загрузка игр" />;

  return (
    <GamesDataTable
      data={data.items}
      rowCount={data.totalCount}
      page={pagination.pageIndex}
      pageSize={data.perPageCount}
      onPaginationChange={setPagination}
    />
  );
};

export default React.memo(GamesTable);
