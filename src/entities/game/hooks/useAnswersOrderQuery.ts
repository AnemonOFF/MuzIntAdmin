import { gamesController } from "@/shared/api/client";
import { gameKey } from "@/shared/lib/queryKeyFactory";
import { Game } from "@/shared/types/game";
import { useQuery } from "@tanstack/react-query";

const useAnswersOrderQuery = (id: Game["id"], enabled?: boolean) => {
  return useQuery({
    queryKey: gameKey.answersOrder(id),
    queryFn: async () => await gamesController.getAnswersOrder(id),
    enabled: enabled,
  });
};

export default useAnswersOrderQuery;
