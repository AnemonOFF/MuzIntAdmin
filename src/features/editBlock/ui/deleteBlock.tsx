"use client";

import { useDeleteBlockMutation } from "@/entities/block";
import { Block } from "@/shared/types/block";
import { Tour } from "@/shared/types/tour";
import { Button } from "@/shared/ui/button";
import ConfirmModal from "@/shared/ui/confirmModal";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

export interface DeleteBlockProps {
  id: Block["id"];
  tourId?: Tour["id"];
}

const DeleteBlock: React.FC<DeleteBlockProps> = ({ id, tourId }) => {
  const { mutate, isPending } = useDeleteBlockMutation(tourId);

  return (
    <ConfirmModal
      onConfirm={() => mutate(id)}
      text="Вы уверены что хотите удалить этот блок?"
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

export default React.memo(DeleteBlock);
