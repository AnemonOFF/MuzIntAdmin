"use client";

import { useGameQuery, useGameStore } from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";
import { Tour } from "@/shared/types/tour";
import Loader from "@/shared/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import React, { useState } from "react";
import ResultTable from "./resultTable";

export interface PlayersResultProps {}

const PlayersResult: React.FC<PlayersResultProps> = ({}) => {
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
  const [tourId, setTourId] = useState<Tour["id"]>();
  // const [blockId, setBlockId] = useState<Block["id"]>();

  const selectTour = (value: string) => {
    // setBlockId(undefined);
    setTourId(value === "all" ? undefined : parseInt(value));
  };

  if (!isGamePackLoaded) return <Loader text="Загружаем статистику" />;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <Select
          defaultValue="all"
          value={tourId === undefined ? "all" : tourId.toString()}
          onValueChange={selectTour}
        >
          <SelectTrigger>
            <SelectValue placeholder="Тур" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {gamePack.tours.map((t) => (
              <SelectItem value={t.id.toString()} key={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <Select
        defaultValue="all"
        disabled={tourId === undefined}
        value={blockId === undefined ? "all" : blockId.toString()}
        onValueChange={(v) => setBlockId(v === "all" ? undefined : parseInt(v))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Блок" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {gamePack.tours
            .find((t) => t.id === tourId)
            ?.blocks.map((b) => (
              <SelectItem value={b.id.toString()} key={b.id}>
                {b.order}
              </SelectItem>
            ))}
        </SelectContent>
      </Select> */}
      </div>
      <ResultTable tourId={tourId} />
    </div>
  );
};

export default React.memo(PlayersResult);
