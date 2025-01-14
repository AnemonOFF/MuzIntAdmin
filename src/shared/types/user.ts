export enum UserRoles {
  ADMIN = "admin",
  MODERATOR = "moderator",
  OWNER = "owner",
}

export type RefreshToken = {
  token: string;
  ip?: string;
  device?: string;
  expiredDateTime: Date;
};

export type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email: string;
  roles: string[];
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

export type AuthenticationResponse = {
  user: User;
  tokens: Tokens;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type PasswordRequest = {
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RolesRequest = {
  roles: string[];
};
