"use client";

import { usePresentationQuery } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import Loader from "@/shared/ui/loader";
import React, { useCallback, useEffect, useState } from "react";
import SlideViewer from "./slideViewer";
import { cn } from "@/shared/lib/utils";
import { Game } from "@/shared/types/game";
import {
  useGameProceedPresentationMutation,
  useGameQuery,
} from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";

export interface PresentationViewerProps {
  presentationId: Presentation["id"];
  gameId?: Game["id"];
  canGoBack?: boolean;
}

/**
 * При указаном gameId - параметр canGoBack всегда false
 */
const PresentationViewer: React.FC<PresentationViewerProps> = ({
  presentationId,
  gameId,
  canGoBack = false,
}) => {
  const { data: game, isSuccess: isGameLoaded } = useGameQuery(
    gameId!,
    !!gameId
  );
  const { data: gamePack, isSuccess: isGamePackLoaded } = useGamePackQuery(
    // @ts-expect-error on isGameLoaded, game won't be undefined
    game?.gamePackId,
    isGameLoaded && !!game
  );
  const { mutate: proceedPresentation, isPending: isProceedingPresentation } =
    useGameProceedPresentationMutation();
  const { data: presentation, isSuccess: isPresentationLoaded } =
    usePresentationQuery(presentationId);
  const [loadedSlides, setLoadedSlides] = useState<Set<Slide["id"]>>(new Set());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const orderedSlides = presentation?.slides.sort((a, b) => a.order - b.order);

  const onSlideLoad = useCallback(
    (id: Slide["id"]) => setLoadedSlides((prev) => new Set(prev.add(id))),
    []
  );

  useEffect(() => {
    if (
      !isPresentationLoaded ||
      loadedSlides.size !== presentation.slides.length ||
      (!!gameId && !isGamePackLoaded)
    ) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canGoBack) {
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "ArrowRight" || e.key === " ") {
        setCurrentSlideIndex((prev) =>
          presentation && prev < presentation.slides.length - 1
            ? prev + 1
            : prev
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [
    canGoBack,
    isPresentationLoaded,
    loadedSlides.size,
    presentation,
    gameId,
    isGamePackLoaded,
  ]);

  if (!isPresentationLoaded || (!!gameId && !isGamePackLoaded)) {
    return (
      <div className="h-full w-full flex items-center justify-center grow">
        <Loader text="Загрузка информации о презентации" />
      </div>
    );
  }

  return (
    <>
      {loadedSlides.size !== presentation.slides.length && (
        <div className="absolute z-10 top-0 left-0 h-full w-full flex flex-col items-center justify-center gap-2 bg-black">
          <Loader text="Загрузка файлов презентации" />
          <p>
            Загружено {loadedSlides.size} из {presentation.slides.length}
          </p>
        </div>
      )}
      {orderedSlides!.map((slide, index) => (
        <div
          className={cn(
            "w-full h-full max-w-[100vw] max-h-screen grow flex flex-col items-center justify-center",
            {
              hidden: currentSlideIndex !== index,
            }
          )}
          onDoubleClick={() =>
            setCurrentSlideIndex((prev) =>
              prev < presentation.slides.length - 1 ? index + 1 : prev
            )
          }
          key={slide.id}
        >
          <SlideViewer
            slide={slide}
            onLoad={onSlideLoad}
            isCurrent={currentSlideIndex === index}
            gameId={gameId}
            gamePack={gamePack}
          />
        </div>
      ))}
    </>
  );
};

export default React.memo(PresentationViewer);
