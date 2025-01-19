"use client";

import { useEffect, useState } from "react";
import { createSignalRContext } from "react-signalr/signalr";
import { apiClient } from "./axios";
import { toast } from "sonner";
import { HubConnection } from "@microsoft/signalr";
import { Game } from "@/shared/types/game";

const SignalRModeratorContext = createSignalRContext();

export interface SignalRModeratorProviderProps {
  children: React.ReactNode;
  gameId: Game["id"];
  setConnection: (connection: HubConnection) => void;
}

export const SignalRModeratorProvider: React.FC<
  SignalRModeratorProviderProps
> = ({ children, gameId, setConnection }) => {
  const [reconnectToastId, setReconnectToastId] = useState<string | number>();

  useEffect(() => {
    return () => {
      if (reconnectToastId) toast.dismiss(reconnectToastId);
      else toast.dismiss();
    };
  }, [reconnectToastId]);

  const onError = async (error: Error | undefined) => {
    if (error?.message === "The connection was stopped during negotiation.")
      return;

    if (!reconnectToastId) {
      const toastId = toast.loading(
        "Соединение потеряно, пытаюсь переподключиться...",
        {
          richColors: true,
        }
      );
      setReconnectToastId(toastId);
    }
  };

  const onClose = () => {
    toast.error("Соединение потеряно, перезагрузите страницу", {
      id: reconnectToastId,
      richColors: true,
      duration: Infinity,
    });
    setReconnectToastId(undefined);
  };

  const onReconnect = (connection: HubConnection) => {
    setConnection(connection);
    toast.success("Переподключился!", {
      id: reconnectToastId,
      richColors: true,
    });
    setReconnectToastId(undefined);
  };

  const onOpen = (connection: HubConnection) => {
    setConnection(connection);
    toast.dismiss();
    if (reconnectToastId) {
      toast.success("Переподключился!", {
        id: reconnectToastId,
        richColors: true,
      });
    } else {
      toast.dismiss();
      toast.success("Подключился к серверу!", {
        richColors: true,
      });
    }
    setReconnectToastId(undefined);

    connection.invoke("JoinGame", gameId);
  };

  return (
    <SignalRModeratorContext.Provider
      url={new URL(
        "hubs/moderator",
        process.env.NEXT_PUBLIC_API_URL
      ).toString()}
      automaticReconnect={[2000, 5000, 5000, 10000, 15000]}
      //
      onClosed={onClose}
      onError={onError}
      onOpen={onOpen}
      onReconnect={onReconnect}
      //
      accessTokenFactory={() => apiClient.getToken()!}
      connectEnabled={!!apiClient.getToken()}
      dependencies={[apiClient.getToken()]}
      //
      headers={{
        Authorization: `Bearer ${apiClient.getToken()}`,
      }}
      withCredentials
    >
      {children}
    </SignalRModeratorContext.Provider>
  );
};

export const useModeratorSignalREffect =
  SignalRModeratorContext.useSignalREffect;
