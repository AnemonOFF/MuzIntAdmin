"use client";

import { useCreatePresentationMutation } from "@/entities/presentation";
import { GamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import React from "react";

export interface CreatePresentationProps {
  gamePackId: GamePack["id"];
  onCreate?: () => void;
}

const CreatePresentation: React.FC<CreatePresentationProps> = ({
  gamePackId,
  onCreate,
}) => {
  const { mutate, isPending } = useCreatePresentationMutation();

  const createPresentation = () => {
    mutate(
      { gamePackId: gamePackId },
      {
        onSuccess: () => {
          if (onCreate) onCreate();
        },
      }
    );
  };

  return (
    <Button onClick={createPresentation} disabled={isPending}>
      Создать презентацию
    </Button>
  );
};

export default React.memo(CreatePresentation);
