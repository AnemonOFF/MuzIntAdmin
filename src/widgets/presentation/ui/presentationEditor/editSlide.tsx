"use client";

import {
  DeleteSlide,
  SetSlideAction,
  SetSlideDynamicContent,
  UpdateSlideAudio,
  UpdateSlideContent,
} from "@/features/presentation";
import AssignSlideToQuestion from "@/features/presentation/ui/assignSlideToQuestion";
import { GameStatus } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import React from "react";

export interface EditSlideProps {
  presentationId: Presentation["id"];
  gamePackId: GamePack["id"];
  slide?: Slide;
  gameStatus?: GameStatus;
  unselectSlide: () => void;
}

const EditSlide: React.FC<EditSlideProps> = ({
  presentationId,
  gamePackId,
  gameStatus,
  slide,
  unselectSlide,
}) => {
  if (!slide) return <p className="text-center">Выберите слайд</p>;

  return (
    <div className="space-y-5 overflow-y-auto">
      <div className="flex gap-2 items-center justify-between">
        <span>Слайд {slide.order}</span>
        <DeleteSlide
          presentationId={presentationId}
          slideId={slide.id}
          onDelete={unselectSlide}
          key={slide.id}
        />
      </div>
      <div className="space-y-2">
        <p>Контент:</p>
        <UpdateSlideContent
          presentationId={presentationId}
          slideId={slide.id}
          key={slide.id}
        />
      </div>
      <div className="space-y-2">
        <p>Аудио:</p>
        {slide.soundFileName && <audio controls src={slide.soundFileName} />}
        <UpdateSlideAudio
          presentationId={presentationId}
          slideId={slide.id}
          key={slide.id}
        />
      </div>
      <div className="space-y-2">
        <p>Действие:</p>
        <SetSlideAction
          gamePackId={gamePackId}
          presentationId={presentationId}
          slide={slide}
          slideStatus={gameStatus ?? GameStatus.WaitForStart}
          key={slide.id}
        />
      </div>
      <div className="space-y-2">
        <p>Динамический контент:</p>
        <SetSlideDynamicContent
          gamePackId={gamePackId}
          presentationId={presentationId}
          slide={slide}
          key={slide.id}
        />
      </div>
      <div className="space-y-2">
        <p>Привязка к вопросу:</p>
        <AssignSlideToQuestion
          gamePackId={gamePackId}
          presentationId={presentationId}
          slide={slide}
          key={slide.id}
        />
      </div>
    </div>
  );
};

export default React.memo(EditSlide);
