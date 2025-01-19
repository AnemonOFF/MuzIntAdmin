import { Question, Tour } from "./gamePack";

export type Player = {
  id: number;
  name: string;
  playArea: string;
  tours: PlayerTour[];
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
