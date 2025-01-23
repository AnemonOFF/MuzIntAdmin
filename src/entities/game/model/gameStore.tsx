import { Game, GameStatus } from "@/shared/types/game";
import { Tour } from "@/shared/types/tour";
import { Player } from "@/shared/types/player";
import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GameState = {
  id: Game["id"];
  status: GameStatus;
  currentTourId?: Tour["id"];
  players: Player[];
  connection?: HubConnection;
};

type GameAction = {
  setStatus: (status: GameStatus) => void;
  setTourId: (id?: Tour["id"]) => void;
  setPlayers: (players: Player[]) => void;
  reset: (id: Game["id"]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: Player["id"]) => void;
  updatePlayer: (player: Player) => void;
  setConnection: (connection: HubConnection) => void;
};

type GameStoreType = GameState & GameAction;

export const useGameStore = create<GameStoreType>()(
  devtools((set) => ({
    id: 0,
    status: GameStatus.WaitForStart,
    currentTourId: undefined,
    players: [],
    connection: undefined,

    reset: (id) =>
      set(() => ({
        id: id,
        status: GameStatus.WaitForStart,
        currentTourId: undefined,
        players: [],
        connection: undefined,
      })),
    setStatus: (status) => set(() => ({ status: status })),
    setTourId: (tourId) => set(() => ({ currentTourId: tourId })),
    setConnection: (connection) => set(() => ({ connection: connection })),
    setPlayers: (players) => set(() => ({ players: players })),
    addPlayer: (player) =>
      set((state) => ({
        players: state.players.some((p) => p.id === player.id)
          ? state.players
          : [player, ...state.players],
      })),
    removePlayer: (playerId) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== playerId),
      })),
    updatePlayer: (player) =>
      set((state) => ({
        players: [player, ...state.players.filter((p) => p.id !== player.id)],
      })),
  }))
);
