import { Game, GameStatus } from "@/shared/types/game";
import { ColumnDef } from "@tanstack/react-table";
import { statusLabels } from "../../lib/statusHelpers";
import ActionCell from "./actionCell";

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    id: "startTime",
    header: "Начало",
    cell: ({ row }) => {
      return (
        row.original.startedTimeUTC ?? row.original.startTimeUTC
      ).toLocaleString();
    },
  },
  {
    accessorKey: "endedTimeUTC",
    header: "Завершилось",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => statusLabels[row.original.status as GameStatus],
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionCell id={row.original.id} isApproved={row.original.isApproved} />
      );
    },
  },
];
