import { CreateGameRequest, Game } from "@/shared/types/game";
import { apiClient } from "./axios";
import { Pagination } from "@/shared/types/generic";

const getGame = async (id: Game["id"]) => {
  const response = await apiClient.get<Game>(`/games/${id}`);
  return response.data;
};

const getGames = async (page: number, onlyApproved: boolean) => {
  const response = await apiClient.get<Pagination<Game>>(`/games`, {
    params: {
      page: page,
      onlyApproved: onlyApproved,
    },
  });
  return response.data;
};

const deleteGame = async (id: Game["id"]) => {
  const response = await apiClient.delete<Game>(`/games/${id}`);
  return response.data;
};

const approveGame = async (id: Game["id"]) => {
  const response = await apiClient.put<Game>(`/games/${id}/approve`);
  return response.data;
};

const createGame = async (data: CreateGameRequest) => {
  const response = await apiClient.post<Game>("/games", data);
  return response.data;
};

const gamesController = {
  getGame,
  getGames,
  deleteGame,
  approveGame,
  createGame,
};

export default gamesController;
