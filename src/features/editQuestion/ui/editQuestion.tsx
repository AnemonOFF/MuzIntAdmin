"use client";

import {
  useQuestionQuery,
  useUpdateQuestionMutation,
} from "@/entities/question";
import { Block } from "@/shared/types/block";
import { Question, UpdateQuestionRequest } from "@/shared/types/question";
import { DebounceInput } from "@/shared/ui/debounceInput";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export interface EditQuestion {
  id: Question["id"];
  blockId?: Block["id"];
}

const EditQuestion: React.FC<EditQuestion> = ({ id, blockId }) => {
  const [text, setText] = useState<string>();
  const [order, setOrder] = useState<number>();
  const { data: question, isLoading, isSuccess } = useQuestionQuery(id);
  const { mutate: update } = useUpdateQuestionMutation(blockId);

  useEffect(() => {
    if (text || order) {
      const data: UpdateQuestionRequest = {
        text: text,
        order: order,
      };
      update([id, data], {
        onError: () => toast.error("Не удалось сохранить изменение вопроса"),
      });
    }
  }, [id, text, order, update]);

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-full rounded-md" />;

  return (
    <div className="flex gap-2" key={`question_${question.id}`}>
      <DebounceInput
        type="text"
        defaultValue={question.text}
        onChange={(e) => setText(e.target.value)}
      />
      <DebounceInput
        type="number"
        defaultValue={question.order}
        className="w-16"
        onChange={(e) => setOrder(parseInt(e.target.value))}
        min={1}
      />
    </div>
  );
};

export default React.memo(EditQuestion);
