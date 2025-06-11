import { Slide, SlideDynamicContentType } from "@/shared/types/slide";
import React from "react";
import SlideWinnerPanel from "./slideWinnerPanel";

export interface SlideDynamicContentProps {
  slide: Slide;
}

const SlideDynamicContentCard: React.FC<SlideDynamicContentProps> = ({
  slide,
}) => {
  if (!slide.dynamicContent) return null;
  if (
    slide.dynamicContent.dynamicContentType === SlideDynamicContentType.Winner
  ) {
    return <SlideWinnerPanel slide={slide} />;
  }

  return null;
};

export default React.memo(SlideDynamicContentCard);
