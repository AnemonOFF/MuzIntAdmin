import { Player, PlayerWithScore } from "@/shared/types/player";
import { Button } from "@/shared/ui/button";
import { IconArrowsUpDown } from "@tabler/icons-react";
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

export const resultColumns: ColumnDef<PlayerWithScore>[] = [
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
  {
    accessorKey: "totalPoints",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Всего
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => {
      const aPoints = a.original.points + a.original.extraPoints;
      const bPoints = b.original.points + b.original.extraPoints;
      if (aPoints === bPoints) return b.original.time - a.original.time;
      return bPoints - aPoints;
    },
  },
];
