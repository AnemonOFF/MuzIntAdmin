import { useCreateQuestionMutation } from "@/entities/question";
import { Block } from "@/shared/types/block";
import { Button } from "@/shared/ui/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";

export interface AddQuestionProps {
  blockId: Block["id"];
}

const AddQuestion: React.FC<AddQuestionProps> = ({ blockId }) => {
  const { mutate: create, isPending } = useCreateQuestionMutation(blockId);

  const handleClick = () => {
    create(
      {
        blockId: blockId,
        order: 1,
        text: "Новый вопрос",
      },
      {
        onError: () => {
          toast.error("Не удалось создать новый вопрос");
        },
      }
    );
  };

  return (
    <Button
      variant="ghost"
      className="w-full bg-muted hover:bg-blue-200"
      onClick={handleClick}
      disabled={isPending}
    >
      <IconPlus />
      <span>Вопрос</span>
    </Button>
  );
};

export default React.memo(AddQuestion);
