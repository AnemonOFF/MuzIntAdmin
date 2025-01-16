export type GamePack = {
  id: number;
  name: string;
  createdDateTime: Date;
  updatedDateTime: Date;
};

export type SimpleGamePack = GamePack & {
  toursCount: number;
};

export type FullGamePack = GamePack & {
  tours: Tour[];
};

export type Tour = {
  id: number;
  name: string;
  order: number;
  blocks: Block[];
};

export type Block = {
  id: number;
  order: number;
  questions: Question[];
};

export type Question = {
  id: number;
  text: string;
  order: number;
};

export type CreateGamePackRequest = {
  name: string;
};
