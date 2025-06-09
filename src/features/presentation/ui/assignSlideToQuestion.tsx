import { useGamePackQuery } from "@/entities/gamePack";
import {
  useAssignSlideToQuestionMutation,
  useUnassignSlideToQuestionMutation,
} from "@/entities/presentation";
import { GamePack } from "@/shared/types/gamePack";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import React, { useEffect, useMemo, useState } from "react";

export interface AssignSlideToQuestionProps {
  presentationId: Presentation["id"];
  gamePackId: GamePack["id"];
  slide: Slide;
}

const AssignSlideToQuestion: React.FC<AssignSlideToQuestionProps> = ({
  gamePackId,
  presentationId,
  slide,
}) => {
  const [blockId, setBlockId] = useState("none");
  const [tourId, setTourId] = useState("none");
  const { data: gamePack, isSuccess: isGamePackLoaded } =
    useGamePackQuery(gamePackId);
  const { mutate: assign, isPending: isAssigning } =
    useAssignSlideToQuestionMutation();
  const { mutate: unassign, isPending: isUnassigning } =
    useUnassignSlideToQuestionMutation();

  const block = useMemo(() => {
    if (blockId === "none" || !gamePack) return null;
    return gamePack.tours
      .flatMap((t) => t.blocks)
      .find((b) => b.id.toString() === blockId);
  }, [blockId, gamePack]);

  const tour = useMemo(() => {
    if (tourId === "none" || !gamePack) return null;
    return gamePack.tours.find((t) => t.id.toString() === tourId);
  }, [tourId, gamePack]);

  useEffect(() => {
    if (!gamePack || !slide.questionId) {
      setBlockId("none");
      return;
    }
    const tour = gamePack.tours.find((t) =>
      t.blocks
        .flatMap((b) => b.questions)
        .find((q) => q.id === slide.questionId)
    );
    setTourId(tour!.id.toString());
    const block = tour?.blocks.find((b) =>
      b.questions.find((q) => q.id === slide.questionId)
    );
    setBlockId(block!.id.toString());
  }, [gamePack, slide]);

  const setTour = (value: string) => {
    if (value === "none" && slide.questionId) {
      unassign({
        presentationId: presentationId,
        slideId: slide.id,
      });
    }

    setTourId(value);
  };

  const setBlock = (value: string) => {
    if (value === "none" && slide.questionId) {
      unassign({
        presentationId: presentationId,
        slideId: slide.id,
      });
    }

    setBlockId(value);
  };

  const setQuestion = (value: string) => {
    if (value === "none") {
      if (slide.questionId) {
        unassign({
          presentationId: presentationId,
          slideId: slide.id,
        });
      }
    } else {
      assign({
        presentationId: presentationId,
        slideId: slide.id,
        questionId: parseInt(value),
      });
    }
  };

  return (
    <>
      <Select
        value={tourId}
        defaultValue="none"
        onValueChange={setTour}
        disabled={
          isAssigning ||
          isUnassigning ||
          !isGamePackLoaded ||
          !!slide.dynamicContent
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите тур для привязки" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Без привязки</SelectItem>
          {gamePack?.tours.map((tour) => (
            <SelectItem value={tour.id.toString()} key={tour.id}>
              {tour.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={blockId}
        defaultValue="none"
        onValueChange={setBlock}
        disabled={
          isAssigning ||
          isUnassigning ||
          tourId === "none" ||
          !isGamePackLoaded ||
          !!slide.dynamicContent
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите блок вопросов для привязки" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Без привязки</SelectItem>
          {tour?.blocks.map((block) => (
            <SelectItem value={block.id.toString()} key={block.id}>
              Блок {block.order}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={slide.questionId?.toString()}
        defaultValue="none"
        onValueChange={setQuestion}
        disabled={
          isAssigning ||
          isUnassigning ||
          tourId === "none" ||
          blockId === "none" ||
          !isGamePackLoaded ||
          !!slide.dynamicContent
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите вопрос для привязки" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Без привязки</SelectItem>
          {block?.questions.map((question) => (
            <SelectItem value={question.id.toString()} key={question.id}>
              {question.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default React.memo(AssignSlideToQuestion);
