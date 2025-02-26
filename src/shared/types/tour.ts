import { Block } from "./block";
import { GamePack } from "./gamePack";

export type Tour = {
  id: number;
  name: string;
  order: number;
  takeIntoResult: boolean;
  blocks: Block[];
};

export type CreateTourRequest = {
  gamePackId: GamePack["id"];
  name: string;
  order: number;
  takeIntoResult: boolean;
};

export type UpdateTourRequest = {
  name?: string;
  order?: number;
  takeIntoResult?: boolean;
};
