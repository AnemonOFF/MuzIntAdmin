"use client";

import { WinnerPanel } from "@/entities/presentation";
import { Slide } from "@/shared/types/slide";
import React from "react";

export interface SlideWinnerPanelProps {
  slide: Slide;
}

const SlideWinnerPanel: React.FC<SlideWinnerPanelProps> = ({ slide }) => {
  return <WinnerPanel winner={} />;
};

export default React.memo(SlideWinnerPanel);
