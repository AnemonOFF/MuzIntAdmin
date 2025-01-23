"use client";

import {
  useGamePackQuery,
  useUpdateGamePackMutation,
} from "@/entities/gamePack";
import { GamePack, UpdateGamePackRequest } from "@/shared/types/gamePack";
import { DebounceInput } from "@/shared/ui/debounceInput";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export interface GamePackNameProps {
  id: GamePack["id"];
}

const GamePackName: React.FC<GamePackNameProps> = ({ id }) => {
  const [value, setValue] = useState<string>();
  const { data: gamePack, isLoading, isSuccess } = useGamePackQuery(id);
  const { mutate: update } = useUpdateGamePackMutation();

  useEffect(() => {
    if (value) {
      const data: UpdateGamePackRequest = {
        name: value,
      };
      update([id, data], {
        onError: () => toast.error("Не удалось сохранить название пака"),
      });
    }
  }, [id, value, update]);

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-28 rounded-md" />;

  return (
    <DebounceInput
      id={`gamepack_${id}_name`}
      type="text"
      defaultValue={gamePack.name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default React.memo(GamePackName);
