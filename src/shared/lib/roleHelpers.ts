import { UserRoles } from "../types/user";

export const roleLabels = {
  [UserRoles.ADMIN]: "Админ",
  [UserRoles.MODERATOR]: "Модератор",
  [UserRoles.OWNER]: "Владелец",
};

export const featureAccess: {
  [key: string]: UserRoles[];
} = {
  "admin.games.approving": [UserRoles.OWNER, UserRoles.ADMIN],
  "admin.games.moderators": [UserRoles.OWNER, UserRoles.ADMIN],
};

export const haveFeatureAccess = (feature: string, roles: UserRoles[]) =>
  Object.keys(featureAccess).includes(feature) &&
  featureAccess[feature].some((role) => roles.includes(role));
