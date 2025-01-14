import { UsersTable } from "@/features/user";
import React from "react";

export interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = ({}) => {
  return (
    <div className="">
      <UsersTable />
    </div>
  );
};

export default React.memo(UsersPage);
