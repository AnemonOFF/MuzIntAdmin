import { Player, PlayerWithScore } from "@/shared/types/player";
import { Tour } from "@/shared/types/tour";

export const calculatePlayerScore = (
  player: Player,
  skipTourIds: Tour["id"][],
  tourId?: Tour["id"]
): PlayerWithScore => {
  let points = 0;
  let extraPoints = 0;
  let time = 0;
  if (tourId) {
    if (!skipTourIds.includes(tourId)) {
      const tour = player.playerTours.find((t) => t.tourId === tourId);
      points = tour?.points ?? 0;
      extraPoints = tour?.extraPoints ?? 0;
      time =
        tour?.answerTimeSpan
          .split(":")
          .map((v) => parseInt(v))
          .reduceRight((sum, v, i) => sum + v * 60 ** i, 0) ?? 0;
    }
  } else {
    const validPlayerTours = player.playerTours.filter(
      (pt) => !skipTourIds.includes(pt.tourId)
    );
    points = validPlayerTours.reduce((sum, t) => sum + t.points, 0);
    extraPoints = validPlayerTours.reduce((sum, t) => sum + t.extraPoints, 0);
    time = validPlayerTours.reduce(
      (sum, t) =>
        sum +
        t.answerTimeSpan
          .split(":")
          .map((v) => parseInt(v))
          .reduceRight((sum, v, i) => sum + v * 60 ** i, 0),
      0
    );
  }
  return {
    id: player.id,
    name: player.name,
    playArea: player.playArea,
    points: points,
    extraPoints: extraPoints,
    totalPoints: points + extraPoints,
    time: time,
  };
};
