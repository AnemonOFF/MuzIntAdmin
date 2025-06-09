import { PlayerWithScore } from "@/shared/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import React from "react";

export interface WinnerPanelProps {
  winner: PlayerWithScore;
}

const WinnerPanel: React.FC<WinnerPanelProps> = ({ winner }) => {
  return (
    <Card className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%]">
      <CardHeader>
        <CardTitle>Наш победитель:</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{winner.name}!</p>
        <div className="flex justify-between gap-2">
          <div className="">Место: {winner.playArea}</div>
          <div className="">{winner.totalPoints} баллов</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(WinnerPanel);
