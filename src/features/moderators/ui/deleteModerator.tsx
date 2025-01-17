"use client";

import { useDeleteModeratorMutation } from "@/entities/game";
import { Game } from "@/shared/types/game";
import { User } from "@/shared/types/user";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconMinus } from "@tabler/icons-react";
import React, { useState } from "react";
import { toast } from "sonner";

export interface DeleteModeratorProps {
  gameId: Game["id"];
  moderatorId: User["id"];
}

const DeleteModerator: React.FC<DeleteModeratorProps> = ({
  gameId,
  moderatorId,
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteModeratorMutation();

  const onDelete = () => {
    mutate(
      {
        gameId: gameId,
        moderatorId: moderatorId,
      },
      {
        onSuccess: () => setOpen(false),
        onError: () => toast.error("Не удалось удалить модератора"),
      }
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="icon" variant="destructive">
          <IconMinus />
        </Button>
      }
      title={`Удалить игру?`}
      content={
        <div className="space-y-2">
          <p>Вы уверены что хотите удалить модератора?</p>
          <Button
            variant="destructive"
            onClick={onDelete}
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

export default React.memo(DeleteModerator);
