import { Collection } from "@/shared/types/generic";
import { apiClient } from "./axios";
import {
  API_FullGamePack,
  API_SimpleGamePack,
  CreateGamePackRequest,
  GamePack,
  UpdateGamePackRequest,
} from "@/shared/types/gamePack";
import { apiMapper } from "@/shared/lib/mapping";

const getGamePacks = async () => {
  const response = await apiClient.get<Collection<API_SimpleGamePack>>(
    "/gamepacks"
  );
  return response.data.items.map((gp) => apiMapper.mapSimpleGamePack(gp));
};

const getGamePack = async (id: GamePack["id"]) => {
  const response = await apiClient.get<API_FullGamePack>(`/gamepacks/${id}`);
  return apiMapper.mapFullGamePack(response.data);
};

const createGamePack = async (data: CreateGamePackRequest) => {
  const response = await apiClient.post<API_FullGamePack>("/gamepacks", data);
  return apiMapper.mapFullGamePack(response.data);
};

const deleteGamePack = async (id: GamePack["id"]) => {
  const response = await apiClient.delete<API_FullGamePack>(`/gamepacks/${id}`);
  return apiMapper.mapFullGamePack(response.data);
};

const uploadGamePack = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  const response = await apiClient.post<API_FullGamePack>(
    "/gamepacks/upload",
    formData
  );
  return apiMapper.mapFullGamePack(response.data);
};

const updateGamePack = async (
  id: GamePack["id"],
  data: UpdateGamePackRequest
) => {
  const response = await apiClient.put<API_FullGamePack>(
    `/gamepacks/${id}`,
    data
  );
  return apiMapper.mapFullGamePack(response.data);
};

const gamePacksController = {
  getGamePacks,
  getGamePack,
  createGamePack,
  deleteGamePack,
  uploadGamePack,
  updateGamePack,
};

export default gamePacksController;
