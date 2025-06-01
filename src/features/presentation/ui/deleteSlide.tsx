"use client";

import { useDeleteSlideMutation } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export interface DeleteSlideProps {
  presentationId: Presentation["id"];
  slideId: Slide["id"];
  onDelete?: () => void;
}

const DeleteSlide: React.FC<DeleteSlideProps> = ({
  slideId,
  presentationId,
  onDelete,
}) => {
  const { mutate, isPending } = useDeleteSlideMutation();

  const deleteSlide = () => {
    mutate(
      {
        presentationId: presentationId,
        slideId: slideId,
      },
      {
        onSuccess: () => {
          if (onDelete) onDelete();
        },
      }
    );
  };

  return (
    <Modal
      trigger={
        <Button variant="destructive" size="icon" disabled={isPending}>
          <IconTrash />
        </Button>
      }
      title={`Удалить слайд?`}
      content={
        <div className="space-y-2">
          <p>Вы уверены что хотите удалить слайд?</p>
          <Button
            variant="destructive"
            onClick={deleteSlide}
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

export default React.memo(DeleteSlide);
