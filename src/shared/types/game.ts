import { GamePack, Tour } from "./gamePack";

export type Game = {
  id: number;
  name: string;
  isApproved: boolean;
  isStarted: boolean;
  isEnded: boolean;
  status: GameStatus;
  startedTimeUTC?: Date;
  endedTimeUTC?: Date;
  currentTourId: Tour["id"];
  gamePackId: GamePack["id"];
};

export enum GameStatus {
  WaitForStart,
  TourInProgress,
  TourResults,
  Results,
  Ended,
}

export type CreateGameRequest = {
  gamePackId: GamePack["id"];
  startTimeUTC: Date;
  name: string;
};
