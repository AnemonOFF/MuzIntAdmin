"use client";

import { useDeleteGameMutation } from "@/entities/game";
import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export interface DeleteGameProps {
  id: Game["id"];
  onDelete?: () => void;
}

const DeleteGame: React.FC<DeleteGameProps> = ({ id, onDelete }) => {
  const { mutate, isPending } = useDeleteGameMutation();

  const deleteGame = () => {
    mutate(id, {
      onSuccess: () => {
        if (onDelete) onDelete();
      },
    });
  };

  return (
    <Modal
      trigger={
        <Button size="icon" variant="outline">
          <IconTrash />
        </Button>
      }
      title={`Удалить игру?`}
      content={
        <div className="space-y-2">
          <p>Вы уверены что хотите удалить игру?</p>
          <p>
            После удаления, все данные связанные с этой игрой будут безвозвратно
            удалены, вы уверены, что хотите продолжить?
          </p>
          <Button
            variant="destructive"
            onClick={deleteGame}
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

export default React.memo(DeleteGame);
