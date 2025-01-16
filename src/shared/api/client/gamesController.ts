import { API_Game, CreateGameRequest, Game } from "@/shared/types/game";
import { apiClient } from "./axios";
import { Pagination } from "@/shared/types/generic";
import { apiMapper } from "@/shared/lib/mapping";

const getGame = async (id: Game["id"]) => {
  const response = await apiClient.get<API_Game>(`/games/${id}`);
  return apiMapper.mapGame(response.data);
};

const getGames = async (page: number, onlyApproved: boolean) => {
  const response = await apiClient.get<Pagination<API_Game>>(`/games`, {
    params: {
      page: page,
      onlyApproved: onlyApproved,
    },
  });

  const result: Pagination<Game> = {
    totalCount: response.data.totalCount,
    perPageCount: response.data.perPageCount,
    items: response.data.items.map((game) => apiMapper.mapGame(game)),
  };
  return result;
};

const deleteGame = async (id: Game["id"]) => {
  const response = await apiClient.delete<API_Game>(`/games/${id}`);
  return apiMapper.mapGame(response.data);
};

const approveGame = async (id: Game["id"]) => {
  const response = await apiClient.put<API_Game>(`/games/${id}/approve`);
  return apiMapper.mapGame(response.data);
};

const createGame = async (data: CreateGameRequest) => {
  const response = await apiClient.post<API_Game>("/games", data);
  return apiMapper.mapGame(response.data);
};

const gamesController = {
  getGame,
  getGames,
  deleteGame,
  approveGame,
  createGame,
};

export default gamesController;
