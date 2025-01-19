"use client";

import {
  useGameQuery,
  useGameStatusMutation,
  useGameStore,
} from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";
import { GameStatus } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useState } from "react";

export interface StartTourProps {}

const StartTour: React.FC<StartTourProps> = ({}) => {
  const [newTourId, setTourId] = useState<number>();
  const { mutate, isPending } = useGameStatusMutation();
  const gameId = useGameStore((state) => state.id);
  const { data: game, isSuccess: isGameLoaded } = useGameQuery(
    gameId,
    !!gameId
  );
  const { data: gamePack, isSuccess: isGamePackLoaded } = useGamePackQuery(
    // @ts-expect-error on isGameLoaded, game won't be undefined
    game?.gamePackId,
    isGameLoaded
  );

  if (!isGameLoaded || !isGamePackLoaded) {
    return <Skeleton className="w-full h-20" />;
  }

  const startTour = () => {
    mutate({
      gameId: gameId,
      status: GameStatus.TourInProgress,
      newTourId: newTourId,
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        onValueChange={(v) => setTourId(parseInt(v))}
        disabled={isPending}
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите тур" />
        </SelectTrigger>
        <SelectContent>
          {gamePack.tours.map((tour) => (
            <SelectItem value={tour.id.toString()} key={tour.id}>
              {tour.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={startTour} disabled={!newTourId || isPending}>
        Начать тур
      </Button>
    </div>
  );
};

export default React.memo(StartTour);
