import { PlayerWithScore } from "@/shared/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import React from "react";

export interface TopPlayersPanelProps {
  players: PlayerWithScore[];
  show: number;
  title?: string;
}

const TopPlayersPanel: React.FC<TopPlayersPanelProps> = ({
  players,
  show,
  title,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-5 flex items-center justify-center z-20">
      <Card className="w-max min-w-[50%] max-w-full max-h-full overflow-y-auto backdrop-blur-xl bg-background/80">
        <CardHeader>
          <CardTitle className="text-3xl">{title ?? `Топ-${show}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="px-5">Имя</TableHead>
                <TableHead className="px-5">Место</TableHead>
                <TableHead className="px-5 text-right">Баллы</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .slice(0, show)
                .map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="px-5">{player.name}</TableCell>
                    <TableCell className="px-5">{player.playArea}</TableCell>
                    <TableCell className="px-5 text-right font-semibold">
                      {player.totalPoints}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(TopPlayersPanel);
