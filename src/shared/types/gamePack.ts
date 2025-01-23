import { Tour } from "./tour";

export type API_GamePack = {
  id: number;
  name: string;
  createdDateTime: string;
  updatedDateTime: string;
};

export type API_SimpleGamePack = API_GamePack & {
  toursCount: number;
};

export type API_FullGamePack = API_GamePack & {
  tours: Tour[];
};

export type GamePack = {
  id: number;
  name: string;
  createdDateTime: Date;
  updatedDateTime: Date;
};

export type SimpleGamePack = GamePack & {
  toursCount: number;
};

export type FullGamePack = GamePack & {
  tours: Tour[];
};

export type CreateGamePackRequest = {
  name: string;
};

export type UpdateGamePackRequest = {
  name?: string;
};
