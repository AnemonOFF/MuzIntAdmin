import { Block } from "./block";

export type Question = {
  id: number;
  text: string;
  order: number;
};

export type CreateQuestionRequest = {
  blockId: Block["id"];
  text: string;
  order: number;
};

export type UpdateQuestionRequest = {
  text?: string;
  order?: number;
};
