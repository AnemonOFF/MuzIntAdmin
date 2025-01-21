"use client";

import { useAddModeratorMutation } from "@/entities/game";
import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

export interface AddModeratorProps {
  gameId: Game["id"];
}

const AddModarator: React.FC<AddModeratorProps> = ({ gameId }) => {
  const [addId, setAddId] = useState("");
  const { mutate, isPending } = useAddModeratorMutation();

  const onAdd = () => {
    const id = parseInt(addId);
    mutate(
      {
        gameId: gameId,
        moderatorId: id,
      },
      {
        onSuccess: () => setAddId(""),
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              const errors = Object.values(
                error.response.data.errors
              ) as string[];
              toast.error(errors[0], {
                richColors: true,
                duration: 15000,
              });
            } else {
              toast.error("Не удалось добавить модератора", {
                richColors: true,
                duration: 15000,
              });
            }
          }
        },
      }
    );
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Добавить модератора по Id"
        value={addId}
        onChange={(e) => setAddId(e.target.value)}
        disabled={isPending}
      />
      <Button
        size="icon"
        variant="outline"
        onClick={onAdd}
        disabled={isPending}
      >
        <IconPlus />
      </Button>
    </div>
  );
};

export default React.memo(AddModarator);
