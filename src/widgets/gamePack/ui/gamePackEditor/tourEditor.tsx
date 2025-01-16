"use client";

import { useTourQuery } from "@/entities/tour";
import { BlockEditor, TourName } from "@/features/gamePack";
import { Tour } from "@/shared/types/gamePack";
import Loader from "@/shared/ui/loader";
import React from "react";

export interface TourEditorProps {
  id: Tour["id"];
}

const TourEditor: React.FC<TourEditorProps> = ({ id }) => {
  const { data: tour, isLoading, isSuccess } = useTourQuery(id);

  if (isLoading || !isSuccess) return <Loader text="Загрузка тура" />;

  return (
    <div className="space-y-5 py-5">
      <TourName id={id} />
      {tour.blocks.map((block) => (
        <BlockEditor id={block.id} key={`block_${block.id}`} />
      ))}
    </div>
  );
};

export default React.memo(TourEditor);
