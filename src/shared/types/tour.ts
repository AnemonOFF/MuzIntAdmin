import { Block } from "./block";
import { GamePack } from "./gamePack";

export type Tour = {
  id: number;
  name: string;
  order: number;
  blocks: Block[];
};

export type CreateTourRequest = {
  gamePackId: GamePack["id"];
  name: string;
  order: number;
};

export type UpdateTourRequest = {
  name?: string;
  order?: number;
};
