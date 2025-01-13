import {
  AuthenticationResponse,
  LoginRequest,
  PasswordRequest,
  RefreshRequest,
  RegisterRequest,
  Tokens,
  User,
} from "@/shared/types/user";
import { apiClient } from "./axios";

const getUser = async (id: number) => {
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

const usersController = {
  getAuthUser,
  getUser,
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  changePassword,
};

export default usersController;
