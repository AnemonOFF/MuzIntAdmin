"use client";

import { usePresentationQuery } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import Loader from "@/shared/ui/loader";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SlideViewer from "./slideViewer";
import { cn } from "@/shared/lib/utils";
import { Game } from "@/shared/types/game";
import {
  useGamePresentationStateQuery,
  useGameProceedPresentationMutation,
  useGameQuery,
} from "@/entities/game";
import { useGamePackQuery } from "@/entities/gamePack";
import PresentationLoader from "./presentationLoader";

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
  const {
    data: gamePresentationState,
    isSuccess: isGamePresentationStateLoaded,
    isLoading: isGamePresentationStateLoading,
  } = useGamePresentationStateQuery(gameId!, !!gameId);
  const [loadedSlides, setLoadedSlides] = useState<Set<Slide["id"]>>(new Set());
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const orderedSlides = useMemo(
    () => presentation?.slides.sort((a, b) => a.order - b.order),
    [presentation?.slides]
  );
  const [userInteracted, setUserInteracted] = useState(false);

  const presentationStateRef = useRef({
    isSuccess: isGamePresentationStateLoaded,
    isLoading: isGamePresentationStateLoading,
    isProceedingPresentation: isProceedingPresentation,
    currentSlide: orderedSlides ? orderedSlides[currentSlideIndex] : undefined,
  });
  presentationStateRef.current.isLoading = isGamePresentationStateLoading;
  presentationStateRef.current.isSuccess = isGamePresentationStateLoaded;
  presentationStateRef.current.isProceedingPresentation =
    isProceedingPresentation;
  presentationStateRef.current.currentSlide = orderedSlides
    ? orderedSlides[currentSlideIndex]
    : undefined;

  const onSlideLoad = useCallback(
    (id: Slide["id"]) => setLoadedSlides((prev) => new Set(prev.add(id))),
    []
  );

  const nextSlide = useCallback(() => {
    if (gameId) {
      if (
        presentationStateRef.current.isProceedingPresentation ||
        presentationStateRef.current.isLoading ||
        !presentationStateRef.current.isSuccess ||
        !presentationStateRef.current.currentSlide
      ) {
        return;
      }
      proceedPresentation({
        gameId: gameId,
        currentSlideId: presentationStateRef.current.currentSlide.id,
      });
    } else {
      let returnFlag = false;
      setCurrentSlideIndex((prev) => {
        returnFlag = !presentation || prev >= presentation.slides.length - 1;
        return returnFlag ? prev : prev + 1;
      });
      if (returnFlag) return;
    }
  }, [presentation, proceedPresentation, gameId]);

  const previousSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  useEffect(() => {
    if (!gamePresentationState) return;
    const newSlideId = gamePresentationState.currentSlideId;
    const newSlideIndex = orderedSlides?.findIndex((s) => s.id === newSlideId);
    if (!newSlideIndex) return;
    setCurrentSlideIndex(newSlideIndex);
  }, [gamePresentationState, orderedSlides]);

  useEffect(() => {
    if (
      !isPresentationLoaded ||
      loadedSlides.size !== presentation.slides.length ||
      (!!gameId && !isGamePackLoaded)
    ) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isProceedingPresentation) return;
      if (e.key === "ArrowLeft" && canGoBack && !gameId) {
        previousSlide();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dblclick", nextSlide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dblclick", nextSlide);
    };
  }, [
    canGoBack,
    isPresentationLoaded,
    loadedSlides.size,
    presentation,
    gameId,
    isGamePackLoaded,
    isProceedingPresentation,
    previousSlide,
    nextSlide,
  ]);

  useEffect(() => {
    const handler = () => setUserInteracted(true);
    document.addEventListener("click", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", handler);
    };
  }, []);

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
          // onDoubleClick={nextSlide}
          key={slide.id}
        >
          <SlideViewer
            slide={slide}
            onLoad={onSlideLoad}
            isCurrent={currentSlideIndex === index}
            isUserInteracted={userInteracted}
            gameId={gameId}
            gamePack={gamePack}
            watermark={game?.watermark}
          />
        </div>
      ))}
      <PresentationLoader
        isLoading={isProceedingPresentation || isGamePresentationStateLoading}
      />
    </>
  );
};

export default React.memo(PresentationViewer);
