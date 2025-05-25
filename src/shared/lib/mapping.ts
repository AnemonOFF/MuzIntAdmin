import { API_Game, Game } from "../types/game";
import {
  API_FullGamePack,
  API_GamePack,
  API_SimpleGamePack,
  FullGamePack,
  GamePack,
  SimpleGamePack,
} from "../types/gamePack";
import { API_Presentation, Presentation } from "../types/presentation";
import { API_Slide, Slide } from "../types/slide";
import { API_RefreshToken, RefreshToken } from "../types/user";

const mapRefreshToken = (apiResult: API_RefreshToken): RefreshToken => ({
  ...apiResult,
  expiredDateTime: new Date(apiResult.expiredDateTime + "Z"),
});

const mapGamePack = (apiResult: API_GamePack): GamePack => ({
  ...apiResult,
  createdDateTime: new Date(apiResult.createdDateTime + "Z"),
  updatedDateTime: new Date(apiResult.updatedDateTime + "Z"),
});

const mapSimpleGamePack = (apiResult: API_SimpleGamePack): SimpleGamePack =>
  mapGamePack(apiResult) as SimpleGamePack;

const mapFullGamePack = (apiResult: API_FullGamePack): FullGamePack =>
  mapGamePack(apiResult) as FullGamePack;

const mapGame = (apiResult: API_Game): Game => ({
  ...apiResult,
  endedTimeUTC: apiResult.endedTimeUTC
    ? new Date(apiResult.endedTimeUTC + "Z")
    : undefined,
  startedTimeUTC: apiResult.startedTimeUTC
    ? new Date(apiResult.startedTimeUTC + "Z")
    : undefined,
  startTimeUTC: new Date(apiResult.startTimeUTC + "Z"),
});

const mapSlide = (apiResult: API_Slide): Slide => ({
  ...apiResult,
  createdDateTime: new Date(apiResult.createdDateTime + "Z"),
  updatedDateTime: new Date(apiResult.updatedDateTime + "Z"),
});

const mapPresentation = (apiResult: API_Presentation): Presentation => ({
  ...apiResult,
  slides: apiResult.slides.map((s) => mapSlide(s)),
  createdDateTime: new Date(apiResult.createdDateTime + "Z"),
  updatedDateTime: new Date(apiResult.updatedDateTime + "Z"),
});

export const apiMapper = {
  mapRefreshToken,
  mapGamePack,
  mapSimpleGamePack,
  mapFullGamePack,
  mapGame,
  mapSlide,
  mapPresentation,
};
