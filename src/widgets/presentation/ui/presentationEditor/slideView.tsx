/* eslint-disable @next/next/no-img-element */
import {
  Slide,
  SlideDynamicContentType,
  SlideType,
} from "@/shared/types/slide";
import React from "react";
import WinnerPrePanel from "./panels/winnerPrePanel";
import TopPlayersPrePanel from "./panels/topPlayersPrePanel";

export interface SlideViewProps {
  slide?: Slide;
}

const SlideView: React.FC<SlideViewProps> = ({ slide }) => {
  return (
    <div className="aspect-video relative bg-muted">
      {!slide ? (
        <div className="w-full h-full flex items-center justify-center">
          <span>Выберите слайд</span>
        </div>
      ) : slide.type === SlideType.Image ? (
        <img
          src={slide.fileName}
          alt={`Показ ${slide.order} слайда`}
          className="w-full h-full object-fill"
        />
      ) : (
        <video
          src={slide.fileName}
          controls={true}
          muted={true}
          className="w-full h-full object-fill"
        />
      )}

      {slide?.dynamicContent &&
        (slide.dynamicContent.dynamicContentType ===
        SlideDynamicContentType.Winner ? (
          <WinnerPrePanel />
        ) : (
          <TopPlayersPrePanel />
        ))}
    </div>
  );
};

export default React.memo(SlideView);
