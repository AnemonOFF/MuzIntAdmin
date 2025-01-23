import { Question } from "./question";
import { Tour } from "./tour";

export type Block = {
  id: number;
  order: number;
  questions: Question[];
};

export type CreateBlockRequest = {
  tourId: Tour["id"];
  order: number;
};

export type UpdateBlockRequest = {
  order?: number;
};
