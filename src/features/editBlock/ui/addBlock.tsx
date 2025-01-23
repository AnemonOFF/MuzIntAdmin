"use client";

import { useCreateBlockMutation } from "@/entities/block";
import { Tour } from "@/shared/types/tour";
import { Button } from "@/shared/ui/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";

export interface AddBlockProps {
  tourId: Tour["id"];
  order?: number;
}

const AddBlock: React.FC<AddBlockProps> = ({ tourId, order }) => {
  const { mutate: create, isPending } = useCreateBlockMutation(tourId);

  const handleClick = () => {
    create(
      {
        tourId: tourId,
        order: order ?? 1,
      },
      {
        onError: () => {
          toast.error("Не удалось создать новый блок вопросов");
        },
      }
    );
  };

  return (
    <Button
      variant="ghost"
      className="w-full h-20 bg-muted hover:bg-blue-200"
      onClick={handleClick}
      disabled={isPending}
    >
      <IconPlus />
      <span>Блок вопросов</span>
    </Button>
  );
};

export default React.memo(AddBlock);
