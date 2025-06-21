"use client";

import { useBlockQuery } from "@/entities/block";
import { Block } from "@/shared/types/block";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";
import {
  AddQuestion,
  DeleteQuestion,
  EditQuestion,
} from "@/features/editQuestion";
import { DeleteBlock } from "@/features/editBlock";
import { Tour } from "@/shared/types/tour";

export interface BlockEditorProps {
  id: Block["id"];
  tourId?: Tour["id"];
}

const BlockEditor: React.FC<BlockEditorProps> = ({ id, tourId }) => {
  const { data: block, isLoading, isSuccess } = useBlockQuery(id);

  if (isLoading || !isSuccess)
    return <Skeleton className="rounded-md h-64 w-full" />;

  return (
    <div className="rounded-md border p-2 space-y-2">
      <div className="flex gap-2 items-center">
        <DeleteBlock id={id} tourId={tourId} />
        <span>Блок {block.order}</span>
      </div>
      {block.questions
        .sort((a, b) => a.id - b.id)
        .map((question) => (
          <div
            className="grid grid-cols-[1fr_auto] w-full gap-2"
            key={`block_${id}_question_${question.id}`}
          >
            <EditQuestion id={question.id} blockId={id} />
            <DeleteQuestion id={question.id} blockId={id} />
          </div>
        ))}
      <AddQuestion blockId={id} />
    </div>
  );
};

export default React.memo(BlockEditor);
