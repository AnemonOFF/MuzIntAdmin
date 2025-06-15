"use client";

import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import { IconPresentation } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { useGameStore } from "../model/gameStore";

export interface GamePresentationLinkProps {
  gameId: Game["id"];
}

const GamePresentationLink: React.FC<GamePresentationLinkProps> = ({
  gameId,
}) => {
  const presentationMode = useGameStore((state) => state.presentationMode);

  if (!presentationMode) return null;

  return (
    <Button asChild size="icon" variant="outline" disabled={!presentationMode}>
      <Link href={`/games/${gameId}/presentation`} target="_blank">
        <IconPresentation />
      </Link>
    </Button>
  );
};

export default React.memo(GamePresentationLink);
