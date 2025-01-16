import { Collection } from "@/shared/types/generic";
import { apiClient } from "./axios";
import {
  CreateGamePackRequest,
  FullGamePack,
  GamePack,
  SimpleGamePack,
} from "@/shared/types/gamePack";

const getGamePacks = async () => {
  const response = await apiClient.get<Collection<SimpleGamePack>>(
    "/gamepacks"
  );
  return response.data.items;
};

const getGamePack = async (id: GamePack["id"]) => {
  const response = await apiClient.get<FullGamePack>(`/gamepacks/${id}`);
  return response.data;
};

const createGamePack = async (data: CreateGamePackRequest) => {
  const response = await apiClient.post<FullGamePack>("/gamepacks", data);
  return response.data;
};

const deleteGamePack = async (id: GamePack["id"]) => {
  const response = await apiClient.delete<FullGamePack>(`/gamepacks/${id}`);
  return response.data;
};

const uploadGamePack = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  const response = await apiClient.post<FullGamePack>(
    "/gamepacks/upload",
    formData
  );
  return response.data;
};

const gamePacksController = {
  getGamePacks,
  getGamePack,
  createGamePack,
  deleteGamePack,
  uploadGamePack,
};

export default gamePacksController;
