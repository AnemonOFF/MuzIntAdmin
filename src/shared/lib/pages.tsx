import { UserRoles } from "@/shared/types/user";
import {
  IconGitPullRequest,
  IconLayoutDashboardFilled,
  IconPackages,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react";

export const pages: {
  url: string;
  roles: UserRoles[];
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    url: "/dashboard",
    roles: [UserRoles.ADMIN, UserRoles.MODERATOR, UserRoles.OWNER],
    title: "Dashboard",
    icon: <IconLayoutDashboardFilled />,
  },
  {
    url: "/games",
    roles: [UserRoles.OWNER, UserRoles.ADMIN, UserRoles.MODERATOR],
    title: "Игры",
    icon: <IconTicket />,
  },
  {
    url: "/gamepacks",
    roles: [UserRoles.OWNER, UserRoles.ADMIN],
    title: "Пакеты игр",
    icon: <IconPackages />,
  },
  {
    url: "/users",
    roles: [UserRoles.OWNER, UserRoles.ADMIN],
    title: "Пользователи",
    icon: <IconUsers />,
  },
];

export const getRolesLinks = (roles: UserRoles[]) => {
  const links = pages.filter((link) =>
    link.roles.some((role) => roles.includes(role))
  );
  return links;
};
