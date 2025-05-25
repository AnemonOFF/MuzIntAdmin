import { GamePack } from "./gamePack";
import { API_Slide, Slide } from "./slide";

export type API_Presentation = {
  id: number;
  gamePackId: GamePack["id"];
  slides: API_Slide[];
  createdDateTime: string;
  updatedDateTime: string;
};

export type Presentation = {
  id: number;
  gamePackId: GamePack["id"];
  slides: Slide[];
  createdDateTime: Date;
  updatedDateTime: Date;
};

export type CreatePresentationRequest = {
  gamePackId: GamePack["id"];
};
