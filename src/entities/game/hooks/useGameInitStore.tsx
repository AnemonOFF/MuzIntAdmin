"use client";

import { Game } from "@/shared/types/game";
import { useGameStore } from "../model/gameStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { Collection } from "@/shared/types/generic";
import { Player } from "@/shared/types/player";
import { toast } from "sonner";
import { useModeratorSignalREffect } from "@/shared/api/client/signalR";
import { Button } from "@/shared/ui/button";

const useGameInitStore = (gameId: Game["id"]) => {
  const connection = useGameStore((state) => state.connection);
  const {
    setPlayers,
    setStatus,
    reset,
    setTourId,
    addPlayer,
    updatePlayer,
    setPresentationMode,
    setRandom,
  } = useGameStore(
    useShallow((state) => ({
      setPlayers: state.setPlayers,
      setStatus: state.setStatus,
      setTourId: state.setTourId,
      reset: state.reset,
      addPlayer: state.addPlayer,
      updatePlayer: state.updatePlayer,
      setPresentationMode: state.setPresentationMode,
      setRandom: state.setRandom,
    }))
  );

  useEffect(() => {
    reset(gameId);

    const initStatus = () => {
      connection
        ?.invoke("GetGameData", gameId)
        .then((data: Game) => {
          if (!data) {
            toast.error("Не удалось получить статус игры", {
              action: <Button onClick={initStatus}>Повторить</Button>,
            });
          } else {
            setStatus(data.status);
            setTourId(data.currentTourId);
            setPresentationMode(data.isPresentationMode);
            setRandom(data.isRandomAnswers);
          }
        })
        .catch(() => {
          toast.error("Не удалось получить статус игры", {
            action: <Button onClick={initStatus}>Повторить</Button>,
          });
        });
    };

    const initPlayers = () => {
      connection
        ?.invoke("GetPlayers", gameId)
        .then((data: Collection<Player> | null) => {
          if (!data) {
            toast.error("Не удалось получить игроков", {
              action: <Button onClick={initPlayers}>Повторить</Button>,
            });
          } else {
            setPlayers(data.items);
          }
        })
        .catch(() => {
          toast.error("Не удалось получить игроков", {
            action: <Button onClick={initPlayers}>Повторить</Button>,
          });
        });
    };

    initStatus();
    initPlayers();
  }, [
    gameId,
    connection,
    setStatus,
    setPlayers,
    setTourId,
    reset,
    setRandom,
    setPresentationMode,
  ]);

  useModeratorSignalREffect(
    "PlayerAdded",
    (data: Player) => {
      addPlayer(data);
    },
    []
  );

  useModeratorSignalREffect(
    "GameStatusChanged",
    (data: Game) => {
      setStatus(data.status);
      setTourId(data.currentTourId);
    },
    []
  );

  useModeratorSignalREffect(
    "PlayerUpdated",
    (data: Player) => {
      updatePlayer(data);
    },
    []
  );

  useModeratorSignalREffect(
    "GamePresentationModeChanged",
    (data: boolean) => {
      setPresentationMode(data);
    },
    []
  );

  useModeratorSignalREffect(
    "GameRandomChanged",
    (data: boolean) => {
      setRandom(data);
    },
    []
  );
};

export default useGameInitStore;
