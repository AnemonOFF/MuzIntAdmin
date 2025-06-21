import { Block } from "./block";
import { GamePack } from "./gamePack";
import { Presentation } from "./presentation";
import { Tour } from "./tour";

export type API_Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
  isRandomAnswers: boolean;
  isPresentationMode: boolean;
  presentationState: GamePresentationState;
  watermark?: Watermark;
  startTimeUTC: string;
  startedTimeUTC?: string;
  endedTimeUTC?: string;
  currentTourId: Tour["id"];
  gamePackId: GamePack["id"];
};

export type Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
  isRandomAnswers: boolean;
  isPresentationMode: boolean;
  presentationState: GamePresentationState;
  watermark?: Watermark;
  startTimeUTC: Date;
  startedTimeUTC?: Date;
  endedTimeUTC?: Date;
  currentTourId: Tour["id"];
  gamePackId: GamePack["id"];
};

export enum GameStatus {
  WaitForStart = "WaitForStart",
  TourInProgress = "TourInProgress",
  TourResults = "TourResults",
  Results = "Results",
  Ended = "Ended",
  TourEnd = "TourEnd",
}

export type CreateGameRequest = {
  gamePackId: GamePack["id"];
  startTimeUTC: Date;
  name: string;
};

export type GamePresentationState = {
  currentSlideId: Presentation["id"];
};

export type Watermark = {
  widthPercentage: string;
  heightPercentage: string;
  leftPercentage: string;
  topPercentage: string;
  rightPercentage: string;
  bottomPercentage: string;
  translateXPercentage: string;
  translateYPercentage: string;
  rotateDegrees: string;
  fileName: string;
};

export type SetWatermarkRequest = Omit<Watermark, "fileName">;

export type AnswersOrder = {
  blocks: Block[];
};
