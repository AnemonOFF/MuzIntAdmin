"use client";

import { useGamePackQuery } from "@/entities/gamePack";
import {
  useDeleteSlideDynamicContentMutation,
  useUpdateSlideDynamicContentMutation,
} from "@/entities/presentation";
import { GamePack } from "@/shared/types/gamePack";
import { Presentation } from "@/shared/types/presentation";
import { Slide, SlideDynamicContentType } from "@/shared/types/slide";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import React from "react";

export interface SetSlideDynamicContentProps {
  presentationId: Presentation["id"];
  gamePackId: GamePack["id"];
  slide: Slide;
}

const SetSlideDynamicContent: React.FC<SetSlideDynamicContentProps> = ({
  presentationId,
  slide,
  gamePackId,
}) => {
  const { data: gamePack, isSuccess: isGamePackLoaded } =
    useGamePackQuery(gamePackId);
  const { mutate: updateDynamicContent, isPending: isUpdating } =
    useUpdateSlideDynamicContentMutation();
  const { mutate: deleteDynamicContent, isPending: isDeleting } =
    useDeleteSlideDynamicContentMutation();

  const setDynamicContent = (value: string) => {
    if (value === "none") {
      deleteDynamicContent({
        presentationId: presentationId,
        slideId: slide.id,
      });
    } else {
      updateDynamicContent({
        presentationId: presentationId,
        slideId: slide.id,
        dynamicContent: {
          dynamicContentType: value as SlideDynamicContentType,
          tourId: slide.dynamicContent?.tourId,
        },
      });
    }
  };

  const setTour = (value: string) => {
    if (!slide.dynamicContent) return;
    let tourId: number | undefined;
    if (value !== "global") {
      tourId = parseInt(value);
      if (isNaN(tourId)) tourId = undefined;
    }

    updateDynamicContent({
      presentationId: presentationId,
      slideId: slide.id,
      dynamicContent: {
        dynamicContentType: slide.dynamicContent.dynamicContentType,
        tourId: tourId,
      },
    });
  };

  return (
    <>
      <Select
        value={slide.dynamicContent?.dynamicContentType}
        defaultValue="none"
        onValueChange={setDynamicContent}
        disabled={
          isUpdating || isDeleting || !isGamePackLoaded || !!slide.questionId
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите динамический контент" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Без динамического контента</SelectItem>
          <SelectItem value={SlideDynamicContentType.Winner}>
            Победитель (1 место)
          </SelectItem>
          <SelectItem value={SlideDynamicContentType.Top5}>Топ-5</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={slide.dynamicContent?.tourId?.toString()}
        defaultValue="global"
        onValueChange={setTour}
        disabled={
          !slide.dynamicContent ||
          isUpdating ||
          isDeleting ||
          !isGamePackLoaded ||
          !!slide.questionId
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите область" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="global">Вся игра</SelectItem>
          {gamePack?.tours.map((tour) => (
            <SelectItem value={tour.id.toString()} key={tour.id}>
              Тур &quot;{tour.name}&quot;
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default React.memo(SetSlideDynamicContent);
