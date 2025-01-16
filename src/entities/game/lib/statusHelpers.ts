import { GameStatus } from "@/shared/types/game";

export const statusLabels: { [key in GameStatus]: string } = {
  WaitForStart: "Ожидание начала",
  TourInProgress: "Тур в процессе",
  TourResults: "Результаты тура",
  Results: "Результаты игры",
  Ended: "Игра завершена",
};
