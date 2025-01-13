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
      <div className="w-screen min-h-screen p-5 flex items-center justify-center">
        <Loader text="Загрузка..." />
      </div>
    );

  return <div className="">{children}</div>;
}
