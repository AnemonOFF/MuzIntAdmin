/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";
import {
  Slide,
  SlideDynamicContentType,
  SlideType,
} from "@/shared/types/slide";
import { Button } from "@/shared/ui/button";
import React from "react";
import PreviewPanel from "./panels/previewPanel";

export interface SlidePreviewProps {
  slide: Slide;
  active?: boolean;
  onClick: (slide: Slide) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slide,
  onClick,
  active = false,
}) => {
  return (
    <Button
      className={cn(
        "aspect-video w-40 h-auto p-0 m-0 rounded border-2 !text-background text-xl relative group min-w-[200px]",
        { "border-primary": active }
      )}
      variant="outline"
      onClick={() => onClick(slide)}
    >
      {slide.type === SlideType.Image ? (
        <img
          src={slide.fileName}
          alt={`Превью ${slide.order} слайда`}
          className="w-full h-full object-fill rounded"
        />
      ) : (
        <video
          src={slide.fileName}
          controls={false}
          muted={true}
          autoPlay={false}
          className="w-full h-full object-fill rounded"
        />
      )}
      {slide?.dynamicContent &&
        (slide.dynamicContent.dynamicContentType ===
        SlideDynamicContentType.Winner ? (
          <PreviewPanel text="Победитель" />
        ) : (
          <PreviewPanel text="Топ игроки" />
        ))}
      <div className="absolute rounded w-full h-full left-0 top-0 bg-foreground/50 font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="">{slide.order}</span>
      </div>
    </Button>
  );
};

export default React.memo(SlidePreview);
