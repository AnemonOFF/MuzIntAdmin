"use client";

import {
  useDeleteSlideActionMutation,
  useUpdateSlideActionMutation,
} from "@/entities/presentation";
import { GameStatus } from "@/shared/types/game";
import { GamePack } from "@/shared/types/gamePack";
import { Presentation } from "@/shared/types/presentation";
import { SetSlideActionRequest, Slide } from "@/shared/types/slide";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import StartTourAction from "./startTourAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export interface SetSlideActionProps {
  presentationId: Presentation["id"];
  gamePackId: GamePack["id"];
  slide: Slide;
  slideStatus: GameStatus;
}

const SetSlideAction: React.FC<SetSlideActionProps> = ({
  presentationId,
  gamePackId,
  slide,
  slideStatus,
}) => {
  const [preActionStatus, setPreActionStatus] = useState<string>();
  const { mutate: updateAction, isPending: isUpdateActionLoading } =
    useUpdateSlideActionMutation();
  const { mutate: deleteAction, isPending: isDeleteActionLoading } =
    useDeleteSlideActionMutation();
  const isPending = isUpdateActionLoading || isDeleteActionLoading;

  const changeAction = useCallback(
    (action: SetSlideActionRequest) => {
      updateAction({
        action: action,
        presentationId: presentationId,
        slideId: slide.id,
      });
    },
    [presentationId, slide.id, updateAction]
  );

  const availableActions = useMemo(() => {
    const result: Record<string, SetSlideActionRequest & { node?: ReactNode }> =
      {};
    if (slideStatus === GameStatus.WaitForStart) {
      result["Начать тур"] = {
        setGameStatus: GameStatus.TourInProgress,
        node: (
          <StartTourAction
            gamePackId={gamePackId}
            onActionChange={changeAction}
            currentAction={slide.action}
            disabled={isPending}
          />
        ),
      };
      result["Показать результаты игры"] = {
        setGameStatus: GameStatus.Results,
      };
      result["Завершить игру"] = {
        setGameStatus: GameStatus.Ended,
      };
    } else if (slideStatus === GameStatus.TourInProgress) {
      result["Завершить тур"] = {
        setGameStatus: GameStatus.TourEnd,
      };
    } else if (slideStatus === GameStatus.TourEnd) {
      result["Показать результаты тура"] = {
        setGameStatus: GameStatus.TourResults,
      };
    } else if (slideStatus === GameStatus.TourResults) {
      result["Начать тур"] = {
        setGameStatus: GameStatus.TourInProgress,
        node: (
          <StartTourAction
            gamePackId={gamePackId}
            onActionChange={changeAction}
            currentAction={slide.action}
            disabled={isPending}
          />
        ),
      };
      result["Показать результаты игры"] = {
        setGameStatus: GameStatus.Results,
      };
      result["Завершить игру"] = {
        setGameStatus: GameStatus.Ended,
      };
    } else if (slideStatus === GameStatus.Results) {
      result["Завершить игру"] = {
        setGameStatus: GameStatus.Ended,
      };
    } else if (slideStatus === GameStatus.Ended) {
      // No actions available
    }
    return result;
  }, [changeAction, gamePackId, isPending, slide.action, slideStatus]);

  const currentValue =
    Object.entries(availableActions).find(
      (entry) => slide.action?.setGameStatus === entry[1].setGameStatus
    )?.[0] ?? "none";

  useEffect(() => {
    const action = availableActions[currentValue];
    if (!!action?.node) setPreActionStatus(currentValue);
  }, [currentValue, availableActions]);

  const onSelect = (value: string) => {
    if (value === "none") {
      setPreActionStatus(undefined);
      deleteAction({
        presentationId: presentationId,
        slideId: slide.id,
      });
      return;
    }

    const { node, ...data } = availableActions[value]!;
    setPreActionStatus(node === undefined ? undefined : value);
    if (!node) {
      updateAction({
        action: data,
        presentationId: presentationId,
        slideId: slide.id,
      });
    }
  };

  const actionsKeys = Object.keys(availableActions);
  const disabled = actionsKeys.length === 0;

  return (
    <>
      <Select
        value={preActionStatus ?? currentValue}
        onValueChange={onSelect}
        defaultValue="none"
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите действие" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Без действий</SelectItem>
          {actionsKeys.map((a) => (
            <SelectItem value={a} key={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {preActionStatus && availableActions[preActionStatus].node}
    </>
  );
};

export default React.memo(SetSlideAction);
