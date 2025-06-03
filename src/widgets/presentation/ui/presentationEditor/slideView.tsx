/* eslint-disable @next/next/no-img-element */
import { Slide, SlideType } from "@/shared/types/slide";
import React from "react";

export interface SlideViewProps {
  slide?: Slide;
}

const SlideView: React.FC<SlideViewProps> = ({ slide }) => {
  return (
    <div className="aspect-video w-full h-full relative bg-muted">
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
    </div>
  );
};

export default React.memo(SlideView);
