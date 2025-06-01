"use client";

import { useGamePackQuery } from "@/entities/gamePack";
import { GameStatus } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";
import { SetSlideActionRequest, SlideAction } from "@/shared/types/slide";
import { Tour } from "@/shared/types/tour";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useCallback } from "react";

export interface StartTourActionProps {
  gamePackId: GamePack["id"];
  onActionChange: (slideAction: SetSlideActionRequest) => void;
  currentAction?: SlideAction;
  disabled?: boolean;
}

const StartTourAction: React.FC<StartTourActionProps> = ({
  gamePackId,
  onActionChange,
  currentAction,
  disabled = false,
}) => {
  const { data: gamePack, isSuccess: isGamePackLoaded } =
    useGamePackQuery(gamePackId);

  const onChange = useCallback(
    (value: string) => {
      const tourId: Tour["id"] = parseInt(value);
      onActionChange({
        setGameStatus: GameStatus.TourInProgress,
        newTourId: tourId,
      });
    },
    [onActionChange]
  );

  if (!isGamePackLoaded) return <Skeleton className="w-full h-8 rounded" />;

  return (
    <Select
      onValueChange={onChange}
      value={currentAction?.newTourId?.toString()}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Выберите тур" />
      </SelectTrigger>
      <SelectContent>
        {gamePack.tours.map((tour) => (
          <SelectItem value={tour.id.toString()} key={tour.id}>
            {tour.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default React.memo(StartTourAction);
