import { Block } from "../types/block";
import { Game } from "../types/game";
import { GamePack } from "../types/gamePack";
import { Question } from "../types/question";
import { Tour } from "../types/tour";
import { User } from "../types/user";

export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  page: (page: number) => [...userKeys.list(), { page: page }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: User["id"]) => [...userKeys.details(), { id: id }] as const,
};

export const meKeys = {
  me: ["me"] as const,
};

export const gamePackKey = {
  all: ["gamePacks"] as const,
  simple: () => [...gamePackKey.all, "simple"] as const,
  simpleList: () => [...gamePackKey.simple(), "list"] as const,
  details: () => [...gamePackKey.all, "detail"] as const,
  detail: (id: GamePack["id"]) =>
    [...gamePackKey.details(), { id: id }] as const,
};

export const tourKey = {
  all: ["tours"] as const,
  list: () => [...tourKey.all, "list"] as const,
  gamePack: (gamePackId: GamePack["id"]) =>
    [...tourKey.list(), { gamePackId: gamePackId }] as const,
  details: () => [...tourKey.all, "detail"] as const,
  detail: (id: Tour["id"]) => [...tourKey.details(), { id: id }] as const,
};

export const blockKey = {
  all: ["blocks"] as const,
  list: () => [...blockKey.all, "list"] as const,
  tour: (tourId: Tour["id"]) =>
    [...blockKey.list(), { tourId: tourId }] as const,
  details: () => [...blockKey.all, "detail"] as const,
  detail: (id: Block["id"]) => [...blockKey.details(), { id: id }] as const,
};

export const gameKey = {
  all: ["games"] as const,
  list: () => [...gameKey.all, "list"] as const,
  page: (page: number, approved: boolean) => [
    ...gameKey.list(),
    { page: page, approved: approved },
  ],
  details: () => [...gameKey.all, "detail"] as const,
  detail: (id: Game["id"]) => [...gameKey.details(), { id: id }] as const,
  moderators: (id: Game["id"]) =>
    [...gameKey.detail(id), "moderators"] as const,
};

export const questionKey = {
  all: ["questions"] as const,
  list: () => [...questionKey.all, "list"] as const,
  block: (blockId: Block["id"]) =>
    [...questionKey.list(), { blockId: blockId }] as const,
  details: () => [...questionKey.all, "detail"] as const,
  detail: (id: Question["id"]) =>
    [...questionKey.details(), { id: id }] as const,
};
