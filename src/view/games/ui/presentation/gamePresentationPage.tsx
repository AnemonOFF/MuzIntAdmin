"use client";

import { useGamePresentationQuery } from "@/entities/game";
import { Game } from "@/shared/types/game";
import Loader from "@/shared/ui/loader";
import { PresentationViewer } from "@/widgets/presentation";
import React from "react";

export interface PresentationViewerPageProps {
  id: Game["id"];
}

const GamePresentationPage: React.FC<PresentationViewerPageProps> = ({
  id,
}) => {
  const { data: presentation, isSuccess: isPresentationLoaded } =
    useGamePresentationQuery(id);

  if (!isPresentationLoaded) {
    return (
      <div className="w-screen min-h-screen p-5 flex items-center justify-center bg-black text-white">
        <Loader text="Загрузка..." />
      </div>
    );
  }

  return (
    <PresentationViewer
      presentationId={presentation.id}
      gameId={id}
      canGoBack
    />
  );
};

export default React.memo(GamePresentationPage);
