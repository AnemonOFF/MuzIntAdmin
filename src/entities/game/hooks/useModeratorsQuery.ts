import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery } from "@tanstack/react-query";

const useModeratorsQuery = (gameId: Game["id"]) => {
  return useQuery({
    queryKey: gameKey.moderators(gameId),
    queryFn: async () => await gamesController.getModerators(gameId),
  });
};

export default useModeratorsQuery;
