import { GameStatus } from "./game";
import { Tour } from "./tour";

export type API_Slide = {
  id: number;
  fileName: string;
  type: SlideType;
  soundFileName?: string;
  order: number;
  action: SlideAction;
  createdDateTime: string;
  updatedDateTime: string;
};

export type Slide = {
  id: number;
  fileName: string;
  type: SlideType;
  soundFileName?: string;
  order: number;
  action: SlideAction;
  createdDateTime: Date;
  updatedDateTime: Date;
};

export enum SlideType {
  Image = "Image",
  Video = "Video",
}

export type SlideAction = {
  setGameStatus: GameStatus;
  newTourId?: Tour["id"];
};

export type SetSlideActionRequest = {
  setGameStatus: GameStatus;
  newTourId?: Tour["id"];
};

export type SetSlideOrderRequest = {
  slideId: Slide["id"];
  order: number;
};
