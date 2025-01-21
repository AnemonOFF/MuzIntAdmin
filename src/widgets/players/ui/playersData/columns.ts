import { Player, PlayerWithPoints } from "@/shared/types/player";
import { ColumnDef } from "@tanstack/react-table";

export const notReadyColumns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "playArea",
    header: "Место",
  },
];

export const resultColumns: ColumnDef<PlayerWithPoints>[] = [
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "playArea",
    header: "Место",
  },
  {
    accessorKey: "points",
    header: "Баллы",
  },
  {
    accessorKey: "extraPoints",
    header: "Дополнительные",
  },
];
