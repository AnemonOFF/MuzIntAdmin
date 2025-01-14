"use client";

import { useRolesMutation } from "@/entities/user";
import { roleLabels } from "@/shared/lib/roleHelpers";
import { User, UserRoles } from "@/shared/types/user";
import MultipleSelector, { Option } from "@/shared/ui/multipleSelector";
import React from "react";

export interface RoleSelectorProps {
  user: User;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ user }) => {
  const { mutate, isPending } = useRolesMutation();
  const roles = user.roles as UserRoles[];
  const options: Option[] = roles
    .filter((role) => role !== UserRoles.OWNER)
    .map((role) => ({
      value: role,
      label: roleLabels[role],
    }));

  const allOptions: Option[] = [
    {
      value: UserRoles.ADMIN,
      label: roleLabels[UserRoles.ADMIN],
    },
    {
      value: UserRoles.MODERATOR,
      label: roleLabels[UserRoles.MODERATOR],
    },
  ];

  const updateRoles = (data: Option[]) => {
    mutate({
      userId: user.id,
      data: {
        roles: data.map((opt) => opt.value),
      },
    });
  };

  return (
    <MultipleSelector
      options={allOptions}
      value={options}
      onChange={updateRoles}
      disabled={isPending}
      placeholder="Роли"
      hidePlaceholderWhenSelected
      hideClearAllButton
      emptyIndicator="Роли не найдены"
    />
  );
};

export default React.memo(RoleSelector);
