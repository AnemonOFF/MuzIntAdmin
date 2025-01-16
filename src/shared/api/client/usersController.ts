import {
  AuthenticationResponse,
  LoginRequest,
  PasswordRequest,
  RefreshRequest,
  RegisterRequest,
  RolesRequest,
  Tokens,
  User,
} from "@/shared/types/user";
import { apiClient } from "./axios";
import { Pagination } from "@/shared/types/generic";

const getUsersPerPage = async (page: number) => {
  const response = await apiClient.get<Pagination<User>>("/users", {
    params: {
      page: page,
    },
  });
  return response.data;
};

const getUser = async (id: User["id"]) => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

const getAuthUser = async () => {
  const response = await apiClient.get<User>("/users/me");
  return response.data;
};

const registerUser = async (data: RegisterRequest) => {
  const response = await apiClient.post<User>("/users/register", data);
  return response.data;
};

const loginUser = async (data: LoginRequest) => {
  const response = await apiClient.post<AuthenticationResponse>(
    "/users/login",
    data
  );
  apiClient.setAuth(
    response.data.tokens.token,
    response.data.tokens.refreshToken
  );
  return response.data.user;
};

const refreshToken = async (data: RefreshRequest) => {
  const response = await apiClient.post<Tokens>("/users/refresh", data);
  apiClient.setAuth(response.data.token, response.data.refreshToken);
  return response.data;
};

const logoutUser = async (data: RefreshRequest) => {
  await apiClient.post("/users/logout", data);
  apiClient.removeAuth();
};

const changePassword = async (data: PasswordRequest) => {
  const response = await apiClient.put<AuthenticationResponse>(
    "/users/password",
    data
  );
  apiClient.setAuth(
    response.data.tokens.token,
    response.data.tokens.refreshToken
  );
  return response.data.user;
};

const setRoles = async (userId: User["id"], data: RolesRequest) => {
  const response = await apiClient.put<User>(`/users/${userId}/roles`, data);
  return response.data;
};

const usersController = {
  getUsersPerPage,
  getAuthUser,
  getUser,
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  changePassword,
  setRoles,
};

export default usersController;
