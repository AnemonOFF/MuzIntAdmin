"use client";

import { useDeleteTourMutation } from "@/entities/tour";
import { GamePack } from "@/shared/types/gamePack";
import { Tour } from "@/shared/types/tour";
import { Button } from "@/shared/ui/button";
import ConfirmModal from "@/shared/ui/confirmModal";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

export interface DeleteTourProps {
  id: Tour["id"];
  gamePackId?: GamePack["id"];
}

const DeleteTour: React.FC<DeleteTourProps> = ({ id, gamePackId }) => {
  const { mutate, isPending } = useDeleteTourMutation(gamePackId);

  return (
    <ConfirmModal
      onConfirm={() => mutate(id)}
      text="Вы уверены что хотите удалить этот тур?"
      trigger={
        <Button
          size="icon"
          className="bg-transparent text-foreground hover:bg-red-200 hover:text-red-500"
          disabled={isPending}
        >
          <IconTrashFilled />
        </Button>
      }
    />
  );
};

export default React.memo(DeleteTour);
