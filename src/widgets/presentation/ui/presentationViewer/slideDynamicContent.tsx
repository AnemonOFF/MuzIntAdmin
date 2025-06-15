"use client";

import { Slide, SlideDynamicContentType } from "@/shared/types/slide";
import React, { useMemo } from "react";
import SlideWinnerPanel from "./slideWinnerPanel";
import { Game } from "@/shared/types/game";
import { FullGamePack } from "@/shared/types/gamePack";
import SlideTopPanel from "./slideTopPanel";

export interface SlideDynamicContentProps {
  slide: Slide;
  show: boolean;
  gameId?: Game["id"];
  gamePack?: FullGamePack;
}

const SlideDynamicContentCard: React.FC<SlideDynamicContentProps> = ({
  slide,
  show,
  gameId,
  gamePack,
}) => {
  const notIntoResultTourIds = useMemo(
    () => gamePack?.tours.filter((t) => !t.takeIntoResult).map((t) => t.id),
    [gamePack]
  );

  if (!slide.dynamicContent || !show) return null;

  const dynamicContentType = slide.dynamicContent.dynamicContentType;
  if (dynamicContentType === SlideDynamicContentType.Winner) {
    return (
      <SlideWinnerPanel
        gameId={gameId}
        notIntoResultTourIds={gameId ? notIntoResultTourIds! : []}
      />
    );
  }

  if (dynamicContentType === SlideDynamicContentType.Top5) {
    return (
      <SlideTopPanel
        top={5}
        gameId={gameId}
        notIntoResultTourIds={gameId ? notIntoResultTourIds! : []}
        tourId={slide.dynamicContent.tourId}
      />
    );
  }

  return null;
};

export default React.memo(SlideDynamicContentCard);
