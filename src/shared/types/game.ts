import { GamePack, Tour } from "./gamePack";

export type Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
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
}

export type CreateGameRequest = {
  gamePackId: GamePack["id"];
  startTimeUTC: Date;
  name: string;
};
