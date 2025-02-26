"use client";

import { useTourQuery } from "@/entities/tour";
import { Tour } from "@/shared/types/tour";
import Loader from "@/shared/ui/loader";
import React from "react";
import BlockEditor from "./blockEditor";
import {
  DeleteTour,
  EditTourIntoResult,
  EditTourName,
} from "@/features/editTour";
import { AddBlock } from "@/features/editBlock";
import { GamePack } from "@/shared/types/gamePack";

export interface TourEditorProps {
  id: Tour["id"];
  gamePackId?: GamePack["id"];
}

const TourEditor: React.FC<TourEditorProps> = ({ id, gamePackId }) => {
  const { data: tour, isLoading, isSuccess } = useTourQuery(id);

  if (isLoading || !isSuccess) return <Loader text="Загрузка тура" />;

  return (
    <div className="space-y-5 py-5">
      <div className="flex gap-2">
        <DeleteTour id={id} gamePackId={gamePackId} />
        <EditTourName id={id} />
      </div>
      <EditTourIntoResult id={id} />
      {tour.blocks.map((block) => (
        <BlockEditor id={block.id} key={`block_${block.id}`} />
      ))}
      <AddBlock
        tourId={id}
        order={
          tour.blocks.reduce((max, v) => (v.order > max ? v.order : max), 0) + 1
        }
      />
    </div>
  );
};

export default React.memo(TourEditor);
