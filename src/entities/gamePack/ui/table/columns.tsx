import { SimpleGamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import { IconEdit } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<SimpleGamePack>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "toursCount",
    header: "Количество туров",
  },
  {
    id: "edit",
    header: "",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Button variant="ghost" asChild>
          <Link href={`/gamepacks/${id}`}>
            <IconEdit />
          </Link>
        </Button>
      );
    },
  },
];
