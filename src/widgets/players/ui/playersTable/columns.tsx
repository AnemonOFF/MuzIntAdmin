import { Player } from "@/shared/types/player";
import { ColumnDef } from "@tanstack/react-table";
import PlayerStatus from "./playerStatus";

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "playArea",
    header: "Место",
  },
  {
    id: "status",
    header: "Статус",
    cell: ({ row }) => {
      const player = row.original;
      return <PlayerStatus player={player} />;
    },
  },
];
