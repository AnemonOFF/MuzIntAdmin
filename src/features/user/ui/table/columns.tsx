import { User } from "@/shared/types/user";
import { ColumnDef } from "@tanstack/react-table";
import RoleSelector from "./roleSelector";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "roles",
    header: "Роли",
    cell: ({ row }) => {
      return <RoleSelector user={row.original} />;
    },
  },
];
