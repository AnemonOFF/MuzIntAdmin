"use client";

import { useGamePackQuery } from "@/entities/gamePack";
import { DeleteGamePack, EditGamePackName } from "@/features/gamePack";
import { GamePack } from "@/shared/types/gamePack";
import Loader from "@/shared/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React from "react";
import TourEditor from "./tourEditor";
import { useRouter } from "next/navigation";
import { CreateTour } from "@/features/editTour";

export interface GamePackEditorProps {
  id: GamePack["id"];
}

const GamePackEditor: React.FC<GamePackEditorProps> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useGamePackQuery(id);

  if (isLoading || !isSuccess) return <Loader text="Загрузка пака игр" />;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <EditGamePackName id={id} />
        <DeleteGamePack
          gamePack={data}
          onDelete={() => router.push("/gamepacks")}
        />
      </div>
      {data.tours.length > 0 && (
        <Tabs
          className="items-center"
          defaultValue={data.tours[0].id.toString()}
        >
          <div className="flex gap-2 items-center">
            <CreateTour
              gamePackId={id}
              order={
                data.tours.reduce(
                  (max, v) => (v.order > max ? v.order : max),
                  0
                ) + 1
              }
            />
            <TabsList>
              {data.tours.map((tour) => (
                <TabsTrigger value={tour.id.toString()} key={`tour_${tour.id}`}>
                  {tour.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {data.tours.map((tour) => (
            <TabsContent
              value={tour.id.toString()}
              key={`tour_${tour.id}_content`}
            >
              <TourEditor id={tour.id} gamePackId={id} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default React.memo(GamePackEditor);
