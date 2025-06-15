"use client";

import { useGameStore, useToggleRandomMutation } from "@/entities/game";
import { GameStatus } from "@/shared/types/game";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export interface SetGameRandomProps {}

const SetGameRandom: React.FC<SetGameRandomProps> = ({}) => {
  const { random, status, gameId } = useGameStore(
    useShallow((state) => ({
      random: state.randomMode,
      status: state.status,
      gameId: state.id,
    }))
  );
  const { mutate: setRandom, isPending: isTogglingPresentationMode } =
    useToggleRandomMutation();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="randomMode"
        checked={random}
        onCheckedChange={(checked) =>
          setRandom({ gameId: gameId, isRandom: !!checked })
        }
        disabled={
          status !== GameStatus.WaitForStart || isTogglingPresentationMode
        }
      />
      <Label htmlFor="randomMode">Включить рандомизацию</Label>
    </div>
  );
};

export default React.memo(SetGameRandom);
