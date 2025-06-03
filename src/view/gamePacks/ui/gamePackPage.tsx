"use client";

import { useGamePackPresentationQuery } from "@/entities/gamePack";
import {
  DeletePresentation,
  CreatePresentation,
} from "@/features/presentation";
import { GamePack } from "@/shared/types/gamePack";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { GamePackEditor } from "@/widgets/gamePack";
import { PresentationEditor } from "@/widgets/presentation";
import { IconEyeCheck } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

export interface GamePackPageProps {
  id: GamePack["id"];
}

const GamePackPage: React.FC<GamePackPageProps> = ({ id }) => {
  const [currentEditor, setCurrentEditor] = useState<
    "gamePack" | "presentation"
  >("gamePack");
  const { data: presentation, isSuccess: isPresentationChecked } =
    useGamePackPresentationQuery(id);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 items-center justify-between max-md:flex-col">
        <span>
          {currentEditor === "gamePack"
            ? `Пакет игр (${id})`
            : `Презентация (${presentation?.id})`}
        </span>
        {isPresentationChecked ? (
          <div className="flex gap-2 items-center justify-end max-md:flex-col">
            {currentEditor === "presentation" ? (
              <>
                <Button onClick={() => setCurrentEditor("gamePack")}>
                  Редактировать пак игры
                </Button>
                {!!presentation && (
                  <>
                    <DeletePresentation
                      presentationId={presentation.id}
                      onDelete={() => setCurrentEditor("gamePack")}
                    />
                    <Button asChild size="icon">
                      <Link
                        href={`/presentations/${presentation.id}/viewer`}
                        target="_blank"
                      >
                        <IconEyeCheck />
                      </Link>
                    </Button>
                  </>
                )}
              </>
            ) : !presentation ? (
              <CreatePresentation
                gamePackId={id}
                onCreate={() => setCurrentEditor("presentation")}
              />
            ) : (
              <Button onClick={() => setCurrentEditor("presentation")}>
                Редактировать презентацию
              </Button>
            )}
          </div>
        ) : (
          <Skeleton className="w-full max-w-48 h-full" />
        )}
      </div>
      {currentEditor === "gamePack" ? (
        <GamePackEditor id={id} />
      ) : (
        <PresentationEditor id={presentation!.id} gamePackId={id} />
      )}
    </div>
  );
};

export default React.memo(GamePackPage);
