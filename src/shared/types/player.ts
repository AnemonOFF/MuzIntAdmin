import { Question } from "./question";
import { Tour } from "./tour";

export type Player = {
  id: number;
  name: string;
  playArea: string;
  playerTours: PlayerTour[];
};

export type PlayerWithScore = {
  id: Player["id"];
  name: string;
  playArea: string;
  points: number;
  extraPoints: number;
  totalPoints: number;
  time: number;
};

export type PlayerTour = {
  id: number;
  tourId: Tour["id"];
  points: number;
  extraPoints: number;
  isAnswered: boolean;
  answerTimeSpan: string;
  answers: Answer[];
};

export type Answer = {
  questionId: Question["id"];
  order: number;
};
