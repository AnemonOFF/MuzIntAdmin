"use client";

import { useGamePackQuery } from "@/entities/gamePack";
import { GamePackName } from "@/features/gamePack";
import { GamePack } from "@/shared/types/gamePack";
import Loader from "@/shared/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React from "react";
import TourEditor from "./tourEditor";

export interface GamePackEditorProps {
  id: GamePack["id"];
}

const GamePackEditor: React.FC<GamePackEditorProps> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGamePackQuery(id);

  if (isLoading || !isSuccess) return <Loader text="Загрузка пака игр" />;

  return (
    <div className="space-y-5">
      <GamePackName id={id} />
      {data.tours.length > 0 && (
        <Tabs defaultValue={data.tours[0].id.toString()}>
          <TabsList>
            {data.tours.map((tour) => (
              <TabsTrigger value={tour.id.toString()} key={`tour_${tour.id}`}>
                {tour.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.tours.map((tour) => (
            <TabsContent
              value={tour.id.toString()}
              key={`tour_${tour.id}_content`}
            >
              <TourEditor id={tour.id} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default React.memo(GamePackEditor);
