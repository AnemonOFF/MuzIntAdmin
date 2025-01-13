import React from "react";

export interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = ({}) => {
  return <span>Users page</span>;
};

export default React.memo(UsersPage);
