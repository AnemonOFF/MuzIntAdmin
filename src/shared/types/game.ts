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
  presentationState: GamePresentationState;
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
  presentationState: GamePresentationState;
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
