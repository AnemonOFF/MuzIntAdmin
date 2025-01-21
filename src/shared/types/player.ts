import { Question, Tour } from "./gamePack";

export type Player = {
  id: number;
  name: string;
  playArea: string;
  playerTours: PlayerTour[];
};

export type PlayerWithPoints = {
  id: Player["id"];
  name: string;
  playArea: string;
  points: number;
  extraPoints: number;
};

export type PlayerTour = {
  id: number;
  tourId: Tour["id"];
  points: number;
  extraPoints: number;
  isAnswered: boolean;
  answers: Answer[];
};

export type Answer = {
  questionId: Question["id"];
  order: number;
};
