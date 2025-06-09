import { GameStatus } from "./game";
import { Question } from "./question";
import { Tour } from "./tour";

export type API_Slide = {
  id: number;
  fileName: string;
  type: SlideType;
  soundFileName?: string;
  order: number;
  action?: SlideAction;
  questionId?: Question["id"];
  dynamicContent?: SlideDynamicContent;
  createdDateTime: string;
  updatedDateTime: string;
};

export type Slide = {
  id: number;
  fileName: string;
  type: SlideType;
  soundFileName?: string;
  order: number;
  action?: SlideAction;
  questionId?: Question["id"];
  dynamicContent?: SlideDynamicContent;
  createdDateTime: Date;
  updatedDateTime: Date;
};

export type SlideDynamicContent = {
  dynamicContentType: SlideDynamicContentType;
  tourId?: Tour["id"];
};

export enum SlideDynamicContentType {
  Winner = "Winner",
  Top5 = "Top5",
}

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

export type SetSlideDynamicContentRequest = {
  dynamicContentType: SlideDynamicContentType;
  tourId?: Tour["id"];
};
