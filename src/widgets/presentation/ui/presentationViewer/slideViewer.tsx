/* eslint-disable @next/next/no-img-element */
"use client";

import { useLoadFile } from "@/entities/file";
import { Slide, SlideType } from "@/shared/types/slide";
import React, { useState, useEffect, useRef } from "react";
import SlideDynamicContent from "./slideDynamicContent";
import { Game, Watermark } from "@/shared/types/game";
import { FullGamePack } from "@/shared/types/gamePack";

export interface SlideViewerProps {
  slide: Slide;
  onLoad: (id: Slide["id"]) => void;
  isCurrent: boolean;
  isUserInteracted: boolean;
  gameId?: Game["id"];
  gamePack?: FullGamePack;
  watermark?: Watermark;
}

const SlideViewer: React.FC<SlideViewerProps> = ({
  onLoad,
  slide,
  isCurrent,
  gameId,
  gamePack,
  isUserInteracted,
  watermark,
}) => {
  const [loadState, setLoadState] = useState({
    contentLoaded: false,
    audioLoaded: !slide.soundFileName,
  });
  const { blobUrl: videoUrl, isLoaded: isVideoLoaded } = useLoadFile(
    slide.fileName,
    slide.type === SlideType.Video,
    () => setLoadState((prevState) => ({ ...prevState, contentLoaded: true }))
  );
  const { blobUrl: soundUrl, isLoaded: isSoundLoaded } = useLoadFile(
    slide.soundFileName!,
    !!slide.soundFileName,
    () => setLoadState((prevState) => ({ ...prevState, audioLoaded: true }))
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!loadState.contentLoaded || !loadState.audioLoaded || !isUserInteracted)
      return;
    if (isCurrent) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isCurrent, loadState, isUserInteracted]);

  useEffect(() => {
    if (loadState.contentLoaded && loadState.audioLoaded) {
      onLoad(slide.id);
    }
  }, [loadState, onLoad, slide.id]);

  return (
    <div className="relative w-full h-full max-w-[100vw] max-h-screen aspect-video mx-auto place-self-center">
      {slide.type === SlideType.Image ? (
        <img
          src={slide.fileName}
          alt={`Слайд ${slide.order}`}
          onLoad={() =>
            setLoadState((prevState) => ({ ...prevState, contentLoaded: true }))
          }
          className="w-full h-full object-contain"
        />
      ) : (
        isVideoLoaded && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted={true}
            autoPlay={false}
            controls={false}
            className="w-full h-full object-contain"
          />
        )
      )}
      {slide.soundFileName && isSoundLoaded && (
        <audio
          ref={audioRef}
          src={soundUrl}
          autoPlay={false}
          controls={false}
        />
      )}
      {slide.dynamicContent && (
        <SlideDynamicContent
          slide={slide}
          show={isCurrent}
          gameId={gameId}
          gamePack={gamePack}
        />
      )}
      {watermark && (
        <img
          src={watermark.fileName}
          alt="Вотермарка"
          className="absolute"
          style={{
            width: watermark.widthPercentage + "%",
            height: watermark.heightPercentage + "%",
            left: watermark.leftPercentage + "%",
            top: watermark.topPercentage + "%",
            right: watermark.rightPercentage + "%",
            bottom: watermark.bottomPercentage + "%",
            transform: `translate(${watermark.translateXPercentage}%, ${watermark.translateYPercentage}%) rotate(${watermark.rotateDegrees}deg)`,
          }}
        />
      )}
    </div>
  );
};

export default React.memo(SlideViewer);
