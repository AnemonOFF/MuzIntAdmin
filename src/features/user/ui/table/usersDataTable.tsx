"use client";

import { User } from "@/shared/types/user";
import {
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export interface TableProps {
  data: User[];
  rowCount: number;
  onPaginationChange: OnChangeFn<PaginationState>;
  page: number;
  pageSize: number;
}

const UsersDataTable: React.FC<TableProps> = ({
  data,
  onPaginationChange,
  rowCount,
  page,
  pageSize,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: rowCount,
    onPaginationChange: onPaginationChange,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Пользователи не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(UsersDataTable);
