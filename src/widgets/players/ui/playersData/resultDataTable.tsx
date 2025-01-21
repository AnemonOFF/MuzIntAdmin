"use client";

import { PlayerWithScore } from "@/shared/types/player";
import React from "react";
import { resultColumns } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
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

export interface ResultDataTableProps {
  data: PlayerWithScore[];
}

const ResultDataTable: React.FC<ResultDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: resultColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
  const currentPage = table.getState().pagination.pageIndex + 1;
  const lastPage = table.getPageCount();

  return (
    <div>
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
                  colSpan={resultColumns.length}
                  className="h-24 text-center"
                >
                  Нет ни одного игрока
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft />
        </Button>
        {currentPage > 1 && (
          <Button variant="outline" size="sm" onClick={table.firstPage}>
            1
          </Button>
        )}
        <span className="">{currentPage}</span>
        {currentPage < lastPage && (
          <Button variant="outline" size="sm" onClick={table.lastPage}>
            {lastPage}
          </Button>
        )}
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

export default React.memo(ResultDataTable);
