import {
  AnswersOrder,
  API_Game,
  CreateGameRequest,
  Game,
  GamePresentationState,
  GameStatus,
  SetWatermarkRequest,
} from "@/shared/types/game";
import { apiClient } from "./axios";
import { Collection, Pagination } from "@/shared/types/generic";
import { apiMapper } from "@/shared/lib/mapping";
import { User } from "@/shared/types/user";
import { Tour } from "@/shared/types/tour";
import { API_Presentation } from "@/shared/types/presentation";
import { Player } from "@/shared/types/player";
import { Slide } from "@/shared/types/slide";

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

const getModerators = async (gameId: Game["id"]) => {
  const response = await apiClient.get<Collection<User>>(
    `/games/${gameId}/moderators`
  );
  return response.data.items;
};

const addModerator = async (gameId: Game["id"], moderatorId: User["id"]) => {
  const response = await apiClient.post<Collection<User>>(
    `/games/${gameId}/moderators`,
    {
      userId: moderatorId,
    }
  );
  return response.data.items;
};

const deleteModerator = async (gameId: Game["id"], moderatorId: User["id"]) => {
  const response = await apiClient.delete(
    `/games/${gameId}/moderators/${moderatorId}`
  );
  return response.data.items;
};

const changeStatus = async (
  gameId: Game["id"],
  status: GameStatus,
  newTourId?: Tour["id"]
) => {
  const response = await apiClient.put<API_Game>(`/games/${gameId}/status`, {
    status: status,
    newTourId: newTourId,
  });
  return apiMapper.mapGame(response.data);
};

const getGamePresentation = async (gameId: Game["id"]) => {
  const response = await apiClient.get<API_Presentation>(
    `/games/${gameId}/presentation`
  );
  return apiMapper.mapPresentation(response.data);
};

const getGamePresentationState = async (gameId: Game["id"]) => {
  const response = await apiClient.get<GamePresentationState>(
    `/games/${gameId}/presentation/state`
  );
  return response.data;
};

const proceedGamePresentation = async (
  gameId: Game["id"],
  currentSlideId: Slide["id"]
) => {
  const response = await apiClient.post<GamePresentationState>(
    `/games/${gameId}/presentation/next?currentSlideId=${currentSlideId}`
  );
  return response.data;
};

const toggleRandom = async (gameId: Game["id"], isRandom: boolean) => {
  const response = await apiClient.put<API_Game>(`/games/${gameId}/random`, {
    isRandomAnswers: isRandom,
  });

  return apiMapper.mapGame(response.data);
};

const togglePresentationMode = async (
  gameId: Game["id"],
  isPresentationMode: boolean
) => {
  const response = await apiClient.put<API_Game>(
    `/games/${gameId}/presentationmode`,
    {
      isPresentationMode: isPresentationMode,
    }
  );

  return apiMapper.mapGame(response.data);
};

const getAnswersOrder = async (gameId: Game["id"]) => {
  const response = await apiClient.get<AnswersOrder>(
    `/games/${gameId}/answers`
  );

  return response.data;
};

const getTopPlayers = async (
  gameId: Game["id"],
  top: number,
  tourId?: Tour["id"]
) => {
  const params: Record<string, string | number> = {
    top: top,
  };
  if (tourId) params.tourId = tourId;
  const response = await apiClient.get<Collection<Player>>(
    `/games/${gameId}/top`,
    {
      params: params,
    }
  );

  return response.data.items;
};

const setWatermark = async (
  gameId: Game["id"],
  data: SetWatermarkRequest,
  file?: File
) => {
  const formData = new FormData();
  if (file) formData.append("file", file);
  for (const key in data) {
    formData.append(
      key,
      (data as Record<string, string | number>)[key].toString()
    );
  }

  const response = await apiClient.post<API_Game>(
    `/games/${gameId}/presentation/watermark`,
    formData
  );
  return apiMapper.mapGame(response.data);
};

const deleteWatermark = async (gameId: Game["id"]) => {
  const response = await apiClient.delete<API_Game>(
    `/games/${gameId}/presentation/watermark`
  );
  return apiMapper.mapGame(response.data);
};

const gamesController = {
  getGame,
  getGames,
  deleteGame,
  approveGame,
  createGame,
  getModerators,
  addModerator,
  deleteModerator,
  changeStatus,
  getGamePresentation,
  getGamePresentationState,
  proceedGamePresentation,
  toggleRandom,
  togglePresentationMode,
  getAnswersOrder,
  getTopPlayers,
  setWatermark,
  deleteWatermark,
};

export default gamesController;
