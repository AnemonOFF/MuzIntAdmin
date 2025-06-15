"use client";

import {
  useGameStore,
  useTogglePresentationModeMutation,
} from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export interface SetGamePresentationModeProps {}

const SetGamePresentationMode: React.FC<
  SetGamePresentationModeProps
> = ({}) => {
  const { presentationMode, status, gameId } = useGameStore(
    useShallow((state) => ({
      presentationMode: state.presentationMode,
      status: state.status,
      gameId: state.id,
    }))
  );
  const { mutate: setPresentationMode, isPending: isTogglingPresentationMode } =
    useTogglePresentationModeMutation();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="presentationMode"
        checked={presentationMode}
        onCheckedChange={(checked) =>
          setPresentationMode({ gameId: gameId, isPresentationMode: !!checked })
        }
        disabled={
          status !== GameStatus.WaitForStart || isTogglingPresentationMode
        }
      />
      <Label htmlFor="presentationMode">Включить режим презентации</Label>
    </div>
  );
};

export default React.memo(SetGamePresentationMode);
