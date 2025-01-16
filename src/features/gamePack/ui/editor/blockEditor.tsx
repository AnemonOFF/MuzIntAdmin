"use client";

import { useBlockQuery } from "@/entities/block";
import { Block } from "@/shared/types/gamePack";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export interface BlockEditorProps {
  id: Block["id"];
  editing?: boolean;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ id, editing }) => {
  const { data: block, isLoading, isSuccess } = useBlockQuery(id);

  if (isLoading || !isSuccess)
    return <Skeleton className="rounded-md h-64 w-full" />;

  return (
    <div className="rounded-md border p-2 space-y-2">
      {block.questions.map((question) => (
        <div className="flex gap-2" key={`question_${question.id}`}>
          <Input type="text" value={question.text} disabled={!editing} />
          <Input
            type="number"
            value={question.order}
            disabled={!editing}
            className="w-16"
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(BlockEditor);
