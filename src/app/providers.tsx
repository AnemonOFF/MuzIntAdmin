"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response?.status === 401 && !path.includes("auth")) {
              router.push(
                `/auth?redirectTo=${encodeURIComponent(window.location.href)}`
              );
            } else if (err.response && err.response?.status >= 500)
              toast.error("Сервер не смог обработать запрос");
          } else {
            toast.error("Не удалось выполнить запрос");
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          retry: (count, error) => {
            if (
              axios.isAxiosError(error) &&
              error.response &&
              error.response.status < 500
            )
              return false;
            if (count >= 3) return false;
            if (!axios.isAxiosError(error) || !error.response) return true;

            return (
              error.response.status !== 401 && error.response.status !== 404
            );
          },
        },
        mutations: {
          retry: (count, error) => {
            if (path.includes("auth")) return false;
            if (count >= 3) return false;
            if (!axios.isAxiosError(error) || !error.response) return true;

            return (
              error.response.status !== 401 && error.response.status !== 404
            );
          },
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
