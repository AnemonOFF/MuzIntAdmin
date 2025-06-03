"use client";

import { useAuthQuery } from "@/entities/user";
import Loader from "@/shared/ui/loader";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSuccess } = useAuthQuery();

  if (!isSuccess)
    return (
      <div className="w-screen min-h-screen p-5 flex items-center justify-center bg-black text-white">
        <Loader text="Загрузка..." />
      </div>
    );

  return (
    <main className="m-0 p-0 min-h-screen w-screen bg-black text-white flex flex-col relative">
      {children}
    </main>
  );
}
