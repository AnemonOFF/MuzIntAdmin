"use client";

import { useAuthQuery } from "@/entities/user";
import Loader from "@/shared/ui/loader";
import { AuthCard } from "@/widgets/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = ({}) => {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useAuthQuery();

  useEffect(() => {
    if (isSuccess && data) router.push("/dashboard");
  }, [isSuccess, data, router]);

  if (isLoading || (isSuccess && data)) return <Loader />;

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-5">
      <main>
        <AuthCard />
      </main>
    </div>
  );
};

export default React.memo(AuthPage);
