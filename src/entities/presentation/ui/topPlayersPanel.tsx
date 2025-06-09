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
    <Card className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%]">
      <CardHeader>
        <CardTitle>{title ?? `Топ-${show}`}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Место</TableHead>
              <TableHead>Баллы</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players
              .sort((a, b) => a.totalPoints - b.totalPoints)
              .slice(0, show)
              .map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.playArea}</TableCell>
                  <TableCell>{player.totalPoints}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default React.memo(TopPlayersPanel);
