"use client";

import { useCreateTourMutation } from "@/entities/tour";
import { GamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";

export interface CreateTourProps {
  gamePackId: GamePack["id"];
  order?: number;
}

const CreateTour: React.FC<CreateTourProps> = ({ gamePackId, order }) => {
  const { mutate, isPending } = useCreateTourMutation(gamePackId);

  const handleClick = () => {
    mutate(
      {
        gamePackId: gamePackId,
        name: "Новый тур",
        order: order ?? 1,
      },
      {
        onError: () => toast.error("Не удалось создать новый тур"),
      }
    );
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      <IconPlus />
    </Button>
  );
};

export default React.memo(CreateTour);
