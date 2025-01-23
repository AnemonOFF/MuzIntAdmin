"use client";

import { useDeleteQuestionMutation } from "@/entities/question";
import { Block } from "@/shared/types/block";
import { Question } from "@/shared/types/question";
import { Button } from "@/shared/ui/button";
import ConfirmModal from "@/shared/ui/confirmModal";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

export interface DeleteQuestionProps {
  id: Question["id"];
  blockId?: Block["id"];
}

const DeleteQuestion: React.FC<DeleteQuestionProps> = ({ id, blockId }) => {
  const { mutate, isPending } = useDeleteQuestionMutation(blockId);

  return (
    <ConfirmModal
      onConfirm={() => mutate(id)}
      text="Вы уверены что хотите удалить этот вопрос?"
      trigger={
        <Button
          size="icon"
          className="bg-transparent hover:bg-red-200 text-red-500"
          disabled={isPending}
        >
          <IconTrashFilled />
        </Button>
      }
    />
  );
};

export default React.memo(DeleteQuestion);
