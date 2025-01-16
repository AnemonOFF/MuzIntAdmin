"use client";

import { useDeleteGamePackMutation } from "@/entities/gamePack";
import { GamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export interface DeleteGamePackProps {
  gamePack: GamePack;
  onDelete?: () => void;
}

const DeleteGamePack: React.FC<DeleteGamePackProps> = ({
  gamePack,
  onDelete,
}) => {
  const { mutate, isPending } = useDeleteGamePackMutation();

  const deleteGamePack = () => {
    mutate(gamePack.id);
    if (onDelete) onDelete();
  };

  return (
    <Modal
      trigger={
        <Button size="icon" variant="destructive">
          <IconTrash />
        </Button>
      }
      title={`Удалить ${gamePack.name}?`}
      content={
        <div className="space-y-2">
          <p>
            Вы уверены что хотите удалить пак игры{" "}
            <b>&quot;{gamePack.name}&quot;</b>
          </p>
          <p>
            После удаления, все данные связанные с этой игрой будут безвозвратно
            удалены, вы уверены, что хотите продолжить?
          </p>
          <Button
            variant="destructive"
            onClick={deleteGamePack}
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

export default React.memo(DeleteGamePack);
