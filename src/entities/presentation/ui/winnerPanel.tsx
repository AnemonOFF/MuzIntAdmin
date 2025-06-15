import { PlayerWithScore } from "@/shared/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import React from "react";

export interface WinnerPanelProps {
  winner: PlayerWithScore;
}

const WinnerPanel: React.FC<WinnerPanelProps> = ({ winner }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-5 flex items-center justify-center">
      <Card className="w-max min-w-[50%] max-w-full max-h-full overflow-y-auto backdrop-blur-xl bg-background/80">
        <CardContent className="w-full h-full p-5">
          <p className="text-2xl">И наш победитель...</p>
          <p className="text-5xl font-bold pt-5">{winner.name}!</p>
          <p>Место {winner.playArea}</p>
          <p className="pt-5">
            Набрано{" "}
            <span className="font-semibold">{winner.totalPoints} баллов</span>{" "}
            {winner.extraPoints > 1
              ? `(из них ${winner.extraPoints} дополнительных!)`
              : ""}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(WinnerPanel);
