import { getRandomInt, getRandomTimeSpan } from "@/shared/lib/utils";
import { Player } from "@/shared/types/player";

export const mockTop = (top: number) => {
  return Array.from(Array(top).keys()).map((_, i) => ({
    id: -1 * (i + 1),
    name: `Тест ${i + 1}`,
    playArea: (i + 1).toString(),
    playerTours: Array.from(Array(getRandomInt(1, 3)).keys()).map((_, pti) => ({
      answers: [],
      answerTimeSpan: getRandomTimeSpan(15, 120),
      extraPoints: getRandomInt(0, 5),
      id: -1 * (i + 1) * (pti + 1),
      isAnswered: true,
      points: getRandomInt(2, 20),
      tourId: -1 * (pti + 1),
    })),
  }));
};

export const mockWinner: Player = mockTop(1)[0];
