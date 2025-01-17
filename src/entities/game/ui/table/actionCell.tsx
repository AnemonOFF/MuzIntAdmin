"use client";

import React from "react";
import { useApproveGameMutation, useDeleteGameMutation } from "../../hooks";
import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { IconCheck, IconChevronRight, IconTrash } from "@tabler/icons-react";

export interface ActionCellProps {
  id: Game["id"];
  isApproved: boolean;
}

const ActionCell: React.FC<ActionCellProps> = ({ id, isApproved }) => {
  const { mutate: approve, isPending: isApproving } = useApproveGameMutation();
  const { mutate: deleteGame, isPending: isDeleting } = useDeleteGameMutation();

  const isPending = isApproving || isDeleting;

  if (isApproved) {
    return (
      <Button size="icon" variant="outline" asChild>
        <Link href={`/games/${id}`}>
          <IconChevronRight />
        </Link>
      </Button>
    );
  } else {
    return (
      <div className="flex gap-2 items-center">
        <Button
          size="icon"
          variant="outline"
          onClick={() => approve(id)}
          disabled={isPending}
          className="bg-green-600 text-white"
        >
          <IconCheck />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => deleteGame(id)}
          disabled={isPending}
        >
          <IconTrash />
        </Button>
      </div>
    );
  }
};

export default React.memo(ActionCell);
