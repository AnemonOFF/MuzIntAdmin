"use client";

import { useDeletePresentationMutation } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export interface DeletePresentationProps {
  presentationId: Presentation["id"];
  onDelete?: () => void;
}

const DeletePresentation: React.FC<DeletePresentationProps> = ({
  presentationId,
  onDelete,
}) => {
  const { mutate, isPending } = useDeletePresentationMutation();

  const deletePresentation = () => {
    mutate(presentationId, {
      onSuccess: () => {
        if (onDelete) onDelete();
      },
    });
  };

  return (
    <Modal
      trigger={
        <Button variant="destructive" disabled={isPending}>
          <IconTrash /> Удалить презентацию
        </Button>
      }
      title={`Удалить презентацию?`}
      content={
        <div className="space-y-2">
          <p>Вы уверены что хотите удалить презентацию?</p>
          <Button
            variant="destructive"
            onClick={deletePresentation}
            disabled={isPending}
            className="w-full"
          >
            Я уверен, удалить
          </Button>
        </div>
      }
    />
  );
};

export default React.memo(DeletePresentation);
