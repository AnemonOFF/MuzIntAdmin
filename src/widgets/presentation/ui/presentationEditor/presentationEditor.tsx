"use client";

import { usePresentationQuery } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import Loader from "@/shared/ui/loader";
import React, { useMemo, useState } from "react";
import CreateSlideModal from "./createSlideModal";
import SlidePreview from "./slidePreview";
import SlideView from "./slideView";
import EditSlide from "./editSlide";
import { GameStatus } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";

export interface PresentationEditorProps {
  gamePackId: GamePack["id"];
  id: Presentation["id"];
}

const PresentationEditor: React.FC<PresentationEditorProps> = ({
  id,
  gamePackId,
}) => {
  const { data: presentation, isSuccess } = usePresentationQuery(id);
  const [currentSlideId, setCurrentSlideId] = useState<Slide["id"]>();

  const slidesStatus = useMemo(() => {
    if (!presentation?.slides) return {};
    return presentation.slides
      .sort((a, b) => a.order - b.order)
      .reduce((res, slide, i, arr) => {
        let status = GameStatus.WaitForStart;
        if (i > 0) {
          const prev = arr[i - 1];
          if (prev.action) status = prev.action.setGameStatus;
          else {
            const values = Object.values(res);
            status = values[values.length - 1];
          }
        }
        return { ...res, [slide.id]: status };
      }, {} as Record<Slide["id"], GameStatus>);
  }, [presentation?.slides]);

  if (!isSuccess) return <Loader text="Загрузка редактора презентации..." />;

  const currentSlide = presentation.slides.find((s) => s.id === currentSlideId);
  const currentSlideStatus = currentSlideId
    ? slidesStatus[currentSlideId]
    : undefined;

  return (
    <div className="grid md:grid-cols-[1fr_auto] max-md:grid-cols-1 gap-5">
      <div className="flex items-center justify-center">
        <SlideView slide={currentSlide} />
      </div>
      <div className="min-w-80 max-lg:min-w-60 max-md:border-t md:border-l p-5 overflow-y-auto">
        <EditSlide
          presentationId={id}
          gamePackId={gamePackId}
          slide={currentSlide}
          gameStatus={currentSlideStatus}
          unselectSlide={() => setCurrentSlideId(undefined)}
        />
      </div>
      <div className="md:col-span-2 flex items-center justify-start gap-2 min-h-32 overflow-x-auto border-t p-5">
        {presentation.slides
          .sort((a, b) => a.order - b.order)
          .map((s) => (
            <SlidePreview
              slide={s}
              onClick={(slide) => setCurrentSlideId(slide.id)}
              active={s.id === currentSlide?.id}
              key={s.id}
            />
          ))}
        <CreateSlideModal presentationId={id} />
      </div>
    </div>
  );
};

export default React.memo(PresentationEditor);
