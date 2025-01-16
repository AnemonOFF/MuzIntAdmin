"use client";

import React from "react";
import { useApproveGameMutation } from "../../hooks";
import { Game } from "@/shared/types/game";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";

export interface ActionCellProps {
  id: Game["id"];
  isApproved: boolean;
}

const ActionCell: React.FC<ActionCellProps> = ({ id, isApproved }) => {
  const { mutate, isPending } = useApproveGameMutation();

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
      <Button
        size="icon"
        variant="outline"
        onClick={() => mutate(id)}
        disabled={isPending}
      >
        <IconCheck />
      </Button>
    );
  }
};

export default React.memo(ActionCell);
